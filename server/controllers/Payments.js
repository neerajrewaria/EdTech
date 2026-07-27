const { instance } = require('../config/razorpay');
const User = require('../models/User');
const Course = require('../models/Course');
const mailsender = require('../utility/mailsender');
const CourseProgress = require('../models/CourseProgress'); // Import CourseProgress model
const { courseEnrollmentEmail } = require('../mail/template/courseEnrollmentEmail');
const mongoose = require('mongoose');

exports.capturePayment = async (req, res) => {
    try {
        const courseId = req.body;
        const userId = req.user.id;

        //now check if the courseId is valid

        if (!courseId) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            })
        }

        let course;
        try {
            course = await Course.findById(courseId);
            if (!course) {
                return res.status(404).json({
                    success: false,
                    message: "Course not found"
                })
            }

            //now check if the user is already enrolled in the course
            const uid = new mongoose.Types.ObjectId(userId);  //what is the purpose of this line
            //convert userId to ObjectId
            if (course.studentsEnrolled.includes(uid)) {
                return res.status(400).json({
                    success: false,
                    message: "Student is  already enrolled in the course"
                })
            }

        }


        catch (err) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            })
        }



        const amount = course.price;
        const currency = "INR";

        const options = {
            amount: amount * 100, // Convert to smallest currency unit (e.g., paise for INR)
            currency,
            receipt: Math.random(Date.now().toString()), // Generate a unique receipt ID
            notes: {
                courseId: courseId,
                userId: userId,
            },
        };
        try {

            const paymentResponse = await instance.orders.create(options);
            console.log("Payment Response:", paymentResponse);

            return res.status(200).json({
                success: true,
                message: "Payment initiated successfully",
                paymentResponse,
            });
        }
        catch (error) {
            console.error("Error creating Razorpay order:", error);
            return res.status(500).json({
                success: false,
                message: "Failed to initiate payment",
            });

        }

    }

    catch (error) {
        console.error("Error in capturePayment:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

exports.enrollCourse = async (req, res) => {
    const { courses } = req.body;
    const userId = req.user.id;

    if (!courses || courses.length === 0) {
        return res.status(400).json({
            success: false,
            message: "Please provide Course IDs",
        });
    }

    try {
        for (const courseId of courses) {
            // Check if the course exists
            const course = await Course.findById(courseId);
            if (!course) {
                return res.status(404).json({ success: false, message: `Course not found: ${courseId}` });
            }

            // Check if the user is already enrolled
            if (course.studentsEnrolled.some(id => id.toString() === userId)) {
                return res.status(400).json({
                    success: false,
                    message: `Student is already enrolled in course: ${course.courseName}`,
                });
            }

            // Add student to the course's enrolled list
            await Course.findByIdAndUpdate(
                courseId,
                { $addToSet: { studentsEnrolled: userId } },
                { new: true }
            );

            // Add course to the student's enrolled list
            await User.findByIdAndUpdate(
                userId,
                { $addToSet: { courses: courseId } },
                { new: true }
            );

            // Initialize CourseProgress for this user and course
            await CourseProgress.create({
                courseId: courseId,
                userId: userId,
                completedVideos: [], // Initially no videos completed
            });
        }

        const updatedUser = await User.findById(userId).populate("courses").exec();

        return res.status(200).json({ success: true, message: "Enrolled successfully", updatedUser });
    } catch (error) {
        console.error("Error in enrollCourse:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};


exports.signatureVerification = async (req, res) => {
    try {

        const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

        const signature = req.headers['x-razorpay-signature'];  //get signature from headers

        //create hmac object
        const crypto = require('crypto');

        const shasum = crypto.createHmac('sha256', webhookSecret);
        // what is hmac ??
        //HMAC ka matlab hai Hash-based Message Authentication Code.
        //  Ye ek tarika hai jisse hum ensure karte hain ki message ya
        //  data jo hum bhej rahe hain, wo secure hai aur usme koi badlav nahi hua hai.
        //  HMAC ek secret key aur hashing algorithm ka use karta hai 
        // taaki ek unique code generate kiya ja sake jo sirf sender aur 
        // receiver ke beech valid hota hai.

        //update the hmac object with the request body
        shasum.update(JSON.stringify(req.body));
        const digest = shasum.digest('hex');

        // what is digest ??
        // Digest ka matlab hai ek unique code ya hash jo kisi data ya message se generate hota hai.
        //  Jab hum kisi data ko process karte hain, to us data ka ek fixed-size representation 
        // banta hai jise hum digest kehte hain.
        //  Ye digest ek tarah se data ka fingerprint hota hai, jo ye ensure karta hai ki 
        // data me koi badlav nahi hua hai.
        //  Agar data me thoda bhi badlav hota hai, to uska digest bhi completely different ho jata hai.
        //  Isliye digest ka use data integrity check karne ke liye kiya jata hai.
        //  Digest ko aksar cryptographic algorithms ke sath use kiya jata hai, jaise ki SHA-256 ya MD5.
        //  Ye algorithms data ko process karke uska unique digest generate karte hain.
        //  Digest ka use digital signatures, password hashing, aur data verification me bhi hota hai.
        //  Overall, digest ek important concept hai jo data security aur integrity me madad karta hai.
        console.log("Generated Digest:", digest);
        console.log("Received Signature:", signature);


        //compare the signatures
        if (signature === digest) {
            console.log("Signature verified");
            const event = req.body.event;
            if (event === 'payment.captured') {
                const paymentEntity = req.body.payload.payment.entity;
                const courseId = paymentEntity.notes.courseId;
                const userId = paymentEntity.notes.userId;
                //enroll the student in the course
                const courseDetails = await Course.findByIdAndUpdate({
                    _id: courseId
                }, {
                    $push: { studentsEnrolled: userId }
                }, {
                    new: true
                });
                if (!courseDetails) {
                    return res.status(404).json({
                        success: false,
                        message: "Course not found"
                    })
                }

                const userDetails = await User.findByIdAndUpdate(
                    userId,
                    {
                        $push: { courses: courseId }
                    },
                    {
                        new: true
                    }
                );
                //send enrollment email to the student
                const emailResponse = await mailsender(
                    userDetails.email,
                    "Enrollment in the course",
                    courseEnrollmentEmail(
                        userDetails.firstName,
                        courseDetails.courseName
                    )
                );
                console.log("Email sent successfully:", emailResponse);
            }
            return res.status(200).json({
                success: true,
                message: "Signature verified successfully"
            })
        }
        else {
            return res.status(400).json({
                success: false,
                message: "Invalid signature"
            })
        }
    } catch (error) {
        console.error("Error in signatureVerification:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}
