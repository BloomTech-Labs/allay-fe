// previously ReviewList
import React from 'react';
import { connect } from 'react-redux';
// actions
import getReview from '../../state/actions/index';
// icons
import {
	TiLocationOutline,
	TiArchive,
	TiThumbsUp,
	TiThumbsDown,
	TiGlobe
} from 'react-icons/ti';
import { GiWeightLiftingUp } from 'react-icons/gi';
// styles
import {
	Box,
	Avatar,
	Flex,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalFooter,
	ModalCloseButton,
	Button,
	useDisclosure
} from '@chakra-ui/core';

const ReviewCard = ({ review, history }) => {
	// basic usage for the SingleReview modal
	const { isOpen, onOpen, onClose } = useDisclosure();

	//routes to single review
	const learnMore = () => {
		history.push(`/dashboard/${review.id}`);
	};

	return (
		<>
			{/* ------------------------------------------------------------------------------------------------ */}
			{/* ---------------------------------------Modal Cards---------------------------------------------- */}
			{/* ------------------------------------------------------------------------------------------------ */}
			<Modal isOpen={isOpen} onClose={onClose} size='80%'>
				<ModalOverlay />
				<ModalContent w='100%' px='12%' py='3%' wrap='nowrap'>
					<ModalCloseButton background='none' border='none' />

					{/* Basic info container */}
					<Flex align='center'>
						<Flex align='center'>
							<Avatar size='xxl' src={`//logo.clearbit.com/${review.domain}`} />
						</Flex>
						<Flex flexDir='column' pl='4%'>
							<Flex as='h1' w='100%' align='center' wrap='nowrap'>
								{review.company_name} Interview Review
							</Flex>
							<Flex
								as='h2'
								fontSize='lg'
								w='100%'
								fontWeight='medium'
								align='center'
								wrap='nowrap'
							>
								{review.interview_rating} STARS
							</Flex>
							<Flex as='p' fontSize='md' align='center' wrap='nowrap'>
								Position: {review.job_title}
							</Flex>
						</Flex>
					</Flex>

					{/* Secondary info container */}
					<Flex w='100%' flexDir='column'>
						<Flex w='100%' mt='1.5%' overflow='hidden' justify='space-between'>
							<Flex align='center' wrap='nowrap'>
								<Box as={TiLocationOutline} mr='5px'></Box>
								<Flex as='h3' fontWeight='light' fontSize='lg' isTruncated>
									{review.job_location}
								</Flex>
							</Flex>
							<Flex align='center' wrap='nowrap'>
								{review.offer_received ? (
									<>
										<Box as={TiThumbsUp} mr='5px'></Box>
										<Flex as='h3' fontWeight='light' fontSize='lg'>
											Received 0ffer
										</Flex>{' '}
									</>
								) : (
									<>
										{' '}
										<Box as={TiThumbsDown} mr='5px'></Box>
										<Flex as='h3' fontWeight='light' fontSize='lg'>
											No Offer
										</Flex>{' '}
									</>
								)}
							</Flex>
							<Flex align='center' wrap='nowrap'>
								<Box as={GiWeightLiftingUp} mr='5px'></Box>
								<Flex as='h3' fontWeight='light' fontSize='lg' isTruncated>
									Difficult
								</Flex>
							</Flex>
							<Flex align='center' wrap='nowrap'>
								<Box as={TiGlobe} mr='5px'></Box>
								<Flex as='h3' fontWeight='light' fontSize='lg' isTruncated>
									4 Rounds
								</Flex>
							</Flex>
						</Flex>
					</Flex>

					{/* Types container */}
					<Flex
						as='h2'
						fontWeight='medium'
						fontSize='xl'
						w='100%'
						mt='3%'
						mb='1.5%'
						overflow='hidden'
					>
						Interview Types
					</Flex>
					<Flex justify='space-between' wrap='wrap' mb='2%'>
						<Flex as='p' bg='#F2F6FE' px='1%' mb='1.5%' overflow='hidden'>
							Phone screening
						</Flex>
						<Flex as='p' bg='#F2F6FE' px='1%' mb='1.5%' overflow='hidden'>
							Online coding test
						</Flex>
						<Flex as='p' bg='#F2F6FE' px='1%' mb='1.5%' overflow='hidden'>
							Behavioral questions
						</Flex>
						<Flex as='p' bg='#F2F6FE' px='1%' mb='1.5%' overflow='hidden'>
							Case interviews
						</Flex>
						<Flex as='p' bg='#F2F6FE' px='1%' mb='1.5%' overflow='hidden'>
							Whiteboarding
						</Flex>
					</Flex>

					{/* Review container */}
					<Flex as='p' w='100%' wrap='nowrap' overflow='hidden'>
						{review.job_review}
					</Flex>
					<Flex
						as='h2'
						w='100%'
						fontWeight='medium'
						fontSize='xl'
						wrap='nowrap'
						overflow='hidden'
						mt='3%'
					>
						Overall Rating 5 Stars!
					</Flex>
					<Flex
						as='h2'
						w='100%'
						fontWeight='medium'
						fontSize='xl'
						wrap='nowrap'
						overflow='hidden'
						mt='1.5%'
					>
						Salary Offered ${review.salary}
					</Flex>

					<ModalFooter>
						<Button
							background='#344CD0'
							color='#FFFFFF'
							rounded='6px'
							border='none'
							size='lg'
							mr='2%'
						>
							Edit
						</Button>
						<Button
							background='#B90101'
							color='#FFFFFF'
							rounded='6px'
							border='none'
							size='lg'
							mr='2%'
						>
							Delete
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
			{/* ------------------------------------------------------------------------------------------------ */}
			{/* ---------------------------------------DashBoard Cards------------------------------------------ */}
			{/* ------------------------------------------------------------------------------------------------ */}
			{/* Review container */}
			<Flex
				w='45%'
				h='312px'
				mb='1%'
				mt='3%'
				ml='2.5%'
				px='30px'
				wrap='nowrap'
				background='#F2F6FE'
				borderRadius='12px'
				justify='center'
				align='center'
				onClick={onOpen}
			>
				{/* Review content container */}
				<Flex
					w='100%'
					h='82%'
					mx='5%'
					wrap='wrap'
					justify='right'
					alignContent='center'
				>
					{/* headline line container  */}
					<Flex w='100%' h='100px' mb='3%'>
						{/* avatar box */}
						<Box justify='center' align='center' h='88px' mr='36px'>
							<Avatar size='xl' src={`//logo.clearbit.com/${review.domain}`} />
						</Box>
						{/* tag container */}
						<Flex w='100%' h='32px' wrap='wrap'>
							<Flex
								as='h2'
								w='100%'
								align='center'
								wrap='nowrap'
								overflow='hidden'
								isTruncated
							>
								{review.tagline}
							</Flex>
							<Flex as='h4' w='100%' align='center' wrap='nowrap'>
								Job Rating: {review.job_rating}
								{/* {Array(5)
                  .fill('')
                  .map((_, i) => (
                    <StarIcon
                      key={i}
                      color={i < review.job_rating ? 'teal.500' : 'gray.300'}
                    />
                  ))} */}
							</Flex>
							{/* <Flex align='center' w='40%' wrap='nowrap'> */}
							<Flex as='p' w='100%' fontWeight='light'>
								Position: {review.job_title}
							</Flex>
						</Flex>
						{/* </Flex> */}
					</Flex>

					{/* Company name & location container */}
					<Flex
						w='100%'
						justify='center'
						align='center'
						wrap='nowrap'
						mb='1%'
						mt=''
					>
						<Flex align='center' w='100%' wrap='nowrap'>
							<Box as={TiArchive} mr='10px'></Box>
							<Flex as='p' font-size='18' fontWeight='light' overflow='hidden'>
								{review.company_name}
							</Flex>
						</Flex>
						<Flex align='center' w='100%' wrap='nowrap'>
							<Box as={TiLocationOutline} mr='10px'></Box>
							<Flex as='p' font-size='18' fontWeight='light'>
								{review.job_location}
							</Flex>
						</Flex>
						<Flex align='center' w='100%' wrap='nowrap'>
							{review.offer_received ? (
								<>
									<Box as={TiThumbsUp} mr='10px'></Box>
									<Flex as='p' font-size='18' fontWeight='light'>
										Received Offer
									</Flex>{' '}
								</>
							) : (
								<>
									{' '}
									<Box as={TiThumbsDown} mr='10px'></Box>
									<Flex as='p' font-size='18' fontWeight='light' mr='10px'>
										No Offer
									</Flex>{' '}
								</>
							)}
						</Flex>
					</Flex>

					{/* summary container */}
					<Flex w='100%' h='95px' overflow='hidden'>
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
