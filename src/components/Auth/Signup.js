import React, { useState } from 'react';
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
  Flex,
  Text
} from '@chakra-ui/core';

const Signup = ({ signup, isLoading, history }) => {
  const [creds, setCreds] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChanges = e => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };

  const submitForm = e => {
    e.preventDefault();
    console.log('form submitted');
    if (creds.confirmPassword === creds.password) {
      signup({
        username: creds.username,
        email: creds.email,
        password: creds.password
      }).then(() => history.push('/dashboard'));
    }
  };

  if (isLoading) {
    return <h1>Signing you up</h1>;
  }

  return (
    <Flex background='#E5E5E5' w='100%' h='100vh' justify='center'>
      <Flex w='50%' justify='center' align='center'>
        <Text fontSize='64px' fontWeight='600' lineHeight='92px'>
          Allay - <br />
          Together, we are <br />
          stronger.
        </Text>
      </Flex>
      <Flex w='50%' justify='center' align='center'>
        <form onSubmit={submitForm}>
          <Flex
            m=' 20px auto'
            w='490px'
            h='754px'
            flexDir='column'
            background='#FFFFFF'
            rounded='6px'
            justify='center'
          >
            <FormControl isRequired>
              <Flex as='h2' w='100%' ml='35px' pb='10px'>
                Let's get started!
              </Flex>
              <Flex mx='35px' my='20px' flexDir='column'>
                <FormLabel>Email</FormLabel>
                <Input
                  w='417px'
                  h='64px'
                  variant='filled'
                  type='text'
                  label='Username'
                  name='username'
                  value={creds.username}
                  onChange={handleChanges}
                />
              </Flex>
              <Flex mx='35px' my='20px' flexDir='column'>
                <FormLabel>Username</FormLabel>
                <Input
                  w='417px'
                  h='64px'
                  variant='filled'
                  type='email'
                  label='Email'
                  name='email'
                  value={creds.email}
                  onChange={handleChanges}
                />
              </Flex>
              <Flex mx='35px' my='20px' flexDir='column'>
                <FormLabel>Password</FormLabel>
                <Input
                  w='417px'
                  h='64px'
                  variant='filled'
                  type='password'
                  label='Password'
                  helperText='At least 8 characters'
                  name='password'
                  value={creds.password}
                  onChange={handleChanges}
                />
                <FormHelperText>
                  Must be longer than 8 characters
                </FormHelperText>
              </Flex>
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
            <Flex m='35px'>
              <Button
                w='417px'
                h='64px'
                rounded='6px'
                border='none'
                variantColor='teal'
                type='submit'
              >
                Submit
              </Button>
            </Flex>
            <Flex as='p' ml='35px'>
              <Link to='/'>Already have an account?</Link>
            </Flex>
          </Flex>
        </form>
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
