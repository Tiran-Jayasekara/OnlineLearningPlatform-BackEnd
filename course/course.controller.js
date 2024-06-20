const Course = require("./course.modal");
const Joi = require("joi").extend(require("@joi/date"));


// Add Course
module.exports.createCourse = async (req, res) => {
    const schema = Joi.object({
        courseName: Joi.string().required(),
        description: Joi.string().required(),
        duration: Joi.string().required(),
        startDate: Joi.string().required(),
        endDate: Joi.string().required(),
        instructorName: Joi.string().required(),
        coursePrice: Joi.number().required(),
        courseCapacity: Joi.number().required(),
    });

    try {
        const CourseInfo = req.body;

        const { error } = schema.validate(CourseInfo);
        const {
            courseName,
        } = CourseInfo;

        if (error) {
            res.status(200).json({ message: error.message });
        } else {
            const alreayExist = await Course.findOne({ courseName: courseName });
            if (alreayExist) {
                res.status(200).send({ message: "Course Already Exist" });
            } else {
                const newCourse = new Course(CourseInfo);
                await newCourse.save();
                res.status(200).send({ message: "Course Create success" });
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(" Error in Create Course Section ->", error);
    }
};

// Update Course
module.exports.UpdateCourse = async (req, res) => {
    const schema = Joi.object({
        _id: Joi.required(),
        courseName: Joi.string().required(),
        description: Joi.string().required(),
        duration: Joi.string().required(),
        startDate: Joi.string().required(),
        endDate: Joi.string().required(),
        instructorName: Joi.string().required(),
        coursePrice: Joi.number().required(),
        courseCapacity: Joi.number().required(),
    });

    try {
        const CourseInfo = req.body;
        const { error } = schema.validate(CourseInfo);
        const {
            _id,
            courseName,
            description,
            duration,
            startDate,
            instructorName,
            coursePrice,
            courseCapacity,
            endDate
        } = CourseInfo;

        if (error) {
            res.status(200).json({ message: error.message });
        } else {
            const updateCourseData = await Course.findOneAndUpdate({ _id: _id },
                {
                    $set: {
                        courseName,
                        description,
                        duration,
                        startDate,
                        instructorName,
                        coursePrice,
                        courseCapacity,
                        endDate
                    }
                }
                , { new: true });
            if (updateCourseData) {
                res.status(200).send({ message: "Course Update Success" });
            } else {
                res.status(404).send({ message: "Course Update unSuccess" });
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(" Error in Update Course Section ->", error);
    }
};

// Get All Course
module.exports.getAllCourse = async (req, res) => {
    try {
        const allCourses = await Course.find({});
        if (allCourses) {
            res.status(200).send({ message: "All Courses", allCourses });
        } else {
            res.status(200).send({ message: "No Any Course" });
        }

    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(" Error in get All Course Section ->", error);
    }
};

// Get One Course data
module.exports.getOneCourseData = async (req, res) => {
    try {
        const courseID = req.params.courseID;
        const CourseData = await Course.find({ _id: courseID });

        if (CourseData.length > 0) {
            res.status(200).send({ message: "One Course Data", CourseData });
        } else {
            res.status(200).send({ message: "No Any Course" });
        }

    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(" Error in get One Course Section ->", error);
    }
};

// Delete Course
module.exports.deleteCourse = async (req, res) => {
    try {
        const courseID = req.params.courseID;
        const CourseData = await Course.deleteOne({ _id: courseID });
        if (CourseData.deletedCount > 0) {
            res.status(200).send({ message: "course delete success" });
        } else {
            res.status(200).send({ message: "couldn't find any course for this CourseID" });
        }

    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(" Error in delete Course Section ->", error);
    }
};