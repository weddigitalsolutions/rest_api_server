require("dotenv").config();
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

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
    .hash(password, 10)
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

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  let loadedUser;

  User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        const error = new Error("A user with this email could not be found.");
        error.statusCode = 401;
        throw error;
      }

      loadedUser = user;
      console.log(user.password);
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      console.log(isEqual);
      if (!isEqual) {
        const error = new Error("Invalid password.");
        error.statusCode = 401;
        throw error;
      }

      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id,
        },
        process.env.TOKEN_KEY,
        { expiresIn: "1h" }
      );

      res.status(200).json({ token: token, userId: loadedUser._id });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};
