const coursesList = [
  {
    id: "c1",
    title: "civil course",
    desc: "this is a Excellence foundation civil course",
    lessons: 9,
    rating: 5,
    img: "https://www.excellence-foundation.com/wp-content/uploads/2022/01/Logo4.png",
  },
  {
    id: "c2",
    title: "Architecture course",
    desc: "this is a Excellence foundation architechuture course",
    lessons: 9,
    rating: 5,
    img: "https://www.excellence-foundation.com/wp-content/uploads/2022/01/Logo4.png",
  },
];

exports.getCourses = (req, res, next) => {
  try {
    res.status(200).json({
      courses: coursesList,
    });
  } catch (error) {
    const err = new Error(error);
    err.statusCode = 500;
    throw err;
  }
};
