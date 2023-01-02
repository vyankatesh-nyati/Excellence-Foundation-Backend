const User = require("../models/user");

exports.getCourses = async (req, res, next) => {
  const id = req.userId;

  let response;
  try {
    response = await User.findOne({ _id: id });
  } catch (error) {
    const err = new Error(error);
    err.statusCode = 500;
    throw err;
  }

  // console.log(response);

  res.status(200).json({ courses: response.courses });
};
