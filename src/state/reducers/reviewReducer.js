
import { FETCH_REVIEW_FAILURE, FETCH_REVIEW_START,FETCH_REVIEW_SUCCESS ,POST_REVIEW_FAILURE,POST_REVIEW_START,POST_REVIEW_SUCCESS } from '../types'

const initialState = {
  data: [],
  fetchingData: false,
  reviewAdded: false,
  error: '',
};

// Reducer
const reviewReducer = (state = initialState, action) => {
  console.log("reducer is running", {state})
  switch (action.type) {
    // place cases here
case FETCH_REVIEW_START:{
  return {
    ...state,
    fetchingData:true
  }
}
case FETCH_REVIEW_SUCCESS:{
  return {
    ...state,
    fetchingData:false,
    data:action.payload
  }
}
case FETCH_REVIEW_FAILURE:{
  return {
    ...state,
    fetchingData:false,
    error:action.payload
  }
}
case POST_REVIEW_START:{
  return {
    ...state,
    fetchingData:true
  }
}
case POST_REVIEW_SUCCESS:{
  return {
    ...state,
    fetchingData:false,
    reviewAdded: true
  }
}
case POST_REVIEW_FAILURE:{
  return {
    ...state,
    fetchingData:false,
    error:action.payload
  }
}
    default:
      return state;
  }
};

export default reviewReducer;
