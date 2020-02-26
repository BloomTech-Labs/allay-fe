// ACTIONS LIVE HERE

import { login, signup } from "./authActions";
import { getReview, getReviewById, postReview } from "./reviewActions";
import { getCompanies } from "./companyActions";

export default {
  login,
  signup,
  getReview,
  getReviewById,
  postReview,
  getCompanies
};
