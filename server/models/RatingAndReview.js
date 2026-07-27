const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ratingAndReviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to User model
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    //   min: 1,
    //   max: 5, // restricts rating between 1 and 5
    },
    review: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

module.exports = mongoose.model('RatingAndReview', ratingAndReviewSchema);