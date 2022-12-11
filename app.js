const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const courseRoutes = require("./routes/courses");
const courseDetailsRoutes = require("./routes/courseDetails");
const authRoutes = require("./routes/auth");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/", courseRoutes);
app.use("/course", courseDetailsRoutes);
app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect("mongodb://localhost:27017/excellence-foundation")
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => {
    const error = new Error("Problem with mongodb database connection");
    error.statusCode = 500;
    next(error);
  });
