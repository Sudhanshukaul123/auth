import axios from "axios";
import { handle_response } from "./utils";
import { AuthAPI } from "./Routes";
// 🔐 Signup Function Blueprint
export const signup = async (formData) =>
  handle_response(() =>
    axios.post(AuthAPI.signup, formData, { withCredentials: true })
  );

// 🔓 Signin Function
export const signin = async (username, password) =>
  handle_response(() =>
    axios.post(
      AuthAPI.signin,
      { username, password },
      { withCredentials: true }
    )
  );

// Logout Funtion
export const logout = async () =>
  handle_response(() =>
    axios.post(AuthAPI.logout, {}, { withCredentials: true })
  );

// Refresh Funtion
export const refresh_token = async () =>
  handle_response(() =>
    axios.post(AuthAPI.refresh, {}, { withCredentials: true })
  );

// Home Funtion
export const home = async () =>
  handle_response(() => axios.get(AuthAPI.home, { withCredentials: true }));
