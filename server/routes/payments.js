const express = require("express");
const router = express.Router();

const { capturePayment, signatureVerification, enrollCourse } = require("../controllers/Payments");
const { authentication, isStudent } = require("../middleware/auth"); // Correctly import auth middleware

// Route for enrolling in a course (protected for students)
router.post("/enrollCourse", authentication, isStudent, enrollCourse);

// You can add other payment-related routes here later (e.g., capturePayment, signatureVerification)

module.exports = router;