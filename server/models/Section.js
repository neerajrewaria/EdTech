const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sectionSchema = new Schema(
  {
    sectionName: {
      type: String,
      required: true,
      trim: true,
    },
    sectionDescription: {
      type: String,
      trim: true,
    },
    subSection: [
      {
        type: Schema.Types.ObjectId,
        ref: 'SubSection', // Reference to SubSection model
      },
    ],
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

module.exports = mongoose.model('Section', sectionSchema);