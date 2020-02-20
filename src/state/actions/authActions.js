import axiosWithAuth from "axios";
import axios from "axios";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const SIGNUP_START = "SIGNUP_START";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAIL = "SIGNUP_FAIL";

export const login = creds => dispatch => {
    dispatch({ type: LOGIN_START })
    axios
        .post("/api/auth/login", creds)
        .then(res => {
            dispatch({ type: LOGIN_SUCCESS })
        })
        .catch(err => {
            dispatch({ type: LOGIN_FAIL })
        })
}

export const signup = creds => dispatch => {
    dispatch({ type: SIGNUP_START })
    axios
        .post("/api/auth/register", creds)
        .then(res => {
            dispatch({ type: SIGNUP_SUCCESS })
        })
        .catch(err => {
            dispatch({ type: SIGNUP_FAIL })
        })
}

