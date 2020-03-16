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

const ReviewForm2 = props => {
	const [starState, setStarState] = useState(0);

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
				{/* form container */}
				<Flex w='100%' bg='white' flexDir='column' px='2%' pt='2%'>
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
								<p>Tell me some details so we can get started</p>
							</Flex>
							{/* form container  */}
							<Flex w='100%' justify='flex-end'>
								{/* company box */}
								<Flex
									w='459px'
									h='257px'
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
									<FormLabel>2. Status at the company</FormLabel>
									<Select
										h='56px'
										rounded='6px'
										variant='filled'
										label=''
										name=''
										placeholder='Select one'
									>
										<option>Current employee</option>
										<option>Former employee</option>
										<option>Part time</option>
										<option>Full time</option>
										<option>Intern</option>
									</Select>
								</Flex>
								{/* avatar */}
								<Flex h='257px' align='flex-end' ml='1%'>
									<Avatar size='md' src='https://bit.ly/broken-link' />
								</Flex>
							</Flex>
							{/* Second prompt */}
							<Flex
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
										/>
									</Flex>
								</Flex>
								{/* avatar */}
								<Flex h='257px' align='flex-end' ml='1%'>
									<Avatar size='md' src='https://bit.ly/broken-link' />
								</Flex>
							</Flex>
							{/* third prompt */}
							<Flex
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
								align='center'
								p='1%'
								h='5%'
								w='416px'
								mb='8%'
								bg='#F2F6FE'
								rounded='20px'
							>
								<p>
									Please write your comment below. Some topics you can discuss
									are company culture, work environment, career growth, salary
									etc.
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
									<FormLabel>Comments</FormLabel>
									<Textarea
										variant='filled'
										h='144px'
										rowsMax={6}
										type='text'
										name='interview_review'
										rounded='6px'
									/>
								</Flex>
								{/* avatar */}
								<Flex h='242px' align='flex-end' ml='1%'>
									<Avatar size='md' src='https://bit.ly/broken-link' />
								</Flex>
							</Flex>
							{/* 4th prompt */}
							<Flex
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
									/>
								</Flex>
								{/* avatar */}
								<Flex h='136px' align='flex-end' ml='1%'>
									<Avatar size='md' src='https://bit.ly/broken-link' />
								</Flex>
							</Flex>
							{/* 5th prompt */}
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
									Posting your salary helps many job-seekers negotiate for fair
									salaries
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
							{/* 6th prompt */}
							<Flex
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
