const express = require("express");

const router = express.Router();

const isAuth = require("../middleware/is-auth");
const courseDetailsController = require("../controllers/courseDetails");

// GET /courses/:courseId
router.get("/:courseId", isAuth, courseDetailsController.getCourseDetails);

module.exports = router;
