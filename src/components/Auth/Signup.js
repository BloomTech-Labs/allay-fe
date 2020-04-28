import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactGA from 'react-ga'; // for google analytics
//components
import SignupLoginInput from '../Reusable/InputFields/SignupLoginInput.js';
import SignupAdditional from './Signup-Additional';
//actions
import signup from '../../state/actions/index';
//styles
import CustomSpinner from '../CustomSpinner.js';

import {
	Button,
	FormControl,
	FormLabel,
	FormHelperText,
	FormErrorMessage,
	Flex,
	Text,
	InputGroup,
	InputRightElement,
	Select,
} from '@chakra-ui/core';

const Signup = ({ signup, isLoading, history }) => {
	const { handleSubmit, errors, register, formState } = useForm();
	const [show, setShow] = React.useState(false);
	const [moreInfo, setMoreInfo] = React.useState(false);
	const handleClick = () => setShow(!show);

	//validation
	function validateFirstName(value) {
		let error;
		let nameRegex = /^[0-9*#+]+$/;
		if (!value) {
			error = 'First Name is required';
		} else if (value.length < 2) {
			error = 'First Name must be at least 2 characters';
		} else if (nameRegex.test(value)) {
			error = 'First Name can only contain letters';
		}
		return error || true;
	}

	function validateLastName(value) {
		let error;
		let nameRegex = /^[0-9*#+]+$/;
		if (!value) {
			error = 'Last Name is required';
		} else if (value.length < 2) {
			error = 'Last Name must be at least 2 characters';
		} else if (nameRegex.test(value)) {
			error = 'Last Name can only contain letters';
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

	function validateTrack(value) {
		let error;
		if (!value) {
			error = 'Lambda track is required';
		}
		return error || true;
	}

	function validateCohort(value) {
		let error;
		if (!value) {
			error = 'Cohort is required';
		}
		return error || true;
	}

	function validatePassword(value) {
		let error;
		if (!value) {
			error = 'Password is required';
		} else if (value.length < 8) {
			error = 'Password must be at least 8 characters';
		}
		return error || true;
	}
	// end validation

	const submitForm = (creds) => {
		if (creds.confirmPassword === creds.password) {
			signup({
				username: creds.username,
				email: creds.email,
				password: creds.password,
				track_id: creds.track_id,
			}).then(() => history.push('/dashboard'));
		} else {
			alert('Your Passwords must match!');
		}
		ReactGA.event({
			category: 'User',
			action: `Button Sign Up`,
		});
	};

	const switchMoreInfo = () => {
		setMoreInfo(!moreInfo);
	};

	const gaLogin = () => {
		ReactGA.event({
			category: 'User',
			action: `Link Already have an account`,
		});
	};

	if (isLoading) {
		return (
			<Flex justify='center' align='center' w='100vh' h='100vh'>
				<Flex>
					<CustomSpinner />
				</Flex>
			</Flex>
		);
	}

	return (
		<Flex className='RegisterSplash' w='100%' minH='100vh' justify='center'>
			<Flex maxW='1440px' w='100%'>
				<Flex
					w='833px'
					mx='auto'
					justify='center'
					align='center'
					flexDir='column'
				>
					<form onSubmit={handleSubmit(submitForm)}>
						<Flex
							w='833px'
							// h='825px'
							p='6'
							flexDir='column'
							background='#FDFDFF'
							justify='center'
						>
							<Flex
								as='h2'
								w='653'
								fontSize='32px'
								fontWeight='600'
								fontFamily='Poppins'
								justify='center'
								my='68px'
							>
								Let's get started!
							</Flex>

							<Flex wrap='wrap' w='653' justify='center'>
								<FormControl isRequired isInvalid={errors.username}>
									<FormLabel fontFamily='Poppins'>First Name</FormLabel>
									<SignupLoginInput
										w='318px'
										mb='30px'
										mr='17px'
										type='text'
										name='firstName'
										label='firstName'
										placeholder='John'
										autoCapitalize='none'
										ref={register({ validate: validateFirstName })}
									/>
									<FormErrorMessage>
										{errors.firstName && errors.firstName.message}
									</FormErrorMessage>
								</FormControl>
								<FormControl isRequired isInvalid={errors.username}>
									<FormLabel fontFamily='Poppins'>Last Name</FormLabel>
									<SignupLoginInput
										w='318px'
										mb='30px'
										type='text'
										name='lastName'
										label='lastName'
										placeholder='Doe'
										autoCapitalize='none'
										ref={register({ validate: validateLastName })}
									/>
									<FormErrorMessage>
										{errors.lastName && errors.lastName.message}
									</FormErrorMessage>
								</FormControl>
							</Flex>

							<Flex wrap='wrap' w='653' justify='center'>
								<FormControl isRequired isInvalid={errors.email}>
									<FormLabel fontFamily='Poppins'>Email</FormLabel>
									<SignupLoginInput
										w='653px'
										mb='30px'
										type='email'
										name='email'
										label='email'
										placeholder='allay@lambda.com'
										autoCapitalize='none'
										ref={register({ validate: validateEmail })}
									/>
									<FormErrorMessage>
										{errors.email && errors.email.message}
									</FormErrorMessage>
								</FormControl>
							</Flex>

							<Flex wrap='wrap' w='411px%' justify='center'>
								<FormControl isRequired isInvalid={errors.track_name}>
									<FormLabel fontFamily='Poppins'>Track</FormLabel>
									<Select
										mb='30px'
										mr='17px'
										h='68px'
										py='16px'
										w='318px'
										rounded='2px'
										variant='outline'
										backgroundColor='#FDFDFF'
										focusBorderColor='#344CD0'
										borderColor='#EAF0FE'
										color='#BBBDC6'
										_focus={{ color: '#17171B' }}
										_hover={{ borderColor: '#BBBDC6' }}
										name='track_id'
										label='track_id'
										// placeholder='Select Your Lambda Track'
										ref={register({ validate: validateTrack })}
									>
										<option fontFamily='Poppins' value=''>
											Select Your Lambda Track
										</option>
										<option fontFamily='Poppins' value={1}>
											Android
										</option>
										<option fontFamily='Poppins' value={2}>
											DS
										</option>
										<option fontFamily='Poppins' value={3}>
											WEB
										</option>
										<option fontFamily='Poppins' value={4}>
											iOS
										</option>
										<option fontFamily='Poppins' value={5}>
											UX
										</option>
									</Select>
									<FormErrorMessage>
										{errors.track_id && errors.track_id.message}
									</FormErrorMessage>
								</FormControl>
								<FormControl isRequired isInvalid={errors.username}>
									<FormLabel fontFamily='Poppins'>Cohort</FormLabel>
									<SignupLoginInput
										w='318px'
										mb='30px'
										type='text'
										name='cohort'
										label='cohort'
										placeholder='Ex: FT 1 or PT 1'
										autoCapitalize='none'
										ref={register({ validate: validateCohort })}
									/>
									<FormErrorMessage>
										{errors.cohort && errors.cohort.message}
									</FormErrorMessage>
								</FormControl>
							</Flex>

							<Flex wrap='wrap' w='411px%' justify='center'>
								<FormControl isRequired isInvalid={errors.password}>
									<FormLabel fontFamily='Poppins'>Password</FormLabel>
									<InputGroup>
										<SignupLoginInput
											w='318px'
											// mb='30px'
											mr='17px'
											type={show ? 'text' : 'password'}
											name='password'
											label='Password'
											placeholder='********'
											autoCapitalize='none'
											ref={register({ validate: validatePassword })}
										/>
										<InputRightElement width='4.5rem' pr='22px' py='32px'>
											<Button
												h='1.75rem'
												color='rgba(72, 72, 72, 0.1)'
												border='none'
												size='sm'
												backgroundColor='#FDFDFF'
												onClick={handleClick}
											>
												{show ? 'Hide' : 'Show'}
											</Button>
										</InputRightElement>
									</InputGroup>

									<FormHelperText mb='45px' color='#9194A8'>
										Must be at least 8 characters
									</FormHelperText>
									<FormErrorMessage>
										{errors.password && errors.password.message}
									</FormErrorMessage>
								</FormControl>
								<FormControl isRequired>
									<FormLabel fontFamily='Poppins'>Confirm Password</FormLabel>
									<InputGroup>
										<SignupLoginInput
											w='318px'
											mb='30px'
											type={show ? 'text' : 'password'}
											name='confirmPassword'
											label='Confirm Password'
											placeholder='********'
											autoCapitalize='none'
											ref={register}
										/>
										<InputRightElement width='4.5rem' py='32px'>
											<Button
												h='1.75rem'
												color='rgba(72, 72, 72, 0.1)'
												border='none'
												size='sm'
												backgroundColor='#FDFDFF'
												onClick={handleClick}
											>
												{show ? 'Hide' : 'Show'}
											</Button>
										</InputRightElement>
									</InputGroup>
								</FormControl>
							</Flex>

							<Flex
								wrap='wrap'
								w='653px'
								mx='auto'
								mb={moreInfo ? '0' : '55px'}
								cursor='pointer'
								justify='flex-start'
								onClick={switchMoreInfo}
							>
								<Flex justify='flex-start'>
									<Text
										fontWeight='bold'
										fontFamily='Poppins'
										textAlign='left'
										mr='5px'
									>
										>{' '}
									</Text>
									<Text fontWeight='bold' fontFamily='Poppins'>
										{' '}
										Add Additional Information
									</Text>
								</Flex>
							</Flex>

							{/* Start of the additional info */}
							{moreInfo ? <SignupAdditional register={register} /> : null}

							<Flex w='100%' justify='center'>
								<Button
									mb='30px'
									border='none'
									rounded='50px'
									h='58px'
									w='653px'
									my='2%'
									size='lg'
									color='white'
									backgroundColor='#344CD0'
									_hover={{ backgroundColor: '#4254BA', cursor: 'pointer' }}
									isLoading={formState.isSubmitting}
									type='submit'
									data-cy='registerSubmit'
								>
									Sign up
								</Button>
							</Flex>
							<Flex m='15px' justify='center' fontWeight='light'>
								<Text>
									Already have an account?{' '}
									<Link
										to='/'
										color='black'
										onClick={gaLogin}
										fontColor='black'
										fontWeight='bold'
										fontDecoration='none'
										underline='none'
									>
										Sign in here!
									</Link>
								</Text>
							</Flex>
						</Flex>
					</form>
				</Flex>
			</Flex>
		</Flex>
	);
};

const mapStateToProps = (state) => {
	return {
		isLoading: state.auth.isLoading,
	};
};

export default connect(mapStateToProps, signup)(Signup);
