const Student = require("./student.modal");
const Joi = require("joi").extend(require("@joi/date"));
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



// Add New Student
module.exports.addStudent = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        dob: Joi.string().required(),
        address: Joi.string().required(),
        mobile: Joi.number().required(),
        password: Joi.string().required(),
    });

    try {
        const studentInfo = req.body;
        const { error } = schema.validate(studentInfo);
        const {
            name,
            email,
            dob,
            address,
            mobile,
            password
        } = studentInfo;

        if (error) {
            res.status(200).json({ message: error.message });
        } else {
            const alreayExist = await Student.findOne({ email: email });
            if (alreayExist) {
                res.status(200).send({ message: "Student Already Exist" });
            } else {
                const hash = await bcrypt.hash(password, 10);

                const newStudentData = await Student.create({
                    name,
                    email,
                    dob,
                    address,
                    mobile,
                    password: hash
                });
                res.status(200).send({ message: "Student add success", newStudentData });
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(" Error in add student Section ->", error);
    }
};

// Update Student
module.exports.updateStudent = async (req, res) => {
    const schema = Joi.object({
        _id: Joi.string().required(),
        name: Joi.string().required(),
        dob: Joi.string().required(),
        address: Joi.string().required(),
        mobile: Joi.number().required(),
    });

    try {
        const studentInfo = req.body;
        const { error } = schema.validate(studentInfo);
        const {
            _id,
            name,
            dob,
            address,
            mobile,
        } = studentInfo;

        if (error) {
            res.status(200).json({ message: error.message });
        } else {
            const updateStudentData = await Student.findOneAndUpdate({ _id: _id },
                {
                    $set: {
                        name,
                        dob,
                        address,
                        mobile,
                    }
                }
                , { new: true });
            if (updateStudentData) {
                res.status(200).send({ message: "Student Update Success" });
            } else {
                res.status(404).send({ message: "Student Update unSuccess" });
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(" Error in Update student Section ->", error);
    }
};

// get All Students
module.exports.getAllStudents = async (req, res) => {
    try {
        const allStudents = await Student.find({});
        if (allStudents) {
            res.status(200).send({ message: "All students", allStudents });
        } else {
            res.status(200).send({ message: "No any student data" });
        }

    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(" Error in get all student section ->", error);
    }
};

// Get one student data
module.exports.getOneStudentData = async (req, res) => {
    try {
        const studentID = req.params.studentID;
        const StudentData = await Student.find({ _id: studentID });

        if (StudentData.length > 0) {
            res.status(200).send({ message: "One student data", StudentData });
        } else {
            res.status(200).send({ message: "No any student" });
        }

    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(" Error in get one student section ->", error);
    }
};


// Student Login
module.exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const checkStudent = await Student.findOne({ email });
        if (checkStudent) {
            const match = await bcrypt.compare(password, checkStudent.password);
            if (match) {
                const token = jwt.sign(
                    {
                        id: checkStudent._id,
                        email: checkStudent?.email,
                    },
                    `${process.env.SecretKey}`,
                    { expiresIn: "1d" }
                );

                res.status(200).json({ message: "Login Success", checkStudent, token });
            } else {
                res.status(200).json({ message: "Password Is Wrong" });
            }
        } else {
            res.status(200).json({ message: "Email Not Register" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete Student
module.exports.deleteStudent = async (req, res) => {
    try {
        const studentID = req.params.studentID;
        const studentData = await Student.deleteOne({ _id: studentID });
        if (studentData.deletedCount > 0) {
            res.status(200).send({ message: "Student delete success" });
        } else {
            res.status(200).send({ message: "couldn't find any student for this studentID" });
        }

    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(" Error in delete Course Section ->", error);
    }
};





