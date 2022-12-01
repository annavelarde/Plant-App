const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    default: String,
  },
  title: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  timestamps: true,
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
