const StudentCourse = require("./courseEnroll.modal");
const Joi = require("joi").extend(require("@joi/date"));

// Enroll Course
module.exports.enrollCourse = async (req, res) => {
    const schema = Joi.object({
        studentId: Joi.string().required(),
        courseId: Joi.string().required(),
    });
    try {
        const studentCourseInfo = req.body;
        const { error } = schema.validate(studentCourseInfo);
        const {
            studentId,
            courseId,
        } = studentCourseInfo;

        if (error) {
            res.status(200).json({ message: error.message });
        } else {
            const alreayExist = await StudentCourse.findOne({ studentId: studentId, courseId: courseId });
            if (alreayExist) {
                res.status(200).send({ message: "Already enrolled" });
            } else {

                const enrollData = await StudentCourse.create({
                    studentId,
                    courseId,
                });
                res.status(200).send({ message: "Course Enroll Success", enrollData });
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(" Error in enroll course section ->", error);
    }
};


// Remove enrollment
module.exports.removeEnrollment = async (req, res) => {
    try {
        const studentId = req.params.studentID;
        const courseID = req.params.courseID;
        const courseData = await StudentCourse.deleteOne({ studentId: studentId, courseId: courseID });
        if (courseData.deletedCount > 0) {
            res.status(200).send({ message: "remove success" });
        } else {
            res.status(200).send({ message: "couldn't find any enrollment for this studentID" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(" Error in delete  course enrollment Section ->", error);
    }
};


module.exports.getAllEnrolledCourse = async (req, res) => {
    try {
        const studentId = req.params.studentId;
        const allCourses = await StudentCourse.find({ studentId: studentId }).populate('courseId');

        if (allCourses) {
            res.status(200).send({ message: "All enrolled Courses", allCourses });
        } else {
            res.status(200).send({ message: "No any enrolled Courses" });
        }

    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(" Error in get all enrolled course section ->", error);
    }
};