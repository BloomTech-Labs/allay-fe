import axiosWithAuth from "../../utils/axiosWithAuth";
import {
  FETCH_COMPANIES_FAILURE,
  FETCH_COMPANIES_START,
  FETCH_COMPANIES_SUCCESS
} from "../types";

// ============ GET ALL COMPANIES ===========

export const getCompanies = () => dispatch => {
  dispatch({ type: FETCH_COMPANIES_START });
  axiosWithAuth()
    .get("/companies")
    .then(res => {
      dispatch({ type: FETCH_COMPANIES_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: FETCH_COMPANIES_FAILURE, payload: err.response });
    });
};

// ============ GET COMPANY BY ID ===========
