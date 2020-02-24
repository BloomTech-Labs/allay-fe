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
    return axios
        .post("https://allay-be-staging.herokuapp.com/api/auth/login", creds)
        .then(res => {
            localStorage.setItem("token", res.data.token);
            console.log(res)
            dispatch({ type: LOGIN_SUCCESS, payload: res.data })
        })
        .catch(err => {
            dispatch({ type: LOGIN_FAIL, payload: err })
        })
}

export const signup = creds => dispatch => {
    dispatch({ type: SIGNUP_START })
    return axios
        .post("https://allay-be-staging.herokuapp.com/api/auth/register", creds)
        .then(res => {
            // localStorage.setItem("token", res.data.token);
            console.log(res)
            dispatch({ type: SIGNUP_SUCCESS, payload: res.data })
        })
        .catch(err => {
            dispatch({ type: SIGNUP_FAIL, payload: err })
        })
}

