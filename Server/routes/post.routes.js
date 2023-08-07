const router = require("express").Router();
const PostModel = require("../models/Post.model");
const isLoggedIn = require("../middleware/isLoggedIn");
const upload = require("../middleware/cloudinary");

router.get("/", (req, res) => {
  PostModel.find({}).then((allPosts) => {
    res.json({ posts: allPosts });
  });
});

router.post("/", isLoggedIn, upload.single("imageUrl"), (req, res) => {
  // console.log("CREATING POST---->", req.body);
  // console.log("CREATING file---->", req.file);
  PostModel.create({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.file.path,
    author: req.user._id,
  })
    .then((createPost) => {
      // console.log(createPost);
      res.json({ posts: createPost });
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json({ errorMessage: "error creating post" });
    });
});

// READ/FIND ID POST//
router.get("/:id", isLoggedIn, async (req, res) => {
  // res.send("singlepost");
  // console.log("PARAAAAMMMMMSSSS", req.params);
  try {
    const { id: postId } = req.params;
    const getSinglePost = await PostModel.findById({ _id: postId });
    res.status(200).json(getSinglePost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//UPDATING Single POST//
router.put(
  "/edit/:postId",
  isLoggedIn,
  upload.single("formPicture"),
  async (req, res) => {
    try {
      const { postId } = req.params;
      console.log("REQ.PARAMS OBJECT --->81", req.params);
      const { title, description } = req.body;
      console.log(" 👉 👉 / router.put / body", req.body);
      // Ccreating and appending the image into the newPost
      const newPost = { title, description };
      if (req.file) {
        newPost.imageUrl = req.file.path;
      }
      // console.log("LOOOOOKKKKKKK", newPost);
      const updatingPost = await PostModel.findOneAndUpdate(
        { _id: postId },
        newPost,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!updatingPost) {
        return res.status(404).json({ message: "Post edit Unsuccessful" });
      }
      res.status(200).json(updatingPost);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
);

//DELETE Single POST//
router.delete("/:id", async (req, res) => {
  try {
    const { id: postId } = req.params;
    const deletePost = await PostModel.deleteOne({ _id: postId });
    res.status(200).json(deletePost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;

// router=opera
// routes=rutas
// route=1ruta
