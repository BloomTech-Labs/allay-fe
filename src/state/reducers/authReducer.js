import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL
} from "../types";

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  isSignedUp: false,
  isBlocked: false,
  isAdmin: false,
  error: null,
  status: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        isLoggedIn: false,
        isLoading: true,
        status: null
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        error: null,
        status: action.status,
        isBlocked: action.payload.blocked,
        isAdmin: action.payload.admin
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: action.payload,
        status: action.status
      };
    case SIGNUP_START:
      return {
        ...state,
        isSignedUp: false,
        isLoading: true
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isSignedUp: true,
        isLoading: false
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        isLoading: false,
        isSignedUp: false,
        error: action.payload
      };
    default:
      return state;
  }
};
export default authReducer;
