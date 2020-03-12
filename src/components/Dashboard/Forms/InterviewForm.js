import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
// redux
import { connect } from 'react-redux';
// actions
import postReview from '../../../state/actions';
import getCompanies from '../../../state/actions';
import postCompany from '../../../state/actions';
// styles
import {
	FormControl,
	Flex,
	Select,
	SelectControl,
	Input,
	Tabs,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Textarea,
	Button,
	ButtonGroup,
	Spinner,
	FormErrorMessage,
	FormLabel,
	Link,
	Checkbox,
	CheckboxGroup,
	InputGroup,
	InputLeftElement,
	Icon,
	Avatar,
	Stack
} from '@chakra-ui/core';

const InterviewForm = () => {
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
								py='1%'
								w='416px'
								mb='8%'
								bg='#F2F6FE'
								rounded='20px'
							>
								<p>Great! Let's begin with some general details</p>
							</Flex>
							{/* company container  */}
							<Flex w='100%' justify='flex-end'>
								{/* company box */}
								<Flex
									w='459px'
									h='258px'
									mb='8%'
									px='6'
									py='8'
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
										rounded='6px'
										type='text'
										variant='filled'
										label='job_title'
										name='job_title'
										autoCapitalize='none'
									/>
								</Flex>
								{/* avatar */}
								<Flex h='258px' align='flex-end' ml='1%'>
									<Avatar size='md' src='https://bit.ly/broken-link' />
								</Flex>
							</Flex>
							{/* second prompt */}
							<Flex
								align='center'
								h='5%'
								w='416px'
								py='1%'
								mb='2%'
								bg='#F2F6FE'
								rounded='20px'
							>
								<p>Thank you for that information.</p>
							</Flex>
							<Flex
								justify='center'
								align='center'
								py='1%'
								h='5%'
								w='416px'
								mb='8%'
								bg='#F2F6FE'
								rounded='20px'
							>
								<p>
									To serve you best we want to customize the form to you. Please
									let me know the interview stages you reached with this company
								</p>
							</Flex>
							{/* interview stages container  */}
							<Flex w='100%' justify='flex-end'>
								{/* interview box */}
								<Flex
									w='459px'
									h='136px'
									mb='8%'
									p='6'
									border='1px solid #BBBDC6'
									rounded='6px'
									flexDir='column'
								>
									<FormLabel>Select stages of interview</FormLabel>
									<Select h='52px' variant='filled' placeholder='Select one'>
										<option>Only pre-site interviews</option>
										<option>Only onsite interviews</option>
										<option>Both pre-site and onsite interviews</option>
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
								py='1%'
								h='5%'
								w='416px'
								mb='8%'
								bg='#F2F6FE'
								rounded='20px'
							>
								<p>
									Pre-sites interviews are as important as onsite interviews.
									Tell me about yours.
								</p>
							</Flex>
							<Flex w='100%' justify='flex-end'>
								{/* rounds box */}
								<Flex
									w='459px'
									h='300px'
									mb='8%'
									px='6'
									py='8'
									border='1px solid #BBBDC6'
									rounded='6px'
									flexDir='column'
								>
									<FormLabel>1. Rounds of interview</FormLabel>
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

									<FormLabel>2. Select types of interview </FormLabel>
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
								<Flex h='258px' align='flex-end' ml='1%'>
									<Avatar size='md' src='https://bit.ly/broken-link' />
								</Flex>
							</Flex>
							{/* fourth prompt */}
							<Flex
								align='center'
								py='1%'
								h='5%'
								w='416px'
								mb='8%'
								bg='#F2F6FE'
								rounded='20px'
							>
								<p>
									Pre-sites interviews are as important as onsite interviews.
									Tell me about yours.
								</p>
							</Flex>
							<Flex w='100%' justify='flex-end'>
								{/* long hand interview box */}
								<Flex
									w='459px'
									h='320px'
									mb='8%'
									px='6'
									py='6'
									border='1px solid #BBBDC6'
									rounded='6px'
									flexDir='column'
								>
									<FormLabel>Comments about types of interview</FormLabel>
									<Textarea
										variant='filled'
										h='300px'
										rowsMax={6}
										type='text'
										name='interview_review'
										placeholder='Describe the interview process.'
										rounded='6px'
									/>
								</Flex>
								{/* avatar */}
								<Flex h='320px' align='flex-end' ml='1%'>
									<Avatar size='md' src='https://bit.ly/broken-link' />
								</Flex>
							</Flex>
							{/* fifth prompt */}
							<Flex
								align='center'
								h='5%'
								py='1%'
								w='416px'
								mb='8%'
								bg='#F2F6FE'
								rounded='20px'
							>
								<p>
									Thank you for sharing the information. Let’s move on to the
									onsite interview. I need some general information regarding
									that.
								</p>
							</Flex>
							{/* location container  */}
							<Flex w='100%' justify='flex-end'>
								{/* location box */}
								<Flex
									w='459px'
									h='150px'
									mb='8%'
									px='6'
									py='8'
									border='1px solid #BBBDC6'
									rounded='6px'
									flexDir='column'
								>
									<FormLabel>Place of Interview</FormLabel>
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
								<Flex h='150px' align='flex-end' ml='1%'>
									<Avatar size='md' src='https://bit.ly/broken-link' />
								</Flex>
							</Flex>
							{/* sixth prompt */}
							<Flex
								align='center'
								py='1%'
								h='5%'
								w='416px'
								mb='8%'
								bg='#F2F6FE'
								rounded='20px'
							>
								<p>
									Please share with me how the onsite discussions you selected
									were.
								</p>
							</Flex>
							<Flex w='100%' justify='flex-end'>
								{/* long hand interview box */}
								<Flex
									w='459px'
									h='880px'
									mb='8%'
									px='6'
									py='6'
									border='1px solid #BBBDC6'
									rounded='6px'
									flexDir='column'
								>
									<FormLabel>1. Salary discussion</FormLabel>
									<Textarea
										variant='filled'
										h='160px'
										mb='6'
										rowsMax={6}
										type='text'
										name='interview_review'
										placeholder='Talk about how the disucssion went. Did you negotiate and how did it go?'
										rounded='6px'
									/>
									<FormLabel>2. Whiteboarding problem-solving</FormLabel>
									<Textarea
										variant='filled'
										h='160px'
										mb='6'
										rowsMax={6}
										type='text'
										name='interview_review'
										placeholder='What problem were you given and how did you solve it?'
										rounded='6px'
									/>
									<FormLabel>3. Tech topics discussion</FormLabel>
									<Textarea
										variant='filled'
										h='160px'
										mb='6'
										rowsMax={6}
										type='text'
										name='interview_review'
										placeholder='What topics were discussed? '
										rounded='6px'
									/>
									<FormLabel>4. Comments</FormLabel>
									<Textarea
										variant='filled'
										h='160px'
										rowsMax={6}
										type='text'
										name='interview_review'
										placeholder='Anything else you want to share?'
										rounded='6px'
									/>
								</Flex>
								{/* avatar */}
								<Flex h='880px' align='flex-end' ml='1%'>
									<Avatar size='md' src='https://bit.ly/broken-link' />
								</Flex>
							</Flex>
							{/* seventh prompt */}
							<Flex
								align='center'
								h='5%'
								py='1%'
								w='416px'
								mb='8%'
								bg='#F2F6FE'
								rounded='20px'
							>
								<p>Great! Let's begin with some general details</p>
							</Flex>
							{/* questions container  */}
							<Flex w='100%' justify='flex-end'>
								{/* questions box */}
								<Flex
									w='459px'
									h='524px'
									mb='8%'
									px='6'
									py='8'
									border='1px solid #BBBDC6'
									rounded='6px'
									flexDir='column'
								>
									<FormLabel>Question 1</FormLabel>
									<Input
										variant='filled'
										h='56px'
										mb='6'
										rounded='6px'
										type='text'
										label='company_name'
										name='company_name'
										autoCapitalize='none'
									/>
									<FormLabel>Question 2</FormLabel>
									<Input
										h='56px'
										rounded='6px'
										mb='20%'
										type='text'
										variant='filled'
										label='job_title'
										name='job_title'
										autoCapitalize='none'
									/>
									<FormLabel>Your answers (optional)</FormLabel>
									<Textarea
										variant='filled'
										h='160px'
										rowsMax={6}
										type='text'
										name='interview_review'
										rounded='6px'
									/>
								</Flex>
								{/* avatar */}
								<Flex h='524px' align='flex-end' ml='1%'>
									<Avatar size='md' src='https://bit.ly/broken-link' />
								</Flex>
							</Flex>
						</FormControl>
					</form>
					{/* blank space container */}
					<Flex w='30%' />
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
)(InterviewForm);
