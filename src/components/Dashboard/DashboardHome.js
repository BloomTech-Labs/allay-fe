import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// action
import getReview from '../../state/actions/index';
// component
import NavBar from './NavBar';
import ReviewCard from './ReviewCard';
// styles
import { Flex, Button, Avatar } from '@chakra-ui/core';

const DashboardHome = ({ data, getReview, history, isLoading }) => {
	// pull review data
	useEffect(() => {
		getReview();
	}, [getReview]);

	// use to navigate to review form
	const navToReviewForm = () => {
		history.push('/dashboard/add-review');
	};

	return (
		<>
			<Flex maxWidth='1440px' direction='column' wrap='wrap'>
				<NavBar history={history} isLoading={isLoading} />
				<Flex mt='15%' direction='column'>
					<Flex height='100%' direction='column'>
						{data.map(review => (
							<ReviewCard key={review.id} review={review} history={history} />
						))}
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
