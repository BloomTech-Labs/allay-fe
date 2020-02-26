import React, { useEffect } from "react";
import { connect } from "react-redux";
import getReviewById from "../../state/actions/index";

//imported styles
import {
  Card,
  Typography,
  CardContent,
  CardActions,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  card: {
    maxWidth: 380,
    margin: "10px"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

const SingleReview = ({ review, getReviewById, match }) => {
  const classes = useStyles();

  const id = match.params.id;

  useEffect(() => {
    getReviewById(id);
  }, [id, getReviewById]);

  return (
    <div className={classes.card}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            Job Title: {review.job_title}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Location: {review.job_location}
          </Typography>
          <Typography variant="body2" component="p">
            Salary: {review.salary}
          </Typography>
          <Typography variant="body2" component="p">
            Interview Process: {review.interview_review}
          </Typography>
          <Typography variant="body2" component="p">
            Interview Rating: {review.interview_rating}
          </Typography>
          <Typography variant="body2" component="p">
            Review: {review.job_review}
          </Typography>
          <Typography variant="body2" component="p">
            Job Rating: {review.job_rating}
          </Typography>
          <Typography variant="body2" component="p">
            Posted by: {review.reviewer}
          </Typography>
          <Typography variant="body2" component="p">
            Company name: {review.company_name}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    review: state.review.dataById
  };
};

export default connect(mapStateToProps, getReviewById)(SingleReview);
