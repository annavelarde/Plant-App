/** @format */

import axios from "axios";
import {
  SERVER_URL,
  getAccessToken,
  removeAccessToken,
  sendUser,
} from "../utils/consts";
import { onError, onSuccess } from "../utils/serverResponseHandlers";

const userService = axios.create({
  baseURL: `${SERVER_URL}/api/user`,
});

export function updateProfileImage(profileImage) {
  console.log("VALIDATING IMAGEFILE 17 SERVER", profileImage);

  return userService
    .post("/updateProfileImage", profileImage, sendUser())
    .then(onSuccess("update-profile"))
    .catch(onError("update-profile"));
}

//newone
// export function updateProfileImage(imageFile) {
//   // console.log("Updating profile image:", imageFile);

//   // const formData = new FormData();
//   // formData.append("imageFile", imageFile);

//   return userService
//     .patch("/updateProfileImage", imageFile, sendUser())
//     .then((res) => {
//       console.log("Response: updadte-profile-image", res);
//       return res.data; // Return the data from the response
//     })
//     .catch((error) => {
//       console.error("[update-profile] - request failed", error);
//       throw error;
//     });
// }

export function updatingUser(userData) {
  console.log("VALIDATING IF USERDATA IS THERE 45", userData);

  return userService
    .patch("/edit", userData, sendUser())
    .then(onSuccess("updated-account"))
    .catch(onError("updated-account"));
}

//NEWONE
// export function updatingUser(userData) {
//   console.log("Updating user:", userData);

//   return userService
//     .patch("/edit", userData, sendUser())
//     .then((res) => {
//       console.log("Response:", res);
//       return res.data; // Return the data from the response
//     })
//     .catch((error) => {
//       console.error("[updated-account] - request failed", error);
//       throw error;
//     });
// }

export function deleteUser(userId) {
  // console.log("👉 User to delete", { userId });
  return userService
    .delete(`/${userId}`, {
      headers: {
        authorization: getAccessToken(),
      },
    })
    .then((res) => {
      removeAccessToken();
      return onSuccess("deleted-user", res);
    })
    .catch(onError("deleted-user"));
}
