const Category = require('../models/Category');
const Course = require("../models/Course");


exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(400).json(
                {
                    success: false,
                    error: 'Category name and description are required'

                });
        }

        const category = new Category({ name: name, description: description });
        await category.save();
        res.status(201).json({
            success: true,
            message: 'Category created successfully',
            category,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to create category',
            error: error.message
        });
    }
};

exports.getAllCategories = async (req, res) => {
    try {
        // Fetch all categories without restricting fields to ensure _id is included
        const categories = await Category.find({});
        res.status(200).json({
            success: true,
            message: 'Categories retrieved successfully',
            data: categories,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve categories',
            error: error.message
        });
    }
};

exports.getCategoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.params;

        // Get courses for the specified category
        const selectedCategory = await Category.findById(categoryId)
            .populate({
                path: "course",
                match: { status: "Published" }, // Only show published courses
                populate: {
                    path: "instructor", // Nested populate to get instructor details
                },
            })
            .exec();

        // 1. Check if category exists
        if (!selectedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        // 2. Check if category has any published courses
        if (selectedCategory.course.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No courses found for the selected category.",
            });
        }

        return res.status(200).json({
            success: true,
            data: selectedCategory,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};