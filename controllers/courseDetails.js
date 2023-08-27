const { courses } = require("../courses/course");

exports.getCourseDetails = (req, res, next) => {
  // console.log(req.params.courseId);
  const courseId = req.params.courseId;

  const course = courses.find((result) => result.id === courseId);
  if (course) {
    res.status(200).json({
      courseDetails: course,
    });
  } else {
    const err = new Error("Course does not exists.");
    err.statusCode = 500;
    next(err);
  }
};
