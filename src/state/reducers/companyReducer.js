import {
  FETCH_COMPANIES_START,
  FETCH_COMPANIES_SUCCESS,
  FETCH_COMPANIES_FAILURE
} from "../types";

const initialState = {
  data: [],
  dataById: {},
  fetchingData: false,
  error: ""
};

// Reducer
const companyReducer = (state = initialState, action) => {
  console.log("reducer is running", { state });
  switch (action.type) {
    // place cases here
    case FETCH_COMPANIES_START: {
      return {
        ...state,
        fetchingData: true
      };
    }
    case FETCH_COMPANIES_SUCCESS: {
      return {
        ...state,
        fetchingData: false,
        data: action.payload
      };
    }
    case FETCH_COMPANIES_FAILURE: {
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

export default companyReducer;
