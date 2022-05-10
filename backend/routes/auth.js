const express = require("express");
const { body, validationResult } = require("express-validator");
const { find } = require("../models/User");
const router = express.Router();
const User = require("../models/User");

router.post(
  "/",
  // validating data
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password should be atleast 5 character long"),
  body("email").isEmail().withMessage("Enter a valid Email"),
  body("name")
    .custom((value) => {
      const hasNumber = /\d/;
      if (!hasNumber.test(value)) return Promise.resolve();
    })
    .withMessage("Name should only contain strings "),
  body("name").custom((value) => {
    if (value.trim().length===0) return Promise.reject("Name should not be Empty");
    else if (value.trim().length < 5)
      return Promise.reject("Name should be atleast 5 character long");
    else return Promise.resolve();
  }),
  body("email").custom(async (value) => {
    const res = await User.find({ email: value });
    if (res.length > 0) {
      return Promise.reject("E-mail already exist");
    }
  }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    }).then((user) => res.json(user));
  }
);

module.exports = router;
