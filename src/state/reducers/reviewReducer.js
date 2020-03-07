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
} from '../types';

const initialState = {
  data: [],
  dataById: {},
  fetchingData: false,
  reviewAdded: false,
  error: ''
};

// Reducer
const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REVIEWS_START: {
      return {
        ...state,
        fetchingData: true
      };
    }
    case FETCH_REVIEWS_SUCCESS: {
      return {
        ...state,
        fetchingData: false,
        data: action.payload
      };
    }
    case FETCH_REVIEWS_FAILURE: {
      return {
        ...state,
        fetchingData: false,
        error: action.payload
      };
    }
    case FETCH_REVIEW_BY_ID_START: {
      return {
        ...state,
        fetchingData: true
      };
    }
    case FETCH_REVIEW_BY_ID_SUCCESS: {
      return {
        ...state,
        fetchingData: false,
        dataById: action.payload
      };
    }
    case FETCH_REVIEW_BY_ID_FAILURE: {
      return {
        ...state,
        fetchingData: false,
        error: action.payload
      };
    }
    case POST_REVIEW_START: {
      return {
        ...state,
        fetchingData: true
      };
    }
    case POST_REVIEW_SUCCESS: {
      return {
        ...state,
        fetchingData: false,
        reviewAdded: true
      };
    }
    case POST_REVIEW_FAILURE: {
      return {
        ...state,
        fetchingData: false,
        error: action.payload
      };
    }
    default:
      return state;
  }
};

export default reviewReducer;
