import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as yup from 'yup';
// actions
import login from '../../state/actions/index';
// styles
import {
	Button,
	Input,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Flex,
	Spinner,
	Text
} from '@chakra-ui/core';

//validation
const schema = yup.object().shape({
	username: yup.string().required(),
	password: yup
		.string()
		.required(8, 'Password must contain at least 8 characters')
});

const Login = ({ login, isLoading, history }) => {
	const { handleSubmit, errors, register, formState } = useForm({
		validationSchema: schema
	});
	const [creds, setCreds] = useState({
		username: '',
		password: ''
	});

	// function validateUsername(value) {
	// 	console.log(value);
	// 	let error;
	// 	if (!value) {
	// 		error = 'Username is required';
	// 	} else if (value !== 'Naruto') {
	// 		error = "Jeez! You're not a fan 😱";
	// 	}
	// 	return error || true;
	// }

	const handleChanges = e => {
		setCreds({
			...creds,
			[e.target.name]: e.target.value
		});
	};

	const submitForm = e => {
		e.preventDefault();
		// action function here
		login(creds).then(() => history.push('/dashboard'));
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
							p='5'
							flexDir='column'
							background='#FFFFFF'
							rounded='6px'
							justify='center'
						>
							<FormControl>
								<Flex as='h2' m='10px' pb='10px'>
									Login
								</Flex>
								<Flex m='10px' flexDir='column'>
									<FormLabel>Username</FormLabel>
									<Input
										w='417px'
										h='64px'
										id='outlined-basic'
										variant='filled'
										type='text'
										label='Username'
										name='username'
										value={creds.username}
										onChange={handleChanges}
										ref={register}
									/>

									{errors.username && errors.username.message}
								</Flex>

								<Flex m='10px' flexDir='column'>
									<FormLabel>Password</FormLabel>
									<Input
										w='417px'
										h='64px'
										id='outlined-basic'
										variant='filled'
										type='password'
										label='Password'
										name='password'
										value={creds.password}
										onChange={handleChanges}
										ref={register}
									/>
									<FormErrorMessage>
										{errors.password && errors.password.message}
									</FormErrorMessage>
								</Flex>
							</FormControl>

							<Flex m='10px'>
								<Button
									w='417px'
									h='64px'
									border='none'
									rounded='6px'
									variantColor='teal'
									fontSize='22px'
									isLoading={formState.isSubmitting}
									type='submit'
								>
									Login
								</Button>
							</Flex>
							<Flex m='15px' justify='center' fontWeight='light'>
								<Link to='/signup'>Don't have an account?</Link>
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

export default connect(mapStateToProps, login)(Login);
