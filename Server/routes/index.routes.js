const router = require("express").Router();
const postRouter = require("./post.routes");

//First Route. End point&callback
//router.get("/", () => {});
router.get("/", (req, res) => {
  res.send("testing first router");
});

router.use("/post", postRouter);

module.exports = router;
