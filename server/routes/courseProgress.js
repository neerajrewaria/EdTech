// Add this inside your existing course routes file (e.g. routes/Course.js)
// alongside your other course-related routes.

const express = require("express");
const router = express.Router();

const { authentication } = require("../middleware/auth"); // your existing auth middleware
const {
    updateCourseProgress,
    getCourseProgress,
} = require("../controllers/CourseProgress");

// Mark/unmark a lecture as completed (logged-in users only)
router.post("/updateCourseProgress", authentication, updateCourseProgress);

// Get the logged-in user's progress for a course
router.get("/getCourseProgress/:courseId", authentication, getCourseProgress);

module.exports = router;