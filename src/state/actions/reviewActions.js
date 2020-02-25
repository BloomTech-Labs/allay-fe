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
  POST_REVIEW_SUCCESS
} from "../types";

// ============ GET ALL REVIEW ===========

export const getReview = () => dispatch => {
  dispatch({ type: FETCH_REVIEWS_START });
  axiosWithAuth()
    .get("/reviews")
    .then(res => {
      // console.log("reviewActions", res.data);
      dispatch({ type: FETCH_REVIEWS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: FETCH_REVIEWS_FAILURE, payload: err.response });
    });
};
// ============ GET REVIEW BY ID ===========

export const getReviewById = id => dispatch => {
  dispatch({ type: FETCH_REVIEW_BY_ID_START });
  axiosWithAuth()
    .get(`/reviews/${id}`)
    .then(res => {
      console.log("getReview By ID", res);
      dispatch({ type: FETCH_REVIEW_BY_ID_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: FETCH_REVIEW_BY_ID_FAILURE, payload: err.response });
    });
};
// ============ POST REVIEW ===========

export const postReview = newReview => dispatch => {
  dispatch({ type: POST_REVIEW_START });
  axiosWithAuth()
    .post("/reviews", newReview)
    .then(res => {
      console.log("action passes", res);
      dispatch({ type: POST_REVIEW_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log("action fails", err);
      dispatch({ type: POST_REVIEW_FAILURE, payload: err.response });
    });
};
