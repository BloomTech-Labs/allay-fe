import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import getReview from '../../state/actions/index';
import { makeStyles } from '@material-ui/core/styles';
import {
	Card,
	CardActions,
	CardContent,
	Button,
	ButtonGroup,
	Box,
	Typography
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
	root: {
		maxWidth: 1200,
		margin: '0 auto',
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap'
	},
	header: {
		display: 'flex',
		padding: '3%'
	},
	addOrSearch: {
		display: 'flex',
		justifyContent: 'flex-end'
	},
	Button: {
		border: '1px solid black'
	}
});

const DashboardHome = ({ data, getReview, history }) => {
	console.log(history);
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
				<Box component='div' className={classes.header}>
					<h1> Allay </h1>
				</Box>
				<Box component='div' className={classes.addOrSearch}>
					<ButtonGroup>
						<Button onClick={navToReviewForm}>Add A Review</Button>
					</ButtonGroup>
				</Box>
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
