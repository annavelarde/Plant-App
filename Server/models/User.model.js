const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      // unique: true -> Ideally, should be unique, but its up to you
    },
    email: {
      type: String,
      // unique: true,
    },
    country: {
      type: String,
      // unique: true,
    },
    password: String,
    profileImage: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngall.com%2Fprofile-png&psig=AOvVaw1hvUH5teCgvn14z5HikcBt&ust=1678233195484000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCMiiroTAyP0CFQAAAAAdAAAAABAE",
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
