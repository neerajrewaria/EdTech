const express = require('express');
const router = express.Router();
const { capturePayment, signatureVerification, enrollCourse } = require('../controllers/Payments');
const { authentication, isStudent } = require('../middleware/auth');

// Student protected routes
router.post('/capturePayment', authentication, isStudent, capturePayment);
router.post('/signatureVerification', authentication, isStudent, signatureVerification);
router.post('/enrollCourse', authentication, isStudent, enrollCourse);

module.exports = router;
