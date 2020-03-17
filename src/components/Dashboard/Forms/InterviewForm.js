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
	Checkbox,
	InputGroup,
	InputLeftElement,
	Avatar,
	RadioButtonGroup,
	CheckboxGroup
} from '@chakra-ui/core';
import AOS from 'aos';
import 'aos/dist/aos.css';

const InterviewForm = () => {
	const [starState, setStarState] = useState(0);

	// state for visibility
	const [Tag2, setTag2] = useState(false);
	const [Tag3, setTag3] = useState(false);
	const [Tag4, setTag4] = useState(false);
	const [Tag5, setTag5] = useState(false);
	const [Tag6, setTag6] = useState(false);
	const [Tag7, setTag7] = useState(false);
	const [Tag8, setTag8] = useState(false);
	const [Tag9, setTag9] = useState(false);

	// brings to top on render
	useEffect(() => {
		const element = document.getElementById('Tag1');
		element.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
		const element = document.getElementById('Tag2');
		element.scrollIntoView({ behavior: 'smooth', block: 'center' });
	};
	// 3rd tag
	const time2 = () => {
		clearTimeout(timer);
		timer = setTimeout(routeTo3, 2000);
	};

	const routeTo3 = () => {
		setTag3(true);
		const element = document.getElementById('Tag3');
		element.scrollIntoView({ behavior: 'smooth', block: 'center' });
	};
	//4th tag
	const time3 = () => {
		clearTimeout(timer);
		timer = setTimeout(routeTo4, 2000);
	};

	const routeTo4 = () => {
		setTag4(true);
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
		const element = document.getElementById('Tag7');
		element.scrollIntoView({ behavior: 'smooth', block: 'center' });
	};
	// 8th tag
	const time7 = () => {
		clearTimeout(timer);
		timer = setTimeout(routeTo8, 2000);
	};

	const routeTo8 = () => {
		setTag8(true);
		const element = document.getElementById('Tag8');
		element.scrollIntoView({ behavior: 'smooth', block: 'center' });
	};
	// 9th tag
	const time8 = () => {
		clearTimeout(timer);
		timer = setTimeout(routeTo9, 2000);
	};

	const routeTo9 = () => {
		setTag9(true);
		const element = document.getElementById('Tag9');
		element.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};

	// custom select for offer accepted
	const CustomRadio = React.forwardRef((props, ref) => {
		const { isChecked, isDisabled, value, ...rest } = props;
		return (
			<Button
				ref={ref}
				variantColor={isChecked ? 'blue' : 'gray'}
				aria-checked={isChecked}
				role='radio'
				isDisabled={isDisabled}
				{...rest}
			/>
		);
	});

	return (
		// main container
		<Flex background='#E5E5E5' w='100%' justify='center'>
			{/* max size */}
			<Flex maxW='1440px' w='100%'>
				{/* form container */}
				<Flex id='Tag1' w='100%' bg='white' flexDir='column' px='2%' pt='10%'>
					{/* start of form  */}
					<form>
						<FormControl>
							{/* first prompt */}
							<Flex
								align='center'
								h='5%'
								p='1%'
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
							>
								<p>Great! I will need some general detail to get started</p>
							</Flex>
							{/* company container  */}
							<Flex w='100%' justify='flex-end'>
								{/* company box */}
								<Flex
									w='459px'
									h='379px'
									mb='8%'
									px='6'
									py='10'
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
									<FormLabel>2. Job title</FormLabel>
									<Input
										h='56px'
										mb='6'
										rounded='6px'
										type='text'
										variant='filled'
										label='job_title'
										name='job_title'
										autoCapitalize='none'
									/>
									<FormLabel>3. Place of interview</FormLabel>
									<Input
										h='56px'
										rounded='6px'
										type='text'
										variant='filled'
										label='job_title'
										name='job_title'
										autoCapitalize='none'
										onKeyPress={time1}
									/>
								</Flex>
								{/* avatar */}
								<Flex
									h='379px'
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
							{/* second prompt */}
							{Tag2 ? (
								<>
									<Flex
										id='Tag2'
										align='center'
										h='5%'
										w='416px'
										py='1%'
										px='1%'
										mb='2%'
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
										<p>Thank you for that information.</p>
									</Flex>
									<Flex
										id='roundsTag'
										justify='center'
										align='center'
										p='1%'
										h='5%'
										w='416px'
										mb='8%'
										bg='#F2F6FE'
										rounded='20px'
										data-aos='fade-right'
										data-aos-offset='200'
										data-aos-delay='1000'
										data-aos-duration='1000'
										data-aos-easing='ease-in-out'
										data-aos-mirror='true'
										data-aos-once='true'
									>
										<p>
											For the quality of your review I will ask you some in
											depth questions. Let’s begin with how many rounds of
											interviews you had?
										</p>
									</Flex>
									{/* rounds container  */}
									<Flex w='100%' justify='flex-end'>
										{/* rounds box */}
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
											data-aos-delay='2000'
											data-aos-duration='1500'
											data-aos-easing='ease-in-out'
											data-aos-mirror='true'
											data-aos-once='true'
											data-aos-anchor='#roundsTag'
										>
											<FormLabel>Select rounds of interview</FormLabel>
											<Select
												h='56px'
												mb='6'
												rounded='6px'
												variant='filled'
												label=''
												name=''
												placeholder='Select one'
												onChange={time2}
											>
												<option>1</option>
												<option>2</option>
												<option>3</option>
												<option>4</option>
												<option>5</option>
												<option>6</option>
												<option>7+</option>
											</Select>
										</Flex>
										{/* avatar */}
										<Flex
											h='136px'
											align='flex-end'
											ml='1%'
											data-aos='fade-in'
											data-aos-offset='200'
											data-aos-delay='2000'
											data-aos-duration='1500'
											data-aos-easing='ease-in-out'
											data-aos-mirror='true'
											data-aos-once='true'
											data-aos-anchor='#roundsTag'
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
									>
										<p>
											To assist you better there are types of interview to
											choose from. Select the options that best describes the
											process you went through
										</p>
									</Flex>
									<Flex w='100%' justify='flex-end'>
										{/* types of interview box */}
										<Flex
											w='459px'
											h='190px'
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
											<FormLabel>Select types of interview </FormLabel>
											<CheckboxGroup onChange={time3}>
												<Flex>
													<Flex direction='column' pr='0.5%'>
														<Checkbox
															size='md'
															border='rgba(72, 72, 72, 0.1)'
															name='offer_accepted'
														>
															Phone interview
														</Checkbox>
														<Checkbox size='md' border='rgba(72, 72, 72, 0.1)'>
															Resume review
														</Checkbox>
														<Checkbox size='md' border='rgba(72, 72, 72, 0.1)'>
															Take home assignments
														</Checkbox>
														<Checkbox size='md' border='rgba(72, 72, 72, 0.1)'>
															Online coding tests
														</Checkbox>
													</Flex>
													<Flex direction='column'>
														<Checkbox size='md' border='rgba(72, 72, 72, 0.1)'>
															Portfolio review
														</Checkbox>
														<Checkbox size='md' border='rgba(72, 72, 72, 0.1)'>
															Screen share
														</Checkbox>
														<Checkbox size='md' border='rgba(72, 72, 72, 0.1)'>
															Open source contribution
														</Checkbox>
														<Checkbox size='md' border='rgba(72, 72, 72, 0.1)'>
															Side projects
														</Checkbox>
													</Flex>
												</Flex>
											</CheckboxGroup>
										</Flex>
										{/* avatar */}
										<Flex
											h='190px'
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
							{/* fourth prompt */}
							{Tag4 ? (
								<>
									<Flex
										id='Tag4'
										align='center'
										p='1%'
										mb='2%'
										h='5%'
										w='416px'
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
										<p>Great!</p>
									</Flex>
									<Flex
										align='center'
										p='1%'
										h='5%'
										w='416px'
										mb='8%'
										bg='#F2F6FE'
										rounded='20px'
										data-aos='fade-right'
										data-aos-offset='200'
										data-aos-delay='1200'
										data-aos-duration='1000'
										data-aos-easing='ease-in-out'
										data-aos-mirror='true'
										data-aos-once='true'
									>
										<p>
											Use this section to describe your interview experience.
											You can choose the options you selected above to recount
											them in detail
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
											data-aos-delay='2600'
											data-aos-duration='1500'
											data-aos-easing='ease-in-out'
											data-aos-mirror='true'
											data-aos-once='true'
										>
											<FormLabel>Describe the interview process</FormLabel>
											<Textarea
												variant='filled'
												h='144px'
												rowsMax={6}
												type='text'
												name='interview_review'
												placeholder='What questions came up? What did you discuss? What did you come away with from this interview? '
												rounded='6px'
												onKeyUp={time4}
											/>
										</Flex>
										{/* avatar */}
										<Flex
											h='242px'
											align='flex-end'
											ml='1%'
											data-aos='fade-in'
											data-aos-offset='200'
											data-aos-delay='2600'
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
							{/* 5th prompt */}
							{Tag5 ? (
								<>
									<Flex
										id='Tag5'
										align='center'
										h='5%'
										p='1%'
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
										data-aos-once='true'
									>
										<p>
											Thanks. Your opinion is very valuable and helps
											job-seekers prepare better
										</p>
									</Flex>
									<Flex
										align='center'
										h='5%'
										p='1%'
										w='416px'
										mb='8%'
										bg='#F2F6FE'
										rounded='20px'
										data-aos='fade-right'
										data-aos-offset='200'
										data-aos-delay='2300'
										data-aos-duration='1000'
										data-aos-easing='ease-in-out'
										data-aos-mirror='true'
										data-aos-once='true'
									>
										<p>
											Give a difficulty rating to your interview. How easy or
											hard was the interview?
										</p>
									</Flex>
									{/* diff container  */}
									<Flex w='100%' justify='flex-end'>
										{/* diff box */}
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
											data-aos-delay='3000'
											data-aos-duration='1500'
											data-aos-easing='ease-in-out'
											data-aos-mirror='true'
											data-aos-once='true'
										>
											<FormLabel>Rate the difficulty</FormLabel>
											<Select
												h='56px'
												mb='6'
												rounded='6px'
												variant='filled'
												label=''
												name=''
												placeholder='Select one'
												onChange={time5}
											>
												<option>Hard</option>
												<option>Not so hard</option>
											</Select>
										</Flex>
										{/* avatar */}
										<Flex
											h='136px'
											align='flex-end'
											ml='1%'
											data-aos='fade-in'
											data-aos-offset='200'
											data-aos-delay='3000'
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
							{/* 6th prompt */}
							{Tag6 ? (
								<>
									<Flex
										id='Tag6'
										justify='center'
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
									>
										<p>
											Your review is almost complete. Tell me how your interview
											process ended. Did you recieve an offer?
										</p>
									</Flex>
									{/* offer container  */}
									<Flex w='100%' justify='flex-end'>
										{/* diff box */}
										<Flex
											w='459px'
											h='176px'
											mb='8%'
											py='6'
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
											<Flex w='100%' justify='center'>
												<RadioButtonGroup
													display='flex'
													flexDir='column'
													spacing={0}
													onChange={time6}
												>
													<CustomRadio value='rad1' h='42px' w='411px'>
														No offer
													</CustomRadio>
													<CustomRadio value='rad2'>Accepted</CustomRadio>
													<CustomRadio value='rad3'>Declined</CustomRadio>
												</RadioButtonGroup>
											</Flex>
										</Flex>
										{/* avatar */}
										<Flex
											h='176px'
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
							{/* 7th prompt */}
							{Tag7 ? (
								<>
									<Flex
										id='Tag7'
										align='center'
										h='5%'
										p='1%'
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
										data-aos-once='true'
									>
										<p>Thank you for that information</p>
									</Flex>
									<Flex
										id='salaryTag'
										align='center'
										h='5%'
										p='1%'
										w='416px'
										mb='8%'
										bg='#F2F6FE'
										rounded='20px'
										data-aos='fade-right'
										data-aos-offset='200'
										data-aos-delay='1500'
										data-aos-duration='1000'
										data-aos-easing='ease-in-out'
										data-aos-mirror='true'
										data-aos-once='true'
									>
										<p>
											If you were offered, asked or negotiated a salary,
											including it in your review increases the helpfulness of
											your post.
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
											data-aos-duration='3000'
											data-aos-easing='ease-in-out'
											data-aos-mirror='true'
											data-aos-once='true'
											data-aos-anchor='#salaryTag'
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
													onKeyUp={time7}
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
											data-aos-duration='3000'
											data-aos-easing='ease-in-out'
											data-aos-mirror='true'
											data-aos-once='true'
											data-aos-anchor='#salaryTag'
										>
											<Avatar size='md' src='https://bit.ly/broken-link' />
										</Flex>
									</Flex>
								</>
							) : null}
							{/* 8th prompt */}
							{Tag8 ? (
								<>
									<Flex
										id='Tag8'
										align='center'
										h='5%'
										w='416px'
										p='1%'
										mb='2%'
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
										<p>Thanks!</p>
									</Flex>
									<Flex
										id='ratingTag'
										align='center'
										p='1%'
										h='5%'
										w='416px'
										mb='8%'
										bg='#F2F6FE'
										rounded='20px'
										data-aos='fade-right'
										data-aos-offset='200'
										data-aos-delay='900'
										data-aos-duration='1000'
										data-aos-easing='ease-in-out'
										data-aos-mirror='true'
										data-aos-once='true'
									>
										<p>Tell me how did you find the overall experience </p>
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
											data-aos-delay='1500'
											data-aos-duration='1000'
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
														time8();
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
											data-aos-delay='1500'
											data-aos-duration='1000'
											data-aos-easing='ease-in-out'
											data-aos-mirror='true'
											data-aos-once='true'
										>
											<Avatar size='md' src='https://bit.ly/broken-link' />
										</Flex>
									</Flex>{' '}
								</>
							) : null}
							{Tag9 ? (
								<>
									<Flex
										id='Tag9'
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
				{/* blank space container */}
				{/* <Flex w='30%' /> */}
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
)(InterviewForm);
