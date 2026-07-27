const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const subSectionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    timeDuration: {
      type: String, // e.g. "10:35" or "5m 20s"
      required: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    videoURL: {
      type: String, // store video link or path
      required: true,
    },
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

module.exports = mongoose.model('SubSection', subSectionSchema);