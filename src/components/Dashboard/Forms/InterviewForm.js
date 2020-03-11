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
		<Flex background='#E5E5E5' w='100%' minH='100vh' justify='center'>
			{/* max size */}
			<Flex maxW='1440px' w='100%'>
				{/* form container */}
				<Flex w='70%' bg='white' flexDir='column' px='2%' pt='2%'>
					<Flex
						justify='center'
						align='center'
						h='5%'
						w='416px'
						bg='#F2F6FE'
						rounded='20px'
					>
						<p>Great! Let's begin with some general details</p>
					</Flex>
					{/* start of form  */}
					<form>
						<FormControl>
							{/* company container  */}
							<Flex w='100%' justify='flex-end'>
								{/* company box */}
								<Flex
									w='459px'
									h='258px'
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
										label='Username'
										name='username'
										autoCapitalize='none'
									/>
									<FormLabel>2. Job title</FormLabel>
									<Input
										h='56px'
										rounded='6px'
										type='text'
										variant='filled'
										label='Username'
										name='username'
										autoCapitalize='none'
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
