import * as types from '../types'; // types can be used as 'types.<YOUR-TYPE>'

// STATE starts here
const initialState = {
  data: [],
  fetchingData: false,
  error: '',
};

// Reducer
const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    // place cases here

    default:
      return state;
  }
};

export default mainReducer;
