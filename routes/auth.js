const express = require("express");
const { body } = require("express-validator");

const User = require("../models/user");
const authController = require("../controllers/auth");
const db = require("../util/database");

const router = express.Router();

router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return db.User.findOne({
          where: {
            email: value,
          },
        }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Email address already exists.");
          }
        });
      }),
    body("password").trim().isLength({ min: 5 }),
    body("name").trim().not().isEmpty(),
  ],
  authController.signUp
);

router.post("/login", authController.login);

module.exports = router;
