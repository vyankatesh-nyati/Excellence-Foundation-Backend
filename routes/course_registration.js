const express = require("express");
const { body } = require("express-validator");
// const student = require("../models/student");

const isAdmin = require("../middleware/is-admin");
const courseRegistration = require("../controllers/course_registration");

const router = express.Router();

// /course-registration/student
router.post(
  "/student",
  [
    body("name").trim().not().isEmpty().withMessage("Enter valid name."),
    body("dateOfBirth")
      .trim()
      .isDate()
      .withMessage("Enter valid birth date."),
    body("email").isEmail().withMessage("Enter valid email id"),
    body("mobileNumber")
      .trim()
      .not()
      .isEmpty()
      .isLength({ min: 9 })
      .custom((value, { req }) => {
        if (value < 6000000000 || value > 9999999999) {
          throw new Error("Enter valid mobile number");
        }
        return true;
      }),
    body("collegeName")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Enter valid college name."),
    body("address").trim().not().isEmpty().withMessage("Enter valid address"),
    body("course").trim().not().isEmpty().withMessage("Select valid course"),
    body("batch")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Select valid batch for the course"),
    body("reference")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Select valid reference"),
  ],
  courseRegistration.studentSignup
);

// /course-registration/student/:studentId
router.delete("/student/:studentId", isAdmin);

// to get all student details
// /course-registration/students
router.get("/students", isAdmin);

// to get student details
// /course-registration/student/:studentId
router.get("/student/:studentId", isAdmin);

module.exports = router;
