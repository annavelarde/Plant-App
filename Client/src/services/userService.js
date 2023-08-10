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

console.log(userService.baseURL);

export function updateProfileImage(formBody) {
  return userService
    .put("/updateProfileImage", formBody, sendUser())
    .then(onSuccess("update-profile"))
    .catch(onError("update-profile"));
}

export function updatingUserName(username) {
  return userService
    .put("/edit-profile", { username }, sendUser())
    .then(onSuccess("updated-account"))
    .catch(onError("updated-account"));
}

export function deleteUser(userId) {
  console.log("👉 User to delete", { userId });
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
