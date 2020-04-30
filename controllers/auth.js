const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const User = require("../models/user");

exports.signUp = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const { email, name, password } = req.body;

  bcrypt
    .hash(password, 12)
    .then((hashedPwd) => {
      User.create({
        _id: uuidv4(),
        email: email,
        name: name,
        password: hashedPwd,
      }).then((result) => {
        res.status(201).json({ message: "User Created", userId: result._id });
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};
