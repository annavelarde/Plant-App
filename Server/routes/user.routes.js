/** @format */

const router = require("express").Router();
const upload = require("../middleware/cloudinary");
const bcrypt = require("bcryptjs");

const User = require("../models/User.model");
const Session = require("../models/Session.model");
const Post = require("../models/Post.model");

const isLoggedIn = require("../middleware/isLoggedIn");

//updateUser
router.patch("/edit-profile", isLoggedIn, (req, res) => {
  const { username, password, country, email } = req.body;
  const { _id } = req.user; //identifying user

  if (username === "" || username.length < 3) {
    return res.json({ user: req.user });
  }

  if (country === "" || country.length < 3) {
    return res.json({ country: req.user });
  }

  if (password === "" || password.length < 6) {
    return res.status(400).json({
      errorMessage: "Your password needs to be at least 6 characters long.",
    });
  }

  if (email === _id.email) {
    return res.json({ user: req.user });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  // User.findOne({ username }).then((foundedUser) => {
  //   if (foundedUser) {
  //     return res
  //       .status(400)
  //       .json({ errorMessage: "Username already exit. Insert another one" });
  //   }

  User.findByIdAndUpdate(
    _id,
    { username, password: hashedPassword, email, country },
    { new: true }
  )
    .then((updatedUser) => {
      res.json({ user: updatedUser });
    })
    .catch((error) =>
      res.status(500).json({ errorMessage: "Something went wrong", error })
    );
  // });
});

//updating image
router.put(
  "/updateProfileImage",
  isLoggedIn,
  upload.single("imageFile"),
  (req, res) => {
    const { userId } = req.body;
    console.log(" 👉 👉 / body:", req.body);

    User.findByIdAndUpdate(userId, { imageFile: req.file.path }, { new: true })
      .then((updatedUser) => {
        res.json({
          success: true,
          imageFile: updatedUser.imageFile,
        });
      })
      .catch((err) => {
        res.json({
          success: false,
          message: err.message,
        });
      });
  }
);

//delete profile
router.delete("/:userId", isLoggedIn, async (req, res) => {
  const { userId } = req.params;
  // console.log(" 👉 👉 / router.delete / SERVERuserId:", userId);

  //deleting all Posts
  const userPosts = (await Post.find({ author: userId })).map(
    (post) => post._id
  );
  // console.log(" 👉 👉 / router.delete / userPosts:", userPosts);

  //deleting Session
  const userSessionId = req.headers.authorization;
  //   console.log(" 👉 👉 / router.delete / userSession:", userSession);

  //deleting User
  const deleteUser = await Session.findById(userSessionId).populate("user");
  console.log(" 👉 👉 / router.delete / aqyuuuuuiiiiiiiii:", deleteUser);

  console.log(" 👉 👉 / router.delete / userId:", userId);

  if (deleteUser.user._id.toString() !== userId) {
    console.log("We are here--", deleteUser.user._id.toString());
    return res.status(404).json({
      errorMessage: "you are not allow to perform this action",
    });
  }

  await Promise.all([
    Post.deleteMany({ _id: { $in: userPosts } }),
    User.findByIdAndDelete(userId),
    Session.findByIdAndDelete(userSessionId),
  ]);
  return res.status(200).json({ message: "deletion succesfully" });
});

module.exports = router;
