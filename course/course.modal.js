const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    duration: {
        type: String,
        required: true,
        trim: true,
    },
    startDate: {
        type: String,
        required: true,
        trim: true,
    },
    endDate: {
        type: String,
        required: true,
        trim: true,
    },
    instructorName: {
        type: String,
        required: true,
        trim: true,
    },
    coursePrice: {
        type: Number,
        required: true,
        trim: true,
    },
    courseCapacity: {
        type: Number,
        required: true,
        trim: true,
    },
}, { timestamps: true },);

const Course = mongoose.model.Course || mongoose.model("Course", courseSchema);

module.exports = Course;


