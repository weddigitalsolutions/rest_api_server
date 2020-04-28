const { validationResult } = require("express-validator");

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: "asdfgtr",
        title: "First Post",
        content: "This is the first post",
        imageUrl: "images/duck.jpg",
        creator: {
          name: "Wilsinho",
        },
        createdAt: new Date(),
      },
    ],
  });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({
      message: "Validation Failed, entered data is incorrect.",
      errors: errors.array(),
    });
  }

  const title = req.body.title;
  const content = req.body.content;
  // Create post in the db
  res.status(201).json({
    message: "Post created successfully",
    post: {
      _id: new Date().toISOString(),
      title: title,
      content: content,
      creator: {
        name: "Wilsinho",
      },
      createdAt: new Date(),
    },
  });
};
