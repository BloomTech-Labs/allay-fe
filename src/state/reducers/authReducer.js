import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL, SIGNUP_START, SIGNUP_SUCCESS, SIGNUP_FAIL } from "../actions/authActions";

const initialState = {

}

export const authReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN_START: 
            return {
                ...state,
            }
        case LOGIN_SUCCESS: 
            return {
                ...state,
            }
        case LOGIN_FAIL: 
            return {
                ...state,
            }
        case SIGNUP_START: 
            return {
                ...state,
            }
        case SIGNUP_SUCCESS: 
            return {
                ...state,
            }
        case SIGNUP_FAIL: 
            return {
                ...state,
            }
        default: 
            return state
    }
}