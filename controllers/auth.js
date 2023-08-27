const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const name = req.body.name;
  const lname = req.body.lname;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const courses = req.body.courses;

  bcrypt
    .hash(password, 12)
    .then((hashedpw) => {
      const user = new User({
        name: name,
        lname: lname,
        email: email,
        password: hashedpw,
        courses: courses,
      });
      return user.save();
    })
    .then((result) => {
      res
        .status(201)
        .json({ message: "User created succefully!", userId: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const err = new Error("Wrong email id.");
        err.statusCode = 401;
        throw err;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const err = new Error("Wrong password.");
        err.statusCode = 401;
        throw err;
      }

      const token = jwt.sign(
        { email: loadedUser.email, userId: loadedUser._id.toString() },
        process.env.USER_SECRET
        // { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        userId: loadedUser._id.toString(),
        data: loadedUser,
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.delete = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const foundUser = await User.findById(userId);
    if (!foundUser) {
      const err = new Error("No student Exists!!");
      err.statusCode = 404;
      throw err;
    }
    const removedUser = await User.findByIdAndRemove(userId);
    res
      .status(200)
      .json({ message: "Student deleted Successfully...", data: removedUser });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.update = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("Validation failed!!!");
    err.statusCode = 422;
    err.data = errors.array();
    next(err);
  }

  const userId = req.params.userId;

  const name = req.body.name;
  const lname = req.body.lname;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const courses = req.body.courses;

  try {
    const userFound = await User.findById(userId);
    if (!userFound) {
      const error = new Error("User not found!!!");
      error.statusCode = 404;
      throw error;
    }
    userFound.name = name;
    userFound.lname = lname;
    userFound.email = email;
    userFound.courses = courses;

    const hashPw = await bcrypt.hash(password, 12);
    userFound.password = hashPw;
    const result = await userFound.save();
    res.status(200).json({
      message: "Student data updated successfully...",
      result: result,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getDetails = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const result = await User.findById(userId);
    if (!result) {
      const err = new Error("No user found!!!");
      err.statusCode = 500;
      throw err;
    }
    res.status(200).json({
      data: {
        id: result._id,
        name: result.name,
        lname: result.lname,
        email: result.email,
        courses: result.courses,
      },
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
