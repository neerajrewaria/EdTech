const { uploadImageToCloudinary } = require("../utility/uploadImage");
const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const Tag = require("../models/Tag"); // Import Tag model
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const cloudinary = require("cloudinary").v2;


exports.createCourse = async (req, res) => {
    try {
        const { courseName, courseDescription, price, category, whatYouWillLearn, instructions, tag, status } = req.body;
        const thumbnail = req.files?.thumbnail; // Correctly accessing file via express-fileupload

        //valiadation
        if (!courseName || !courseDescription || !price || !category || !whatYouWillLearn || !instructions || !tag || !thumbnail) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        // 1.1 File Extension Validation
        const supportedTypes = ["jpg", "jpeg", "png", "webp"];
        const fileType = thumbnail.name.split('.').pop().toLowerCase();
        if (!supportedTypes.includes(fileType)) {
            return res.status(400).json({
                success: false,
                message: "Unsupported file format. Please upload JPG, JPEG, PNG or WEBP."
            });
        }

        // Image size validation (2MB)
        if (thumbnail.size > 2 * 1024 * 1024) {
            return res.status(400).json({
                success: false,
                message: "Thumbnail size should be less than 2MB"
            });
        }

        // Get the details of instructor from req.user
        const userID = req.user.id;
        const instructorDetails = await User.findById(userID);
        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "Instructor not found"
            });
        }

        // Check given category is valid or not
        const categorydetails = await Category.findById(category);
        if (!categorydetails) {
            return res.status(400).json({
                success: false,
                message: "Category is invalid"
            })
        }

        // Handle tags: split, deduplicate, and process in parallel
        const tagNames = [...new Set(tag.split(',').map(t => t.trim()).filter(t => t !== ''))];
        const tagIds = await Promise.all(tagNames.map(async (tagName) => {
            let existingTag = await Tag.findOne({ name: tagName });
            if (!existingTag) {
                existingTag = await Tag.create({ name: tagName, description: tagName });
            }
            return existingTag._id;
        }));

        const uploadDetails = await uploadImageToCloudinary(thumbnail, "courseThumbnails");

        // Create a course in DB
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            price, // Assuming price is a number
            category: categorydetails._id,
            whatYouWillLearn,
            instructor: instructorDetails._id,
            thumbnail: uploadDetails.secure_url,
            tag: tagIds, // Array of Tag ObjectIds
            instructions,
            status: status || "Drafted", // Allow passing Published for easier testing
        });


        //add the new course to the user schema of instructor

        await User.findByIdAndUpdate({
            _id: instructorDetails._id
        }, {
            $push: { courses: newCourse._id }
        })

        //now add the course to the course list of category schema
        await Category.findByIdAndUpdate({
            _id: categorydetails._id
        }, {
            $push: { course: newCourse._id }
        })

        return res.status(201).json({
            success: true,
            message: "Course created successfully",
            data: newCourse
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while creating the course",
            error: error.message
        })

    }



}


//get all courses controller
exports.getAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find(
            { status: "Published" }, //first argument
            {                     //2nd argument(projection object)
                courseName: true,
                courseDescription: true,
                price: true,
                thumbnail: true,
                instructor: true,
                ratingAndReviews: true,
                studentsEnrolled: true,
                category: true,
            }
        )
            .populate("instructor")// Instead of just an ID, give me the full Instructor details
            .exec();  // Run the query now and return a Promise


        return res.status(200).json({
            success: true,
            message: "All courses fetched successfully",
            data: allCourses
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching all courses",
            error: error.message
        })
    }
}

// Edit Course Details (to save final status)
exports.editCourse = async (req, res) => {
    try {
        console.log("Editing course ID:", req.body.courseId);
        const { courseId } = req.body;
        const updates = req.body;

        if (!courseId) {
            return res.status(400).json({ success: false, message: "Course ID is required" });
        }

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        // 1. Handle thumbnail update ONLY if a new file is provided
        if (req.files && req.files.thumbnail) {
            console.log("Uploading new thumbnail...");
            const thumbnail = req.files.thumbnail;
            const uploadDetails = await uploadImageToCloudinary(thumbnail, "courseThumbnails");
            course.thumbnail = uploadDetails.secure_url;
        }

        // 2. Handle tags specifically: process string into IDs if tags were changed
        if (updates.tag) {
            // Use the same logic as createCourse to normalize tags
            const tagNames = [...new Set(updates.tag.split(',')
                .map(t => t.trim())
                .filter(t => t !== ''))];

            const tagIds = await Promise.all(tagNames.map(async (tagName) => {
                let existingTag = await Tag.findOne({
                    name: { $regex: new RegExp(`^${tagName}$`, 'i') }
                });

                if (!existingTag) {
                    existingTag = await Tag.create({
                        name: tagName,
                        description: `Courses tagged with ${tagName}`
                    });
                }
                return existingTag._id;
            }));
            course.tag = tagIds;
        }

        // 3. Update other fields
        const fieldsToUpdate = [
            "courseName",
            "courseDescription",
            "price",
            "category",
            "whatYouWillLearn",
            "instructions",
            "status"
        ];

        fieldsToUpdate.forEach((field) => {
            if (updates[field] !== undefined) {
                course[field] = updates[field];
            }
        });

        await course.save();

        // Populate the updated course details to avoid frontend crashes
        const updatedCourse = await Course.findById(courseId)
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();

        res.json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Delete Course
exports.deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.body;

        // Find the course
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        // Delete thumbnail from Cloudinary
        if (course.thumbnail) {
            const publicId = course.thumbnail.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(`courseThumbnails/${publicId}`);
        }

        // Unenroll students from the course
        await User.updateMany(
            { _id: { $in: course.studentsEnrolled } },
            { $pull: { courses: courseId } }
        );

        // Delete sections and sub-sections
        const sections = await Section.find({ _id: { $in: course.courseContent } });
        const subSectionIds = sections.flatMap(section => section.subSection);

        await SubSection.deleteMany({ _id: { $in: subSectionIds } });
        await Section.deleteMany({ _id: { $in: course.courseContent } });

        // Remove from Instructor's course list
        await User.findByIdAndUpdate(course.instructor, {
            $pull: { courses: courseId },
        });

        // Remove from Category's course list
        await Category.updateMany({}, { $pull: { course: courseId } });

        // Delete the course
        await Course.findByIdAndDelete(courseId);

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error during deletion",
            error: error.message,
        });
    }
};

// Get Instructor Courses

exports.getInstructorCourses = async (req, res) => {
    try {
        const instructorId = req.user.id;
        // Populate tag so we get names instead of just IDs
        const instructorCourses = await Course.find({ instructor: instructorId })
            .populate("tag")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: instructorCourses,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve instructor courses",
            error: error.message,
        });
    }
};





exports.getCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.params;
        console.log("Fetching details for course ID:", courseId);

        const courseDetails = await Course.findById(courseId)
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails", // Matches User model field
                },
            })
            .populate("category") // Now that category is in schema, strictPopulate: false is not needed
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();

        console.log("Course Details Found:", courseDetails ? "Yes" : "No");

        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: `Could not find the course with id: ${courseId}`,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Course details fetched successfully",
            data: courseDetails,
        });
    } catch (error) {
        console.error("GET_COURSE_DETAILS_ERROR:", error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
