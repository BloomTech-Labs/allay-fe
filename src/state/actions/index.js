// ACTIONS LIVE HERE

import { login, signup } from "./authActions";
import {
  getReview,
  getReviewById,
  postReview,
  editReview,
  deleteReview,
  blockUser
} from "./reviewActions";
import { getCompanies, postCompany } from "./companyActions";

export default {
  login,
  signup,
  getReview,
  getReviewById,
  postReview,
  editReview,
  deleteReview,
  getCompanies,
  postCompany,
  blockUser
};
