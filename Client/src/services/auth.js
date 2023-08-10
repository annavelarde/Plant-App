import axios from "axios";
import * as USER_HELPERS from "../utils/userToken";
import { SERVER_URL } from "../utils/consts.js";

function internalServerError(err) {
  if (err.response && err.response.data && err.response.data.errorMessage) {
    return {
      status: false,
      errorMessage: err.response.data.errorMessage,
    };
  }
  return {
    status: false,
    errorMessage: "Internal server error. Please check your server",
  };
}

function successStatus(res) {
  return {
    status: true,
    data: res.data,
  };
}

const authService = axios.create({
  baseURL: `${SERVER_URL}/auth`,
});
console.log(authService.baseURL);

export function login(credentials) {
  return authService
    .post("/login", credentials)
    .then(successStatus)
    .catch(internalServerError);
}

export function getLoggedIn(acessToken) {
  return authService
    .get("/session", {
      headers: {
        authorization: USER_HELPERS.getUserToken(acessToken),
      },
    })
    .then(successStatus)
    .catch(internalServerError);
}

export function signup(credentials) {
  console.log("-------->", credentials);
  return authService
    .post("/signup", credentials)
    .then(successStatus)
    .catch(internalServerError);
}

export function logout() {
  return authService
    .delete("/logout", {
      headers: {
        authorization: USER_HELPERS.getUserToken(),
      },
    })
    .then(successStatus)
    .catch(internalServerError);
}
