import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';

import BlockButton from './AdminButtons/BlockButton';
import ContentButton from './AdminButtons/ContentButton';
import ReactGA from 'react-ga';
// actions
import deleteReview from '../../state/actions/index';

// styles
import {
	Box,
	Text,
	Avatar,
	Flex,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalFooter,
	ModalCloseButton,
	Button,
	Icon,
	Image,
	Badge,
	PseudoBox,
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	useDisclosure,
} from '@chakra-ui/core';

const ReviewCard = ({ review, history, deleteReview, isAdmin }) => {

		//deletes the review in question
		const submitDelete = (user_id, review_id) => {
			if (review.user_id && review.review_id) {
				deleteReview(review.user_id, review.review_id).then(() => {
					// window.location.reload();
					history.push("/dashboard")
				});
			} else {
				deleteReview(user_id, review_id).then(() => {
					// window.location.reload();
					history.push("/dashboard")
				});
			}
	
			ReactGA.event({
				category: 'Review Delete',
				action: `Submit delete`,
			});
		};
useEffect(() => {
},[submitDelete])
	// NEW post tag logic
	const [newTag, setNewTag] = useState(false);
	// get server time and set to readable
	var serverDay = new Date(review.created_at).getDay();
	//get local time and set to readable
	var localTime = Date.now();
	let today = new Date(localTime).getDay();
	//logic to set view state
	useEffect(() => {
		if (serverDay === today) {
			setNewTag(true);
		} else {
			setNewTag(false);
		}
	}, [newTag, serverDay, today]);

	// basic usage for the SingleReview modal
	const { isOpen, onOpen, onClose } = useDisclosure();
	const loginId = localStorage.getItem('userId');

	// specifically for the cancel review delete button functionality
	const [isOpen2, setIsOpen2] = useState();
	const onClose2 = () => setIsOpen2(false);
	const cancelRef = useRef();

	//routes to single review
	const navToEditRoute = () => {
		if (review.review_type === 'Company') {
			history.push(`/dashboard/review/${review.review_id}`);
		} else {
			history.push(`/dashboard/interview/${review.review_id}`);
		}
	};

	//track name font color picker
	const trackFontColor = (trackName) => {
		switch (trackName) {
			case 'DS':
					return "#35694F";
				break;
			case 'WEB':
					return "#474EA7";
				break;
				case 'iOS' || "IOS":
				return "#8E3D19";
				break;
				case "Android":
				return "#4B3569";
				break;
				case "UX":
						return "#9F3A5A";
						break;
			default:
				return;
		}
	}
   //track name background color picker
	const trackColorPicker = (trackName) => {
		switch (trackName) {
			case 'DS':
					return "#D3F2CD";
				break;
			case 'WEB':
					return "#DBEBFD";
				break;
				case 'iOS' || "IOS":
				return "#F4E6BE";
				break;
				case "Android":
						return "#E9D9FF";
						break;
						case "UX":
								return "#F9E3DE";
								break;
			default:
				return;
		}
	}

	// TODO:cal dates
	// const dateConvert = date => {
	// 	date = new Date(date).toUTCString();
	// 	date = date
	// 		.split(" ")
	// 		.slice(0, 4)
	// 		.join(" ");
	// 	return date;
	// };


	// console.log(dateConvert(review.created_at))
	// console.log(new Date())


	//remove white space from company name for logo usage
	let stripped = review.company_name.replace(/ /g,'');
	let com = ".com"
	const logo = stripped.concat(com)
	return (
		<>
			{/* ------------------------------------------------------------------------------------------------ */}
			{/* ---------------------------------------Modal Cards (for edit)----------------------------------- */}
			{/* ------------------------------------------------------------------------------------------------ */}
			<Modal isOpen={isOpen} onClose={onClose} size='80%'>
				<ModalOverlay />
				<ModalContent w='100%' wrap='nowrap'>
					<ModalCloseButton
						data-cy='reviewCloseButton'
						background='none'
						border='none'
					/>

					{/* Basic info container */}
					<Flex
						flexDir={{ lg: 'row', sm: 'column' }}
						align='center'
						mx='8%'
						mt='56px'
					>
						<Flex flexDir='column' width='100%'>
							<Flex
								as='h2'
								maxW='100%'
								align='center'
								justify={{ lg: 'flex-start', sm: 'center' }}
								wrap='nowrap'
								isTruncated='true'
							>
								{review.company_name}
							</Flex>
							<Flex justify='space-between'>
								<Flex flexDir='column'>
									<Flex fontSize='small' fontWeight='light' color='#9194A8'>
										Location 
									</Flex>
									<Flex>
										{review.city}, {review.state_name}
									</Flex>
								</Flex>
								<Flex flexDir='column'>
									<Flex fontSize='small' fontWeight='light' color='#9194A8'>
										Job title
									</Flex>
									<Flex>{review.job_title}</Flex>
								</Flex>

								{review.review_type === 'Company' ? (
									<Flex flexDir='column'>
										<Flex fontSize='small' fontWeight='light' color='#9194A8'>
											Company rating
										</Flex>
										<Flex>
											{Array(5)
												.fill('')
												.map((_, i) => (
													<Icon
														name='star'
														key={i}
														color={
															i < review.overall_rating ? '#344CD0' : 'gray.300'
														}
														ml='4px'
													/>
												))}
										</Flex>
									</Flex>
								) : review.review_type === 'Interview' ? (
									<Flex flexDir='column'>
										<Flex fontSize='small' fontWeight='light' color='#9194A8'>
											Overall experience
										</Flex>
										<Flex>
											{Array(5)
												.fill('')
												.map((_, i) => (
													<Icon
														name='star'
														key={i}
														color={
															i < review.overall_rating ? '#344CD0' : 'gray.300'
														}
														ml='4px'
													/>
												))}
										</Flex>
									</Flex>
								) : null}
							</Flex>
						</Flex>
						<Flex align='center' ml='8%' mr='20%'>
							<Avatar size='lrg' src={`//logo.clearbit.com/${review.logo}`} />
						</Flex>
					</Flex>

					{/* Secondary info container */}
					{review.review_type === 'Company' ? (
						<Flex w='100%' backgroundColor='#344CD0' color='white' mt='56px'>
							<Flex
								w='100%'
								overflow='hidden'
								justify='space-evenly'
								align='center'
								py='1%'
							>
								<Flex align='center' wrap='nowrap'>
									<Image
										src={require('../../icons/clock-blue.png')}
										background='#F2F6FE'
										borderRadius='100%'
										p='6px'
										size='2.5em'
										mr='15px'
									/>
									<Flex flexDir='column'>
										<Flex as='h3' fontWeight='light' fontSize='md' isTruncated>
											{review.typical_hours} hrs week
										</Flex>
										<Flex as='h3' fontWeight='light' fontSize='sm' isTruncated>
											Working hours
										</Flex>
									</Flex>
								</Flex>
								<Flex align='center' wrap='nowrap'>
									<Image
										src={require('../../icons/dollar-sign-blue.png')}
										background='#F2F6FE'
										borderRadius='100%'
										p='6px'
										size='2.5em'
										mr='15px'
									/>
									<Flex flexDir='column'>
										<Flex as='h3' fontWeight='light' fontSize='md' isTruncated>
											${review.salary}.00
										</Flex>
										<Flex as='h3' fontWeight='light' fontSize='sm' isTruncated>
											Salary
										</Flex>
									</Flex>
								</Flex>
								<Flex align='center' wrap='nowrap'>
									<Image
										src={require('../../icons/user-check-blue.png')}
										background='#F2F6FE'
										borderRadius='100%'
										p='6px'
										size='2.5em'
										mr='15px'
									/>
									<Flex flexDir='column'>
										<Flex as='h3' fontWeight='light' fontSize='md' isTruncated>
											{review.work_status}
										</Flex>
										<Flex as='h3' fontWeight='light' fontSize='sm' isTruncated>
											Status
										</Flex>
									</Flex>
								</Flex>
								<Flex align='center' wrap='nowrap'>
									<Image
										src={require('../../icons/calendar-blue.png')}
										background='#F2F6FE'
										borderRadius='100%'
										p='6px'
										size='2.5em'
										mr='15px'
									/>
									<Flex flexDir='column'>
										<Flex as='h3' fontWeight='light' fontSize='md' isTruncated>
											{review.start_date} - {review.end_date}
										</Flex>
										<Flex as='h3' fontWeight='light' fontSize='sm' isTruncated>
											Date
										</Flex>
									</Flex>
								</Flex>
							</Flex>
						</Flex>
					) : review.review_type === 'Interview' ? (
						<Flex w='100%' backgroundColor='#344CD0' color='white' mt='4%'>
							<Flex
								w='100%'
								overflow='hidden'
								justify='space-evenly'
								align='center'
								py='1%'
							>
								<Flex align='center' wrap='nowrap'>
									<Image
										src={require('../../icons/difficulty-blue.png')}
										background='#F2F6FE'
										borderRadius='100%'
										p='6px'
										size='2.5em'
										mr='15px'
									/>
									<Flex flexDir='column'>
										{review.difficulty_rating === 5 ? (
											<Flex
												as='h3'
												fontWeight='light'
												fontSize='md'
												isTruncated
											>
												Very hard
											</Flex>
										) : review.difficulty_rating === 4 ? (
											<Flex
												as='h3'
												fontWeight='light'
												fontSize='md'
												isTruncated
											>
												Somewhat hard
											</Flex>
										) : review.difficulty_rating === 3 ? (
											<Flex
												as='h3'
												fontWeight='light'
												fontSize='md'
												isTruncated
											>
												Somewhat easy
											</Flex>
										) : review.difficulty_rating === 2 ? (
											<Flex
												as='h3'
												fontWeight='light'
												fontSize='md'
												isTruncated
											>
												Easy
											</Flex>
										) : review.difficulty_rating === 1 ? (
											<Flex
												as='h3'
												fontWeight='light'
												fontSize='md'
												isTruncated
											>
												Very easy
											</Flex>
										) : null}
										<Flex as='h3' fontWeight='light' fontSize='sm' isTruncated>
											Interview difficulty
										</Flex>
									</Flex>
								</Flex>
								<Flex align='center' wrap='nowrap'>
									<Image
										src={require('../../icons/dollar-sign-blue.png')}
										background='#F2F6FE'
										borderRadius='100%'
										p='6px'
										size='2.5em'
										mr='15px'
									/>
									<Flex flexDir='column'>
										<Flex as='h3' fontWeight='light' fontSize='md' isTruncated>
											${review.salary}.00
										</Flex>
										<Flex as='h3' fontWeight='light' fontSize='sm' isTruncated>
											Salary
										</Flex>
									</Flex>
								</Flex>
								<Flex align='center' wrap='nowrap'>
									{review.offer_status === 'Offer Accepted' ? (
										<Image
											src={require('../../icons/thumbs-up-blue.png')}
											background='#F2F6FE'
											borderRadius='100%'
											p='6px'
											size='2.5em'
											mr='15px'
										/>
									) : review.offer_status === 'Offer Declined' || 'No Offer' ? (
										<Image
											src={require('../../icons/thumbs-down-blue.png')}
											background='#F2F6FE'
											borderRadius='100%'
											p='6px'
											size='2.5em'
											mr='15px'
										/>
									) : null}
									<Flex flexDir='column'>
										<Flex as='h3' fontWeight='light' fontSize='md' isTruncated>
											{review.offer_status}
										</Flex>
										<Flex as='h3' fontWeight='light' fontSize='sm' isTruncated>
											Job offer
										</Flex>
									</Flex>
								</Flex>
								<Flex align='center' wrap='nowrap'>
									<Image
										src={require('../../icons/rounds-blue.png')}
										background='#F2F6FE'
										borderRadius='100%'
										p='6px'
										size='2.5em'
										mr='15px'
									/>
									<Flex flexDir='column'>
										<Flex as='h3' fontWeight='light' fontSize='md' isTruncated>
											{review.interview_rounds} Rounds
										</Flex>
										<Flex as='h3' fontWeight='light' fontSize='sm' isTruncated>
											Interview rounds
										</Flex>
									</Flex>
								</Flex>
							</Flex>
						</Flex>
					) : null}

					{/* Middle container */}
					{review.review_type === 'Interview' ? (
						<Flex
							as='h2'
							fontWeight='medium'
							fontSize='xl'
							w='100%'
							mt='2%'
							px='8%'
							overflow='hidden'
						>
							Interviews
						</Flex>
					) : null}
					{review.review_type === 'Interview' ? (
						<Flex justify='flex-start' wrap='wrap' whiteSpace='nowrap' px='8%'>
							{review.phone_interview ? (
								<Flex as='p' bg='#F2F6FE' px='1%' mt='1.5%' mr='3%'>
									Phone screening
								</Flex>
							) : null}
							{review.resume_review ? (
								<Flex as='p' bg='#F2F6FE' px='1%' mt='1.5%' mr='3%'>
									Resume review
								</Flex>
							) : null}
							{review.take_home_assignments ? (
								<Flex as='p' bg='#F2F6FE' px='1%' mt='1.5%' mr='3%'>
									Take home assignments
								</Flex>
							) : null}
							{review.online_coding_assignments ? (
								<Flex as='p' bg='#F2F6FE' px='1%' mt='1.5%' mr='3%'>
									Online coding assignments
								</Flex>
							) : null}
							{review.portfolio_review ? (
								<Flex as='p' bg='#F2F6FE' px='1%' mt='1.5%' mr='3%'>
									Portfolio review
								</Flex>
							) : null}
							{review.screen_share ? (
								<Flex as='p' bg='#F2F6FE' px='1%' mt='1.5%' mr='3%'>
									Screen share
								</Flex>
							) : null}
							{review.open_source_contribution ? (
								<Flex as='p' bg='#F2F6FE' px='1%' mt='1.5%' mr='3%'>
									Open source contribution
								</Flex>
							) : null}
							{review.side_projects ? (
								<Flex as='p' bg='#F2F6FE' px='1%' mt='1.5%' mr='3%'>
									Side projects
								</Flex>
							) : null}
						</Flex>
					) : null}

					{/* Edit/Delete container */}
					<Flex justify='flex-end' mt='2%' px='8%'>
						{Number(loginId) === Number(review.user_id) ? (
							<Image
								src={require('../../icons/edit.png')}
								onClick={navToEditRoute}
								cursor='pointer'
								size='1.5em'
								mr='12px'
								data-cy='editModalReview'
							/>
						) : null}
						{Number(loginId) === Number(review.user_id) ? (
							<Image
								src={require('../../icons/trash.png')}
								onClick={() => setIsOpen2(true)}
								cursor='pointer'
								size='1.5em'
								data-cy='deleteModalReview'
							/>
						) : null}
						<AlertDialog
							isOpen={isOpen2}
							leastDestructiveRef={cancelRef}
							onClose={onClose2}
						>
							<AlertDialogOverlay />
							<AlertDialogContent>
								<AlertDialogHeader fontSize='lg' fontWeight='bold'>
									Delete review
								</AlertDialogHeader>

								<AlertDialogBody>
									Are you sure? You can't undo this action afterwards.
								</AlertDialogBody>

								<AlertDialogFooter>
									<Flex
										align='center'
										justify='center'
										height='56px'
										width='30%'
										color='#344CD0'
										fontSize='16px'
										fontWeight='bold'
										ref={cancelRef}
										onClick={onClose2}
									>
										Cancel
									</Flex>
									<Button
										h='56px'
										rounded='10px'
										border='none'
										color='white'
										variantColor='red'
										ml={3}
										onClick={submitDelete}
										data-cy='confirmDeleteModalReview'
									>
										Delete
									</Button>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</Flex>

					{/* Review container */}
					<Flex
						as='p'
						w='100%'
						wrap='nowrap'
						name='comment'
						overflow='hidden'
						pt='2%'
						px='8%'
						align='center'
					>
						{review.comment}
					</Flex>

					<ModalFooter>
						<BlockButton user_id={review.user_id} isAdmin={isAdmin} />
						<ContentButton
							isAdmin={isAdmin}
							submitDelete={submitDelete}
							user_id={review.user_id}
							review_id={review.review_id}
						/>
					</ModalFooter>
				</ModalContent>
			</Modal>

			{/* ------------------------------------------------------------------------------------------------ */}
			{/* ---------------------------------------DashBoard Cards------------------------------------------ */}
			{/* ------------------------------------------------------------------------------------------------ */}

			{/* Review container */}
			<PseudoBox
				mb='3%'
				mx='2.5%'
				px='1%'
				py='1%'
				
				border="1px solid #E9F0FF"
				width="408px"
				height="309px"
				borderRadius='12px'
				display='flex'
				flexDir='column'
				_hover={{ bg: '#E9F0FF' }}
				onClick={onOpen}
				data-cy='modalCard'
			>
				{/* Review content container */}
				<Flex flexDir='column' >
					{/* headline container  */}
					<Flex maxW='530px'  >
						<Flex height="115px" justify="space-between" maxW='391px'  p='2% 5%' wrap='wrap'  >
							<Flex
                maxW='300px'
							>
								{review.review_type === "Company" ? <Image backgorund="gray" width="106px" height="40px" src={`https://logo.clearbit.com/${review.logo != "unknown" ? review.logo : logo}`} /> : review.job_title}
							</Flex>
							<i style={{alignSelf:"center", fontSize:"22px", opacity:".2"}} class="far fa-heart"></i>
							<Flex justify="space-between" width='391px' pt="2%">
								<Flex align='center'>
									{Array(5)
										.fill('')
										.map((_, i) => (
											<Icon
												name='star'
												key={i}
												color={
													i < review.overall_rating ? '#F9DC76' : '#fff'
												}
												ml='8%'
											/>
										))}
								</Flex>
								<Flex>
									{newTag ? (
						
							<Text
							style={{color:"#457929", fontSize:"14px", fontWeight:"bold"}}
							>
								New
							</Text>
						
					) : <Text
					style={{ color:"#BBBDC6",fontSize:"14px",fontWeight:"bold"}}
					>
						x days old
					</Text>}</Flex>
							</Flex>
<Flex width="391px" height="45px" pt="15px"><Image width="20px" height="20px" mt="1%" src={require('../../icons/comment.png')}/><span style={{paddingLeft:'5px'}}>{review.review_type} review</span></Flex>
						</Flex>
					</Flex>
				</Flex>
				{/* summary container */}
				<Flex width="100%" height="100px">
				<Flex m="10px 20px" w='348px' h='55px'  overflow='hidden'>
					<p style={{fontSize:"14px", color:"gray"}}>{review.comment}</p>
				</Flex>
				</Flex>
				<Flex margin="0px 12px 0px 20px" align="center" pt="5px" height="40px" justify="space-between">
<Flex alignItems="center"><Avatar size='md' src={review.user_profile_image}/><Text pl="5px" fontSize="14px">{review.user_first_name} {review.user_last_name}</Text></Flex>
					<Badge
						backgroundColor={trackColorPicker(review.track_name) }
						color={trackFontColor(review.track_name)}
						fontSize='1em'
						fontWeight='light'
						rounded='full'
					textAlign="center"
					pt="5px"
						overflow='hidden'
						ml='10px'
						width="58px"
						height="36px"
					>
						<span>{review.track_name}</span> 
					</Badge>
					</Flex>
			</PseudoBox>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		reviewDeleted: state.review.reviewDeleted,
		isAdmin: state.auth.isAdmin,
	};
};
export default connect(mapStateToProps, deleteReview)(ReviewCard);
