const express = require("express");

const coursesController = require("../controllers/courses");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// GET /courses
router.get("/courses", isAuth, coursesController.getCourses);

module.exports = router;
