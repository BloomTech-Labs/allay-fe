import axiosWithAuth from '../../utils/axiosWithAuth';
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
  FETCH_COMPANY_REVIEWS_FAILURE,
  FETCH_COMPANY_REVIEWS_START,
  FETCH_COMPANY_REVIEWS_SUCCESS,
  FETCH_COMPANY_REVIEW_BY_ID_FAILURE,
  FETCH_COMPANY_REVIEW_BY_ID_START,
  FETCH_COMPANY_REVIEW_BY_ID_SUCCESS,
  POST_COMPANY_REVIEW_START,
  POST_COMPANY_REVIEW_SUCCESS,
  POST_COMPANY_REVIEW_FAILURE,
} from '../types';

// =======================================================================================
// ============================== INTERVIEW REVIEWS ========================================
// =======================================================================================

// ============ GET ALL REVIEWS ===========

export const getReview = () => dispatch => {
  dispatch({ type: FETCH_REVIEWS_START });
  axiosWithAuth()
    .get('/interview-reviews')
    .then(res => {
      dispatch({ type: FETCH_REVIEWS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: FETCH_REVIEWS_FAILURE, payload: err.response });
    });
};

// ============ GET REVIEW BY ID ===========

export const getReviewById = (interviewId) => dispatch => {
  dispatch({ type: FETCH_REVIEW_BY_ID_START });
  return axiosWithAuth()
    .get(`/interview-reviews/${interviewId}`)
    .then(res => {
      dispatch({ type: FETCH_REVIEW_BY_ID_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: FETCH_REVIEW_BY_ID_FAILURE, payload: err.response });
    });
};

// ============ POST REVIEW ===========

export const postReview = (userId, newReview) => dispatch => {
  dispatch({ type: POST_REVIEW_START });
  return axiosWithAuth()
    .post(`/users/${userId}/add-interview-review`, newReview)
    .then(res => {
      dispatch({ type: POST_REVIEW_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: POST_REVIEW_FAILURE, payload: err.response });
    });
};

// ============ EDIT REVIEW ===========

export const editReview = (userId, interviewId, changes) => dispatch => {
  dispatch({ type: EDIT_REVIEW_START });
  return axiosWithAuth()
    .put(`/users/${userId}/interview-reviews/${interviewId}`, changes)
    .then(res => {
      dispatch({ type: EDIT_REVIEW_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: EDIT_REVIEW_FAILURE, payload: err.response });
    });
};

// ============ DELETE REVIEW ===========

export const deleteReview = (userId, interviewId) => dispatch => {
  dispatch({ type: DELETE_REVIEW_START });
  return axiosWithAuth()
    .delete(`/users/${userId}/interview-reviews/${interviewId}`)
    .then(res => {
      dispatch({ type: DELETE_REVIEW_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: DELETE_REVIEW_FAILURE, payload: err });
    });
};

// =======================================================================================
// ============================== COMPANY REVIEWS ========================================
// =======================================================================================

// ============ GET ALL COMPANY REVIEWS ===========

export const getCompanyReview = () => dispatch => {
  dispatch({ type: FETCH_COMPANY_REVIEWS_START });
  axiosWithAuth()
    .get('/company-reviews')
    .then(res => {
      dispatch({ type: FETCH_COMPANY_REVIEWS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: FETCH_COMPANY_REVIEWS_FAILURE, payload: err.response });
    });
};

// ============ GET COMPANY REVIEW BY ID ===========

export const getCompanyReviewById = companyId => dispatch => {
  dispatch({ type: FETCH_COMPANY_REVIEW_BY_ID_START });
  return axiosWithAuth()
    .get(`/company-reviews/${companyId}`)
    .then(res => {
      dispatch({ type: FETCH_COMPANY_REVIEW_BY_ID_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: FETCH_COMPANY_REVIEW_BY_ID_FAILURE, payload: err.response });
    });
};

// =========== POST COMPANY REVIEW ===============

export const postCompanyReview = (id, companyReview) => dispatch => {
  dispatch({ type: POST_COMPANY_REVIEW_START });
  return axiosWithAuth()
    .post(`/users/${id}/add-company-review`, companyReview)
    .then(res => {
      dispatch({ type: POST_COMPANY_REVIEW_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: POST_COMPANY_REVIEW_FAILURE, payload: err.response });
    });
};

// ============ EDIT REVIEW ===========

export const editCompanyReview = (userId, companyReviewId, changes) => dispatch => {
  dispatch({ type: EDIT_REVIEW_START });
  return axiosWithAuth()
    .put(`/users/${userId}/company-reviews/${companyReviewId}`, changes)
    .then(res => {
      dispatch({ type: EDIT_REVIEW_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: EDIT_REVIEW_FAILURE, payload: err.response });
    });
};

// ============ DELETE REVIEW ===========

export const deleteCompanyReview = (userId, companyReviewId) => dispatch => {
  dispatch({ type: DELETE_REVIEW_START });
  return axiosWithAuth()
    .delete(`/users/${userId}/company-reviews/${companyReviewId}`)
    .then(res => {
      dispatch({ type: DELETE_REVIEW_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: DELETE_REVIEW_FAILURE, payload: err });
    });
};