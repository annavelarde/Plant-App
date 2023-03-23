export const ACCESS_TOKEN = "access_token";

const APP_NAME = "PlantApp";
export const CAPITALIZED_APP =
  APP_NAME[0].toUpperCase() + APP_NAME.slice(1).toLowerCase();

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN);
}

export function setAccessToken(newValue) {
  return localStorage.setItem(ACCESS_TOKEN, newValue);
}

export function removeAccessToken() {
  return localStorage.removeItem(ACCESS_TOKEN);
}

export function sendUser() {
  return {
    headers: {
      authorization: getAccessToken(),
    },
  };
}

// const NODE_ENV = process.env.NODE_ENV;

const BASE_URL = import.meta.env.VITE_API_URI || "http://localhost:6005";

export const SERVER_URL = `${BASE_URL}/api`;
