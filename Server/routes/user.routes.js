const router = require("express").Router();
const upload = require("../middleware/cloudinary");
const User = require("../models/User.model");
const Session = require("../models/Session.model");
const Post = require("../models/Post.model");
const isLoggedIn = require("../middleware/isLoggedIn");

//updating image
router.put(
  "/updateProfileImage",
  isLoggedIn,
  upload.single("profileImage"),
  (req, res) => {
    const { userId } = req.body;
    console.log(" 👉 👉 / body:", req.body);

    User.findByIdAndUpdate(
      userId,
      { profileImage: req.file.path },
      { new: true }
    )
      .then((updatedUser) => {
        res.json({
          success: true,
          profileImage: updatedUser.profileImage,
        });
      })
      .catch((err) => {
        res.json({
          success: false,
          message: "Server error uploading image",
        });
      });
  }
);

//updating profile
router.put("/edit-profile", isLoggedIn, (req, res) => {
  const { username, email, country } = req.body;
  console.log(" 👉 👉 / router.patch / req:", req.body);
  const { _id } = req.user;
  console.log(" 👉 👉 / router.patch / user:", req.user);

  //updating username
  //   if (username === _id.username) {
  //     return res.json({ user: req.user });
  //   }

  //   User.findOne({ username }).then((foundedUser) => {
  //     if (foundedUser) {
  //       return res
  //         .status(400)
  //         .json({ errorMessage: "Username already exit. Insert another one" });
  //     }

  //     User.findByIdAndUpdate(_id, { username }, { new: true }).then(
  //       (updatedUser) => {
  //         console.log(" 👉 👉 / User.findOne / updatedUser:", updatedUser);
  //         res.json({ user: updatedUser });
  //       }
  //     );
  //   });

  //   //updating email
  //   if (email === _id.email) {
  //     return res.json({ user: req.user });
  //   }

  //   User.findOne({ email }).then((foundedUser) => {
  //     if (foundedUser) {
  //       return res
  //         .status(400)
  //         .json({ errorMessage: "Email already exit. Insert another one" });
  //     }

  //     User.findByIdAndUpdate(_id, { email }, { new: true }).then(
  //       (updatedUser) => {
  //         console.log(" 👉 👉 / User.findOne / updatedUser:", updatedUser);
  //         res.json({ user: updatedUser });
  //       }
  //     );
  //   });

  //updating country
  //   if (country === _id.country) {
  //     return res.json({ user: req.user });
  //   }

  //   User.findOne({ password }).then((foundedUser) => {
  //     if (foundedUser) {
  //       return res
  //         .status(400)
  //         .json({ errorMessage: "Country already exit. Insert another one" });
  //     }

  //     User.findByIdAndUpdate(_id, { country }, { new: true }).then(
  //       (updatedUser) => {
  //         console.log(" 👉 👉 / User.findOne / updatedUser:", updatedUser);
  //         res.json({ user: updatedUser });
  //       }
  //     );
});

//delete profile
router.delete("/:userId", isLoggedIn, async (req, res) => {
  const { userId } = req.params;
  console.log(" 👉 👉 / router.delete / userId:", userId);

  //deleting all Posts
  const userPosts = await Post.find({ author: userId });
  const allPosts = userPosts.map((thePost) => thePost._id);
  //   console.log(" 👉 👉 / router.delete / allPosts:", allPosts);
  //   console.log(" 👉 👉 / router.delete / userPosts:", userPosts);

  //deleting Session
  const userSessionId = req.headers.authorization;
  //   console.log(" 👉 👉 / router.delete / userSession:", userSession);

  //deleting User
  const deleteUser = await Session.findById(userSessionId).populate("user");
  //   console.log(" 👉 👉 / router.delete / deleteUser:", deleteUser);

  if (deleteUser.user._id.toString() !== userId) {
    // console.log("We are here--", deleteUser.user._id.toString());
    return res.status(404).json({
      errorMessage: "Server Error deleting post",
    });
  }

  await Promise.all([
    Post.deleteMany({ _id: { $in: allPosts } }),
    User.findByIdAndDelete(userId),
    Session.findByIdAndDelete(req.headers.authorization),
  ]);
  return res.status(200).json({ message: "Deleted " });
});

module.exports = router;
