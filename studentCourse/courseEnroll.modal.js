const mongoose = require("mongoose");

const studentCourseSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Student',
        trim: true,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Course',
        trim: true,
    },
}, { timestamps: true });


const StudentCourse = mongoose.models.StudentCourse || mongoose.model("StudentCourse", studentCourseSchema);

module.exports = StudentCourse;
