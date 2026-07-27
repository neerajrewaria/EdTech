const mongoose = require("mongoose");
const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");

// ----------------------------------------------------------------------
// Mark / unmark a lecture (subsection) as completed for the logged-in user
// Route: POST /api/v1/course/updateCourseProgress
// Body: { courseId, subsectionId, completed }   // completed: boolean
// Requires auth middleware that sets req.user (so req.user.id is available)
// ----------------------------------------------------------------------
exports.updateCourseProgress = async (req, res) => {
    try {
        const { courseId, subsectionId, completed } = req.body;
        const userId = req.user.id;

        if (!courseId || !subsectionId || typeof completed !== "boolean") {
            return res.status(400).json({
                success: false,
                message: "courseId, subsectionId and completed (boolean) are required",
            });
        }

        // Make sure the subsection actually exists (basic sanity check)
        const subSection = await SubSection.findById(subsectionId);
        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "Lecture (subsection) not found",
            });
        }

        // Find existing progress doc, or create one if this is the first
        // lecture the user is interacting with for this course
        let courseProgress = await CourseProgress.findOne({
            courseID: courseId,
            userId,
        });

        if (!courseProgress) {
            courseProgress = await CourseProgress.create({
                courseID: courseId,
                userId,
                completedVideos: completed ? [subsectionId] : [],
            });

            return res.status(200).json({
                success: true,
                message: "Course progress created and updated",
                data: courseProgress,
            });
        }

        const alreadyCompleted = courseProgress.completedVideos.some(
            (id) => id.toString() === subsectionId
        );

        if (completed && !alreadyCompleted) {
            // Mark as completed
            courseProgress.completedVideos.push(subsectionId);
        } else if (!completed && alreadyCompleted) {
            // Unmark (user un-ticked the checkbox)
            courseProgress.completedVideos = courseProgress.completedVideos.filter(
                (id) => id.toString() !== subsectionId
            );
        }

        await courseProgress.save();

        return res.status(200).json({
            success: true,
            message: "Course progress updated successfully",
            data: courseProgress,
        });
    } catch (error) {
        console.error("Error in updateCourseProgress:", error);
        return res.status(500).json({
            success: false,
            message: "Could not update course progress",
            error: error.message,
        });
    }
};

// ----------------------------------------------------------------------
// Fetch the logged-in user's progress for a given course
// Route: GET /api/v1/course/getCourseProgress/:courseId
// Requires auth middleware that sets req.user
// ----------------------------------------------------------------------
exports.getCourseProgress = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.user.id;

        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "courseId is required",
            });
        }

        const courseProgress = await CourseProgress.findOne({
            courseID: courseId,
            userId,
        });

        // No progress yet is not an error — just return an empty list
        return res.status(200).json({
            success: true,
            message: "Course progress fetched successfully",
            data: {
                completedVideos: courseProgress?.completedVideos || [],
            },
        });
    } catch (error) {
        console.error("Error in getCourseProgress:", error);
        return res.status(500).json({
            success: false,
            message: "Could not fetch course progress",
            error: error.message,
        });
    }
};