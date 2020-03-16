import axiosWithAuth from "../../utils/axiosWithAuth";
import {
  FETCH_REVIEWS_FAILURE,
  FETCH_REVIEWS_START,
  FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEW_BY_ID_FAILURE,
  FETCH_REVIEW_BY_ID_START,
  FETCH_REVIEW_BY_ID_SUCCESS,
  POST_REVIEW_FAILURE,
  POST_REVIEW_START,
  POST_REVIEW_SUCCESS,
  EDIT_REVIEW_FAILURE,
  EDIT_REVIEW_START,
  EDIT_REVIEW_SUCCESS
} from "../types";

// ============ GET ALL REVIEWS ===========

export const getReview = () => dispatch => {
  dispatch({ type: FETCH_REVIEWS_START });
  axiosWithAuth()
    .get("/reviews")
    .then(res => {
      dispatch({ type: FETCH_REVIEWS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: FETCH_REVIEWS_FAILURE, payload: err.response });
    });
};

// ============ GET REVIEW BY ID ===========

export const getReviewById = id => dispatch => {
  dispatch({ type: FETCH_REVIEW_BY_ID_START });
  return axiosWithAuth()
    .get(`/reviews/${id}`)
    .then(res => {
      dispatch({ type: FETCH_REVIEW_BY_ID_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: FETCH_REVIEW_BY_ID_FAILURE, payload: err.response });
    });
};

// ============ POST REVIEW ===========

export const postReview = (id, newReview) => dispatch => {
  dispatch({ type: POST_REVIEW_START });
  return axiosWithAuth()
    .post(`/users/${id}/reviews`, newReview)
    .then(res => {
      dispatch({ type: POST_REVIEW_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: POST_REVIEW_FAILURE, payload: err.response });
    });
};

// ============ EDIT REVIEW ===========

export const editReview = (id) => dispatch => {
  console.log(id);
  dispatch({ type: EDIT_REVIEW_START });
  return axiosWithAuth()
    .put(`/reviews/${id.id}`, id)
    .then(res => {
      console.log(res);
      dispatch({ type: EDIT_REVIEW_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: EDIT_REVIEW_FAILURE, payload: err.response });
    })
}