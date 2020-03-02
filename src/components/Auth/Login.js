import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// actions
import login from '../../state/actions/index';
// styles
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Flex,
  Spinner
} from '@chakra-ui/core';

const Login = ({ login, isLoading, history }) => {
  const [creds, setCreds] = useState({
    username: '',
    password: ''
  });

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
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      </Flex>
    );
  }

  return (
    <form onSubmit={submitForm}>
      <Flex m='20px auto' w='22rem' h='17rem' flexDir='column'>
        <FormControl isRequired>
          <Flex as='h2'>Login</Flex>
          <Flex m='10px' flexDir='column'>
            <FormLabel>Username</FormLabel>
            <Input
              id='outlined-basic'
              variant='filled'
              type='text'
              label='Username'
              name='username'
              value={creds.username}
              onChange={handleChanges}
            />
          </Flex>
          <Flex m='10px' flexDir='column'>
            <FormLabel>Password</FormLabel>
            <Input
              id='outlined-basic'
              variant='filled'
              type='password'
              label='Password'
              name='password'
              value={creds.password}
              onChange={handleChanges}
            />
          </Flex>
        </FormControl>

        <Flex m='10px'>
          <Button variantColor='teal' size='sm' type='submit'>
            Login
          </Button>
        </Flex>
        <Flex m='15px' justify='flex-end' fontWeight='light'>
          Don't have an account? <Link to='/signup'>Signup</Link>
        </Flex>
      </Flex>
    </form>
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.auth.isLoading
  };
};

export default connect(mapStateToProps, login)(Login);
