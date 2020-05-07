// ACTIONS LIVE HERE

import { login, signup } from "./authActions";
import {
  getReview,
  getReviewById,
  postReview,
  editReview,
  deleteReview
} from "./reviewActions";
import { getCompanies, postCompany } from "./companyActions";
import { blockUser, getUser, updateUser } from "./userActions";
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
  blockUser,
  getUser,
  updateUser
};
