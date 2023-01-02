const express = require("express");


const isAuth = require("../middleware/is-auth");
const courseDetailsController = require("../controllers/courseDetails");

const router = express.Router();

// GET /course/:courseId
router.get("/:courseId", isAuth, courseDetailsController.getCourseDetails);

module.exports = router;
