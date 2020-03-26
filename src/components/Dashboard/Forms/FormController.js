import React, { useState } from 'react';
//styles
import companyIcon from '../../../companyIcon.png';
import interviewIcon from '../../../interviewIcon.png';
import { Flex, Avatar, Button, Image } from '@chakra-ui/core';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProgressBar from '../../Reusable/ProgressBar.js';
//components
import InterviewForm from './InterviewForm';
import CompanyReviewForm from './CompanyReviewForm';

const FormController = ({ history }) => {
	// initialize AOS
	AOS.init();
	// state to show interview review
	const [showInterview, setShowInterview] = useState(false);
	// state to show company review
	const [showCompanyReview, setShowCompanyReview] = useState(false);
	//progress bar
	//progress bar
	const [progress] = useState({
		prec: 99,
		mins: 10,
		prog: 2
	});

	return (
		// main container
		<>
			<Flex className='Splash' w='100vw' minH='100vh' justify='center'>
				{/* max size */}
				<Flex maxW='1440px' w='100%'>
					{/* form container */}
					<Flex
						w='70%'
						bg='white'
						justify='center'
						flexDir='column'
						// px='2%'
						pt='5%'
					>
						{/* progress header */}
						<Flex
							pt='1%'
							px='2%'
							w='70%'
							h='108px'
							background='#344CD0'
							top='0'
							position='fixed'
							overflow='hidden'
							zIndex='999'
							direction='column'
						>
							<Flex w='100%' color='#FFFFFF'>
								Your progress
							</Flex>

							<Flex w='100%' justify='space-between' mb='1%' color='#FFFFFF'>
								{progress.prec === 100 ? (
									<>
										<Flex as='h4'>{progress.prec}% Completed!</Flex>{' '}
									</>
								) : (
									<>
										<Flex as='h4'>{progress.prec}% not completed</Flex>
										<Flex color='#FFFFFF'> {progress.mins} mins</Flex>
									</>
								)}
							</Flex>
							<ProgressBar value={progress.prog} />
						</Flex>
						<Flex
							w='70%'
							pb='1%'
							justify='flex-end'
							bottom='0'
							position='fixed'
							overflow='hidden'
							zIndex='997'
						>
							<Button
								onClick={() => {
									history.push('/dashboard');
								}}
							>
								Cancel
							</Button>
						</Flex>
						{/* Start of messenger  */}
						<Flex
							align='center'
							p='1%'
							ml='2%'
							w='416px'
							mt='10%'
							mb='2%'
							bg='#F2F6FE'
							position='relative'
							right='0'
							bottom=' 0'
							left='0'
							rounded='20px'
							data-aos='fade-right'
							data-aos-offset='200'
							data-aos-delay='50'
							data-aos-duration='1000'
							data-aos-easing='ease-in-out'
							data-aos-mirror='false'
							data-aos-once='false'
						>
							<p>
								Hi {localStorage.getItem('username')},{' '}
								<span role='img' aria-label='smile'>
									🙂
								</span>{' '}
								Thank you for choosing to post.
							</p>
						</Flex>
						<Flex
							align='center'
							p='1%'
							ml='2%'
							w='416px'
							mb='2%'
							bg='#F2F6FE'
							rounded='20px'
							data-aos='fade-right'
							data-aos-offset='200'
							data-aos-delay='1000'
							data-aos-duration='1000'
							data-aos-easing='ease-in-out'
							data-aos-mirror='true'
							data-aos-once='false'
						>
							<p>
								Sharing your experience through your posts encourages others to
								do the same and promotes the exchange of helpful information
							</p>
						</Flex>
						<Flex
							align='center'
							p='1%'
							ml='2%'
							w='416px'
							mb='8%'
							bg='#F2F6FE'
							rounded='20px'
							data-aos='fade-right'
							data-aos-offset='200'
							data-aos-delay='2500'
							data-aos-duration='1000'
							data-aos-easing='ease-in-out'
							data-aos-mirror='true'
							data-aos-once='false'
						>
							<p>What do you want to post about?</p>
						</Flex>
						{/* company container  */}
						<Flex w='100%' justify='flex-end'>
							{/* company box */}

							<Flex
								w='465px'
								h='234px'
								mb='8%'
								px='6'
								py='5'
								border='1px solid #BBBDC6'
								rounded='6px'
								flexDir='column'
								data-aos='fade-in'
								data-aos-offset='200'
								data-aos-delay='3000'
								data-aos-duration='2000'
								data-aos-easing='ease-in-out'
								data-aos-mirror='true'
								data-aos-once='false'
							>
								<Flex
									w='100%'
									color='#494B5B'
									fontSize='20px'
									fontWeight='light'
								>
									Choose a topic
								</Flex>
								<Flex justify='space-evenly' mt='3%'>
									<Flex
										justify='center'
										align='center'
										w='100px'
										h='100px'
										// mr='15%'
										onClick={() => {
											setShowInterview(true);
											setShowCompanyReview(false);
										}}
									>
										<Image src={interviewIcon} alt='Company Review Icon' />
									</Flex>
									<Flex
										justify='center'
										align='center'
										w='100px'
										h='100px'
										onClick={() => {
											setShowInterview(false);
											setShowCompanyReview(true);
										}}
										data-cy='companyReviewButton'
									>
										<Image src={companyIcon} alt='Company Review Icon' />
									</Flex>
								</Flex>

								<Flex w='100%' mt='1%' justify='space-evenly'>
									<Flex
										as='h4'
										w='96px'
										h='44px'
										textAlign='center'
										color='#494B5B'
										fontWeight='light'
										fontSize='16px'
									>
										Interview Review
									</Flex>
									<Flex
										as='h4'
										w='96px'
										h='44px'
										textAlign='center'
										color='#494B5B'
										fontWeight='light'
										fontSize='16px'
									>
										Company Review
									</Flex>
								</Flex>
							</Flex>
							{/* avatar */}
							<Flex
								h='234px'
								align='flex-end'
								ml='1%'
								mr='2%'
								data-aos='fade-in'
								data-aos-offset='200'
								data-aos-delay='3000'
								data-aos-duration='2000'
								data-aos-easing='ease-in-out'
								data-aos-mirror='true'
								data-aos-once='false'
							>
								<Avatar size='md' src='https://bit.ly/broken-link' />
							</Flex>
						</Flex>
						{showInterview ? <InterviewForm history={history} /> : null}

						{showCompanyReview ? <CompanyReviewForm history={history} /> : null}
					</Flex>

					{/* blank space container */}
					<Flex w='30%' />
				</Flex>
			</Flex>
		</>
	);
};

export default FormController;
