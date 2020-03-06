import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import getReviewById from '../../state/actions/index';
import NavBar from './NavBar';

//imported styles
import { Box, Flex, Avatar } from '@chakra-ui/core';
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
				<Box bg='red' mt='14rem'>
					<Flex w='90%' h='160px' ml='5%' px='30px' justify='column'>
						{/* avatar */}
						<Flex justify='center' align='center' w='15%' h='90%'>
							<Avatar size='xl' src={`//logo.clearbit.com/${review.domain}`} />
						</Flex>
						{/* tag */}
						<Flex>
							<Box ml='5%'>
								<Flex justifyContent='space-between'>
									<Flex as='h2' fontSize='32px'>
										{review.company_name} Interview Review
									</Flex>
									<Flex as='h2' fontSize='32px'>
										{review.interview_rating}/5
									</Flex>
								</Flex>
								{/* tag */}
								<Flex justify='flex-start' w='100%' h='15%' mb='2%' pt='1%'>
									<Flex align='center' h='32px' mr='35px'>
										Location:
										<Flex as='h3' fontWeight='light' pl='10px'>
											<Box as={TiLocationOutline}></Box>
											{review.job_location}
										</Flex>
									</Flex>
									<Flex align='center' h='32px' mr='35px'>
										Difficulty:
										<Flex as='h3' fontWeight='light' pl='10px'>
											{review.interview_rating}/10
										</Flex>
									</Flex>
									<Flex align='center' h='32px' mr='35px'>
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
												<Box as={TiThumbsDown} mr='10px'></Box>
												<Flex as='h3' fontWeight='light' mr='10px'>
													No Offer
												</Flex>{' '}
											</>
										)}
									</Flex>
								</Flex>
								<Box>
									<Flex as='h2' fontWeight='light' mb='2%' mt='5px'>
										{review.tagline}
									</Flex>

									<Box>
										<Flex as='p' fontSize='24px' mb='1%'>
											Description:
										</Flex>
										<Flex fontWeight='light' as='p' fontSize='18px'>
											{review.job_review}
										</Flex>
									</Box>
								</Box>
							</Box>
						</Flex>
					</Flex>
				</Box>
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
