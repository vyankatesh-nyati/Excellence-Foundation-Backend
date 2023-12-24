const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    collegeName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    batch: {
      type: String,
      required: true,
    },
    reference: {
      type: String,
      required: true,
    },
    dateOfRegister: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
    },
    paymentId: {
      type: String,
    },
    razorpayOrderId: {
      type: String,
    },
    razorpaySignature: {
      type: String,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
