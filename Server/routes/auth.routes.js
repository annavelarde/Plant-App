/** @format */

const router = require("express").Router();

// Handles password encryption
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const Session = require("../models/Session.model");
const UserModel = require("../models/User.model");

const saltRounds = 10;

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

//Register get
router.get("/signup", (req, res) => {
  // console.log(req.body);
  res.send("signup");
});

//session
router.get("/session", (req, res) => {
  if (!req.headers.authorization) {
    return res.json(null);
  }

  // accessToken is being sent on every request in the headers
  const accessToken = req.headers.authorization;

  Session.findById(accessToken)
    .populate("user")
    .then((session) => {
      if (!session) {
        return res.status(404).json({ errorMessage: "Session does not exist" });
      }
      return res.status(200).json(session);
    });
});

//SignupRegister
router.post("/signup", isLoggedOut, (req, res) => {
  const { username, password, email, country } = req.body;
  // console.log(" 👉 👉 SERVER signup/ router.post / body", req.body);

  if (!username || username.length < 3) {
    return res.status(400).json({
      errorMessage: "Provide a username with more than 3 characters.",
    });
  }

  if (!email) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide a valid email." });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({
      errorMessage: "Your password needs to be at least 6 characters long.",
    });
  }

  UserModel.findOne({ email }).then((foundUser) => {
    // If the user is found, send the message username is taken
    if (foundUser) {
      return res.status(400).json({
        errorMessage: "This email is already taken. Please, go to Login page",
      });
    }

    // if user is not found, create a new user - start with hashing the password
    return bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hashedPassword) => {
        // Create a user and save it in the database
        return UserModel.create({
          username,
          email,
          password: hashedPassword,
          country,
        });
      })
      .then((user) => {
        Session.create({
          user: user._id,
          createdAt: Date.now(),
        }).then((session) => {
          res.status(201).json({ user, accessToken: session._id });
        });
      })
      .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          return res.status(400).json({ errorMessage: error.message });
        }
        if (error.code === 11000) {
          return res.status(400).json({
            errorMessage:
              "Email needs to be unique. The email you chose is already in use.",
          });
        }
        return res.status(500).json({ errorMessage: error.message });
      });
  });
});

//LogIn
router.post("/login", isLoggedOut, (req, res) => {
  const { email, password } = req.body;
  // console.log(" 👉 👉 / router.post / body", req.body);

  if (!email) {
    return res.status(400).json({ errorMessage: "Please provide your email." });
  }
  if (!password || password.length < 6) {
    return res.status(400).json({
      errorMessage: "Your password needs to be at least 8 characters long.",
    });
  }
  UserModel.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ errorMessage: "Wrong credentials." });
      }
      // If user is found based on the username, check if the in putted password matches the one saved in the database
      bcrypt.compare(password, user.password).then((isSamePassword) => {
        if (!isSamePassword) {
          return res.status(400).json({ errorMessage: "Wrong credentials." });
        }
        Session.create({ user: user._id, createdAt: Date.now() }).then(
          (session) => {
            return res.json({ user, accessToken: session._id });
          }
        );
      });
    })
    .catch((err) => {
      next(err);
    });
});

//LogOut
router.delete("/logout", isLoggedIn, (req, res) => {
  Session.findByIdAndDelete(req.headers.authorization)
    .then(() => {
      res.status(200).json({ message: "User was logged out" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: err.message });
    });
});

module.exports = router;
