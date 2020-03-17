import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
// redux
import { connect } from 'react-redux';
// actions
import postReview from '../../../state/actions';
import getCompanies from '../../../state/actions';
import postCompany from '../../../state/actions';
// styles
import BeautyStars from 'beauty-stars';
import {
	FormControl,
	Flex,
	Select,
	Input,
	Textarea,
	Button,
	Spinner,
	FormErrorMessage,
	FormLabel,
	InputGroup,
	InputLeftElement,
	Avatar,
	Progress
} from '@chakra-ui/core';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ReviewForm2 = props => {
	// star rating
	const [starState, setStarState] = useState(0);

	//progress bar
	const [progress, setProgress] = useState({
		prec: 99,
		mins: 10,
		prog: 2
	});

	// state for visibility
	const [Tag2, setTag2] = useState(false);
	const [Tag3, setTag3] = useState(false);
	const [Tag4, setTag4] = useState(false);
	const [Tag5, setTag5] = useState(false);
	const [Tag6, setTag6] = useState(false);
	const [Tag7, setTag7] = useState(false);

	// brings to top on render
	useEffect(() => {
		const element = document.getElementById('Tag1');
		element.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
	}, []);

	// timers for moves
	let timer = null;
	// 2nd tag
	const time1 = () => {
		clearTimeout(timer);
		timer = setTimeout(routeTo2, 2000);
	};

	const routeTo2 = () => {
		setTag2(true);
		setProgress({
			prec: 80,
			mins: 8,
			prog: 20
		});
		const element = document.getElementById('Tag2');
		element.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};
	// 3rd tag
	const time2 = () => {
		clearTimeout(timer);
		timer = setTimeout(routeTo3, 2000);
	};

	const routeTo3 = () => {
		setTag3(true);
		setProgress({
			prec: 70,
			mins: 7,
			prog: 30
		});
		const element = document.getElementById('Tag3');
		element.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};
	//4th tag
	const time3 = () => {
		clearTimeout(timer);
		timer = setTimeout(routeTo4, 2000);
	};

	const routeTo4 = () => {
		setTag4(true);
		setProgress({
			prec: 60,
			mins: 6,
			prog: 40
		});
		const element = document.getElementById('Tag4');
		element.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};
	// 5th tag
	const time4 = () => {
		clearTimeout(timer);
		timer = setTimeout(routeTo5, 2000);
	};

	const routeTo5 = () => {
		setTag5(true);
		setProgress({
			prec: 50,
			mins: 5,
			prog: 50
		});
		const element = document.getElementById('Tag5');
		element.scrollIntoView({ behavior: 'smooth', block: 'center' });
	};
	// 6th tag
	const time5 = () => {
		clearTimeout(timer);
		timer = setTimeout(routeTo6, 2000);
	};

	const routeTo6 = () => {
		setTag6(true);
		setProgress({
			prec: 40,
			mins: 4,
			prog: 60
		});
		const element = document.getElementById('Tag6');
		element.scrollIntoView({ behavior: 'smooth', block: 'center' });
	};
	// 7th tag
	const time6 = () => {
		clearTimeout(timer);
		timer = setTimeout(routeTo7, 2000);
	};

	const routeTo7 = () => {
		setTag7(true);
		setProgress({
			prec: 30,
			mins: 3,
			prog: 70
		});
		const element = document.getElementById('Tag7');
		element.scrollIntoView({ behavior: 'smooth', block: 'center' });
	};

	// date auto complete
	const dateArray = [
		2000,
		2001,
		2002,
		2003,
		2004,
		2005,
		2006,
		2007,
		2008,
		2009,
		2010,
		2011,
		2012,
		2013,
		2014,
		2015,
		2016,
		2017,
		2018,
		2019,
		2020
	];

	return (
		// main container
		<Flex background='#E5E5E5' w='100%' justify='center'>
			{/* max size */}
			<Flex maxW='1440px' w='100%'>
				{/* progress header */}
				<Flex
					pt='1%'
					px='2%'
					w='70%'
					h='108px'
					background='#F2F6FE'
					top='0'
					position='fixed'
					overflow='hidden'
					zIndex='999'
					direction='column'
				>
					<Flex w='100%' color='#259BF8'>
						Your progress
					</Flex>

					<Flex w='100%' justify='space-between' mb='1%'>
						{progress.prec === 100 ? (
							<>
								<Flex as='h4'>{progress.prec}% Completed!</Flex>{' '}
							</>
						) : (
							<>
								<Flex as='h4'>{progress.prec}% not completed</Flex>
								<Flex color='#259BF8'> {progress.mins} mins</Flex>
							</>
						)}
					</Flex>
					<Progress hasStripe isAnimated value={progress.prog} />
				</Flex>
				{/* form container */}
				<Flex w='100%' bg='white' flexDir='column' px='2%' pt='5%'>
					{/* start of form  */}
					<form>
						<FormControl>
							{/* first prompt */}
							<Flex
								id='Tag1'
								align='center'
								h='5%'
								p='1%'
								w='416px'
								mb='8%'
								mt='5%'
								bg='#F2F6FE'
								rounded='20px'
								data-aos='fade-right'
								data-aos-offset='200'
								data-aos-delay='50'
								data-aos-duration='1000'
								data-aos-easing='ease-in-out'
								data-aos-mirror='true'
								data-aos-once='true'
							>
								<p>Tell me some details so we can get started</p>
							</Flex>
							{/* form container  */}
							<Flex w='100%' justify='flex-end'>
								{/* company box */}
								<Flex
									w='459px'
									h='257px'
									mb='20%'
									px='6'
									py='8'
									border='1px solid #BBBDC6'
									rounded='6px'
									flexDir='column'
									data-aos='fade-in'
									data-aos-offset='200'
									data-aos-delay='1000'
									data-aos-duration='1500'
									data-aos-easing='ease-in-out'
									data-aos-mirror='true'
									data-aos-once='true'
								>
									<FormLabel>1. Company name</FormLabel>
									<Input
										variant='filled'
										h='56px'
										mb='6'
										rounded='6px'
										type='text'
										label='company_name'
										name='company_name'
										list='company_name'
										autoCapitalize='none'
									/>
									<datalist id='company_name'>
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>1</option>
										<option>1</option>
									</datalist>
									<FormLabel>2. Status at the company</FormLabel>
									<Select
										h='56px'
										rounded='6px'
										variant='filled'
										label=''
										name=''
										placeholder='Select one'
										onChange={time1}
									>
										<option>Current employee</option>
										<option>Former employee</option>
										<option>Part time</option>
										<option>Full time</option>
										<option>Intern</option>
									</Select>
								</Flex>
								{/* avatar */}
								<Flex
									h='257px'
									align='flex-end'
									ml='1%'
									data-aos='fade-in'
									data-aos-offset='200'
									data-aos-delay='1000'
									data-aos-duration='1500'
									data-aos-easing='ease-in-out'
									data-aos-mirror='true'
									data-aos-once='true'
								>
									<Avatar size='md' src='https://bit.ly/broken-link' />
								</Flex>
							</Flex>
							{/* Second prompt */}
							{Tag2 ? (
								<>
									<Flex
										id='Tag2'
										align='center'
										h='5%'
										p='1%'
										w='416px'
										mb='8%'
										bg='#F2F6FE'
										rounded='20px'
									>
										<p>I need a little more detail still</p>
									</Flex>
									{/* form container  */}
									<Flex w='100%' justify='flex-end'>
										{/* job title box */}
										<Flex
											w='459px'
											h='257px'
											mb='8%'
											px='6'
											py='8'
											border='1px solid #BBBDC6'
											rounded='6px'
											flexDir='column'
											data-aos='fade-in'
											data-aos-offset='200'
											data-aos-delay='1000'
											data-aos-duration='1500'
											data-aos-easing='ease-in-out'
											data-aos-mirror='true'
											data-aos-once='true'
										>
											<FormLabel>1. Job Title</FormLabel>
											<Input
												variant='filled'
												h='56px'
												mb='6'
												rounded='6px'
												type='text'
												label='company_name'
												name='company_name'
												list='company_name'
												autoCapitalize='none'
											/>
											<FormLabel>2. Length of position</FormLabel>
											<Flex w='100%' justify='space-between'>
												<Input
													type='date'
													h='56px'
													w='45%'
													mr='2%'
													rounded='6px'
													variant='filled'
													label=''
													name='posdate1'
													placeholder='Select one'
												/>

												<Input
													type='date'
													h='56px'
													w='45%'
													rounded='6px'
													variant='filled'
													label=''
													name=''
													placeholder='Select one'
													onChange={time2}
												/>
											</Flex>
										</Flex>
										{/* avatar */}
										<Flex
											h='257px'
											align='flex-end'
											ml='1%'
											data-aos='fade-in'
											data-aos-offset='200'
											data-aos-delay='1000'
											data-aos-duration='1500'
											data-aos-easing='ease-in-out'
											data-aos-mirror='true'
											data-aos-once='true'
										>
											<Avatar size='md' src='https://bit.ly/broken-link' />
										</Flex>
									</Flex>
								</>
							) : null}
							{/* third prompt */}
							{Tag3 ? (
								<>
									<Flex
										id='Tag3'
										align='center'
										p='1%'
										mb='2%'
										h='5%'
										w='416px'
										bg='#F2F6FE'
										rounded='20px'
									>
										<p>Thank you for that information</p>
									</Flex>
									<Flex
										id='commentTag'
										align='center'
										p='1%'
										h='5%'
										w='416px'
										mb='8%'
										bg='#F2F6FE'
										rounded='20px'
									>
										<p>
											Please write your comment below. Some topics you can
											discuss are company culture, work environment, career
											growth, salary etc.
										</p>
									</Flex>
									<Flex w='100%' justify='flex-end'>
										{/* long hand interview box */}
										<Flex
											w='459px'
											h='242px'
											mb='8%'
											px='6'
											py='8'
											border='1px solid #BBBDC6'
											rounded='6px'
											flexDir='column'
											data-aos='fade-in'
											data-aos-offset='200'
											data-aos-delay='1000'
											data-aos-duration='1500'
											data-aos-easing='ease-in-out'
											data-aos-mirror='true'
											data-aos-once='true'
											data-aod-anchor='#commentTag'
										>
											<FormLabel>Comments</FormLabel>
											<Textarea
												variant='filled'
												h='144px'
												rowsMax={6}
												type='text'
												name='interview_review'
												rounded='6px'
												onKeyUp={time3}
											/>
										</Flex>
										{/* avatar */}
										<Flex
											h='242px'
											align='flex-end'
											ml='1%'
											data-aos='fade-in'
											data-aos-offset='200'
											data-aos-delay='1000'
											data-aos-duration='1500'
											data-aos-easing='ease-in-out'
											data-aos-mirror='true'
											data-aos-once='true'
										>
											<Avatar size='md' src='https://bit.ly/broken-link' />
										</Flex>
									</Flex>{' '}
								</>
							) : null}
							{/* 4th prompt */}
							{Tag4 ? (
								<>
									<Flex
										id='Tag4'
										align='center'
										h='5%'
										p='1%'
										w='416px'
										mb='2%'
										bg='#F2F6FE'
										rounded='20px'
									>
										<p>Thank you for sharing that</p>
									</Flex>
									<Flex
										align='center'
										h='5%'
										p='1%'
										w='416px'
										mb='8%'
										bg='#F2F6FE'
										rounded='20px'
									>
										<p>To understand better can you please add some details</p>
									</Flex>
									{/* hours container  */}
									<Flex w='100%' justify='flex-end'>
										{/* hours box */}
										<Flex
											w='459px'
											h='136px'
											mb='8%'
											p='6'
											border='1px solid #BBBDC6'
											rounded='6px'
											flexDir='column'
											data-aos='fade-in'
											data-aos-offset='200'
											data-aos-delay='1000'
											data-aos-duration='1500'
											data-aos-easing='ease-in-out'
											data-aos-mirror='true'
											data-aos-once='true'
										>
											<FormLabel>Working hours</FormLabel>
											<Select
												h='56px'
												mb='6'
												rounded='6px'
												variant='filled'
												label=''
												name=''
												placeholder='Select one'
												onChange={time4}
											/>
										</Flex>
										{/* avatar */}
										<Flex
											h='136px'
											align='flex-end'
											ml='1%'
											data-aos='fade-in'
											data-aos-offset='200'
											data-aos-delay='1000'
											data-aos-duration='1500'
											data-aos-easing='ease-in-out'
											data-aos-mirror='true'
											data-aos-once='true'
										>
											<Avatar size='md' src='https://bit.ly/broken-link' />
										</Flex>
									</Flex>{' '}
								</>
							) : null}
							{/* 5th prompt */}
							{Tag5 ? (
								<>
									<Flex
										id='Tag5'
										align='center'
										h='5%'
										p='1%'
										w='416px'
										mb='8%'
										bg='#F2F6FE'
										rounded='20px'
									>
										<p>
											Posting your salary helps many job-seekers negotiate for
											fair salaries
										</p>
									</Flex>
									{/* salary container  */}
									<Flex w='100%' justify='flex-end'>
										{/* salary box */}
										<Flex
											w='459px'
											h='150px'
											mb='8%'
											p='6'
											border='1px solid #BBBDC6'
											rounded='6px'
											flexDir='column'
											data-aos='fade-in'
											data-aos-offset='200'
											data-aos-delay='1000'
											data-aos-duration='1500'
											data-aos-easing='ease-in-out'
											data-aos-mirror='true'
											data-aos-once='true'
										>
											<FormLabel>Salary</FormLabel>
											<InputGroup>
												<InputLeftElement
													mb='4'
													py='28px'
													color='gray.300'
													fontSize='1.2em'
													children='$'
												/>
												<Input
													h='56px'
													rounded='6px'
													type='number'
													variant='filled'
													label='job_title'
													name='job_title'
													autoCapitalize='none'
													onChange={time5}
												/>
											</InputGroup>
										</Flex>
										{/* avatar */}
										<Flex
											h='150px'
											align='flex-end'
											ml='1%'
											data-aos='fade-in'
											data-aos-offset='200'
											data-aos-delay='1000'
											data-aos-duration='1500'
											data-aos-easing='ease-in-out'
											data-aos-mirror='true'
											data-aos-once='true'
										>
											<Avatar size='md' src='https://bit.ly/broken-link' />
										</Flex>
									</Flex>{' '}
								</>
							) : null}
							{/* 6th prompt */}
							{Tag6 ? (
								<>
									<Flex
										id='Tag6'
										align='center'
										h='5%'
										w='416px'
										p='1%'
										mb='2%'
										bg='#F2F6FE'
										rounded='20px'
									>
										<p>Awesome! Thank you for sharing that.</p>
									</Flex>
									<Flex
										align='center'
										p='1%'
										h='5%'
										w='416px'
										mb='8%'
										bg='#F2F6FE'
										rounded='20px'
									>
										<p>One last question</p>
									</Flex>
									{/* overall container  */}
									<Flex w='100%' justify='flex-end'>
										{/* overall box */}
										<Flex
											w='459px'
											h='136px'
											mb='8%'
											p='6'
											border='1px solid #BBBDC6'
											rounded='6px'
											flexDir='column'
											data-aos='fade-in'
											data-aos-offset='200'
											data-aos-delay='1000'
											data-aos-duration='1500'
											data-aos-easing='ease-in-out'
											data-aos-mirror='true'
											data-aos-once='true'
										>
											<FormLabel mb='4'>Rate overall experience</FormLabel>
											<Flex justify='center' w='100%'>
												<BeautyStars
													value={starState}
													activeColor='blue'
													onChange={value => {
														setStarState(value);
														time6();
													}}
												/>
											</Flex>
										</Flex>
										{/* avatar */}
										<Flex
											h='136px'
											align='flex-end'
											ml='1%'
											data-aos='fade-in'
											data-aos-offset='200'
											data-aos-delay='1000'
											data-aos-duration='1500'
											data-aos-easing='ease-in-out'
											data-aos-mirror='true'
											data-aos-once='true'
										>
											<Avatar size='md' src='https://bit.ly/broken-link' />
										</Flex>
									</Flex>
								</>
							) : null}
							{Tag7 ? (
								<>
									<Flex
										id='Tag7'
										align='center'
										p='1%'
										h='5%'
										w='416px'
										mb='8%'
										bg='#F2F6FE'
										rounded='20px'
										data-aos='fade-right'
										data-aos-offset='200'
										data-aos-delay='50'
										data-aos-duration='1000'
										data-aos-easing='ease-in-out'
										data-aos-mirror='true'
										data-aos-once='true'
										data-aos-anchor='#ratingTag'
									>
										<p>Thank you! Don’t forget to hit submit </p>
									</Flex>
									{/* submit container  */}
									<Flex w='100%' justify='flex-end'>
										{/* submit box */}
										<Flex
											w='459px'
											h='136px'
											mb='8%'
											p='6'
											border='1px solid #BBBDC6'
											rounded='6px'
											flexDir='column'
											data-aos='fade-in'
											data-aos-offset='200'
											data-aos-delay='1500'
											data-aos-duration='1000'
											data-aos-easing='ease-in-out'
											data-aos-mirror='true'
											data-aos-once='true'
										>
											<Button> Submit </Button>
										</Flex>
										{/* avatar */}
										<Flex
											h='136px'
											align='flex-end'
											ml='1%'
											data-aos='fade-in'
											data-aos-offset='200'
											data-aos-delay='1500'
											data-aos-duration='1000'
											data-aos-easing='ease-in-out'
											data-aos-mirror='true'
											data-aos-once='true'
										>
											<Avatar size='md' src='https://bit.ly/broken-link' />
										</Flex>
									</Flex>
								</>
							) : null}
						</FormControl>
					</form>
				</Flex>
			</Flex>
		</Flex>
	);
};

const mapStateToProps = state => {
	return {
		isLoading: state.review.fetchingData,
		companies: state.company.data
	};
};

export default connect(
	mapStateToProps,
	(postReview, getCompanies, postCompany)
)(ReviewForm2);
