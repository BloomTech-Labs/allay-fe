import React from 'react';
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
	InputGroup,
	InputLeftElement,
	Icon,
	Avatar
} from '@chakra-ui/core';

const InterviewForm = () => {
	return (
		// main container
		<Flex background='#E5E5E5' w='100%' justify='center'>
			{/* max size */}
			<Flex maxW='1440px' w='100%'>
				{/* form container */}
				<Flex w='70%' bg='white' flexDir='column' px='2%' pt='2%'>
					<form>
						<FormControl>
							{/* first prompt */}
							<Flex
								align='center'
								h='5%'
								w='416px'
								mb='8%'
								bg='#F2F6FE'
								rounded='20px'
							>
								<p>Great! Let's begin with some general details</p>
							</Flex>
							{/* start of form  */}

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
										h='56px'
										mb='6'
										rounded='6px'
										type='text'
										variant='filled'
										label='company_name'
										name='company_name'
										autoCapitalize='none'
									/>
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
								mb='2%'
								bg='#F2F6FE'
								rounded='20px'
							>
								<p>Thank you for that information.</p>
							</Flex>
							<Flex
								justify='center'
								align='center'
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
									<Select h='52px' variant='filled' placeholder='Select one' />
								</Flex>
								{/* avatar */}
								<Flex h='136px' align='flex-end' ml='1%'>
									<Avatar size='md' src='https://bit.ly/broken-link' />
								</Flex>
							</Flex>
							{/* third prompt */}
							<Flex
								align='center'
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
									h='258px'
									mb='8%'
									px='6'
									py='8'
									border='1px solid #BBBDC6'
									rounded='6px'
									flexDir='column'
								>
									<FormLabel>1. Rounds of interview</FormLabel>
									<Tabs mb='6'>
										<TabList border='none' h='56px'>
											<Tab
												border='1px solid #BBBDC6'
												roundedLeft='6px'
												w='137px'
											>
												1 - 3
											</Tab>
											<Tab border='1px solid #BBBDC6' w='137px'>
												4 - 6
											</Tab>
											<Tab
												border='1px solid #BBBDC6'
												roundedRight='6px'
												w='137px'
											>
												7 +
											</Tab>
										</TabList>
									</Tabs>

									<FormLabel>2. Select types of interview </FormLabel>
									<Select
										h='56px'
										rounded='6px'
										variant='filled'
										label='job_title'
										name='job_title'
									/>
								</Flex>
								{/* avatar */}
								<Flex h='258px' align='flex-end' ml='1%'>
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
