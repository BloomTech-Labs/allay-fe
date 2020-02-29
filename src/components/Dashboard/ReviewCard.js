// previously ReviewList
import React from 'react';
import { connect } from 'react-redux';
// actions
import getReview from '../../state/actions/index';
// styles
import { Box, Avatar } from '@chakra-ui/core';

const ReviewCard = ({ review, history }) => {
	//routes to single review
	const learnMore = () => {
		history.push(`/dashboard/${review.id}`);
	};

	return (
		<>
			<Box overflow='hidden'>
				<Box p='2' width='100%' d='flex' onClick={learnMore}>
					<Box
						p='5'
						width='15%'
						d='flex'
						alignItems='center'
						flexDirection='column'
					>
						<h4>{review.reviewer}</h4>
						<Avatar name={review.reviewer} src='https://bit.ly/broken-link' />
					</Box>
					<Box d='flex' flexDirection='column' width='100%'>
						<Box d='flex'>
							<h3>{review.company_name}</h3>
						</Box>
						<Box p='2' d='flex' flexDirection='row'>
							<Box width='40%' d='flex' justifyContent='flex-start'>
								<h4>Summary</h4>
							</Box>
							<Box width='20%' d='flex' justifyContent='flex-start'>
								<h4>Pros</h4>
							</Box>
							<Box width='20%' d='flex' justifyContent='flex-start'>
								<h4>Cons</h4>
							</Box>
							<Box width='20%' d='flex' justifyContent='flex-start'>
								<h4>Salary</h4>
							</Box>
						</Box>
						<Box p='2' d='flex' flexDirection='row'>
							<Box
								width='40%'
								d='flex'
								justifyContent='flex-start'
								mt='1'
								fontWeight='semibold'
								as='h4'
								lineHeight='tight'
								isTruncated
							>
								{review.job_review}
							</Box>
							<Box
								width='20%'
								d='flex'
								justifyContent='flex-start'
								mt='1'
								fontWeight='semibold'
								as='h4'
								lineHeight='tight'
								isTruncated
							>
								"any pros"
							</Box>
							<Box
								width='20%'
								d='flex'
								justifyContent='flex-start'
								mt='1'
								fontWeight='semibold'
								as='h4'
								lineHeight='tight'
								isTruncated
							>
								"any cons"
							</Box>
							<Box
								width='20%'
								d='flex'
								justifyContent='flex-start'
								mt='1'
								fontWeight='semibold'
								as='h4'
								lineHeight='tight'
								isTruncated
							>
								${review.salary}
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
		</>
	);
};

const mapStateToProps = state => {
	return {
		data: state.review.data
	};
};
export default connect(mapStateToProps, getReview)(ReviewCard);
