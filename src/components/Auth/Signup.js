import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ReactGA from 'react-ga' // for google analytics
//components
import SignupLoginInput from '../Reusable/InputFields/SignupLoginInput.js'
import SignupAdditional from './Signup-Additional'
//actions
import signup from '../../state/actions/index'
//styles
import CustomSpinner from '../CustomSpinner.js'

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
  Icon,
} from '@chakra-ui/core'

const Signup = ({ signup, isLoading, history }) => {
  const { handleSubmit, errors, register, formState } = useForm()
  const [show, setShow] = useState(false)
  const [moreInfo, setMoreInfo] = useState(false)
  const handleClick = () => setShow(!show)
  //location state
  const [location, setLocation] = useState({})
  const [newLocation, setNewLocation] = useState({})
  const stateHelper = (value) => {
    setLocation(value)
  }
  const [profile_image, setProfile_Image] = useState('')
  const [profile_resume, setProfile_resume] = useState('')
  //validation
  function validateFirstName(value) {
    let error
    let nameRegex = /^[0-9*#+]+$/
    if (!value) {
      error = 'First Name is required'
    } else if (value.length < 2) {
      error = 'First Name must be at least 2 characters'
    } else if (nameRegex.test(value)) {
      error = 'First Name can only contain letters'
    }
    return error || true
  }

  function validateLastName(value) {
    let error
    let nameRegex = /^[0-9*#+]+$/
    if (!value) {
      error = 'Last Name is required'
    } else if (value.length < 2) {
      error = 'Last Name must be at least 2 characters'
    } else if (nameRegex.test(value)) {
      error = 'Last Name can only contain letters'
    }
    return error || true
  }

  function validateEmail(value) {
    let error
    if (!value) {
      error = 'Email is required'
    } else if (!value.includes('@')) {
      error = 'Must be a valid email'
    }
    return error || true
  }

  function validateTrack(value) {
    let error
    if (!value) {
      error = 'Lambda track is required'
    }
    return error || true
  }

  function validateCohort(value) {
    let error
    if (!value) {
      error = 'Cohort is required'
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

  function validateFieldOfStudy(value) {
    let error
    let nameRegex = /^[0-9*#+]+$/
    if (nameRegex.test(value)) {
      error = 'Field of study can only contain letters'
    }
    return error || true
  }
  // end validation

  //add image to cloudinary
  const uploadImage = async (e) => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'upload')
    const res = await fetch(
      '	https://api.cloudinary.com/v1_1/takija/image/upload',
      {
        method: 'POST',
        body: data,
      }
    )
    const file = await res.json()
    setProfile_Image(...profile_image, file.secure_url)
  }

  //upload resume to cloudinary
  const uploadResume = async (e) => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'upload')
    const res = await fetch(
      '	https://api.cloudinary.com/v1_1/takija/image/upload',
      {
        method: 'POST',
        body: data,
      }
    )
    const file = await res.json()
    console.log('here', file)
    setProfile_resume(...profile_resume, file.secure_url)
  }

  const submitForm = (creds) => {
    // correcting grad date format
    let graduated = null
    if (creds.gradMonth && creds.gradYear) {
      graduated = `${creds.gradYear}-${creds.gradMonth}-01`
    }

    // correcting employed date format
    let employed_start = null
    if (creds.workMonth && creds.workYear) {
      employed_start = `${creds.workYear}-${creds.workMonth}-01`
    }

    if (creds.confirmPassword === creds.password) {
      // formatting the signup state to match the back end columns
      signup({
        email: creds.email,
        password: creds.password,
        track_id: Number(creds.track_id),
        first_name: creds.firstName,
        last_name: creds.lastName,
        cohort: creds.cohort,
        contact_email: creds.contact_email || null,
        location: newLocation
          ? `${newLocation.myCity} ${newLocation.myState}`
          : null,
        graduated: graduated,
        highest_ed: creds.highest_ed || null,
        field_of_study: creds.field_of_study || null,
        prior_experience: creds.prior_experience
          ? JSON.parse(creds.prior_experience)
          : false,
        tlsl_experience: creds.tlsl_experience
          ? JSON.parse(creds.tlsl_experience)
          : false,
        employed_company: creds.employed_company || null,
        employed_title: creds.employed_title || null,
        employed_remote: creds.employed_remote
          ? JSON.parse(creds.employed_remote)
          : false,
        employed_start: employed_start,
        resume: profile_resume || null,
        linked_in: creds.linked_in || null,
        slack: creds.slack || null,
        github: creds.github || null,
        dribble: creds.dribble || null,
        profile_image: profile_image || null,
        portfolio: creds.portfolio_URL || null,
      }).then(() => history.push('/dashboard'))
    } else {
      alert('Your Passwords must match!')
    }
    ReactGA.event({
      category: 'User',
      action: `Button Sign Up`,
    })
  }

  const switchMoreInfo = () => {
    setMoreInfo(!moreInfo)
  }

  const gaLogin = () => {
    ReactGA.event({
      category: 'User',
      action: `Link Already have an account`,
    })
  }

  if (isLoading) {
    return (
      <Flex justify="center" align="center" w="100vh" h="100vh">
        <Flex>
          <CustomSpinner />
        </Flex>
      </Flex>
    )
  }

  return (
    <Flex className="RegisterSplash" w="100%" minH="100vh" justify="center">
      <Flex maxW="1440px" w="100%">
        <Flex
          w="833px"
          mx="auto"
          justify="center"
          align="center"
          flexDir="column"
        >
          <form onSubmit={handleSubmit(submitForm)}>
            <Flex
              w="833px"
              // h='825px'
              p="6"
              flexDir="column"
              background="#FDFDFF"
              justify="center"
            >
              <Flex
                as="h2"
                w="653"
                fontSize="36px"
                fontWeight="600"
                fontFamily="Poppins"
                justify="center"
                my="68px"
              >
                Let's get started!
              </Flex>

              {/* FIRST NAME, LAST NAME */}
              <Flex wrap="wrap" w="653" justify="center">
                <FormControl isRequired isInvalid={errors.username}>
                  <FormLabel color="#131C4D" fontSize="18px" fontFamily="Muli">
                    First Name
                  </FormLabel>
                  <SignupLoginInput
                    w="318px"
                    mb="30px"
                    mr="17px"
                    type="text"
                    name="firstName"
                    label="firstName"
                    placeholder="John"
                    autoCapitalize="none"
                    ref={register({ validate: validateFirstName })}
                  />
                  <FormErrorMessage>
                    {errors.firstName && errors.firstName.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={errors.username}>
                  <FormLabel color="#131C4D" fontSize="18px" fontFamily="Muli">
                    Last Name
                  </FormLabel>
                  <SignupLoginInput
                    w="318px"
                    mb="30px"
                    type="text"
                    name="lastName"
                    label="lastName"
                    placeholder="Doe"
                    autoCapitalize="none"
                    ref={register({ validate: validateLastName })}
                  />
                  <FormErrorMessage>
                    {errors.lastName && errors.lastName.message}
                  </FormErrorMessage>
                </FormControl>
              </Flex>

              {/* EMAIL */}
              <Flex wrap="wrap" w="653" justify="center">
                <FormControl isRequired isInvalid={errors.email}>
                  <FormLabel color="#131C4D" fontSize="18px" fontFamily="Muli">
                    Email
                  </FormLabel>
                  <SignupLoginInput
                    w="653px"
                    mb="30px"
                    type="email"
                    name="email"
                    label="email"
                    placeholder="allay@lambda.com"
                    autoCapitalize="none"
                    ref={register({ validate: validateEmail })}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>
              </Flex>

              {/* TRACK */}
              <Flex wrap="wrap" w="411px%" justify="center">
                <FormControl isRequired isInvalid={errors.track_name}>
                  <FormLabel color="#131C4D" fontSize="18px" fontFamily="Muli">
                    Track
                  </FormLabel>
                  <Select
                    mb="30px"
                    mr="17px"
                    h="68px"
                    py="16px"
                    w="318px"
                    rounded="2px"
                    variant="outline"
                    backgroundColor="#FDFDFF"
                    focusBorderColor="#344CD0"
                    borderColor="#EAF0FE"
                    color="#BBBDC6"
                    _focus={{ color: '#17171B' }}
                    _hover={{ borderColor: '#BBBDC6' }}
                    name="track_id"
                    label="track_id"
                    ref={register({ validate: validateTrack })}
                  >
                    <option fontFamily="Muli" value="">
                      Select Your Lambda Track
                    </option>
                    <option fontFamily="Muli" value={1}>
                      Android
                    </option>
                    <option fontFamily="Muli" value={2}>
                      DS
                    </option>
                    <option fontFamily="Muli" value={3}>
                      WEB
                    </option>
                    <option fontFamily="Muli" value={4}>
                      IOS
                    </option>
                    <option fontFamily="Muli" value={5}>
                      UX
                    </option>
                  </Select>
                  <FormErrorMessage>
                    {errors.track_id && errors.track_id.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={errors.username}>
                  <FormLabel color="#131C4D" fontSize="18px" fontFamily="Muli">
                    Cohort
                  </FormLabel>
                  <SignupLoginInput
                    w="318px"
                    mb="30px"
                    type="text"
                    name="cohort"
                    label="cohort"
                    placeholder="Ex: FT 1 or PT 1"
                    autoCapitalize="none"
                    ref={register({ validate: validateCohort })}
                  />
                  <FormErrorMessage>
                    {errors.cohort && errors.cohort.message}
                  </FormErrorMessage>
                </FormControl>
              </Flex>

              {/* PASSWORD, CONFIRM PASSWORD */}
              <Flex wrap="wrap" w="411px%" justify="center">
                <FormControl isRequired isInvalid={errors.password}>
                  <FormLabel color="#131C4D" fontSize="18px" fontFamily="Muli">
                    Password
                  </FormLabel>
                  <InputGroup>
                    <SignupLoginInput
                      w="318px"
                      // mb='30px'
                      mr="17px"
                      type={show ? 'text' : 'password'}
                      name="password"
                      label="Password"
                      placeholder="********"
                      autoCapitalize="none"
                      ref={register({ validate: validatePassword })}
                    />
                    <InputRightElement width="4.5rem" pr="22px" py="32px">
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
                  <FormHelperText mb="45px" color="#9194A8">
                    Must be at least 8 characters
                  </FormHelperText>
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel color="#131C4D" fontSize="18px" fontFamily="Muli">
                    Confirm Password
                  </FormLabel>
                  <InputGroup>
                    <SignupLoginInput
                      w="318px"
                      mb="30px"
                      type={show ? 'text' : 'password'}
                      name="confirmPassword"
                      label="Confirm Password"
                      placeholder="********"
                      autoCapitalize="none"
                      ref={register}
                    />
                    <InputRightElement width="4.5rem" py="32px">
                      <Button
                        data-cy="registerSubmit"
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
                </FormControl>
              </Flex>

              {/* CLICK FOR LONGFORM SIGNUP */}
              <Flex
                wrap="wrap"
                w="653px"
                mx="auto"
                mb={moreInfo ? '0' : '55px'}
                cursor="pointer"
                justify="flex-start"
                data-cy="longFormDropdown"
                onClick={switchMoreInfo}
              >
                <Flex justify="flex-start">
                  {moreInfo ? (
                    <Icon
                      fontWeight="bold"
                      name="chevron-down"
                      textAlign="left"
                      size="30px"
                      mr="5px"
                      ml="-8px"
                      pt="3px"
                    />
                  ) : (
                    <Icon
                      fontWeight="bold"
                      name="chevron-right"
                      textAlign="left"
                      size="30px"
                      mr="5px"
                      ml="-8px"
                      pt="3px"
                    />
                  )}
                  <Text fontWeight="bold" fontSize="20px" fontFamily="Muli">
                    {' '}
                    Add Additional Information
                  </Text>
                </Flex>
              </Flex>

              {/* ADDITIONAL INFO COMPONENT */}
              {moreInfo ? (
                <SignupAdditional
                  profile_resume={profile_resume}
                  profile_image={profile_image}
                  uploadImage={uploadImage}
                  uploadResume={uploadResume}
                  register={register}
                  errors={errors}
                  location={location}
                  newLocation={newLocation}
                  setNewLocation={setNewLocation}
                  stateHelper={stateHelper}
                  validateFieldOfStudy={validateFieldOfStudy}
                />
              ) : null}

              <Flex w="100%" justify="center">
                <Button
                  mb="30px"
                  border="none"
                  rounded="50px"
                  h="58px"
                  w="653px"
                  my="2%"
                  size="lg"
                  color="white"
                  backgroundColor="#344CD0"
                  _hover={{ backgroundColor: '#4254BA', cursor: 'pointer' }}
                  isLoading={formState.isSubmitting}
                  type="submit"
                  data-cy="registerSubmit"
                >
                  Sign up
                </Button>
              </Flex>
              <Flex m="15px" justify="center" fontWeight="light">
                <Text fontSize="16px" color="#17171B" fontFamily="Muli">
                  Already have an account?{' '}
                  <Link
                    to="/"
                    onClick={gaLogin}
                    style={{
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      color: '#344CD0',
                      fontSize: '16px',
                    }}
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
  )
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.auth.isLoading,
  }
}

export default connect(mapStateToProps, signup)(Signup)
