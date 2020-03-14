import React, { useState } from 'react';
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
	RadioButtonGroup
} from '@chakra-ui/core';

const InterviewForm = () => {
	const [starState, setStarState] = useState(0);

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
				<Flex w='70%' bg='white' flexDir='column' px='2%' pt='2%'>
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
									/>
								</Flex>
								{/* avatar */}
								<Flex h='379px' align='flex-end' ml='1%'>
									<Avatar size='md' src='https://bit.ly/broken-link' />
								</Flex>
							</Flex>
							{/* second prompt */}
							<Flex
								align='center'
								h='5%'
								w='416px'
								py='1%'
								px='1%'
								mb='2%'
								bg='#F2F6FE'
								rounded='20px'
							>
								<p>Thank you for that information.</p>
							</Flex>
							<Flex
								justify='center'
								align='center'
								p='1%'
								h='5%'
								w='416px'
								mb='8%'
								bg='#F2F6FE'
								rounded='20px'
							>
								<p>
									For the quality of your review I will ask you some in depth
									questions. Let’s begin with how many rounds of interviews you
									had?
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
								<Flex h='136px' align='flex-end' ml='1%'>
									<Avatar size='md' src='https://bit.ly/broken-link' />
								</Flex>
							</Flex>
							{/* third prompt */}
							<Flex
								align='center'
								p='1%'
								h='5%'
								w='416px'
								mb='8%'
								bg='#F2F6FE'
								rounded='20px'
							>
								<p>
									To assist you better there are types of interview to choose
									from. Select the options that best describes the process you
									went through
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
								>
									<FormLabel>Select types of interview </FormLabel>
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
								</Flex>
								{/* avatar */}
								<Flex h='190px' align='flex-end' ml='1%'>
									<Avatar size='md' src='https://bit.ly/broken-link' />
								</Flex>
							</Flex>
							{/* fourth prompt */}
							<Flex
								align='center'
								p='1%'
								mb='2%'
								h='5%'
								w='416px'
								bg='#F2F6FE'
								rounded='20px'
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
							>
								<p>
									Use this section to describe your interview experience. You
									can choose the options you selected above to recount them in
									detail
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
									/>
								</Flex>
								{/* avatar */}
								<Flex h='242px' align='flex-end' ml='1%'>
									<Avatar size='md' src='https://bit.ly/broken-link' />
								</Flex>
							</Flex>
							{/* 5th prompt */}
							<Flex
								align='center'
								h='5%'
								p='1%'
								w='416px'
								mb='2%'
								bg='#F2F6FE'
								rounded='20px'
							>
								<p>
									Thanks. Your opinion is very valuable and helps job-seekers
									prepare better
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
							>
								<p>
									Give a difficulty rating to your interview. How easy or hard
									was the interview?
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
									/>
								</Flex>
								{/* avatar */}
								<Flex h='136px' align='flex-end' ml='1%'>
									<Avatar size='md' src='https://bit.ly/broken-link' />
								</Flex>
							</Flex>
							{/* 6th prompt */}
							<Flex
								justify='center'
								align='center'
								p='1%'
								h='5%'
								w='416px'
								mb='8%'
								bg='#F2F6FE'
								rounded='20px'
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
								>
									<Flex w='100%' justify='center'>
										<RadioButtonGroup
											display='flex'
											flexDir='column'
											spacing={0}
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
								<Flex h='176px' align='flex-end' ml='1%'>
									<Avatar size='md' src='https://bit.ly/broken-link' />
								</Flex>
							</Flex>
							{/* 7th prompt */}
							<Flex
								align='center'
								h='5%'
								p='1%'
								w='416px'
								mb='2%'
								bg='#F2F6FE'
								rounded='20px'
							>
								<p>Thank you for that information</p>
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
								<p>
									If you were offered, asked or negotiated a salary, including
									it in your review increases the helpfulness of your post.
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
										/>
									</InputGroup>
								</Flex>
								{/* avatar */}
								<Flex h='150px' align='flex-end' ml='1%'>
									<Avatar size='md' src='https://bit.ly/broken-link' />
								</Flex>
							</Flex>
							{/* 8th prompt */}
							<Flex
								align='center'
								h='5%'
								w='416px'
								p='1%'
								mb='2%'
								bg='#F2F6FE'
								rounded='20px'
							>
								<p>Thanks!</p>
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
								>
									<FormLabel mb='4'>Rate overall experience</FormLabel>
									<Flex justify='center' w='100%'>
										<BeautyStars
											value={starState}
											activeColor='blue'
											onChange={value => setStarState(value)}
										/>
									</Flex>
								</Flex>
								{/* avatar */}
								<Flex h='136px' align='flex-end' ml='1%'>
									<Avatar size='md' src='https://bit.ly/broken-link' />
								</Flex>
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
								<p>Thank you! Don’t forget to hit submit </p>
							</Flex>
						</FormControl>
					</form>
				</Flex>
				{/* blank space container */}
				<Flex w='30%' />
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
