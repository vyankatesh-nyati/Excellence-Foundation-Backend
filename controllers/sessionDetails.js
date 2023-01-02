const courses = require("../courses/course.js");

exports.getSessionDetails = (req, res, next) => {
  const course = req.params.course;
  const sessionId = req.params.sessionId;

  if (course === "civil") {
    const session = courses.c1.find((result) => result.id === sessionId);
    if (session) {
      res.status(200).json({
        sessionDetails: session,
      });
    }
  }

  if (course === "arch") {
    const session = courses.c2.find((result) => result.id === sessionId);
    if (session) {
      res.status(200).json({
        sessionDetails: session,
      });
    }
  }

  const err = new Error("Session does not exists.");
  err.statusCode = 500;
  next(err);
};
