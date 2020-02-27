import React, { useState, useEffect } from "react";

import {
  TextField,
  Button,
  TextareaAutosize,
  ButtonGroup,
  Typography,
  MenuItem
} from "@material-ui/core";

import makeStyles from "@material-ui/core/styles/makeStyles";
import { connect } from "react-redux";
import postReview from "../../state/actions";
import getCompanies from "../../state/actions";

const useStyles = makeStyles(theme => ({
  center: {
    display: "flex",
    justifyContent: "center",
    width: "0 auto"
  },
  container: {
    display: "flex",
    border: "2px solid grey",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    maxWidth: "600px"
  },
  heading: {
    backgroundColor: "lightgrey",
    maxWidth: "700px"
  }
}));

const ReviewForm = ({
  postReview,
  getCompanies,
  companies,
  history,
  isLoading
}) => {
  const classes = useStyles();
  const [newReviewPost, setNewReviewPost] = useState({
    company_id: "",
    job_title: "",
    job_location: "",
    salary: "",
    interview_review: "",
    interview_rating: "",
    job_review: "",
    job_rating: ""
  });

  useEffect(() => {
    getCompanies();
  }, []);

  const changeHandler = e => {
    setNewReviewPost({
      ...newReviewPost,
      [e.target.name]:
        e.target.type === "number" ? parseInt(e.target.value) : e.target.value
    });
  };
  console.log("company", newReviewPost);

  const handleSubmit = e => {
    e.preventDefault();
    postReview(localStorage.getItem("userId"), newReviewPost).then(() =>
      history.push("/dashboard")
    );
  };

  if (isLoading) {
    return <h1>Adding your review</h1>;
  }

  return (
    <div className={classes.center}>
      <div>
        <Typography className={classes.heading}> Add a Review</Typography>
        <form onSubmit={handleSubmit} className={classes.container}>
          <TextField
            select
            name="company_id"
            label="Company"
            value={newReviewPost.company_id}
            onChange={changeHandler}
            helperText="Please select your company"
          >
            {companies.map(company => (
              <MenuItem key={company.id} value={company.id}>
                {company.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            type="text"
            name="job_title"
            placeholder="Job Title"
            value={newReviewPost.job_title}
            onChange={changeHandler}
          />
          <TextField
            type="text"
            name="job_location"
            placeholder="Job Location"
            value={newReviewPost.job_location}
            onChange={changeHandler}
          />
          <TextField
            type="number"
            name="salary"
            placeholder="Salary"
            value={newReviewPost.salary}
            onChange={changeHandler}
          />
          <TextField
            type="number"
            name="interview_rating"
            placeholder="Interview rating"
            value={newReviewPost.interview_rating}
            onChange={changeHandler}
          />
          <TextareaAutosize
            rowsMax={6}
            type="text"
            name="interview_review"
            placeholder="Describe the interview process"
            value={newReviewPost.interview_review}
            onChange={changeHandler}
          />
          <TextField
            type="number"
            name="job_rating"
            placeholder="Job rating 0-5"
            value={newReviewPost.job_rating}
            onChange={changeHandler}
          />
          <TextareaAutosize
            rowsMax={6}
            type="text"
            name="job_review"
            placeholder="Write a Review"
            value={newReviewPost.job_review}
            onChange={changeHandler}
          />
          <ButtonGroup>
            <Button type="submit">Add Your Review</Button>
            <Button color="secondary">Cancel</Button>
          </ButtonGroup>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.review.fetchingData,
    companies: state.company.data
  };
};

export default connect(mapStateToProps, (postReview, getCompanies))(ReviewForm);
