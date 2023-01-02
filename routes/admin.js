const express = require("express");
const { body } = require("express-validator");

const Admin = require("../models/admin");

const isAdmin = require("../middleware/is-admin");

const adminController = require("../controllers/admin");

const router = express.Router();

// POST /admin/signup
router.post(
  "/signup",
  [
    body("name").trim().not().isEmpty().withMessage("Enter valid name"),
    body("email")
      .isEmail()
      .withMessage("Enter valid email")
      .custom((value, { req }) => {
        return Admin.findOne({ email: value }).then((result) => {
          if (result) {
            return Promise.reject("Email id already exist");
          }
        });
      }),
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Enter valid password"),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (req.body.password !== value) {
          throw new Error("Password and confirm password are not matching");
        }
        return true;
      }),
  ],
  isAdmin,
  adminController.signup
);

// test
// POST admin/login
router.post("/login", adminController.login);

module.exports = router;
