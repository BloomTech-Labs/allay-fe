import mainReducer from './mainReducer';
import { combineReducers } from "redux";
import { authReducer } from "../reducers/authReducer";
import reviewReducer from "../reducers/reviewReducer";

// export default mainReducer;


export const rootReducer = combineReducers({
    auth: authReducer,
    review: reviewReducer
})
