import axiosWithAuth from '../../utils/axiosWithAuth';
import {
	FETCH_COMPANIES_START,
	FETCH_COMPANIES_SUCCESS,
	FETCH_COMPANIES_FAILURE,
	POST_COMPANY_START,
	POST_COMPANY_SUCCESS,
	POST_COMPANY_FAILURE
} from '../types';

// ============ GET ALL COMPANIES ===========

export const getCompanies = () => dispatch => {
	dispatch({ type: FETCH_COMPANIES_START });
	return axiosWithAuth()
		.get('/companies')
		.then(res => {
			dispatch({ type: FETCH_COMPANIES_SUCCESS, payload: res.data });
		})
		.catch(err => {
			dispatch({ type: FETCH_COMPANIES_FAILURE, payload: err.response });
		});
};

// ============ GET COMPANY BY ID ===========

// ============ POST A COMPANY ===========
export const postCompany = company => dispatch => {
	dispatch({ type: POST_COMPANY_START });
	return axiosWithAuth()
		.post('/companies', company)
		.then(res => {
			dispatch({ type: POST_COMPANY_SUCCESS, payload: res.data });
		})
		.catch(err => {
			dispatch({ type: POST_COMPANY_FAILURE, payload: err.response });
		});
};
