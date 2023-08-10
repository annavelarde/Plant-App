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

// export const REACT_APP_SERVER_URL =
//   process.env.REACT_APP_SERVER_URL || "http://localhost:3000";

// // const BASE_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:3000";
// // import.meta.env.VITE_API_URI ||

// export const SERVER_URL = `${REACT_APP_SERVER_URL}/api`;

// export const SERVER_URL = `${import.meta.env.VITE_REACT_APP_SERVER_URL}/api`;
// export const SERVER_URL =
//   import.meta.env.VITE_APP_SERVER_URL

// const BASE_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:3000";
// export const SERVER_URL = `${BASE_URL}/api`;
const BASE_URL = import.meta.env.VITE_API_URI || "http://localhost:3000/api";
export const SERVER_URL = `${BASE_URL}/api`;
