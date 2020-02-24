import mainReducer from './mainReducer';
import { combineReducers } from "redux";
import { authReducer } from "../reducers/authReducer";
import reviewListReducer from "../reducers/reviewListReducer";

// export default mainReducer;


export const rootReducer = combineReducers({
    authReducer,
    reviewListReducer
})
