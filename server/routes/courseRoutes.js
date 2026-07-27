const express = require('express');
const router = express.Router();
const { createCourse, editCourse, getInstructorCourses, deleteCourse, getAllCourses, getCourseDetails } = require('../controllers/Course');
const { authentication, isInstructor } = require('../middleware/auth');

// Instructor protected routes
router.post('/createCourse', authentication, isInstructor, createCourse);
router.post('/editCourse', authentication, isInstructor, editCourse);
router.get('/getInstructorCourses', authentication, isInstructor, getInstructorCourses);
router.delete('/deleteCourse', authentication, isInstructor, deleteCourse);
router.get('/getAllCourses', getAllCourses);
router.get('/getCourseDetails/:courseId', getCourseDetails);


module.exports = router;
