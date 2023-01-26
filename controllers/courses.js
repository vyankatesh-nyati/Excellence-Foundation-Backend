const { validationResult } = require("express-validator");
const Course = require("../models/course");
const User = require("../models/user");
const _ = require("lodash");

exports.createCourse = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error("Validation failed!!!");
    err.statusCode = 422;
    err.data = errors.array();
    next(err);
  }
  const courseName = _.kebabCase(req.body.courseName);
  try {
    const course = new Course({
      courseName: courseName,
      structure: [],
    });
    const result = await course.save();
    res.status(200).json({
      message: "Course created successfully.",
      courseId: result._id,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find();
    if (courses.length < 1) {
      const err = new Error("No courses exists!!! Please create new course...");
      err.statusCode = 404;
      throw err;
    }
    res.status(200).json({
      course: courses,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.updateCourse = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error("Validation Failed!!!");
    err.statusCode = 422;
    err.data = errors.array();
    next(err);
  }
  const courseId = req.params.courseId;
  const courseName = _.kebabCase(req.body.courseName);
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      const err = new Error("Course not found!!!");
      err.statusCode = 404;
      throw err;
    }
    course.courseName = courseName;
    const result = await course.save();
    res.status(200).json({
      message: "course updated successfully.",
      course: result,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.deleteCourse = async (req, res, next) => {
  const courseId = req.params.courseId;
  try {
    const result = await Course.findById(courseId);
    if(!result) {
      const err = new Error("Course not found!!!");
      err.statusCode = 404;
      
    }
  } catch (error) {
    
  }
}

exports.getUserCourses = async (req, res, next) => {
  const id = req.userId;

  let response;
  try {
    response = await User.findOne({ _id: id });
    res.status(200).json({ courses: response.courses });
  } catch (error) {
    const err = new Error(error);
    err.statusCode = 500;
    throw err;
  }

  // console.log(response);
};
