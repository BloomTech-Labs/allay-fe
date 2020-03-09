import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import getReviewById from '../../state/actions/index';
import NavBar from './NavBar';

//imported styles
import { Box, Flex, Avatar, Icon } from '@chakra-ui/core';
import { TiLocationOutline, TiThumbsUp, TiThumbsDown } from 'react-icons/ti';

const SingleReview = ({ review, getReviewById, match, history }) => {
	const id = match.params.id;

	useEffect(() => {
		getReviewById(id);
	}, [id, getReviewById]);

	return (
		<Flex w='100%' minH='100vh' justify='center'>
			<Flex maxW='1440px' w='100%' direction='column' wrap='wrap'>
				<NavBar history={history} />
				<Flex mt='15%' w='100%' maxW='1440px'>
					{/* avatar box */}
					<Flex w='10%' h='100%' ml='5%' justify='center' align='center'>
						<Flex h='75%'>
							<Avatar size='xl' src={`//logo.clearbit.com/${review.domain}`} />
						</Flex>
					</Flex>
					{/* content container */}
					<Flex w='85%' flexDir='column'>
						{/* top line */}
						<Flex
							justify='space-between'
							px='2%'
							w='100%'
							h='32px'
							mt='0.5%'
							mb='2%'
							align='center'
						>
							<Flex as='h2' fontSize='32px'>
								{review.company_name} Interview Review
							</Flex>
							<Flex align='center'>
								<Flex as='h2' fontSize='32px'>
									{review.interview_rating}/5
								</Flex>
								<Icon name='star' size='24px' />
							</Flex>
						</Flex>
						{/* location bar */}
						<Flex w='100%' pl='2%' align='center'>
							{/* location */}
							<Flex h='32px' w='20%' align='center' mr='35px'>
								Location:
								<Flex as='h3' align='center' fontWeight='light' pl='10px'>
									<Box as={TiLocationOutline}></Box>
									{review.job_location}
								</Flex>
							</Flex>
							{/* Difficulty */}
							<Flex align='center' h='32px' mr='35px'>
								Difficulty:
								<Flex as='h3' fontWeight='light' pl='10px'>
									{review.interview_rating}/5
								</Flex>
							</Flex>
							{/* offer? */}
							<Flex align='center' h='32px' mr='35px'>
								{review.offer_received ? (
									<>
										<Box as={TiThumbsUp} mr='10px'></Box>
										<Flex as='h3' fontWeight='light' mr='10px'>
											Received 0ffer
										</Flex>
									</>
								) : (
									<>
										<Box as={TiThumbsDown} mr='10px'></Box>
										<Flex as='h3' fontWeight='light' mr='10px'>
											No Offer
										</Flex>
									</>
								)}
							</Flex>
						</Flex>
						{/* tagline */}
						<Flex as='h2' mb='5px' pl='2%' mt='5px'>
							{review.tagline}
						</Flex>
						{/* Description container */}
						<Flex as='p' fontSize='24px' mb='1%' pl='2%'>
							Description:
						</Flex>
						<Flex as='p' fontWeight='light' fontSize='18px' px='2%'>
							{review.job_review}
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};

const mapStateToProps = state => {
	return {
		review: state.review.dataById
	};
};

export default connect(mapStateToProps, getReviewById)(SingleReview);

/* <Box>


									<Box>

									</Box>
								</Box> */
