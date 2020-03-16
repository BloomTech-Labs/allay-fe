import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// action
import getReview from '../../state/actions/index';
// component
import NavBar from './NavBar';
import ReviewCard from './ReviewCard';
// styles
import { Flex, Alert, AlertDescription } from '@chakra-ui/core';
import CustomSpinner from '../CustomSpinner.js';

const DashboardHome = ({ data, getReview, history, isLoading }) => {
	// search state
	const [filteredReviews, setFilteredReviews] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [filters, setFilters] = useState();

	// pull review data
	useEffect(() => {
		getReview();
	}, [getReview]);

	// filter searchbar by company name
	useEffect(() => {
		const results = data.filter(review =>
			review.company_name.toLowerCase().includes(searchResults)
		);
		// data = results;
		setFilteredReviews(results);
	}, [searchResults, data]);

	// ignacio's filter
	useEffect(() => {
		const filteredResults = data.filter(
			review => Number(review.job_rating) === Number(filters)
		);
		// data = results;
		setFilteredReviews(filteredResults);
	}, [filters, data]);

	// console.log('IGNACIO filteredReviews', filteredReviews.length);

	return (
		<>
			<Flex w='100%' minH='100vh' justify='center'>
				<Flex maxW='1440px' w='100%' direction='column' wrap='wrap'>
					<NavBar
						history={history}
						isLoading={isLoading}
						setSearchResults={setSearchResults}
						filters={filters}
						setFilters={setFilters}
					/>
					<Flex mt='16%'>
						<Flex
							height='100%'
							maxW='1440px'
							wrap='wrap'
							justify='space-between'
							mr='2.5%'
						>
							{isLoading ? (
								<Flex
									minW='100vw'
									minH='60vh'
									w='100%'
									h='100%'
									justify='center'
									align='center'
								>
									<CustomSpinner />
								</Flex>
							) : filteredReviews.length >= 1 ? (
								filteredReviews.map(review => (
									<ReviewCard
										key={review.id}
										review={review}
										history={history}
									/>
								))
							) : searchResults.length > 0 || filters ? (
								<Flex as='h3' w='100%' ml='6%' mt='5%' overflow='visible'>
									<Alert
										status='info'
										variant='subtle'
										flexDirection='column'
										justifyContent='center'
										textAlign='center'
										height='312px'
										width='625px'
										background='#F2F6FE'
										borderRadius='12px'
										mt='2%'
										wrap='nowrap'
									>
										{/* <AlertIcon size='40px' mr={0} /> */}
										<AlertDescription w='100%'>
											Sorry, no job reviews found.
										</AlertDescription>
									</Alert>
								</Flex>
							) : (
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
