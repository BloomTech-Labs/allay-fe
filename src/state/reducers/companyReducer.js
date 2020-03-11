import {
  FETCH_COMPANIES_START,
  FETCH_COMPANIES_SUCCESS,
  FETCH_COMPANIES_FAILURE,
  POST_COMPANY_START,
  POST_COMPANY_SUCCESS,
  POST_COMPANY_FAILURE
} from '../types';

const initialState = {
  data: [],
  dataById: {},
  fetchingData: false,
  isLoading: false,
  companyAdded: false,
  error: ''
};

// Reducer
const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMPANIES_START: {
      return {
        ...state,
        fetchingData: true,
        isLoading: true
      };
    }
    case FETCH_COMPANIES_SUCCESS: {
      return {
        ...state,
        fetchingData: false,
        isLoading: false,
        data: action.payload
      };
    }
    case FETCH_COMPANIES_FAILURE: {
      return {
        ...state,
        fetchingData: false,
        isLoading: false,
        error: action.payload
      };
    }
    case POST_COMPANY_START: {
      return {
        ...state,
        fetchingData: true,
        isLoading: true
      };
    }
    case POST_COMPANY_SUCCESS: {
      return {
        ...state,
        fetchingData: false,
        isLoading: false,
        companyAdded: true
      };
    }
    case POST_COMPANY_FAILURE: {
      return {
        ...state,
        fetchingData: false,
        isLoading: false,
        error: action.payload
      };
    }
    default:
      return state;
  }
};

export default companyReducer;
