const User = require("../models/User");
const OTP = require("../models/OTP");
const Profile = require("../models/Profile")
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
require("dotenv").config();



exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const checkEmail = await User.findOne({ email: email });
        if (checkEmail) {
            return res.status(401).json({
                success: false,
                message: "user is already registered .Please enter different email to register",
            })
        }

        try {
            var otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            })

            let response = await OTP.findOne({ otp: otp });

            //bcz  unique otp is need that why we need while loop

            while (response) {

                otp = otpGenerator.generate(6, {
                    upperCaseAlphabets: false,
                    lowerCaseAlphabets: false,
                    specialChars: false
                })
                response = await OTP.findOne({ otp: otp });

            }
            //now create entry in db
            const otpPayload = { email, otp };
            const otpBody = await OTP.create(otpPayload);
            console.log("OTP saved to DB:", otpBody);

            //now return successful response

            res.status(201).json({
                success: true,
                message: "OTP Sent Successfully"
            })

        } catch (error) {
            console.log("OTP ERROR => ", error);
            return res.status(400).json({

                success: false,
                message: "OTP is not generated"
            })
        }





    } catch (error) {
        res.status(401).json({
            success: false,
            message: "something went wrong while sending the otp"
        })

    }
}



exports.signUp = async (req, res) => {
    try {

        const {
            email,
            firstName,
            lastName,
            password,
            confpassword,
            accountType,
            otp } = req.body;

        const checkUser = await User.findOne({ email: email })
        if (checkUser) {
            return res.status(401).json({
                success: false,
                message: "user is already registered .Please enter different email to register",
            })
        }


        if (!email || !firstName || !lastName || !password || !confpassword) {
            return res.status(402).json({
                success: false,
                message: "All fileds are required .Please fill again"
            })
        }

        if (password !== confpassword) {
            return res.status(402).json({
                success: false,
                message: "Your passwords fileds are not matched.Please enter the same password"
            })
        }



        // find the recent otp in db for this email
        const otpRecent = await OTP.findOne({ email }).sort({ createdAt: -1 });

        if (!otpRecent) {
            return res.status(401).json({
                success: false,
                message: "OTP is invalid or has expired"
            });
        }


        if (otp !== otpRecent.otp) {
            return res.status(401).json({
                success: false,
                message: "OTP does not match"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        //bcrypt is used to hash the password and 10 is the salt rounds which means how many times the password will be hashed.
        // The more the salt rounds the more secure the password will be but it will take more time to hash the password.


        const newProfile = await Profile.create({
            gender: null,
            dob: null,
            contactNo: null,
            about: null

        })

        // we are creating profile first because we need to pass the
        //  profile id in user model and profile id is generated after creating the profile.
        const newUser = await User.create({
            email,
            password: hashedPassword,
            accountType: accountType || 'Student',
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
            firstname: firstName,
            lastname: lastName,
            additionalDetails: newProfile._id,
            //why we need to pass profile id in user model because we need to populate the 
            // profile details in user model when we need to get the user details and profile 
            // details together. if we don't pass the profile// id in user model then we need to
            //  make two queries to get the user details and profile details which is not efficient.
            //  by passing the profile id in user model we can get the user details and profile details together
            //  by using populate method of mongoose.
        })


        return res.status(201).json({
            success: true,
            message: "User is registerd successfully"
        })


    } catch (error) {
        console.error("Signup error:", error);
        return res.status(402).json({
            success: false,
            message: "Something went wrong while signing up",
            error: error.message
        })
    }
}


exports.logIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        //validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        //now check if the user exists or not
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User does not exist .Please sign up first",
            })
        }


        //now check the password 
        if (await bcrypt.compare(password, user.password)) {

            const payload = {
                email: user.email,
                accountType: user.accountType,
                id: user._id
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" })

            // Update the user document with the new token and fetch it with populated details
            const loggedInUser = await User.findByIdAndUpdate(user._id, { token }, { new: true })
                .populate('additionalDetails')
                .select('-password');

            //now create cookies
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
                secure: true,
                sameSite: "None",
            }
            return res.cookie("token", token, options)
                .status(200)
                .json({
                    success: true,
                    message: "Logged in Successfully",
                    token,
                    user: loggedInUser
                })
        }


        // we are setting the token in cookie because we need to send 
        // the token in response and also we can use the token in 
        // authentication middleware to check if the user is logged in or not. 
        // if we don't set the token in cookie then we need to send the token in
        //  response and also we need to get the token from response and set it in 
        // local storage which is not efficient. by setting the token in cookie we 
        // can get the token from cookie directly in authentication middleware without 
        // making a query to get the user details.

        else {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect.Please re enter the password correctly"
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "something went wrong while logging in",
            error: error.message
        })

    }
}
//remainig
exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmNewPassword } = req.body;

        //validation
        if (!oldPassword || !newPassword || !confirmNewPassword) {
            return res.status(402).json({
                success: false,
                message: "All fields are required"
            })
        }
        if (newPassword !== confirmNewPassword) {
            return res.status(402).json({
                success: false,
                message: "New password and confirm new password are not matched"
            })
        }
        const user = await User.findById(req.user.id);
        //what is req.user.id ?
        // req.user is set in authentication middleware and it contains the user 
        // details which are extracted from the token. so req.user.id is the id 
        // of the user who is logged in and trying to change the password.
        //iska matlab hme pehle authentication middleware set karna hoga before 
        // chnage password route par taki req.user.id mil jaye aur uske basis par 
        // hm user ko find kr ske aur password change kr ske.

        //if we not set the authentication middleware before change password route
        //  then req.user.id will not be available and we will not be able to find 
        // the user and change the password.

        //check old password
        if (!await bcrypt.compare(oldPassword, user.password)) {
            return res.status(401).json({
                success: false,
                message: "Old password is incorrect"
            })
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();
        res.status(201).json({
            success: true,
            message: "Password changed successfully"
        })



    } catch (error) {
        res.status(501).json({
            success: false,
            message: "Something went wrong while changing the password"
        })



    }
}

exports.logout = async (req, res) => {
    try {
        // Clear the cookie
        // Ensure cookie options match those used during login for effective clearing
        res.clearCookie("token", {
            httpOnly: true, // Must match the httpOnly setting when the cookie was set
            secure: process.env.NODE_ENV === 'production', // Use secure in production
            sameSite: 'None', // Important for cross-site cookies if frontend and backend are different domains
            // You might also need to specify 'path' if it was set during login
            // path: '/',
        });

        // Optionally, if you store tokens in the DB for revocation, you can still try to clear it
        // However, if the authentication middleware is removed, req.user won't be available here.
        // If you rely solely on cookie clearing for session management, this DB update is not strictly needed.
        // If you want to keep it, you'd need to pass userId differently or re-evaluate its necessity here.

        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        console.error("Logout Error:", error);
        return res.status(500).json({
            success: false, // Indicate a backend issue, but frontend should still proceed
            message: "Logout process encountered an error, but attempted to clear session.",
            error: error.message
        });
    }
};