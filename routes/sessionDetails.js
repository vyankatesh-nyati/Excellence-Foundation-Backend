const express = require("express");
const isAuth = require("../middleware/is-auth");

const sessionDetailsController = require("../controllers/sessionDetails");

const router = express.Router();

// GET /session/:course/:sessionId
router.get(
  "/:course/:sessionId",
  isAuth,
  sessionDetailsController.getSessionDetails
);

module.exports = router;
