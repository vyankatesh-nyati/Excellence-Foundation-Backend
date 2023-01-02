const { c1, c2 } = require("../courses/course");

exports.getCourseDetails = (req, res, next) => {
  // console.log(req.params.courseId);
  let course;

  if (req.params.courseId.toString() === "civil") {
    course = c1;
  } else if (req.params.courseId == "arch") {
    course = c2;
  } else {
    course = "none";
  }

  if (course === "none") {
    const err = new Error("No course found!");
    err.statusCode = 500;
    next(err);
  }

  res.status(200).json({
    courseDetails: course,
  });
};
