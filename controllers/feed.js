const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");

const { Post, User } = require("../util/database");

exports.getPosts = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;
  let totalItems;

  let skip = (currentPage - 1) * perPage;

  const { count, rows } = await Post.findAndCountAll({
    offset: skip,
    limit: perPage,
    include: [
      {
        model: User,
        as: "creator",
      },
    ],
  });

  try {
    totalItems = count;
    res.status(200).json({ posts: rows, totalItems: count });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }

  if (!req.file) {
    const error = new Error("No valid image provided");
    error.statusCode = 422;
    throw error;
  }
  const imageUrl = req.file.path;
  const { title, content } = req.body;
  let creator;

  const post = {
    title: title,
    content: content,
    imageUrl: imageUrl,
    UserId: req.userId,
    creatorId: req.userId,
  };
  Post.create(post)
    .then((result) => {
      Post.findOne({
        include: [
          {
            model: User,
            as: "creator",
            where: {
              _id: result.creatorId,
            },
          },
        ],
      }).then((resultado) => {
        res.status(201).json({
          message: "Post created successfully",
          post: resultado,
        });
      });
      /*
      result.getUser().then((user) => {
        console.log(user);
        res.status(201).json({
          message: "Post created successfully",
          post: post,
          creator: {
            _id: user._id,
            name: user.name,
          },
        });
      });
      */
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findOne({
    include: [
      {
        model: User,
        as: "creator",
      },
    ],
    where: {
      _id: postId,
    },
  })
    .then((post) => {
      if (!post) {
        const error = new Error("Could not find post.");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: "Post fetched.", post: post });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.updatePost = (req, res, next) => {
  const postId = req.params.postId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }
  const { title, content } = req.body;
  let imageUrl = req.body.image;
  if (req.file) {
    imageUrl = req.file.path;
  }
  if (!imageUrl) {
    const error = new Error("No Image provided.");
    error.statusCode = 422;
    throw error;
  }

  Post.findOne({
    where: {
      _id: postId,
    },
  })
    .then((post) => {
      console.log(post);
      if (!post) {
        const error = new Error("Could not find post.");
        error.statusCode = 404;
        throw error;
      }
      if (imageUrl != post.imageUrl) {
        clearImage(post.imageUrl);
      }
      post.title = title;
      post.imageUrl = imageUrl;
      post.content = content;
      return post.save();
    })
    .then((result) => {
      Post.findOne({
        include: [
          {
            model: User,
            as: "creator",
          },
        ],
        where: {
          _id: result._id,
        },
      }).then((postUser) => {
        res
          .status(200)
          .json({ message: "Post Updates Succesfully", post: postUser });
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};

exports.deletePost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findOne({
    where: {
      _id: postId,
    },
  })
    .then((post) => {
      if (!post) {
        const error = new Error("Could not find post.");
        error.statusCode = 404;
        throw error;
      }
      // Check logged in user
      clearImage(post.imageUrl);
      return post.destroy();
    })
    .then((result) => {
      res.status(200).json({ message: "Post delete successfully" });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};
