import axios from "axios";
import { SERVER_URL } from "../utils/consts";
import { sendUser } from "../utils/userToken";
import { onError, onSuccess } from "../utils/serverResponseHandlers";

const postService = axios.create({
  baseURL: `${SERVER_URL}/posts`,
});
// console.log(postService.baseURL);

export function getPosts() {
  return postService
    .get("/", sendUser())
    .then(onSuccess("getPosts"))
    .catch(onError("getPosts"));
}

export function getSinglePost(postId) {
  // console.log(" 👉 👉 / getSinglePost / postId", postId);
  return postService
    .get(`/${postId}`, sendUser())
    .then(onSuccess("getSinglePost"))
    .catch(onError(postId));
}

export function createPost(formBody) {
  // console.log(`Post created 👇`, formBody);
  return postService
    .post("/", formBody, sendUser())
    .then(onSuccess("create-post"))
    .catch(onError("create-post"));
}

export function updateSinglePost(postId, formBody) {
  // console.log("POSTSERVICE 34", formBody);
  return postService
    .put(`/edit/${postId}`, formBody, sendUser())
    .then(onSuccess("updated-post"))
    .catch(onError("updated-post"));
}

export function deleteSinglePost(id) {
  // const authorization = getUserToken();
  console.log("This post was succesful deleted 👉:", id);
  return postService
    .delete(`/${id}`, sendUser())
    .then(onSuccess("deleted-post"))
    .catch(onError("deleted-post"));
}
