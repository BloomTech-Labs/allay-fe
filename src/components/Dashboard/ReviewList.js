import React from "react";
import { connect } from "react-redux";
import { getReview } from "../../state/actions/reviewActions";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 1200,
    margin: '0 auto',
    display: "flex",
    justifyContent:'center',
    flexWrap: "wrap"
},
card:{
    maxWidth: 380,
    margin: '10px'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

const ReviewList = props => {
  const classes = useStyles();

  React.useEffect(() => {
    props.getReview();
  }, []);

  return (
    <div className={classes.root}>
      {props.data.map(review => {
        return (
          <div className={classes.card}>
            <Card key={review.id}>
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
      })}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    data: state.review.data
  };
};
export default connect(mapStateToProps, { getReview })(ReviewList);
