const { courses } = require("../courses/course.js");

exports.getSessionDetails = (req, res, next) => {
  const courseId = req.params.courseId;
  const sessionId = req.params.sessionId;

  const course = courses.find((result) => result.id === courseId);
  if (course) {
    const session = course.structure.find((result) => result.id === sessionId);
    if (session) {
      res.status(200).json({
        sessionDetails: session,
      });
    } else {
      const err = new Error("Session does not exists.");
      err.statusCode = 500;
      next(err);
    }
  } else {
    const err = new Error("Course does not exists.");
    err.statusCode = 500;
    next(err);
  }

  // if (course === "civil") {
  //   const session = courses.c1.find((result) => result.id === sessionId);
  //   if (session) {
  //     res.status(200).json({
  //       sessionDetails: session,
  //     });
  //   }
  // }

  // if (course === "arch") {
  //   const session = courses.c2.find((result) => result.id === sessionId);
  //   if (session) {
  //     res.status(200).json({
  //       sessionDetails: session,
  //     });
  //   }
  // }

  // const err = new Error("Session does not exists.");
  // err.statusCode = 500;
  // next(err);
};
