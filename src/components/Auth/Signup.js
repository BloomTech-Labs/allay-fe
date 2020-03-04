import React from 'react';
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

  //validation
  function validateUsername(value) {
    let error;
    if (!value) {
      error = 'Username is required';
    } else if (value.length < 8) {
      error = 'Username must be at least 8 characters';
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
      error = 'Password must be at least 8 characters';
    }
    return error || true;
  }
  // end validation

  const submitForm = creds => {
    console.log(creds);
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
    <Flex background='#E5E5E5' w='100%' minH='100vh' justify='center'>
      <Flex w='1440px'>
        <Flex w='40%' justify='center' align='center'>
          <Text fontSize='64px' fontWeight='600' lineHeight='92px'>
            Allay - <br />
            Together, we are <br />
            stronger.
          </Text>
        </Flex>
        <Flex w='60%' justify='center' align='center'>
          <form onSubmit={handleSubmit(submitForm)}>
            <Flex
              w='490px'
              h='40%'
              p='6'
              flexDir='column'
              background='#FFFFFF'
              rounded='6px'
              justify='center'
            >
              <FormControl isRequired isInvalid={errors.email}>
                <Flex as='h2' w='100%' mx='1' my='2%'>
                  Let's get started!
                </Flex>
                <Flex mx='1%' my='4%' flexDir='column'>
                  <FormLabel>Email</FormLabel>
                  <Input
                    py='32px'
                    variant='filled'
                    type='email'
                    label='email'
                    name='email'
                    ref={register({ validate: validateEmail })}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </Flex>
              </FormControl>

              <FormControl isRequired isInvalid={errors.username}>
                <Flex mx='1%' my='4%' flexDir='column'>
                  <FormLabel>Username</FormLabel>
                  <Input
                    py='32px'
                    variant='filled'
                    type='text'
                    label='username'
                    name='username'
                    ref={register({ validate: validateUsername })}
                  />
                  <FormErrorMessage>
                    {errors.username && errors.username.message}
                  </FormErrorMessage>
                </Flex>
              </FormControl>

              <FormControl isRequired isInvalid={errors.password}>
                <Flex mx='1%' my='4%' flexDir='column'>
                  <FormLabel>Password</FormLabel>
                  <Input
                    py='32px'
                    variant='filled'
                    type='password'
                    label='Password'
                    name='password'
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
                <Flex mx='1%' my='4%' flexDir='column'>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    py='32px'
                    variant='filled'
                    type='password'
                    label='Confirm Password'
                    name='confirmPassword'
                    ref={register}
                  />
                </Flex>
              </FormControl>
              <Button
                h='64px'
                mx='1%'
                my='6%'
                rounded='6px'
                border='none'
                size='lg'
                variantColor='teal'
                isLoading={formState.isSubmitting}
                type='submit'
              >
                Sign Up
              </Button>
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
