export const BASE_URL = "http://127.0.0.1:8000/api/";

export const AuthAPI = {
  home:`${BASE_URL}`,
  signup: `${BASE_URL}auth/signup/`,
  signin: `${BASE_URL}auth/login/`,
  logout: `${BASE_URL}auth/logout/`,
  refresh: `${BASE_URL}auth/token/refresh/`,
};