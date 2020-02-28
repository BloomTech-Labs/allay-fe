import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// action
import getReview from '../../state/actions/index';
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
		padding: '3%'
	},
	avatar: {
		marginRight: '2%'
	},
	addOrSearchContainer: {
		display: 'flex',
		justifyContent: 'flex-end',
		padding: '1.5%'
	},
	optionsContainer: {
		display: 'flex',
		justifyContent: 'flex-start',
		padding: '1.5% 3%'
	},
	cardContainer: {
		border: '1px solid black',
		height: '65vh'
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
					<p>cards go here</p>
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
