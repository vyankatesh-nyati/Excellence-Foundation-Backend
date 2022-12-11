const express = require("express");
const { body } = require("express-validator");

const User = require("../models/user");

const authController = require("../controllers/auth");

const router = express.Router();

// GET /auth/signup
router.post(
  "/signup",
  [
    body("name").trim().not().isEmpty().withMessage("Please enter valid name."),
    body("lname")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Please enter valid last name."),
    body("email")
      .isEmail()
      .withMessage("Please enter valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Email already exists.");
          }
        });
      }),
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Please enter valid password (password size > 5)."),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Password and confirm password are not matching.");
        }
        return true;
      }),
  ],
  authController.signup
);

// GET /auth/login
router.post("/login", authController.login);

module.exports = router;
