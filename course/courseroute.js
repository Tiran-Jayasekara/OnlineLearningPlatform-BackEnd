const express = require("express");
const courseRoute = express.Router();


const { createCourse, UpdateCourse, getAllCourse, getOneCourseData, deleteCourse } = require('./course.controller');
const { verifyAdmin } = require("../middleware/adminVerify");

courseRoute.get("/get-all-courses", getAllCourse);
courseRoute.get("/get-one-course/:courseID", getOneCourseData);
courseRoute.delete("/delete-course/:courseID", verifyAdmin, deleteCourse);
courseRoute.post("/create-course", verifyAdmin, createCourse);
courseRoute.put("/update-course", verifyAdmin, UpdateCourse);


module.exports = courseRoute;