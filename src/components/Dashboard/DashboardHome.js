import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// action
import getReview from '../../state/actions/index';
// component
import NavBar from './NavBar';
import ReviewCard from './ReviewCard';
// styles
import { Flex, Spinner, Input } from '@chakra-ui/core';

const DashboardHome = ({ data, getReview, history, isLoading }) => {
	// search state
	const [filteredReviews, setFilteredReviews] = useState('');
	const [searchResults, setSearchResults] = useState([]);

	// pull review data
	useEffect(() => {
		getReview();
	}, [getReview]);

	useEffect(() => {
		const results = data.filter(review =>
			review.company_name.toLowerCase().includes(searchResults.toLowerCase())
		);
		// data = results;
		setFilteredReviews(results);

	}, [searchResults]);

	const handleInputChange = event => {
		event.preventDefault();
		setSearchResults(event.target.value);
	}
	console.log(searchResults);

	return (
		<>
			<Flex w='100%' minH='100vh' justify='center'>
				<Flex maxW='1440px' w='100%' direction='column' wrap='wrap'>
					{/* <NavBar history={history} isLoading={isLoading} handleInputChange={handleInputChange} /> */}
					<Input
						type='text'
						placeholder="Search"
						rounded='20px'
						borderColor='#F2F6FE'
						borderWidth='2px'
						width='35%'
					onChange={handleInputChange}
					/>
					<Flex mt='15%' direction='column'>
						<Flex height='100%' direction='column'>
							{isLoading ? (
								<Flex w='100%' h='100%' justify='center' align='center'>
									<Spinner
										thickness='4px'
										speed='0.65s'
										emptyColor='gray.200'
										color='blue.500'
										size='xl'
									/>
								</Flex>
							) : (
									filteredReviews.length >= 1 ?
										filteredReviews.map(review => (
											<ReviewCard
												key={review.id}
												review={review}
												history={history}
											/>
										)) :
										data.map(review => (
											<ReviewCard
												key={review.id}
												review={review}
												history={history}
											/>
										))
								)}
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
};

const mapStateToProps = state => {
	return {
		isLoading: state.review.fetchingData,
		data: state.review.data
	};
};
export default connect(mapStateToProps, getReview)(DashboardHome);
