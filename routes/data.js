const express = require("express");

const isAdmin = require("../middleware/is-admin");
const dataController = require("../controllers/data");

const router = express.Router();

// GET / data / student;
router.get("/student", isAdmin, dataController.getStudentData);

module.exports = router;