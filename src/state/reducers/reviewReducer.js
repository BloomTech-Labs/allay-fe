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
  DELETE_REVIEW_FAILURE
} from "../types";

const initialState = {
  data: [],
  dataById: {},
  fetchingData: false,
  isLoading: false,
  isEditing: false,
  isDeleting: false,
  reviewAdded: false,
  reviewEdited: false,
  reviewDeleted: false,
  deleteFail: false,
  error: ""
};

// Reducer
const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REVIEWS_START: {
      return {
        ...state,
        fetchingData: true,
        isLoading: true
      };
    }
    case FETCH_REVIEWS_SUCCESS: {
      return {
        ...state,
        fetchingData: false,
        isLoading: false,
        data: action.payload
      };
    }
    case FETCH_REVIEWS_FAILURE: {
      return {
        ...state,
        fetchingData: false,
        isLoading: false,
        error: action.payload
      };
    }
    case FETCH_REVIEW_BY_ID_START: {
      return {
        ...state,
        fetchingData: true,
        isLoading: true
      };
    }
    case FETCH_REVIEW_BY_ID_SUCCESS: {
      return {
        ...state,
        fetchingData: false,
        isLoading: false,
        dataById: action.payload
      };
    }
    case FETCH_REVIEW_BY_ID_FAILURE: {
      return {
        ...state,
        fetchingData: false,
        isLoading: false,
        error: action.payload
      };
    }
    case POST_REVIEW_START: {
      return {
        ...state,
        fetchingData: true,
        isLoading: true
      };
    }
    case POST_REVIEW_SUCCESS: {
      return {
        ...state,
        fetchingData: false,
        isLoading: false,
        reviewAdded: true
      };
    }
    case POST_REVIEW_FAILURE: {
      return {
        ...state,
        fetchingData: false,
        isLoading: false,
        error: action.payload
      };
    }
    case EDIT_REVIEW_START: {
      return {
        ...state,
        isEditing: true,
        reviewEdited: false,
        error: ""
      };
    }
    case EDIT_REVIEW_SUCCESS: {
      return {
        ...state,
        dataById: action.payload,
        isEditing: false,
        reviewEdited: true,
        error: ""
      };
    }
    case EDIT_REVIEW_FAILURE: {
      return {
        ...state,
        isEditing: false,
        reviewEdited: false,
        error: action.payload
      };
    }
    case DELETE_REVIEW_START: {
      return {
        ...state,
        isDeleting: true,
        deleteFail: false,
        reviewDeleted: false
      };
    }
    case DELETE_REVIEW_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        reviewDeleted: true
      };
    }
    case DELETE_REVIEW_FAILURE: {
      return {
        ...state
      };
    }
    default:
      return state;
  }
};

export default reviewReducer;
