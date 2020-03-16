import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import getReviewById from '../../state/actions/index.js';
import editReview from '../../state/actions/index.js';
import NavBar from './NavBar';

import { useForm } from 'react-hook-form';

//imported styles
import { Box, Flex, Avatar, Icon, Editable, EditablePreview, EditableInput, Input, Button, FormControl, FormLabel } from '@chakra-ui/core';
import { TiLocationOutline, TiThumbsUp, TiThumbsDown } from 'react-icons/ti';

const SingleReview = ({ review, getReviewById, editReview, match, history }) => {
	const { register, handleSubmit, errors, formState } = useForm();
	const id = match.params.id;
	const [editValue, setEditValue] = useState({
		id: id
	});

	useEffect(() => {
		getReviewById(id);
	}, [id, getReviewById]);

	// useEffect(() => {
	// 	setEditValue(review);
	// }, [review]);

	console.log(editValue);

	// const handleEdits = (event) => {
	// 	setEditValue({
	// 		...editValue,
	// 		// [event.target.name]: event.target.value
	// 	})
	// }

	const submitEdits = (data) => {
		console.log(data);
		editReview(editValue);
	}

	return (
		<Flex w='100%' minH='100vh' justify='center'>
			<Flex maxW='1440px' w='100%' direction='column' wrap='wrap'>
				{/* <NavBar history={history} /> */}
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
									{/* {review.job_location} */}
									<form onSubmit={handleSubmit(submitEdits)}>
										<Input
											// defaultValue='{review.job_location}'
											ref={register}
											variant="filled"
											mb="3"
											py="15px"
											type="text"
											name="job_location"
											value={editValue.job_location}
											onChange={e => setEditValue({ ...editValue, [e.target.name]: e.target.value })}
											// onChange={e => setEditValue(e.target.value)}
											// placeholder='location'
											rounded="6px"
											placeholder={`${review.job_location}`}
										>
											{/* <EditablePreview />
											<EditableInput /> */}
										</Input>
									</form>
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


						{/* <h2> Edit Review</h2> */}
						<form onSubmit={handleSubmit(submitEdits)}>
							{/* <FormControl>
								<FormLabel fontSize="15px" color="#525252">
									Job Location
              </FormLabel>
								<Input
									variant="filled"
									mb="3"
									py="32px"
									type="text"
									name="job_location"
									value={editValue.job_location}
									onChange={e => setEditValue({ ...editValue, [e.target.name]: e.target.value })}
									placeholder='location'
									rounded="6px"
								/>
							</FormControl> */}

							<Button
								w="500px"
								h="64px"
								type="submit"
								_hover={{ bg: '#979797' }}
								_active={{ bg: '#979797' }}
								bg="#615E5E"
								color="white"
								rounded="6x"
								border="none"
							>
								Edit Review
              </Button>
						</form>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};

const mapStateToProps = state => {
	// console.log(state.review.dataById)
	return {
		review: state.review.dataById
	};
};

export default connect(
	mapStateToProps,
	(getReviewById, editReview))
	(SingleReview);