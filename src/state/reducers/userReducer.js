import {
  BLOCK_USER_FAILURE,
  BLOCK_USER_SUCCESS,
  BLOCK_USER_START
} from "../types";

const initialState = {
  isLoading: false,
  isUserBlocked: null,
  error: ""
};

// Reducer
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case BLOCK_USER_START: {
      return {
        ...state,
        isLoading: true
      };
    }
    case BLOCK_USER_SUCCESS: {
      return {
        ...state,
        isUserBlocked: action.payload.updatedInfo.blocked
      };
    }
    case BLOCK_USER_FAILURE: {
      return {
        ...state,
        error: ""
      };
    }
    default:
      return state;
  }
};

export default userReducer;
