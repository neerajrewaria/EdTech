const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    courseName: {
      type: String,
      required: true,
      trim: true,
    },
    courseDescription: {
      type: String,
      required: true,
      trim: true,
    },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to User model
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category', // Reference to Category model
      required: true, // Assuming a course must always belong to a category
    },
    whatYouWillLearn: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    courseContent: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Section', // Reference to Section model
      },
    ],
    ratingAndReviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'RatingAndReview', // Reference to Rating & Review model
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    thumbnail: {
      type: String, // image URL or file path
      default: '',
    },
    tag: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tag', // Reference to Tag model
      },
    ],
    studentsEnrolled: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to User model
      },
    ],
    status: {
      type: String,
      enum: ["Drafted", "Published"],
      default: "Drafted",
    },
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

module.exports = mongoose.model('Course', courseSchema);