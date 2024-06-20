const express = require("express");
const database = require("./database/database");
// const Product = require("./models/ProductModels");


const app = express();
const port = 3002;
var cors = require("cors");

app.use(express.json());
app.use(cors());
app.options("*", cors());

const courseRoute = require('./course/courseroute')
const studentRoute = require('./student/student.router')
const enrollRoute = require('./studentCourse/enrollCourse.router')
const staffRoute = require('./staff/staff.router')


app.use("/course", courseRoute);
app.use("/student", studentRoute);
app.use("/enroll", enrollRoute);
app.use("/staff", staffRoute);


app.listen(port, () => {
  console.log(`Node JS app listening on port ${port}`);
  database();
});