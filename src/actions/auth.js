import {
  SIGNUP_BEGIN,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  AUTHENTICATE_USER,
  CLEAR_AUTH_STATE,
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
} from "./actionType";

import { auth } from "../firebase.js";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

//authentication action

export const startLogin = () => {
  return {
    type: LOGIN_BEGIN,
  };
};

export const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
};

export const loginFailed = (error) => {
  return {
    type: LOGIN_FAILED,
    error: error,
  };
};

export const authenticateUser = (user) => {
  return {
    type: AUTHENTICATE_USER,
    user,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const signupBegin = () => {
  return {
    type: SIGNUP_BEGIN,
  };
};
export const signupSuccess = (user) => {
  return {
    type: SIGNUP_SUCCESS,
    user,
  };
};

export const signupFailed = (error) => {
  return {
    type: SIGNUP_FAILED,
    error: error,
  };
};

export function login(email, password) {
  return async (dispatch) => {
    dispatch(startLogin());
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);

      dispatch(loginSuccess(response));
    } catch (error) {
      console.log("login error", error);
      dispatch(loginFailed(error.message));
    }
  };
}

export function signup(username, email, confirmPassword, password) {
  return async (dispatch) => {
    dispatch(signupBegin());
    try {
      const data = await createUserWithEmailAndPassword(auth, email, password);

      dispatch(signupSuccess(data));
    } catch (error) {
      dispatch(signupFailed(error.message));
      console.log("signup error", error.message);
    }
  };
}

export const clearAuthState = () => {
  return {
    type: CLEAR_AUTH_STATE,
  };
};
