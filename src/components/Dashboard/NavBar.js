import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ReactGA from 'react-ga'; // for google analytics
//actions
import getReview from '../../state/actions/index';
//styles
import { Flex, Button, Avatar, Input } from '@chakra-ui/core';

const NavBar = ({ data, history, isLoading, getReview, handleInputChange }) => {
	// use to navigate to review form
	const navToReviewForm = () => {
		history.push('/dashboard/add-review');
		ReactGA.event({
			category: 'Review',
			action: `Add new review`
		});
	};
	console.log(handleInputChange);

	// // search state
	// const [filteredReviews, setFilteredReviews] = useState('');
	// const [searchResults, setSearchResults] = useState([]);

	// // pull review data
	// useEffect(() => {
	// 	getReview();
	// }, [getReview]);

	// useEffect(() => {
	// 	const results = data.filter(review =>
	// 		review.company_name.toLowerCase().includes(searchResults.toLowerCase())
	// 	);
	// 	// data = results;
	// 	setFilteredReviews(results);

	// }, [searchResults]);

	// const handleInputChange = event => {
	// 	event.preventDefault();
	// 	setSearchResults(event.target.value);
	// }
	// console.log(searchResults);

	return (
		<Flex
			maxW='1440px'
			w='100%'
			px='40px'
			background='#FFFFFF'
			top='0'
			position='fixed'
			overflow='hidden'
			zIndex='999'
			direction='column'
		>
			<Flex align='center' justify='space-between' pt='2%'>
				<Flex align='center'>
					<Avatar mr='12%' size='lg' src='https://bit.ly/broken-link' />
					<h1> Allay </h1>
				</Flex>
			</Flex>
			<Flex align='center' justify='space-between' pt='2%'>
				<Input
					placeholder="Search"
					type='text'
					rounded='20px'
					borderColor='#F2F6FE'
					borderWidth='2px'
					width='35%'
					onChange={handleInputChange}
				/>
				<Button
					variantColor='teal'
					rounded='6px'
					border='none'
					size='lg'
					isLoading={isLoading}
					onClick={navToReviewForm}
				>
					Add Review
					</Button>
			</Flex>
			{/* <Flex align='center' pr='25px' justify='flex-end' padding='1.5% 0'>
				<Button
            variantColor='teal'
            rounded='6px'
            border='none'
            size='lg'
            isLoading={isLoading}
            onClick={navToReviewForm}
          >
            Add A Review
          </Button>
			</Flex> */}
			<Flex align='center' justify='flex-start' >
				{window.location.href.includes('dashboard/') ? (
					<Flex as='h2' fontSize='32px' display='none'>
						Recent Posts
					</Flex>
				) : (
						<Flex as='h2' fontSize='32px'>
							Recent Posts
						</Flex>
					)}
			</Flex>
		</Flex>
	);
}

const mapStateToProps = state => {
	return {
		isLoading: state.review.fetchingData,
		data: state.review.data
	};
};
export default connect(mapStateToProps, getReview)(NavBar);