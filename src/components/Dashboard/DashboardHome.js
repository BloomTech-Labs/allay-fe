import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// action
import getReview from '../../state/actions/index';
// component
import ReviewCard from './ReviewCard';
// styles
import avatar from '../../placeholder.jpeg';
import { makeStyles } from '@material-ui/core/styles';
import {
	Card,
	CardActions,
	CardContent,
	Button,
	ButtonGroup,
	Box,
	Avatar,
	Container
} from '@material-ui/core';

const useStyles = makeStyles({
	root: {
		maxWidth: 1200,
		margin: '0 auto',
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap'
	},
	headerContainer: {
		display: 'flex',
		alignItems: 'center',
		padding: '1.5% 0'
	},
	avatar: {
		marginRight: '2%'
	},
	addOrSearchContainer: {
		display: 'flex',
		justifyContent: 'flex-end',
		padding: '1.5% 0'
	},
	optionsContainer: {
		display: 'flex',
		justifyContent: 'flex-start',
		padding: '1.5% 0'
	},
	cardContainer: {
		border: '1px solid black',
		height: '70vh'
	}
});

const DashboardHome = ({ data, getReview, history }) => {
	console.log(data);
	// access css classes
	const classes = useStyles();

	// pull review data
	useEffect(() => {
		getReview();
	}, [getReview]);

	const navToReviewForm = () => {
		history.push('/dashboard/add-review');
	};

	return (
		<>
			<div className={classes.root}>
				<Box component='div' className={classes.headerContainer}>
					<Avatar alt='Place Holder' src={avatar} className={classes.avatar} />
					<h1> Allay </h1>
				</Box>
				<Box component='div' className={classes.addOrSearchContainer}>
					<ButtonGroup>
						<Button onClick={navToReviewForm}>Add A Review</Button>
					</ButtonGroup>
				</Box>
				<Box component='div' className={classes.optionsContainer}>
					<h3> Recent Posts </h3>
				</Box>
				<Container className={classes.cardContainer}>
					{data.map(review => (
						<ReviewCard key={review.id} review={review} />
					))}
				</Container>
			</div>
		</>
	);
};

const mapStateToProps = state => {
	return {
		data: state.review.data
	};
};
export default connect(mapStateToProps, getReview)(DashboardHome);
