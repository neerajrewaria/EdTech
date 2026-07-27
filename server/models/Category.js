const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true, // ensures no duplicate tags
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    course: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Course', // Reference to Course model
      },
    ],
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

module.exports = mongoose.model('Category', categorySchema);