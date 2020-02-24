import axiosWithAuth from '../../utils/axiosWithAuth'

export const FETCH_REVIEW_START = 'FETCH_REVIEW_START'
export const FETCH_REVIEW_SUCCESS = 'FETCH_REVIEW_SUCCESS'
export const FETCH_REVIEW_FAILURE = 'FETCH_REVIEW_FAILURE'

export const getReview = () => dispatch => {
  dispatch({ type: FETCH_REVIEW_START });
  axiosWithAuth()
    .get("/reviews")
    .then(res => {
      console.log('reviewActions', res.data)
      dispatch({ type: FETCH_REVIEW_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: FETCH_REVIEW_FAILURE, payload: err.response });
    });
};

// ============ POST REVIEW ===========



export const POST_REVIEW_START = 'POST_REVIEW_START'
export const POST_REVIEW_SUCCESS = 'POST_REVIEW_SUCCESS'
export const POST_REVIEW_FAILURE = 'POST_REVIEW_FAILURE'

export const postReview = data => dispatch => {
  dispatch({ type: FETCH_REVIEW_START });
  axiosWithAuth()
    .post("/reviews", data)
    .then(res => {
      console.log('reviewActions', res.data)
      dispatch({ type: FETCH_REVIEW_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: FETCH_REVIEW_FAILURE, payload: err.response });
    });
};
