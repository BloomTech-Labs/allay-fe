import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import getReviewById from '../../../state/actions/index.js';
import editReview from '../../../state/actions/index.js';
import ReactGA from 'react-ga';
import { states } from '../../Reusable/statesData';
import EditReviewInput from '../../Reusable/InputFields/EditReviewInput';
import { useForm } from 'react-hook-form';

//imported styles
import CustomSpinner from '../../CustomSpinner';
import {
	Flex,
	Button,
	FormControl,
	FormLabel,
	FormErrorMessage,
	InputGroup,
	InputLeftElement,
	Select,
	Textarea,
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogBody,
	AlertDialogOverlay,
	AlertDialogFooter,
	useToast
} from '@chakra-ui/core';

const EditReviewForm = ({
	review,
	getReviewById,
	editReview,
	reviewEdited,
	match,
	history,
	isLoading
}) => {
	const { register, handleSubmit, errors, formState } = useForm();
	const id = match.params.id;
	const [editValue, setEditValue] = useState({
		id: id
	});

	//allows the use of toasts
	const toast = useToast();

	// specifically for the cancel button functionality
	const [isOpen, setIsOpen] = useState();
	const onClose = () => setIsOpen(false);
	const cancelRef = useRef();

	// validating salary
	function validateSalary(value) {
		let error;
		if (value < 0) {
			error = 'Salary cannot be less than zero.';
		}
		return error || true;
	}

	useEffect(() => {
		getReviewById(id);
	}, [id, getReviewById]);

	if (isLoading) {
		return (
			<Flex justify='center' align='center' w='100vh' h='100vh'>
				<CustomSpinner />
			</Flex>
		);
	}

	const submitEdits = () => {
		editReview(review.user_id, review.review_id, editValue).then(() => {
			history.push('/dashboard');
			toast({
				title: `Review Edit Success!`,
				description: `We've successfully edited your review for you`,
				status: 'success',
				duration: 5000,
				isClosable: true
			});
		});

		// if (reviewEdited === true) {
		//   toast({
		//     title: `Review Edit Success!`,
		//     description: `We've successfully edited your review for you`,
		//     status: 'success',
		//     duration: 5000,
		//     isClosable: true
		//   })
		// } else {
		//   toast({
		//     title: `Review Edit Failed`,
		//     description: `There was an error editing your review`,
		//     status: 'error',
		//     duration: 5000,
		//     isClosable: true
		//   });
		// }

		ReactGA.event({
			category: 'Edit',
			action: `Submit edit`
		});
	};

	return (
		<Flex w='100%' justify='center' minH='100vh' bg='#F2F6FE'>
			<Flex w='45%' my='10%' px='4%' justify='center' flexDir='column'>
				<form onSubmit={handleSubmit(submitEdits)}>
					<FormControl>
						<h2 color='#525252' align='center'>
							Edit company review
						</h2>
						<FormLabel color='#525252' mt='3'>
							Job title
						</FormLabel>
						<EditReviewInput
							name='job_title'
							placeholder={review.job_title}
							value={editValue.job_title}
							onChange={e =>
								setEditValue({ ...editValue, [e.target.name]: e.target.value })
							}
						/>
					</FormControl>

					<FormControl>
						<FormLabel fontSize='15px' color='#525252'>
							Job location
						</FormLabel>
						<Flex justify='space-between' wrap='nowrap'>
							<EditReviewInput
								w='60%'
								h='58px'
								py='32px'
								borderColor='#ECF1FE'
								rounded='3px'
								name='city'
								placeholder={review.city}
								value={editValue.city}
								onChange={e =>
									setEditValue({
										...editValue,
										[e.target.name]: e.target.value
									})
								}
							/>

							<Select
								w='35%'
								mb='4'
								h='65px'
								rounded='3px'
								border='1px solid black'
								name='state_id'
								ref={register}
								onChange={e =>
									setEditValue({
										...editValue,
										[e.target.name]: e.target.value
									})
								}
							>
								<option value={0}>{review.state_name}</option>
								{states.map(i => (
									<option key={i.id} value={i.id}>
										{i.state_name}
									</option>
								))}
							</Select>
						</Flex>
					</FormControl>

					<FormControl isInvalid={errors.salary}>
						<FormLabel fontSize='15px' color='#525252'>
							Salary
						</FormLabel>
						<InputGroup>
							<InputLeftElement
								mb='4'
								h='58px'
								py='32px'
								borderColor='#ECF1FE'
								color='gray.300'
								fontSize='1.2em'
								children='$'
							/>
							<EditReviewInput
								pl='6%'
								borderColor='#ECF1FE'
								rounded='3px'
								name='salary'
								type='number'
								placeholder={review.salary}
								ref={register({ validate: validateSalary })}
								value={editValue.salary}
								onChange={e =>
									setEditValue({
										...editValue,
										[e.target.name]: e.target.value
									})
								}
							/>
						</InputGroup>
						<FormErrorMessage>
							{errors.salary && errors.salary.message}
						</FormErrorMessage>
					</FormControl>

					<FormControl>
						<FormLabel fontSize='15px' color='#525252'>
							Work status
						</FormLabel>
						<Select
							mb='4'
							h='65px'
							rounded='3px'
							border='1px solid black'
							color='#494B5B'
							name='work_status_id'
							ref={register}
							onChange={e =>
								setEditValue({ ...editValue, [e.target.name]: e.target.value })
							}
						>
							<option value={0}>{review.work_status}</option>
							<option value={1}>Current Employee</option>
							<option value={2}>Former Employee</option>
							<option value={3}>Full Time</option>
							<option value={4}>Part Time</option>
							<option value={5}>Intern</option>
							))}
						</Select>
					</FormControl>

					<FormControl>
						<FormLabel fontSize='15px' color='#525252'>
							Years of employment
						</FormLabel>
						<Flex justify='space-between' wrap='nowrap'>
							<EditReviewInput
								w='48%'
								name='start_date'
								type='number'
								placeholder={`Start - ${review.start_date}`}
								value={editValue.start_date}
								onChange={e =>
									setEditValue({
										...editValue,
										[e.target.name]: e.target.value
									})
								}
							/>
							<EditReviewInput
								w='48%'
								name='start_date'
								type='number'
								placeholder={`End - ${review.end_date}`}
								value={editValue.end_date}
								onChange={e =>
									setEditValue({
										...editValue,
										[e.target.name]: e.target.value
									})
								}
							/>
						</Flex>
					</FormControl>

					<FormControl>
						<FormLabel fontSize='15px' color='#525252'>
							Working hours
						</FormLabel>
						<EditReviewInput
							name='typical_hours'
							type='number'
							placeholder={review.typical_hours}
							value={editValue.typical_hours}
							onChange={e =>
								setEditValue({ ...editValue, [e.target.name]: e.target.value })
							}
						/>
					</FormControl>

					<FormControl>
						<FormLabel fontSize='15px' color='#525252'>
							Job review
						</FormLabel>
						<Textarea
							mb='4'
							h='144px'
							rounded='3px'
							border='1px solid black'
							color='#494B5B'
							rowsMax={6}
							resize='none'
							type='text'
							name='comment'
							placeholder={review.comment}
							ref={register}
							value={editValue.comment}
							onChange={e =>
								setEditValue({ ...editValue, [e.target.name]: e.target.value })
							}
						/>
					</FormControl>

					<FormControl>
						<FormLabel fontSize='15px' color='#525252'>
							Job rating
						</FormLabel>
						<Select
							mb='4'
							h='65px'
							rounded='3px'
							border='1px solid black'
							color='#494B5B'
							name='overall_rating'
							ref={register}
							onChange={e =>
								setEditValue({ ...editValue, [e.target.name]: e.target.value })
							}
						>
							<option value={0}>{review.overall_rating}</option>
							<option value={5}>5 - Great</option>
							<option value={4}>4 - Good</option>
							<option value={3}>3 - OK </option>
							<option value={2}>2 - Poor </option>
							<option value={1}>1 - Very Poor </option>
						</Select>
					</FormControl>

					<Flex mt='40px'>
						<Button
							bg='#344CD0'
							color='white'
							isLoading={formState.isSubmitting}
							type='submit'
							w='65%'
							h='72px'
							fontSize='18px'
						>
							Save changes
						</Button>
						<Flex
							align='center'
							justify='center'
							isloading
							height='72px'
							width='30%'
							color='#344CD0'
							fontSize='18px'
							fontWeight='bold'
							cursor='pointer'
							onClick={() => setIsOpen(true)}
						>
							Cancel
						</Flex>
						<AlertDialog
							isOpen={isOpen}
							leastDestructiveRef={cancelRef}
							onClose={onClose}
						>
							<AlertDialogOverlay />
							<AlertDialogContent>
								<AlertDialogHeader fontSize='lg' fontWeight='bold'>
									Cancel form?
								</AlertDialogHeader>
								<AlertDialogBody>
									Are you sure? You can't undo this action.
								</AlertDialogBody>

								<AlertDialogFooter>
									<Flex>
										<Flex
											align='center'
											justify='center'
											isloading
											height='56px'
											width='30%'
											mr='5%'
											color='#344CD0'
											fontSize='18px'
											fontWeight='bold'
											cursor='pointer'
											ref={cancelRef}
											onClick={onClose}
										>
											Cancel
										</Flex>
										<Button
											h='56px'
											rounded='10px'
											bg='#344CD0'
											border='none'
											color='white'
											onClick={() => history.push('/dashboard')}
											ml={3}
										>
											Yes I'm sure
										</Button>
									</Flex>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</Flex>
				</form>
			</Flex>
		</Flex>
	);
};

const mapStateToProps = state => {
	return {
		review: state.review.dataById,
		reviewEdited: state.review.reviewEdited
	};
};

export default connect(
	mapStateToProps,
	(getReviewById, editReview)
)(EditReviewForm);
