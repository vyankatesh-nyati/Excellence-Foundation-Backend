const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/admin");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  bcrypt
    .hash(password, 12)
    .then((hashedpw) => {
      const admin = new Admin({
        name: name,
        email: email,
        password: hashedpw,
      });
      return admin.save();
    })
    .then((result) => {
      res
        .status(201)
        .json({ message: "Admin created succefully!", userId: result._id });
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
  let loadedAdmin;

  Admin.findOne({ email: email })
    .then((admin) => {
      if (!admin) {
        const err = new Error("Wrong email id.");
        err.statusCode = 401;
        throw err;
      }
      loadedAdmin = admin;
      return bcrypt.compare(password, admin.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const err = new Error("Wrong password.");
        err.statusCode = 401;
        throw err;
      }

      const token = jwt.sign(
        { email: loadedAdmin.email, adminId: loadedAdmin._id.toString() },
        process.env.ADMIN_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        adminId: loadedAdmin._id.toString(),
        message: "Admin login successfully",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
