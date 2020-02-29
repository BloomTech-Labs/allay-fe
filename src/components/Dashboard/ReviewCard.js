// previously ReviewList
import React from 'react';
import { connect } from 'react-redux';
import getReview from '../../state/actions/index';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
	root: {
		maxWidth: 1200,
		margin: '0 auto',
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap'
	},
	card: {
		width: '100%',
		margin: '10px'
	},
	title: {
		fontSize: 14
	},
	pos: {
		marginBottom: 12
	}
});

const ReviewCard = ({ review }) => {
	const classes = useStyles();

	return (
		<>
			{/* <div className={classes.root}> */}
			<Card className={classes.card}>
				<CardContent>
					<Typography variant='body2' component='p'>
						Company name: {review.company_name}
					</Typography>
					<Typography variant='h5' component='h2'>
						Job Title: {review.job_title}
					</Typography>
					<Typography className={classes.pos} color='textSecondary'>
						Location: {review.job_location}
					</Typography>
					<Typography variant='body2' component='p'>
						Salary: {review.salary}
					</Typography>
				</CardContent>
				<CardActions>
					<Link to={`/dashboard/${review.id}`}>Learn More</Link>
				</CardActions>
			</Card>
			{/* </div> */}
		</>
	);
};

const mapStateToProps = state => {
	return {
		data: state.review.data
	};
};
export default connect(mapStateToProps, getReview)(ReviewCard);
