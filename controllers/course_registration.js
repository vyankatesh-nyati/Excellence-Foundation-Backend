const Razorpay = require("razorpay");
const Student = require("../models/student");
const { validationResult } = require("express-validator");
const { CourseData } = require("../courses/course_data");

exports.studentSignup = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Validation failed.");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const {
      name,
      dateOfBirth,
      email,
      mobileNumber,
      collegeName,
      address,
      course,
      batch,
      reference,
    } = req.body;

    const currentDate = new Date();
    const dateOfRegister =
      currentDate.getDate() +
      "/" +
      currentDate.getMonth() +
      "/" +
      currentDate.getFullYear() +
      "(" +
      currentDate.getHours() +
      ":" +
      currentDate.getMinutes() +
      ":" +
      currentDate.getSeconds() +
      ")";

    const student = new Student({
      name,
      address,
      batch,
      collegeName,
      course,
      dateOfBirth,
      dateOfRegister,
      email,
      mobileNumber,
      reference,
      status: "unpaid",
    });

    let amount = -1;
    CourseData.map((e) => {
      if (e.title.toLowerCase() === course.toLowerCase()) {
        // console.log(e.title.toLowerCase);
        // console.log(course.toLowerCase);
        amount = e.registration_fees;
      }
    });

    if (amount === -1) {
      const err = new Error("Course not found!!");
      err.statusCode = 404;
      throw err;
    }

    // console.log(amount);

    const response = await student.save();

    if (!response) {
      throw new Error("Something went wrong. Please try again later !!!");
    }

    const razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    let order;

    await razorpayInstance.orders.create(
      {
        amount: amount,
        currency: "INR",
        receipt: response._id,
      },
      (err, data) => {
        if (err) {
          const error = new Error("Something went wrong. Please try again later !!!");
          error.data = err.error.description;
          error.statusCode = err.statusCode;
          throw error;
        }
        order = data;
      }
    );

    // console.log(order);

    student.orderId = order.id;
    await student.save();
    
    res.status(200).json({
      data: order,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
