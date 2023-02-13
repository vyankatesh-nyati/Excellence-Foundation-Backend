const User = require("../models/user");

var monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

exports.getStudentData = async (req, res, next) => {
  let loadedData;
  try {
    const data = await User.find();
    if (data.length < 1) {
      const err = new Error("No data found.");
      err.statusCode = 500;
      throw err;
    }
    loadedData = data.map((result) => {
      return {
        id: result._id.toString(),
        name: result.name + " " + result.lname,
        email: result.email,
        courses: result.courses,
        date:
          new Date(result.createdAt).getDate() +
          " " +
          monthNames[new Date(result.createdAt).getMonth()] +
          " " +
          new Date(result.createdAt).getFullYear(),
      };
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
      next(error);
    }
  }

  res.status(200).json({
    data: loadedData,
  });
};
