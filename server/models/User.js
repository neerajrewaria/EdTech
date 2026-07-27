const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
    resetToken: {
      type: String,
      required: false,
      default: ''
    },
    resetpasswordExpires: {
      type: Date
    },
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Course', // Reference to Course model
      },
    ],
    additionalDetails: {
      type: Schema.Types.ObjectId,
      ref: 'Profile', // Reference to Profile model
    },
    image: {
      type: String, // store image URL or path
      default: '',
    },
    accountType: {
      type: String,
      enum: ['Admin', 'Student', 'Instructor'], // allowed values
      required: true,
      default: 'Student',
    },
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

module.exports = mongoose.model('User', userSchema);