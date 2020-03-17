import React, { useState } from 'react';
//styles
import { Flex, Avatar } from '@chakra-ui/core';
import AOS from 'aos';
import 'aos/dist/aos.css';

//components
import InterviewForm from './InterviewForm';
import ReviewForm2 from './ReviewForm2';

const FormController = () => {
	// initialize AOS
	AOS.init();
	// state to show interview review
	const [showInterview, setShowInterview] = useState(false);
	// state to show company review
	const [showCompanyReview, setShowCompanyReview] = useState(false);

	return (
		// main container
		<Flex background='#E5E5E5' w='100%' minH='100vh' justify='center'>
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
					{/* Start of messenger  */}
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
						data-aos-delay='50'
						data-aos-duration='1000'
						data-aos-easing='ease-in-out'
						data-aos-mirror='true'
						data-aos-once='false'
					>
						<p>
							Hello there! Thank you for choosing to post. Your reviews help
							Lambda students and alumni tremendously.
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
						data-aos-delay='2000'
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
							w='459px'
							h='234px'
							mb='8%'
							px='6'
							py='10'
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
							<Flex>
								<Flex
									border='1px solid black'
									borderRadius='50%'
									w='100px'
									h='100px'
									mr='15%'
									onClick={() => {
										setShowInterview(true);
										setShowCompanyReview(false);
									}}
								/>
								<Flex
									border='1px solid black'
									borderRadius='50%'
									w='100px'
									h='100px'
									onClick={() => {
										setShowInterview(false);
										setShowCompanyReview(true);
									}}
								/>
							</Flex>

							<Flex w='100%' pl='2%' mt='3%'>
								<Flex as='h4' w='15%' mr='24%' textAlign='center'>
									Interview Review
								</Flex>
								<Flex as='h4' w='15%' textAlign='center'>
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
					{showInterview ? <InterviewForm /> : null}

					{showCompanyReview ? <ReviewForm2 /> : null}
				</Flex>

				{/* blank space container */}
				<Flex w='30%' />
			</Flex>
		</Flex>
	);
};

export default FormController;
