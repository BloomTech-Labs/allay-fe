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
	console.log(review);
	return (
		<>
			<Flex
				w='100%'
				h='160px'
				px='30px'
				wrap='wrap'
				onClick={learnMore}
				justify='column'
			>
				{/* avatar box */}
				<Flex justify='center' align='center' w='15%' h='90%'>
					<Avatar size='xl' src={`//logo.clearbit.com/${review.url}`} />
				</Flex>
				{/* content container */}
				<Flex w='85%' flexDir='column'>
					{/* tag container */}
					<Flex
						justify='flex-start'
						w='100%'
						h='32px'
						mt='0.5%'
						overflow='hidden'
					>
						<Flex align='center' w='20%' wrap='nowrap'>
							<Box as={TiArchive} mr='10px'></Box>
							<Flex as='h3' fontWeight='light' mr='10px' isTruncated>
								{review.company_name}
							</Flex>
						</Flex>
						<Flex align='center' w='18%' wrap='nowrap'>
							<Box as={TiLocationOutline} mr='10px'></Box>
							<Flex as='h3' fontWeight='light' mr='10px' isTruncated>
								{review.job_location}
							</Flex>
						</Flex>
						<Flex align='center' w='18%' wrap='nowrap'>
							{review.offer_received ? (
								<>
									<Box as={TiThumbsUp} mr='10px'></Box>
									<Flex as='h3' fontWeight='light' mr='10px'>
										Received 0ffer
									</Flex>{' '}
								</>
							) : (
								<>
									{' '}
									<Box as={TiThumbsUp} mr='10px'></Box>
									<Flex as='h3' fontWeight='light' mr='10px'>
										No Offer
									</Flex>{' '}
								</>
							)}
						</Flex>
						<Flex align='center' w='40%' wrap='nowrap'>
							<Flex as='h3' fontWeight='light' mr='10px' isTruncated>
								Position: {review.job_title}
							</Flex>
						</Flex>
					</Flex>
					{/* headline line container  */}
					<Flex w='100%' align='center' wrap='wrap' pl='1%' mt='1%'>
						<h2>{review.tagline}</h2>
					</Flex>
					{/* summary container */}
					<Flex w='100%' wrap='wrap' pl='1%' mt='0.5%'>
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
