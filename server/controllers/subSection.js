const Course = require("../models/Course");
const Section = require("../models/Section");
const SubSection = require("../models/Subsection");
const { uploadImageToCloudinary } = require("../utility/uploadImage");
//why Course and Section both bcz we need to create subsection and also update section with this new subsection
const cloudinary = require("cloudinary").v2;

exports.createSubSection = async (req, res) => {
    try {
        console.log("Pass 1");
        console.log(req.body);
        // 1. Get data from request body
        const { title, description, timeDuration, sectionId } = req.body;

        // 2. Get video file from req.files
        const video = req.files ? req.files.video : null;
        console.log("Pass 2");
        // 3. Validation
        if (!title || !description || !timeDuration || !sectionId || !video) {
            return res.status(400).json({
                success: false,
                message: "All fields are required (Title, Description, Duration, Section ID, and Video)"
            });
        }

        // 3.0 File Extension Validation
        const supportedTypes = ["mp4", "mkv", "mov", "webm"];
        const fileType = video.name.split('.').pop().toLowerCase();
        if (!supportedTypes.includes(fileType)) {
            return res.status(400).json({
                success: false,
                message: "Unsupported video format. Please upload MP4, MKV, MOV or WEBM."
            });
        }

        // 3.1 Size Validation (20MB Limit)
        if (video.size > 20 * 1024 * 1024) {
            return res.status(400).json({
                success: false,
                message: "keep the video size below 20 mb"
            });
        }
        console.log("Pass 3");

        // 4. Upload video to Cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, "subSectionVideos");
        console.log("Pass 4");

        // 5. Create SubSection entry in DB
        const newSubSection = await SubSection.create({
            title,
            description,
            videoURL: uploadDetails.secure_url,
            timeDuration
        });
        console.log("Pass 5");

        // 6. Push the new SubSection ID into the Section's array and return the updated Section
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            { $push: { subSection: newSubSection._id } },
            { new: true }
        ).populate("subSection");
        console.log("Pass 6");
        // 7. Return success response
        res.status(201).json({
            success: true,
            message: "SubSection created successfully",
            data: updatedSection
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong while creating the subsection",
            error: error.message
        });
    }
};

exports.updateSubSection = async (req, res) => {
    try {
        const { title, description, videoURL, timeDuration } = req.body;
        const { subSectionId } = req.params; //why params bcz we are getting subsectionId from url
        //validation
        if (!title || !description || !videoURL || !timeDuration) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        //update subsection in db
        const updatedSubSection = await SubSection.findByIdAndUpdate({
            _id: subSectionId
        }, {
            title,
            description,
            videoURL,
            timeDuration
        }, {
            new: true
        });
        res.status(200).json({
            success: true,
            message: "SubSection updated successfully",
            data: updatedSubSection
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong while updating the subsection",
            error: error.message
        });
    }
};
exports.deleteSubSection = async (req, res) => {
    try {
        const { subSectionId } = req.params; //why params bcz we are getting subsectionId from url  

        const subSection = await SubSection.findById(subSectionId);
        if (subSection && subSection.videoURL) {
            // Delete video from Cloudinary
            const publicId = subSection.videoURL.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(`subSectionVideos/${publicId}`, { resource_type: "video" });
        }

        // delete subsection from db
        await SubSection.findByIdAndDelete({
            _id: subSectionId
        });
        res.status(200).json({
            success: true,
            message: "SubSection deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong while deleting the subsection",
            error: error.message
        });
    }
};

//get all subsections controller
exports.getAllSubSections = async (req, res) => {
    try {
        const allSubSections = await SubSection.find({});
        return res.status(200).json({
            success: true,
            message: "All subsections fetched successfully",
            data: allSubSections
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching all subsections",
            error: error.message
        });
    }

};
