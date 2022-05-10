const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "PakistanZindabad";

// checking for post request on endpoint /api/auth/createuser, to create user after validating recieved data - no login required
router.post(
  "/createuser",
  // validating recieved data
  // password must be 5 character long
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password should be atleast 5 character long"),
  body("email").isEmail().withMessage("Enter a valid Email"),

  // custom validator to check if name contains a number or not
  body("name")
    .custom((value) => {
      const hasNumber = /\d/;
      if (!hasNumber.test(value)) return Promise.resolve();
    })
    .withMessage("Name should only contain strings "),

  // custom validator to check if name is empty or less then 5 character
  body("name").custom((value) => {
    if (value.trim().length === 0)
      return Promise.reject("Name should not be Empty");
    else if (value.trim().length < 5)
      return Promise.reject("Name should be atleast 5 character long");
    else return Promise.resolve();
  }),

  // custom validator to check if a user with the same email already exist or not
  body("email").custom(async (value) => {
    const res = await User.find({ email: value });
    if (res.length > 0) {
      return Promise.reject("E-mail already exist");
    }
  }),

  async (req, res) => {
    // check for errors, if presenet then send as json
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = bcrypt.genSaltSync(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);
    // To catch runtime errors
    try {
      let user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(user.id, JWT_SECRET);
      res.json({ authtoken });
    } catch (error) {
      // if something went wrong so seting status code and sending error messages as json resoponse
      res.status(500);
      res.json({
        error: "Somthing went wrong",
        msg: error.message, // contain error message
      });
    }
  }
);

router.post(
  "/login",
  // custom validator to check if name is empty or less then 5 character
  // check that password is empty or not
  body("password").custom((value) => {
    if (value.trim().length === 0)
      return Promise.reject("password should not be Empty");
    else return Promise.resolve();
  }),
  // check that email is empty or not
  body("email").custom((value) => {
    if (value.trim().length === 0)
      return Promise.reject("email should not be Empty");
    else return Promise.resolve();
  }),
  // check whether its valid email or not
  body("email").isEmail().withMessage("Enter a valid Email"),

  async (req, res) => {
    // check for errors, if presenet then send as json
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // destructuring email, password from request
      const { email, password } = req.body;

      // check for user in db
      const user = await User.findOne({ email });

      // if no user found then set bad status and return error
      if (!user) {
        return res
          .status(400)
          .json({ error: "Try again with correct credentials" });
      }

      // compare the hash of the user password with hash stored at db with this email
      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        return res
          .status(400)
          .json({ error: "Try again with correct credentials" });
      }
      // creating a data object with another user object which has field id set to his id
      const data = {
        user: {
          id: user.id,
        },
      };

      // signing data with secret
      const authtoken = jwt.sign(data, JWT_SECRET);

      // sending token to user
      res.json({ authtoken });
    } catch (error) {
      // if something went wrong so seting status code and sending error messages as json resoponse
      res.status(500);
      res.json({
        error: "Somthing went wrong",
        msg: error.message, // contain error messages
      });
    }
  }
);

module.exports = router;
