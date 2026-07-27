const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseProgressSchema = new Schema(
    {
        courseID: {
            type:Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },
        userId: {
            type:Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        completedVideos: [
            {
                type:Schema.Types.ObjectId,
                ref: "SubSection",
            },
        ],
    },
    { timestamps: true }
);

// One progress document per (user, course) pair
courseProgressSchema.index({ courseID: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("CourseProgress", courseProgressSchema);