const express = require('express');
const router = express.Router();
const { createSubSection, updateSubSection, deleteSubSection, getAllSubSections } = require('../controllers/subSection');
const { authentication, isInstructor } = require('../middleware/auth');

// Public routes
router.get('/getAllSubSections', getAllSubSections);

// Instructor protected routes
router.post('/createSubSection', authentication, isInstructor, createSubSection);
router.put('/updateSubSection/:subSectionId', authentication, isInstructor, updateSubSection);
router.delete('/deleteSubSection/:subSectionId', authentication, isInstructor, deleteSubSection);

module.exports = router;
