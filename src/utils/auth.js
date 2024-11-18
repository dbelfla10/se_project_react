import { baseUrl } from "./api";
import { checkResponse } from "./api";

export const register = ({ email, password, name, avatar }) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name, avatar }),
  }).then(checkResponse);
};

export const login = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (!res.ok) {
        if (res.status === 401) {
          return Promise.reject("Incorrect email or password");
        }
      }
      return checkResponse(res);
    })
    .catch((error) => console.error("Login error:, error"));
};
