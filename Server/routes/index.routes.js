const router = require("express").Router();
const postRoutes = require("./post.routes");
const userRoutes = require("./user.routes");
const authRoutes = require("./auth.routes");

//First Route. End point&callback
//router.get("/", () => {});
router.get("/", (req, res) => {
  res.send("testing first router");
});

router.use("/auth", authRoutes);
router.use("/posts", postRoutes);
router.use("/user", userRoutes);

module.exports = router;
