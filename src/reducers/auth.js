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
} from "../actions/actionType";

const initialState = {
  user: {},
  isProgress: false,
  error: null,
  isLoggedIn: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_BEGIN:
      return {
        ...state,
        isProgress: true,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        isProgress: false,
        error: action.error,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        isLoggedIn: true,
        inProgress: false,
      };
    case AUTHENTICATE_USER:
      return {
        ...state,
        user: action.user,
        isLoggedIn: false,
      };
    case CLEAR_AUTH_STATE:
      return {
        ...state,
        error: null,
      };

    case SIGNUP_BEGIN:
      return {
        ...state,
        inProgress: true,
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.user,
        isLoggedIn: true,
        inProgress: false,
        error: null,
      };

    case SIGNUP_FAILED:
      return {
        ...state,
        inProgress: false,
        error: action.error,
      };
    case LOGOUT: {
      return {
        ...state,
        isLoggedIn: false,
        user: {},
      };
    }
    default:
      return state;
  }
}
