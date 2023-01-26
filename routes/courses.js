const express = require("express");
const { body } = require("express-validator");
const _ = require("lodash");

const coursesController = require("../controllers/courses");
const isAdmin = require("../middleware/is-admin");
const isAuth = require("../middleware/is-auth");
const Course = require("../models/course");

const router = express.Router();

// CREATE COURSE /create-course
router.post(
  "/create-course",
  isAdmin,
  [
    body("courseName")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Enter valid course name!!!")
      .custom((value, { req }) => {
        return Course.findOne({ courseName: value }).then((result) => {
          if (result) {
            Promise.reject("Course already exists!!!");
          }
        });
      }),
  ],
  coursesController.createCourse
);

// GET COURSES /get-courses
router.get("/get-courses", isAdmin, coursesController.getCourses);

// update course /:courseId
router.post(
  "/:courseId",
  isAdmin,
  [
    body("courseName")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Enter valid course name!!!")
      .custom((value, { req }) => {
        return Course.findOne({ courseName: _.kebabCase(value) }).then(
          (result) => {
            if (result && result._id != req.params.courseId) {
              Promise.reject("Course already exists!!!");
            }
          }
        );
      }),
  ],
  coursesController.updateCourse
);

// DELETE COURSE /:courseId
router.delete("/:courseId");

// GET /courses specific user
router.get("/courses", isAuth, coursesController.getUserCourses);

module.exports = router;
