import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
	TextField,
	Button,
	TextareaAutosize,
	ButtonGroup,
	Typography
} from '@material-ui/core';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { connect } from 'react-redux';
import postReview from '../../state/actions';
import getCompanies from '../../state/actions';

const useStyles = makeStyles(theme => ({
	center: {
		display: 'flex',
		justifyContent: 'center',
		width: '0 auto'
	},
	container: {
		display: 'flex',
		border: '2px solid grey',
		flexDirection: 'column',
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
		maxWidth: '600px'
	},
	heading: {
		backgroundColor: 'lightgrey',
		maxWidth: '700px'
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
		company_id: '',
		job_title: '',
		job_location: '',
		salary: '',
		interview_review: '',
		interview_rating: '',
		job_review: '',
		job_rating: ''
	});

	useEffect(() => {
		getCompanies();
	}, []);

	const changeHandler = e => {
		setNewReviewPost({
			...newReviewPost,
			[e.target.name]:
				e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		postReview(localStorage.getItem('userId'), newReviewPost).then(() =>
			history.push('/dashboard')
		);
	};

	if (isLoading) {
		return <h1>Adding your review</h1>;
	}

	const companyOptions = companies.map(company => {
		return { id: company.id, name: company.name };
	});

	return (
		<div className={classes.center}>
			<div>
				<Typography className={classes.heading}> Add a Review</Typography>
				<form onSubmit={handleSubmit} className={classes.container}>
					<Autocomplete
						id='combo-box-demo'
						options={companyOptions}
						getOptionLabel={company => company.name}
						onChange={(event, value) =>
							setNewReviewPost({
								...newReviewPost,
								company_id: value ? value.id : ''
							})
						}
						style={{ width: 200 }}
						renderInput={params => (
							<TextField {...params} label='Find A Company' />
						)}
					/>
					<Link to='/add-company'>Need to add a company?</Link>
					<TextField
						type='text'
						name='job_title'
						placeholder='Job Title'
						value={newReviewPost.job_title}
						onChange={changeHandler}
					/>
					<TextField
						type='text'
						name='job_location'
						placeholder='Job Location'
						value={newReviewPost.job_location}
						onChange={changeHandler}
					/>
					<TextField
						type='number'
						name='salary'
						placeholder='Salary'
						value={newReviewPost.salary}
						onChange={changeHandler}
					/>
					<TextField
						type='number'
						name='interview_rating'
						placeholder='Interview rating'
						value={newReviewPost.interview_rating}
						onChange={changeHandler}
					/>
					<TextareaAutosize
						rowsMax={6}
						type='text'
						name='interview_review'
						placeholder='Describe the interview process'
						value={newReviewPost.interview_review}
						onChange={changeHandler}
					/>
					<TextField
						type='number'
						name='job_rating'
						placeholder='Job rating 0-5'
						value={newReviewPost.job_rating}
						onChange={changeHandler}
					/>
					<TextareaAutosize
						rowsMax={6}
						type='text'
						name='job_review'
						placeholder='Write a Review'
						value={newReviewPost.job_review}
						onChange={changeHandler}
					/>
					<ButtonGroup>
						<Button type='submit'>Add Your Review</Button>
						<Button color='secondary'>Cancel</Button>
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
