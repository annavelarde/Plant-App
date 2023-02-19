const router = require("express").Router();
const PostModel = require("../models/Post.model");
const isLoggedIn = require("../middleware/isLoggedIn");
const upload = require("../middleware/cloudinary");

// router.get("/", (req, res) => {
//   res.send("post");
// });

//READ POST//
// router.get("/", async (req, res) => {
//   try {
//     const allPosts = await PostModel.find({});
//     res.status(200).json({ posts: allPosts });
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// });

router.get("/", (req, res) => {
  PostModel.find({}).then((allPosts) => {
    res.json({ posts: allPosts });
  });
});

//CREATE POST//
// router.post("/create", isLoggedIn, async (req, res) => {
//   console.log(req.body);
//   try {
//     const createPost = await PostModel.create({
//       title: req.body.title,
//       description: req.body.description,
//       imageUrl: req.body.imageUrl,
//     });
//     res.status(200).json({ post: createPost });
//   } catch (e) {
//     res.status(404).json({ message: error.message });
//   }
// });

router.post("/", isLoggedIn, upload.single("imageUrl"), (req, res) => {
  console.log("CREATING POST---->", req.body);
  console.log("CREATING file---->", req.file);
  PostModel.create({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.file.path,
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
  console.log("PARAAAAMMMMMSSSS", req.params);
  try {
    const { id: postId } = req.params;
    const getSinglePost = await PostModel.findById({ _id: postId });
    res.status(200).json(getSinglePost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// router.get("/:id", (req, res) => {
//   const { id } = req.params;
//   // console.log(req.params);

//   PostModel.findById(id)
//     .populate("owner")
//     .then((post) => {
//       if (!post) {
//         return res
//           .status(404)
//           .json({ errorMessage: `Post with the id ${id} does not exist` });
//       }

//       res.json({ post });
//       console.log(post);
//     });
// });

//UPDATING Single POST//
router.put("/:postId/edit", async (req, res) => {
  try {
    const { postId } = req.params;
    // console.log(" 👉 👉 / router.put / params", params);
    const { title, description, imageUrl } = req.body;
    // console.log(" 👉 👉 / router.put / body", req.body);
    const newPost = { title, description, imageUrl };

    const updatingPost = await PostModel.findByIdAndUpdate(postId, newPost, {
      new: true,
    });
    res.status(200).json(updatingPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

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