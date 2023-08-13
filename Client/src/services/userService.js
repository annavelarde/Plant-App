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
  baseURL: `${SERVER_URL}/user`,
});

// console.log(userService.baseURL);

export function updateProfileImage(imageFile) {
  return userService
    .put("/updateProfileImage", imageFile, sendUser())
    .then(onSuccess("update-profile"))
    .catch(onError("update-profile"));
}

export function updatingUser(userFromData) {
  return userService
    .put("/edit-profile", userFromData, sendUser())
    .then(onSuccess("updated-account"))
    .catch(onError("updated-account"));
}

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
