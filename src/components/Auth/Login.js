import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ReactGA from 'react-ga' // for google analytics
// actions
import login from '../../state/actions/index'
// styles
import CustomSpinner from '../CustomSpinner.js'
import SignupLoginInput from '../Reusable/InputFields/SignupLoginInput.js'
import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Flex,
  Text,
  InputGroup,
  InputRightElement,
  Stack,
} from '@chakra-ui/core'

const Login = ({ login, isLoading, history }) => {
  const { handleSubmit, errors, register, formState } = useForm()
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  function validateEmail(value) {
    let error
    if (!value) {
      error = 'email is required'
    } else if (value.length < 5) {
      error = 'email needed'
    }
    return error || true
  }

  function validatePassword(value) {
    let error
    if (!value) {
      error = 'Password is required'
    } else if (value.length < 8) {
      error = 'Password must be at least 8 characters'
    }
    return error || true
  }

  const submitForm = (creds) => {
    // action function here
    login(creds).then(() => history.push('/dashboard'))
    ReactGA.event({
      category: 'User',
      action: `Button Login`,
    })
  }

  const gaSignup = () => {
    ReactGA.event({
      category: 'User',
      action: `Link Don't have an account`,
    })
  }

  if (isLoading) {
    return (
      <Flex justify="center" align="center" w="100%" h="100vh">
        <Flex>
          <CustomSpinner />
        </Flex>
      </Flex>
    )
  }

  return (
    <Flex className="LoginSplash" w="100%" minH="100vh" justify="center">
      <Flex maxW="1440px" w="100%">
        <Stack
          wrap="wrap"
          w="60%"
          ml="6.5%"
          mb="15%"
          justify="center"
          align="center"
        >
          <Text
            as="h1"
            w="100%"
            fontFamily="Poppins"
            fontSize="80px"
            fontWeight="bold"
          >
            Allay
          </Text>
          <Text w="100%" fontFamily="Poppins" fontSize="52px" fontWeight="bold">
            We're stronger together.
          </Text>
        </Stack>
        <Flex
          w="40%"
          mb="10%"
          mr="8%"
          justify="center"
          align="center"
          flexDir="column"
        >
          <form onSubmit={handleSubmit(submitForm)}>
            <Flex
              w="473px"
              h="480px"
              flexDir="column"
              background="#FDFDFF"
              justify="center"
            >
              <Flex
                as="h2"
                fontSize="36px"
                fontFamily="Poppins"
                justify="center"
                mx="1"
                my="2%"
              >
                Welcome back!
              </Flex>

              <Flex wrap="wrap" w="411px%" justify="center">
                <FormControl isInvalid={errors.email}>
                  <FormLabel color="#131C4D" fontSize="18px" fontFamily="Muli">
                    Email
                  </FormLabel>
                  <SignupLoginInput
                    mb="30px"
                    type="text"
                    name="email"
                    label="email"
                    placeholder="lambda1"
                    autoCapitalize="none"
                    ref={register({ validate: validateEmail })}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.password}>
                  <Flex flexDir="column">
                    <FormLabel
                      color="#131C4D"
                      fontSize="18px"
                      fontFamily="Muli"
                    >
                      Password
                    </FormLabel>
                    <InputGroup>
                      <SignupLoginInput
                        mb="30px"
                        type={show ? 'text' : 'password'}
                        name="password"
                        label="Password"
                        placeholder="********"
                        autoCapitalize="none"
                        ref={register({ validate: validatePassword })}
                      />
                      <InputRightElement width="4.5rem" py="32px">
                        <Button
                          h="1.75rem"
                          color="rgba(72, 72, 72, 0.1)"
                          border="none"
                          size="sm"
                          backgroundColor="#FDFDFF"
                          onClick={handleClick}
                        >
                          {show ? 'Hide' : 'Show'}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.password && errors.password.message}
                    </FormErrorMessage>
                  </Flex>
                </FormControl>
                <Flex width="100%" justify="center">
                  <Button
                    width="85%"
                    mb="30px"
                    border="none"
                    rounded="50px"
                    h="58px"
                    my="2%"
                    size="lg"
                    color="white"
                    backgroundColor="#344CD0"
                    _hover={{ backgroundColor: '#4254BA', cursor: 'pointer' }}
                    isLoading={formState.isSubmitting}
                    type="submit"
                    data-cy="loginSubmit"
                  >
                    Login
                  </Button>
                </Flex>
              </Flex>
              <Flex m="15px" justify="center" fontWeight="light">
                <Text fontSize="16px" color="#17171B" fontFamily="Muli">
                  Don't have an account?{' '}
                  <Link
                    to="/signup"
                    onClick={gaSignup}
                    data-cy="signupLink"
                    style={{
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      color: '#344CD0',
                      fontSize: '16px',
                    }}
                  >
                    Sign up here!
                  </Link>
                </Text>
              </Flex>
            </Flex>
          </form>
        </Flex>
      </Flex>
    </Flex>
  )
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.auth.isLoading,
  }
}

export default connect(mapStateToProps, login)(Login)
