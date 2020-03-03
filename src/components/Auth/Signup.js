import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
//actions
import signup from '../../state/actions/index';
//styles
import {
	Button,
	Input,
	FormControl,
	FormLabel,
	FormHelperText,
	FormErrorMessage,
	Flex,
	Text,
	Spinner
} from '@chakra-ui/core';

const Signup = ({ signup, isLoading, history }) => {
	const { handleSubmit, errors, register, formState } = useForm();
	const [creds, setCreds] = useState({
		email: '',
		username: '',
		password: '',
		confirmPassword: ''
	});
	console.log('outside', creds.password);

	//validation
	function validateUsername(value) {
		let error;
		if (!value) {
			error = 'Username is required';
		} else if (value.length < 8) {
			error = 'Username must be longer than 8 characters';
		}
		return error || true;
	}

	function validateEmail(value) {
		let error;
		if (!value) {
			error = 'Email is required';
		} else if (!value.includes('@')) {
			error = 'Must be a valid email';
		}
		return error || true;
	}

	function validatePassword(value) {
		let error;
		if (!value) {
			error = 'Password is required';
		} else if (value.length < 8) {
			error = 'Password must be longer than 8 characters';
		}
		return error || true;
	}
	// function validateCheckPassword(value, creds) {
	// 	let error;
	// 	console.log('isndide', creds.password);
	// 	if (!value) {
	// 		error = 'Password is required';
	// 	} else if (value.length < 8) {
	// 		error = 'Password must be longer than 8 characters';
	// 	} else if (value !== creds.password) {
	// 		error = 'Passwords do not match';
	// 	}
	// 	return error || true;
	// }
	// end validation

	const handleChanges = e => {
		setCreds({ ...creds, [e.target.name]: e.target.value });
	};

	const submitForm = e => {
		if (creds.confirmPassword === creds.password) {
			signup({
				username: creds.username,
				email: creds.email,
				password: creds.password
			}).then(() => history.push('/dashboard'));
		} else {
			console.log('form NOT submitted');
			alert('Your Passwords must match!');
		}
	};

	if (isLoading) {
		return (
			<Flex justify='center' align='center' w='100vh' h='100vh'>
				<Flex>
					<Spinner
						thickness='4px'
						speed='0.65s'
						emptyColor='gray.200'
						color='blue.500'
						size='xl'
					/>
				</Flex>
			</Flex>
		);
	}

	return (
		<Flex background='#E5E5E5' w='100%' h='100vh' justify='center'>
			<Flex w='1200px'>
				<Flex w='50%' justify='center' align='center'>
					<Text fontSize='64px' fontWeight='600' lineHeight='92px'>
						Allay - <br />
						Together, we are <br />
						stronger.
					</Text>
				</Flex>
				<Flex w='50%' justify='center' align='center'>
					<form onSubmit={handleSubmit(submitForm)}>
						<Flex
							w='490px'
							h='754px'
							flexDir='column'
							background='#FFFFFF'
							rounded='6px'
							justify='center'
						>
							<FormControl isInvalid={errors.email}>
								<Flex as='h2' w='100%' ml='35px' pb='10px'>
									Let's get started!
								</Flex>
								<Flex mx='35px' my='20px' flexDir='column'>
									<FormLabel>Email</FormLabel>
									<Input
										isInvalid={errors.email}
										w='417px'
										h='64px'
										variant='filled'
										type='email'
										label='email'
										name='email'
										value={creds.email}
										onChange={handleChanges}
										ref={register({ validate: validateEmail })}
									/>
									<FormErrorMessage>
										{errors.email && errors.email.message}
									</FormErrorMessage>
								</Flex>
							</FormControl>

							<FormControl isInvalid={errors.username}>
								<Flex mx='35px' my='20px' flexDir='column'>
									<FormLabel>Username</FormLabel>
									<Input
										w='417px'
										h='64px'
										variant='filled'
										type='text'
										label='username'
										name='username'
										value={creds.username}
										onChange={handleChanges}
										ref={register({ validate: validateUsername })}
									/>
									<FormErrorMessage>
										{errors.username && errors.username.message}
									</FormErrorMessage>
								</Flex>
							</FormControl>

							<FormControl isInvalid={errors.password}>
								<Flex mx='35px' my='20px' flexDir='column'>
									<FormLabel>Password</FormLabel>
									<Input
										w='417px'
										h='64px'
										variant='filled'
										type='password'
										label='Password'
										name='password'
										value={creds.password}
										onChange={handleChanges}
										ref={register({ validate: validatePassword })}
									/>
									<FormHelperText>
										Must be longer than 8 characters
									</FormHelperText>
									<FormErrorMessage>
										{errors.password && errors.password.message}
									</FormErrorMessage>
								</Flex>
							</FormControl>
							<FormControl isRequired>
								<Flex mx='35px' my='20px' flexDir='column'>
									<FormLabel>Confirm Password</FormLabel>
									<Input
										w='417px'
										h='64px'
										variant='filled'
										type='password'
										label='Confirm Password'
										name='confirmPassword'
										value={creds.confirmPassword}
										onChange={handleChanges}
									/>
								</Flex>
							</FormControl>
							<Flex mx='35px' my='20px'>
								<Button
									w='417px'
									h='64px'
									rounded='6px'
									border='none'
									variantColor='teal'
									fontSize='22px'
									isLoading={formState.isSubmitting}
									type='submit'
								>
									Sign Up
								</Button>
							</Flex>
							<Flex as='p' w='100%' justify='center'>
								<Link to='/'>Already have an account?</Link>
							</Flex>
						</Flex>
					</form>
				</Flex>
			</Flex>
		</Flex>
	);
};

const mapStateToProps = state => {
	return {
		isLoading: state.auth.isLoading
	};
};

export default connect(mapStateToProps, signup)(Signup);
