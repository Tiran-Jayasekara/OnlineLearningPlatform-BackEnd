const express = require("express");
const staffRoute = express.Router();


const { Login , addStaff } = require('./staff.controller');

staffRoute.post("/add-staff", addStaff);
staffRoute.post("/login", Login);


module.exports = staffRoute;