const Course = require("../models/Course");
const Section = require("../models/Section");

exports.createSection = async (req, res) => {
    try {
        const { sectionName, sectionDescription, courseId } = req.body;
        //why courseId  bcz section is related to course
        //from frontend we will get courseId in req.body
        //validation - sectionDescription is now optional
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        //create section in db
        const newSection = await Section.create({
            sectionName,
            sectionDescription,

        });
        //now update the course with this new section
        const updatedCoursedetails = await Course.findByIdAndUpdate({
            _id: courseId
        }, {
            $push: { courseContent: newSection._id }
        }, {
            new: true
        }).populate({
            path: "courseContent",
            populate: {    //why one more populate?? bcz section refer to subsection also
                path: "subSection" //so do we need to populate subsection also?? yes
                //why bcz while getting course details we need to show subsection also
            }
        });

        res.status(200).json({
            success: true,
            message: "Course details updated with new section",
            data: updatedCoursedetails
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong while creating the section",
            error: error.message
        })
    }
};

exports.updateSection = async (req, res) => {
    try {
        const { sectionName, sectionDescription } = req.body;
        const { sectionId } = req.params; //why params bcz we are getting sectionId from url
        //validation
        if (!sectionName || !sectionDescription) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        //update section in db
        const updatedSection = await Section.findByIdAndUpdate({
            _id: sectionId
        }, {
            sectionName,
            sectionDescription
        }, {
            new: true
        });
        return res.status(200).json({
            success: true,
            message: "Section updated successfully",
            data: updatedSection
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while updating the section",
            error: error.message
        })
    }
};



exports.deleteSection = async (req, res) => {
    try {
        const { sectionId } = req.params;
        //delete section from db
        await Section.findByIdAndDelete({
            _id: sectionId
        });
        return res.status(200).json({
            success: true,
            message: "Section deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while deleting the section",
            error: error.message
        })
    }
};

//get all sections controller
exports.getAllSections = async (req, res) => {
    try {
        const { courseId } = req.params;
        const courseDetails = await Course.findById(courseId).populate("courseContent");
        return res.status(200).json({
            success: true,
            message: "All sections fetched successfully",
            data: courseDetails.courseContent
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching all sections",
            error: error.message
        })
    }
}
