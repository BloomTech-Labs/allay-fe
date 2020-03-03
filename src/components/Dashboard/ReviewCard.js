// previously ReviewList
import React from 'react';
import { connect } from 'react-redux';
// actions
import getReview from '../../state/actions/index';
// icons
import { TiLocationOutline, TiArchive, TiThumbsUp } from 'react-icons/ti';
// styles
import { Box, Avatar, Flex } from '@chakra-ui/core';

const ReviewCard = ({ review, history }) => {
	//routes to single review
	const learnMore = () => {
		history.push(`/dashboard/${review.id}`);
	};

	return (
		<>
			<Flex
				w='1440px'
				h='246px'
				p='35p'
				wrap='wrap'
				onClick={learnMore}
				justify='column'
			>
				{/* avatar box */}
				<Flex justify='center' align='center' w='20%' h='246px'>
					<Avatar size='xl' src='https://bit.ly/broken-link' />
				</Flex>
				{/* content container */}
				<Flex w='80%' flexDir='column'>
					{/* tag container */}
					<Flex w='100%' justify='flex-start' h='32px'>
						<Flex align='center' h='32px' mr='35px'>
							<Box as={TiArchive}></Box>
							<Flex as='h3' fontWeight='light' pl='10px'>
								{review.company_name}
							</Flex>
						</Flex>
						<Flex align='center' h='32px' mr='35px'>
							<Box as={TiLocationOutline}></Box>
							<Flex as='h3' fontWeight='light' pl='10px'>
								{review.job_location}
							</Flex>
						</Flex>
						<Flex align='center' h='32px' mr='35px'>
							<Box as={TiThumbsUp}></Box>
							<Flex as='h3' fontWeight='light' pl='10px'>
								Received 0ffer
							</Flex>
						</Flex>
						<Flex align='center' h='32px' mr='35px'>
							<Flex as='h3' fontWeight='light' pl='10px'>
								Position: {review.job_title}
							</Flex>
						</Flex>
					</Flex>
					{/* headline line container  */}
					<Flex w='100%' h='35' p='20px' align='center' wrap='wrap'>
						<h2>
							“The traditional two-person interview format, sometimes is not
							easy to deal with or kind of”
						</h2>
					</Flex>
					{/* summary container */}
					<Flex w='100%' h='130px' px='20px'>
						<p>{review.job_review}</p>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
};

const mapStateToProps = state => {
	return {
		data: state.review.data
	};
};
export default connect(mapStateToProps, getReview)(ReviewCard);
