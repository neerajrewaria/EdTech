const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tagSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true, // Ensures no duplicate tag names
        },
        description: {
            type: String,
            trim: true,
            default: '',
        },
    },
    { timestamps: true } // Adds createdAt & updatedAt automatically
);

module.exports = mongoose.model('Tag', tagSchema);