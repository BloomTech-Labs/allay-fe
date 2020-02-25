import React from "react";
import { connect } from "react-redux";
import { getReviewById } from "../../state/actions/reviewActions";
import reviewReducer from "../../state/reducers/reviewReducer";

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

const SingleReview = props => {
  const classes = useStyles();

  React.useEffect(() => {
    props.getReviewById(props.match.params.id);
  }, []);

  return (
    <div className={classes.card}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            Job Title: {props.review.job_title}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Location: {props.review.job_location}
          </Typography>
          <Typography variant="body2" component="p">
            Salary: {props.review.salary}
          </Typography>
          <Typography variant="body2" component="p">
            Interview Process: {props.review.interview_review}
          </Typography>
          <Typography variant="body2" component="p">
            Interview Rating: {props.review.interview_rating}
          </Typography>
          <Typography variant="body2" component="p">
            Review: {props.review.job_review}
          </Typography>
          <Typography variant="body2" component="p">
            Job Rating: {props.review.job_rating}
          </Typography>
          <Typography variant="body2" component="p">
            Posted by: {props.review.reviewer}
          </Typography>
          <Typography variant="body2" component="p">
            Company name: {props.review.company_name}
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

export default connect(mapStateToProps, { getReviewById })(SingleReview);
