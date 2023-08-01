import axios from "axios";
import * as USER_HELPERS from "../utils/userToken";
import { SERVER_URL } from "../utils/consts";

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
  baseURL: `${SERVER_URL}/api/auth`,
});

export function login(credentials) {
  return authService
    .post("/login", credentials)
    .then(successStatus)
    .catch(internalServerError);
}

export function getLoggedIn() {
  return authService
    .get(`session`, {
      headers: {
        Authorization: USER_HELPERS.getUserToken(),
      },
    })
    .then(successStatus)
    .catch(internalServerError);
}

export function signup(credentials) {
  return authService
    .post("/signup", credentials)
    .then(successStatus)
    .catch(internalServerError);
}

export function logout() {
  return authService
    .delete("/logout", {
      headers: {
        Authorization: USER_HELPERS.getUserToken(),
      },
    })
    .then(successStatus)
    .catch(internalServerError);
}
