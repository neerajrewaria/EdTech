const express = require('express');
const router = express.Router();
const { createSection, updateSection, deleteSection } = require('../controllers/Section');
const { authentication, isInstructor } = require('../middleware/auth');

// Instructor protected routes
router.post('/createSection', authentication, isInstructor, createSection);
router.put('/updateSection/:sectionId', authentication, isInstructor, updateSection);
router.delete('/deleteSection/:sectionId', authentication, isInstructor, deleteSection);

module.exports = router;
