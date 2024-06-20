const express = require("express");
const enrollRoute = express.Router();


const { enrollCourse, removeEnrollment, getAllEnrolledCourse } = require('./enrollCourse.controller');
const { verifyAuth } = require("../middleware/adminVerify");


enrollRoute.get("/get-enrolled-courses/:studentId", getAllEnrolledCourse);
enrollRoute.delete("/remove-enrollment/:studentID/:courseID", verifyAuth, removeEnrollment);
enrollRoute.post("/enroll-course", verifyAuth, enrollCourse);

module.exports = enrollRoute;