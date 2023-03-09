const { Schema, model } = require("mongoose");
// const ObjectId = Schema.Type.ObjectId;

const postSchema = new Schema(
  {
    imageUrl: {
      type: String,
      default: String,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User", //comes from the User Model
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

const Post = model("Post", postSchema);

module.exports = Post;
