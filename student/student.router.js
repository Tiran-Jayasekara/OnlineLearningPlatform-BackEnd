const express = require("express");
const studentRoute = express.Router();


const { addStudent, updateStudent, getAllStudents, getOneStudentData, deleteStudent, Login } = require('./student.controller');
const { verifyAuth } = require("../middleware/adminVerify");

studentRoute.get("/get-all-students", getAllStudents);
studentRoute.get("/get-one-student/:studentID", getOneStudentData);
studentRoute.delete("/delete-student/:studentID", verifyAuth, deleteStudent);
studentRoute.post("/add-student", addStudent);
studentRoute.put("/update-student", verifyAuth, updateStudent);
studentRoute.post("/login", Login);


module.exports = studentRoute;