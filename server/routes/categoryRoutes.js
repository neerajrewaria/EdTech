const express = require('express');
const router = express.Router();
const { createCategory, getAllCategories, getCategoryPageDetails } = require('../controllers/Category');
const { authentication, isAdmin } = require('../middleware/auth');

// Public routes
router.get('/getAllCategories', getAllCategories);
router.get('/getCategoryPageDetails/:categoryId', getCategoryPageDetails);

// Admin protected routes
router.post('/createCategory', authentication, isAdmin, createCategory);

module.exports = router;
