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
        "https://github.com/annavelarde/plant-app/blob/dev/Client/public/images/anna%20velarde%20small%20copy.jpg",
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
