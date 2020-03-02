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
  Spinner
} from '@chakra-ui/core';
import { TextField } from '@material-ui/core';
import styled from 'styled-components';

const FormContainer = styled.div`
  margin: 20px auto;
  width: 22rem;
  height: 22.5rem;
  border: 2px solid lightgray;
`;

const FormTitle = styled.h3`
  background: lightgray;
`;

const FormInput = styled.div`
  margin: 10px;
`;
const FormButton = styled.p`
  margin: 15px;
`;

const FormLink = styled.p`
  margin: 15px;
`;

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
    <div>
      <form onSubmit={submitForm}>
        <Flex m=' 20px auto' w='490px' h='754px' flexDir='column'>
          <FormControl isRequired>
            <Flex as='h2' pb='15px'>
              Let's get started!
            </Flex>
            <Flex m='10px' flexDir='column'>
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
            <Flex m='10px' flexDir='column'>
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
            <Flex m='10px' flexDir='column'>
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
              <FormHelperText>Must be longer than 8 characters</FormHelperText>
            </Flex>
            <Flex m='10px' flexDir='column'>
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
          <Flex m='10px'>
            <Button w='417px' h='64px' variantColor='teal' type='submit'>
              Submit
            </Button>
          </Flex>
          <Flex as='p' m='15px'>
            Already have an account? <Link to='/'>Login</Link>
          </Flex>
        </Flex>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.auth.isLoading
  };
};

export default connect(mapStateToProps, signup)(Signup);
