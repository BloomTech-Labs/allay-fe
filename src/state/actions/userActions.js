import axiosWithAuth from "../../utils/axiosWithAuth";
import {
  FETCH_USER_START,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  BLOCK_USER_FAILURE,
  BLOCK_USER_START,
  BLOCK_USER_SUCCESS,
  EDIT_USER_START,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILURE,
} from "../types";

// ============ GET USER BY ID ===========

export const getUser = (userId) => (dispatch) => {
  dispatch({ type: FETCH_USER_START });
  return axiosWithAuth()
    .get(`/users/${userId}`)
    .then((res) => {
      ///so we can see a spinner in action lol
      setTimeout(function () {
        console.log(res.data);
        dispatch({ type: FETCH_USER_SUCCESS, payload: res.data });
      }, 1000);
    })
    .catch((err) => {
      dispatch({ type: FETCH_USER_FAILURE, payload: err.response });
    });
};

// ============ UPDATE USER ===========

export const updateUser = (userId, userInfo) => (dispatch) => {
  dispatch({ type: EDIT_USER_START });
  return axiosWithAuth()
    .put(`/users/${userId}`, userInfo)
    .then((res) => {
      dispatch({ type: EDIT_USER_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: EDIT_USER_FAILURE, payload: err.response });
    });
};

// ============ BLOCK USER ===========

export const blockUser = (userId) => (dispatch) => {
  dispatch({ type: BLOCK_USER_START });
  return axiosWithAuth()
    .put(`/users/${userId}/bind`)
    .then((res) => {
      dispatch({ type: BLOCK_USER_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: BLOCK_USER_FAILURE, payload: err });
    });
};
