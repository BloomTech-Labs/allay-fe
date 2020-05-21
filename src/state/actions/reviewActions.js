import axiosWithAuth from '../../utils/axiosWithAuth'
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
  EDIT_REVIEW_SUCCESS,
  DELETE_REVIEW_START,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAILURE,
} from '../types'

// ============ GET ALL REVIEWS ===========

export const getReview = () => (dispatch) => {
  dispatch({ type: FETCH_REVIEWS_START })
  axiosWithAuth()
    .get('/reviews')
    .then((res) => {
      dispatch({ type: FETCH_REVIEWS_SUCCESS, payload: res.data })
    })
    .catch((err) => {
      dispatch({ type: FETCH_REVIEWS_FAILURE, payload: err.response })
    })
}

// ============ GET REVIEW BY ID ===========

export const getReviewById = (reviewId) => (dispatch) => {
  dispatch({ type: FETCH_REVIEW_BY_ID_START })
  return axiosWithAuth()
    .get(`/reviews/${reviewId}`)
    .then((res) => {
      dispatch({ type: FETCH_REVIEW_BY_ID_SUCCESS, payload: res.data })
    })
    .catch((err) => {
      dispatch({ type: FETCH_REVIEW_BY_ID_FAILURE, payload: err.response })
    })
}

// ============ POST REVIEW ===========

export const postReview = (userId, newReview) => (dispatch) => {
  dispatch({ type: POST_REVIEW_START })
  return axiosWithAuth()
    .post(`/users/${userId}/add-review`, newReview)
    .then((res) => {
      dispatch({ type: POST_REVIEW_SUCCESS, payload: res.data })
    })
    .catch((err) => {
      dispatch({ type: POST_REVIEW_FAILURE, payload: err.response })
    })
}

// ============ EDIT REVIEW ===========

export const editReview = (userId, reviewId, changes) => (dispatch) => {
  dispatch({ type: EDIT_REVIEW_START })
  return axiosWithAuth()
    .put(`/users/${userId}/reviews/${reviewId}`, changes)
    .then((res) => {
      console.log('updated review', res)
      dispatch({ type: EDIT_REVIEW_SUCCESS, payload: res.data })
    })
    .catch((err) => {
      dispatch({ type: EDIT_REVIEW_FAILURE, payload: err.response })
    })
}

// ============ DELETE REVIEW ===========

export const deleteReview = (userId, reviewId) => (dispatch) => {
  dispatch({ type: DELETE_REVIEW_START })
  return axiosWithAuth()
    .delete(`/users/${userId}/reviews/${reviewId}`)
    .then((res) => {
      dispatch({ type: DELETE_REVIEW_SUCCESS, payload: res.data })
    })
    .catch((err) => {
      dispatch({ type: DELETE_REVIEW_FAILURE, payload: err })
    })
}
