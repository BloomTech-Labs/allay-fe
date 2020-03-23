import axiosWithAuth from '../../utils/axiosWithAuth';
import {
	LOGIN_START,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	SIGNUP_START,
	SIGNUP_SUCCESS,
	SIGNUP_FAIL
} from '../types';

export const login = creds => dispatch => {
	dispatch({ type: LOGIN_START });
	return axiosWithAuth()
		.post('/auth/login', creds)
		.then(res => {
			localStorage.setItem('token', res.data.token);
			localStorage.setItem('userId', res.data.id);
			localStorage.setItem('username', res.data.username);
			dispatch({ type: LOGIN_SUCCESS, payload: res.data });
		})
		.catch(err => {
			dispatch({ type: LOGIN_FAIL, payload: err });
		});
};

export const signup = creds => dispatch => {
	dispatch({ type: SIGNUP_START });
	return axiosWithAuth()
		.post('/auth/register', creds)
		.then(res => {
			localStorage.setItem('token', res.data.token);
			localStorage.setItem('userId', res.data.id);
			localStorage.setItem('username', res.data.username);
			dispatch({ type: SIGNUP_SUCCESS, payload: res.data });
		})
		.catch(err => {
			dispatch({ type: SIGNUP_FAIL, payload: err });
		});
};
