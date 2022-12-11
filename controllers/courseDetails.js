const c1 = [
  {
    id: "s1",
    session: 1,
    title: "MS Excel Training",
    video: "https://vimeo.com/736617143",
    pdf: "https://dummy_url/736617143",
  },
  {
    id: "s2",
    session: 1,
    title: "MS Excel Training",
    video: "https://vimeo.com/736617143",
    pdf: "https://dummy_url/736617143",
  },
  {
    id: "s3",
    session: 1,
    title: "MS Excel Training",
    video: "https://vimeo.com/736617143",
    pdf: "https://dummy_url/736617143",
  },
  {
    id: "s4",
    session: 1,
    title: "MS Excel Training",
    video: "https://vimeo.com/736617143",
    pdf: "https://dummy_url/736617143",
  },
  {
    id: "s5",
    session: 1,
    title: "MS Excel Training",
    video: "https://vimeo.com/736617143",
    pdf: "https://dummy_url/736617143",
  },
  {
    id: "s6",
    session: 1,
    title: "MS Excel Training",
    video: "https://vimeo.com/736617143",
    pdf: "https://dummy_url/736617143",
  },
];

const c2 = [
  {
    id: "s1",
    session: 1,
    title: "Bar Bending Scheduling",
    video: "https://vimeo.com/736617143",
    pdf: "https://dummy_url/736617143",
  },
  {
    id: "s2",
    session: 1,
    title: "Bar Bending Scheduling",
    video: "https://vimeo.com/736617143",
    pdf: "https://dummy_url/736617143",
  },
  {
    id: "s3",
    session: 1,
    title: "MS Excel Training",
    video: "https://vimeo.com/736617143",
    pdf: "https://dummy_url/736617143",
  },
  {
    id: "s4",
    session: 1,
    title: "MS Excel Training",
    video: "https://vimeo.com/736617143",
    pdf: "https://dummy_url/736617143",
  },
  {
    id: "s5",
    session: 1,
    title: "MS Excel Training",
    video: "https://vimeo.com/736617143",
    pdf: "https://dummy_url/736617143",
  },
  {
    id: "s6",
    session: 1,
    title: "MS Excel Training",
    video: "https://vimeo.com/736617143",
    pdf: "https://dummy_url/736617143",
  },
];

exports.getCourseDetails = (req, res, next) => {
  try {
    if (req.params.courseId === "c1") {
      res.status(200).json({
        courseDetails: c1,
      });
    } else {
      res.status(200).json({
        courseDetails: c2,
      });
    }
  } catch (error) {
    const err = new Error(error);
    err.statusCode = 500;
    throw err;
  }
};
