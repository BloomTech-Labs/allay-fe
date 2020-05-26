import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ReactGA from 'react-ga' // for google analytics
//components
import SignupLoginInput from '../../Reusable/InputFields/SignupLoginInput.js'
import CustomAutocomplete from '../../Reusable/InputFields/Autocomplete.js'
import { years } from '../../Reusable/yearsData'
//actions
import updateUser from '../../../state/actions/index'
//styles
import {
  Image,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Flex,
  Text,
  Radio,
  Tooltip,
  Box,
  Select,
  Avatar,
  FormHelperText,
} from '@chakra-ui/core'

const EditUserProfile = ({ match, history, userData, updateUser }) => {
  const id = match.params.id
  const userId = window.localStorage.getItem('userId')
  // creating form state, setting default values
  const { handleSubmit, errors, register, formState } = useForm({
    defaultValues: {
      firstName: userData.first_name,
      lastName: userData.last_name,
      gradMonth: userData.graduated ? userData.graduated.slice(5, 7) : null,
      gradYear: userData.graduated ? userData.graduated.slice(0, 4) : null,
      highest_ed: userData.highest_ed,
      field_of_study: userData.field_of_study,
      employed_company: userData.employed_company,
      employed_title: userData.employed_title,
      workMonth: userData.employed_start
        ? userData.employed_start.slice(5, 7)
        : null,
      workYear: userData.employed_start
        ? userData.employed_start.slice(0, 4)
        : null,
      resume: userData.resume ? userData.resume : null,
      portfolio_URL: userData.portfolio ? userData.portfolio : null,
      linked_in: userData.linked_in ? userData.linked_in : null,
      slack: userData.slack ? userData.slack : null,
      github: userData.github ? userData.github : null,
      dribble: userData.dribble ? userData.dribble : null,
      profile_image: userData.profile_image ? userData.profile_image : null,
    },
  })

  //location state/helpers
  const [location, setLocation] = useState({})
  const [newLocation, setNewLocation] = useState({})
  const stateHelper = (value) => {
    setLocation(value)
  }
  // cloudinary stuff
  const [newProfile_image, setNewProfile_Image] = useState('')
  const [newProfile_resume, setNewProfile_resume] = useState('')

  // graduated state/helpers
  const [graduated, setGraduated] = useState(userData.graduated ? true : false)
  const isGraduated = () => {
    setGraduated(true)
  }
  const notGraduated = () => {
    setGraduated(false)
  }
  // employed state/helpers
  const [employed, setEmployed] = useState(
    userData.employed_start ? true : false
  )
  const isEmployed = () => {
    setEmployed(true)
  }
  const notEmployed = () => {
    setEmployed(false)
  }

  //radio button state
  const [priorExp, setPriorExp] = useState(
    userData.prior_experience ? userData.prior_experience : false
  )
  const [tlsl, setTlsl] = useState(
    userData.tlsl_experience ? userData.tlsl_experience : false
  )
  const [remote, setRemote] = useState(
    userData.employed_remote ? userData.employed_remote : false
  )

  //location helper
  useEffect(() => {
    setNewLocation({ ...location, myState: location.myState })
    // removes numbers, commas, and whitespaces from city
    if (location.myCity) {
      if (/^[0-9]+$/.test(location.myCity) || /\s/.test(location.myCity)) {
        const tempCity = location.myCity
        setNewLocation({
          ...location,
          myCity: tempCity.replace(/^[\s,\d]+/, ''),
        })
      }
    }
  }, [location])

  ///info for slack ID
  const info = (
    <Box>
      <Image
        objectFit="fit"
        width="300px"
        height="300px"
        src={require('../../../icons/slack.gif')}
        alt="slack info"
      />
    </Box>
  )

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

  function validateFieldOfStudy(value) {
    let error
    let nameRegex = /^[0-9*#+]+$/
    if (nameRegex.test(value)) {
      error = 'Field of study can only contain letters'
    }
    return error || true
  }
  //end validation

  //add image to cloudinary
  const updateImage = async (e) => {
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
    setNewProfile_Image(...newProfile_image, file.secure_url)
  }

  //upload resume to cloudinary
  const updateResume = async (e) => {
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
    setNewProfile_resume(...newProfile_resume, file.secure_url)
  }

  // FORM SUBMISSION
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
    // formatting the signup state to match the back end columns
    updateUser(id, {
      first_name: creds.firstName,
      last_name: creds.lastName,
      location: newLocation
        ? `${newLocation.myCity || userData.location} ${newLocation.myState}`
        : creds.location,
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
      resume: newProfile_resume || userData.resume,
      linked_in: creds.linked_in || null,
      slack: creds.slack || null,
      github: creds.github || null,
      dribble: creds.dribble || null,
      profile_image: newProfile_image || userData.profile_image,
      portfolio: creds.portfolio_URL || null,
    }).then(() => history.push(`/profile/${id}`))

    ReactGA.event({
      category: 'User',
      action: `Button Update Profile`,
    })
  }

  const returnToProfile = (e) => {
    e.preventDefault()
    history.push(`/profile/${id}`)
  }

  //see profilePage component for details
  const lazySolution =
    userData.location != 'undefined undefined ' &&
    userData.location != 'undefined undefined'
      ? userData.location
      : 'Enter your location'

  return (
    <>
      {/* //Top Section */}

      <Flex
        maxW="1440px"
        w="100%"
        px="40px"
        py="28px"
        m="0 auto"
        justify="space-between"
        align="center"
        borderBottom="1px solid #EAF0FE"
      >
        <Flex>
          <Link
            style={{
              textDecoration: 'none',
              color: '#344CD0',
              fontFamily: 'Poppins',
              fontWeight: '600',
              fontSize: '32px',
            }}
            to="/dashboard"
          >
            <h1> Allay </h1>
          </Link>
        </Flex>

        {Number(userId) === Number(userData.id) ? (
          <Flex>
            {userData.profile_image === 'h' ? (
              <Image
                size="58px"
                style={{ opacity: '0.6' }}
                src={require('../../../icons/user.svg')}
              />
            ) : (
              <Image
                size="58px"
                style={{ opacity: '0.6', borderRadius: '50%' }}
                src={userData.profile_image}
              />
            )}
          </Flex>
        ) : null}
      </Flex>
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
            p="6"
            flexDir="column"
            background="#FDFDFF"
            justify="center"
          >
            <Flex w="653px" justify="space-between" my="68px" mx="auto">
              <Text
                as="h2"
                fontSize="24px"
                fontWeight="600"
                fontFamily="Poppins"
              >
                Edit Profile
              </Text>
              <Flex w="150px" justify="space-between">
                <Text
                  as="h3"
                  fontFamily="Muli"
                  fontSize="22px"
                  fontWeight="normal"
                  color="#9194A8"
                  style={{ cursor: 'pointer' }}
                  onClick={returnToProfile}
                >
                  Cancel
                </Text>
                <Text
                  as="h3"
                  fontFamily="Muli"
                  fontSize="22px"
                  fontWeight="bold"
                  color="#344CD0"
                  style={{ cursor: 'pointer' }}
                  onClick={handleSubmit(submitForm)}
                >
                  Save
                </Text>
              </Flex>
            </Flex>

            {/* CLOUDINARY IMAGE UPLOAD */}
            <Flex
              wrap="wrap"
              w="653px"
              mx="auto"
              mb="55px"
              justify="space-evenly"
              alignItems="center"
            >
              {!newProfile_image ? (
                <Avatar
                  size="2xl"
                  name={userData.first_name}
                  style={{ borderRadius: '50%' }}
                  src={userData.profile_image}
                />
              ) : (
                <Avatar
                  size="2xl"
                  style={{ borderRadius: '50%' }}
                  src={newProfile_image}
                />
              )}

              <Flex alignItems="center">
                <input
                  type="file"
                  filename="image"
                  placeholder="Upload profile picture"
                  onChange={updateImage}
                  style={{
                    opacity: '1',
                    width: '105px',
                    color: 'transparent',
                    backgroundColor: 'transparent',
                  }}
                />
                {!newProfile_image ? (
                  <label htmlFor="files" className="btn">
                    Update profile image
                  </label>
                ) : (
                  <i
                    style={{
                      fontSize: '1.4rem',
                      color: 'green',
                      paddingLeft: '20px',
                    }}
                    className="far fa-check-circle"
                  ></i>
                )}
              </Flex>
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

            {/* LOCATION OF USER */}
            <Flex wrap="wrap" w="653" justify="center">
              <FormControl>
                <FormLabel fontSize="18px" color="#131C4D" fontFamily="Muli">
                  Location (City, State)
                </FormLabel>
                <CustomAutocomplete
                  stateHelper={stateHelper}
                  w="653px"
                  h="58px"
                  mb="30px"
                  rounded="2px"
                  variant="outline"
                  bgColor="#FDFDFF"
                  focusBorderColor="#344CD0"
                  borderColor="#EAF0FE"
                  color="#17171B"
                  _hover={{ borderColor: '#BBBDC6' }}
                  _placeholder={{ color: '#BBBDC6' }}
                  id="location"
                  name="location"
                  label="location"
                  placeholder={lazySolution}
                  ref={register}
                />
              </FormControl>
            </Flex>

            {/* GRADUATED CHECK */}
            <Flex
              wrap="wrap"
              w="653px"
              mx="auto"
              mb={graduated ? '20px' : '80px'}
              justify="space-between"
            >
              <FormLabel fontSize="18px" color="#131C4D" fontFamily="Muli">
                Have you graduated from Lambda yet?
              </FormLabel>
              <Flex justify="space-between" w="131px">
                <Radio
                  name="graduated"
                  id="graduated-1"
                  value={true}
                  isChecked={graduated === true}
                  onClick={isGraduated}
                  borderRadius="md"
                  borderColor="#D9D9D9"
                  _checked={{ bg: '#344CD0' }}
                >
                  Yes
                </Radio>
                <Radio
                  name="graduated"
                  id="graduated-2"
                  value={false}
                  isChecked={graduated === false}
                  onClick={notGraduated}
                  borderRadius="md"
                  borderColor="#D9D9D9"
                  _checked={{ bg: '#344CD0' }}
                >
                  No
                </Radio>
              </Flex>
            </Flex>
            {/* GRADUATED MONTH AND YEAR */}
            {graduated ? (
              <Flex
                wrap="wrap"
                w="653px"
                mx="auto"
                mb="80px"
                justify="space-between"
                align="center"
              >
                <FormLabel fontSize="18px" color="#131C4D" fontFamily="Muli">
                  When did you graduate?
                </FormLabel>
                <Flex align="center" alignContent="center">
                  <FormControl>
                    <Select
                      mr="17px"
                      h="68px"
                      py="16px"
                      w="155px"
                      rounded="2px"
                      variant="outline"
                      backgroundColor="#FDFDFF"
                      focusBorderColor="#344CD0"
                      borderColor="#EAF0FE"
                      color="#BBBDC6"
                      _focus={{ color: '#17171B' }}
                      _hover={{ borderColor: '#BBBDC6' }}
                      name="gradMonth"
                      label="gradMonth"
                      ref={register}
                    >
                      <option fontFamily="Muli" value="">
                        Month
                      </option>
                      <option fontFamily="Muli" value="01">
                        Jan
                      </option>
                      <option fontFamily="Muli" value="02">
                        Feb
                      </option>
                      <option fontFamily="Muli" value="03">
                        Mar
                      </option>
                      <option fontFamily="Muli" value="04">
                        Apr
                      </option>
                      <option fontFamily="Muli" value="05">
                        May
                      </option>
                      <option fontFamily="Muli" value="06">
                        Jun
                      </option>
                      <option fontFamily="Muli" value="07">
                        Jul
                      </option>
                      <option fontFamily="Muli" value="08">
                        Aug
                      </option>
                      <option fontFamily="Muli" value="09">
                        Sep
                      </option>
                      <option fontFamily="Muli" value="10">
                        Oct
                      </option>
                      <option fontFamily="Muli" value="11">
                        Nov
                      </option>
                      <option fontFamily="Muli" value="12">
                        Dec
                      </option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <Select
                      h="68px"
                      py="16px"
                      w="155px"
                      rounded="2px"
                      variant="outline"
                      backgroundColor="#FDFDFF"
                      focusBorderColor="#344CD0"
                      borderColor="#EAF0FE"
                      color="#BBBDC6"
                      _focus={{ color: '#17171B' }}
                      _hover={{ borderColor: '#BBBDC6' }}
                      name="gradYear"
                      label="gradYear"
                      ref={register}
                    >
                      <option fontFamily="Muli" value="">
                        Year
                      </option>
                      {years.map((year, index) => (
                        <option key={`year${index}`} value={year}>
                          {year}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </Flex>
              </Flex>
            ) : null}
            <Flex
              wrap="wrap"
              w="653px"
              mx="auto"
              mb="35px"
              justify="flex-start"
              borderTop="1px solid #DADADD"
            >
              <Text
                fontFamily="Poppins"
                fontWeight="600"
                fontSize="24px"
                lineHeight="36px"
                color="#BBBDC6"
              >
                Background
              </Text>
            </Flex>

            {/* HIGHEST LEVEL OF EDUCATION */}
            <Flex wrap="wrap" w="411px%" justify="center">
              <FormControl>
                <FormLabel fontSize="18px" color="#131C4D" fontFamily="Muli">
                  Highest level of education
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
                  name="highest_ed"
                  label="highest_ed"
                  ref={register}
                >
                  <option fontFamily="Muli" value="">
                    Select your education level
                  </option>
                  <option fontFamily="Muli" value="High school diploma">
                    High school diploma
                  </option>
                  <option fontFamily="Muli" value="Associate's degree">
                    Associate's degree
                  </option>
                  <option fontFamily="Muli" value="Bachelor's degree">
                    Bachelor's degree
                  </option>
                  <option fontFamily="Muli" value="Master's degree">
                    Master's degree
                  </option>
                  <option fontFamily="Muli" value="PhD">
                    PhD
                  </option>
                </Select>
              </FormControl>

              {/* FIELD OF STUDY */}
              <FormControl isInvalid={errors.fieldOfStudy}>
                <FormLabel fontSize="18px" color="#131C4D" fontFamily="Muli">
                  Field of study
                </FormLabel>
                <SignupLoginInput
                  w="318px"
                  mb="30px"
                  type="text"
                  name="field_of_study"
                  label="field_of_study"
                  placeholder="Enter your field of study"
                  autoCapitalize="none"
                  ref={register({ validate: validateFieldOfStudy })}
                />
                <FormErrorMessage>
                  {errors.fieldOfStudy && errors.fieldOfStudy.message}
                </FormErrorMessage>
              </FormControl>
            </Flex>

            {/* PRIOR EXPERIENCE */}
            <Flex
              wrap="wrap"
              w="653px"
              mx="auto"
              mb="30px"
              justify="space-between"
            >
              <FormLabel fontSize="18px" color="#131C4D" fontFamily="Muli">
                Prior to Lambda did you have any experience in your track?
              </FormLabel>
              <Flex justify="space-between" w="131px">
                <Radio
                  name="prior_experience"
                  id="priorExp-1"
                  ref={register}
                  value={true}
                  isChecked={priorExp === true}
                  onChange={() => setPriorExp(true)}
                  borderRadius="md"
                  borderColor="#D9D9D9"
                  _checked={{ bg: '#344CD0' }}
                >
                  Yes
                </Radio>
                <Radio
                  name="prior_experience"
                  id="priorExp-2"
                  ref={register}
                  value={false}
                  isChecked={priorExp === false}
                  onChange={() => setPriorExp(false)}
                  borderRadius="md"
                  borderColor="#D9D9D9"
                  _checked={{ bg: '#344CD0' }}
                >
                  No
                </Radio>
              </Flex>
            </Flex>

            {/* DID YOU TL/SL */}
            <Flex
              wrap="wrap"
              w="653px"
              mx="auto"
              mb="100px"
              justify="space-between"
            >
              <FormLabel fontSize="18px" color="#131C4D" fontFamily="Muli">
                Have you been a TL/SL while at Lambda?
              </FormLabel>
              <Flex justify="space-between" w="131px">
                <Radio
                  name="tlsl_experience"
                  id="TLSL-1"
                  value={true}
                  ref={register}
                  isChecked={tlsl === true}
                  onChange={() => setTlsl(true)}
                  borderRadius="md"
                  borderColor="#D9D9D9"
                  _checked={{ bg: '#344CD0' }}
                >
                  Yes
                </Radio>
                <Radio
                  name="tlsl_experience"
                  id="TLSL-2"
                  value={false}
                  ref={register}
                  isChecked={tlsl === false}
                  onChange={() => setTlsl(false)}
                  borderRadius="md"
                  borderColor="#D9D9D9"
                  _checked={{ bg: '#344CD0' }}
                >
                  No
                </Radio>
              </Flex>
            </Flex>

            {/* RESUME UPLOAD */}
            {/* /// */}
            <Flex
              wrap="wrap"
              w="653px"
              mx="auto"
              justify="space-between"
              align="center"
            >
              <Text
                fontSize="18px"
                color="#131C4D"
                align="center"
                fontFamily="Muli"
              >
                Resume
              </Text>
              <Flex width="270px" justify="flex-end">
                <input
                  type="file"
                  filename="image"
                  placeholder="Upload profile picture"
                  onChange={updateResume}
                  style={{
                    opacity: '1',
                    width: '105px',
                    color: 'transparent',
                    backgroundColor: 'transparent',
                  }}
                />
                <label htmlFor="files" className="btn">
                  {!newProfile_resume ? (
                    'Upload resume'
                  ) : (
                    <i
                      style={{
                        fontSize: '1.4rem',
                        color: 'green',
                        paddingLeft: '20px',
                      }}
                      className="far fa-check-circle"
                    ></i>
                  )}
                </label>
              </Flex>
            </Flex>
            <Flex w="653px" mx="auto" justify="flex-start">
              <FormHelperText w="653px" mb="30px" color="#9194A8">
                Must be a .pdf file
              </FormHelperText>
            </Flex>

            {/* //// */}
            <Flex
              wrap="wrap"
              w="653px"
              mx="auto"
              mb="35px"
              justify="flex-start"
              borderTop="1px solid #DADADD"
            >
              <Text
                fontFamily="Poppins"
                fontWeight="600"
                fontSize="24px"
                lineHeight="36px"
                color="#BBBDC6"
              >
                Employment
              </Text>
            </Flex>

            {/* EMPLOYED CHECK */}
            <Flex
              wrap="wrap"
              w="653px"
              mx="auto"
              mb={employed ? '30px' : '80px'}
              justify="space-between"
            >
              <FormLabel color="#131C4D" fontSize="18px" fontFamily="Muli">
                Are you currently employed in your field of study?
              </FormLabel>
              <Flex justify="space-between" w="131px">
                <Radio
                  name="employed"
                  id="employed-1"
                  value={true}
                  isChecked={employed === true}
                  onClick={isEmployed}
                  borderRadius="md"
                  borderColor="#D9D9D9"
                  _checked={{ bg: '#344CD0' }}
                >
                  Yes
                </Radio>
                <Radio
                  name="employed"
                  id="employed-2"
                  value={false}
                  isChecked={employed === false}
                  onClick={notEmployed}
                  borderRadius="md"
                  borderColor="#D9D9D9"
                  _checked={{ bg: '#344CD0' }}
                >
                  No
                </Radio>
              </Flex>
            </Flex>

            {/* EMPLOYED COMPANY NAME AND JOB TITLE */}
            {employed ? (
              <Flex wrap="wrap" w="653" justify="center">
                <FormControl>
                  <FormLabel color="#131C4D" fontSize="18px" fontFamily="Muli">
                    Company name
                  </FormLabel>
                  <SignupLoginInput
                    w="318px"
                    mb="30px"
                    mr="17px"
                    type="text"
                    name="employed_company"
                    label="employed_company"
                    placeholder="Enter the company name"
                    autoCapitalize="none"
                    ref={register}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel color="#131C4D" fontSize="18px" fontFamily="Muli">
                    Job title
                  </FormLabel>
                  <SignupLoginInput
                    w="318px"
                    mb="30px"
                    type="text"
                    name="employed_title"
                    label="employed_title"
                    placeholder="Enter your job title"
                    autoCapitalize="none"
                    ref={register}
                  />
                </FormControl>
              </Flex>
            ) : null}

            {/* REMOTE WORK CHECK */}
            {employed ? (
              <Flex
                wrap="wrap"
                w="653px"
                mx="auto"
                mb="30px"
                justify="space-between"
              >
                <FormLabel color="#131C4D" fontSize="18px" fontFamily="Muli">
                  Are you working remotely?
                </FormLabel>
                <Flex justify="space-between" w="131px">
                  <Radio
                    name="employed_remote"
                    id="employed_remote-1"
                    value={true}
                    ref={register}
                    isChecked={remote === true}
                    onChange={() => setRemote(true)}
                    borderRadius="md"
                    borderColor="#D9D9D9"
                    _checked={{ bg: '#344CD0' }}
                  >
                    Yes
                  </Radio>
                  <Radio
                    name="employed_remote"
                    id="employed_remote-2"
                    value={false}
                    ref={register}
                    isChecked={remote === false}
                    onChange={() => setRemote(false)}
                    borderRadius="md"
                    borderColor="#D9D9D9"
                    _checked={{ bg: '#344CD0' }}
                  >
                    No
                  </Radio>
                </Flex>
              </Flex>
            ) : null}

            {/* EMPLOYMENT START DATE */}
            {employed ? (
              <Flex
                wrap="wrap"
                w="653px"
                mx="auto"
                mb="80px"
                justify="space-between"
                align="center"
              >
                <FormLabel color="#131C4D" fontSize="18px" fontFamily="Muli">
                  When did you start?
                </FormLabel>
                <Flex align="center" alignContent="center">
                  <FormControl>
                    <Select
                      mr="17px"
                      h="68px"
                      py="16px"
                      w="159px"
                      rounded="2px"
                      variant="outline"
                      backgroundColor="#FDFDFF"
                      focusBorderColor="#344CD0"
                      borderColor="#EAF0FE"
                      color="#BBBDC6"
                      _focus={{ color: '#17171B' }}
                      _hover={{ borderColor: '#BBBDC6' }}
                      name="workMonth"
                      label="workMonth"
                      ref={register}
                    >
                      <option fontFamily="Muli" value="">
                        Month
                      </option>
                      <option fontFamily="Muli" value="01">
                        Jan
                      </option>
                      <option fontFamily="Muli" value="02">
                        Feb
                      </option>
                      <option fontFamily="Muli" value="03">
                        Mar
                      </option>
                      <option fontFamily="Muli" value="04">
                        Apr
                      </option>
                      <option fontFamily="Muli" value="05">
                        May
                      </option>
                      <option fontFamily="Muli" value="06">
                        Jun
                      </option>
                      <option fontFamily="Muli" value="07">
                        Jul
                      </option>
                      <option fontFamily="Muli" value="08">
                        Aug
                      </option>
                      <option fontFamily="Muli" value="09">
                        Sep
                      </option>
                      <option fontFamily="Muli" value="10">
                        Oct
                      </option>
                      <option fontFamily="Muli" value="11">
                        Nov
                      </option>
                      <option fontFamily="Muli" value="12">
                        Dec
                      </option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <Select
                      h="68px"
                      py="16px"
                      w="159px"
                      rounded="2px"
                      variant="outline"
                      backgroundColor="#FDFDFF"
                      focusBorderColor="#344CD0"
                      borderColor="#EAF0FE"
                      color="#BBBDC6"
                      _focus={{ color: '#17171B' }}
                      _hover={{ borderColor: '#BBBDC6' }}
                      name="workYear"
                      label="workYear"
                      ref={register}
                    >
                      <option fontFamily="Muli" value="">
                        Year
                      </option>
                      {years.map((year, index) => (
                        <option key={`year${index}`} value={year}>
                          {year}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </Flex>
              </Flex>
            ) : null}
            <Flex
              wrap="wrap"
              w="653px"
              mx="auto"
              mb="35px"
              justify="flex-start"
              borderTop="1px solid #DADADD"
            >
              <Text
                fontFamily="Poppins"
                fontWeight="600"
                fontSize="24px"
                lineHeight="36px"
                color="#BBBDC6"
              >
                Online Presence
              </Text>
            </Flex>

            {/* PORTFOLIO URL */}
            <Flex
              wrap="wrap"
              w="653px"
              mb="15px"
              mx="auto"
              justify="space-between"
              align="center"
            >
              <Text
                color="#131C4D"
                fontSize="18px"
                align="center"
                fontFamily="Muli"
              >
                Portfolio URL
              </Text>
              <SignupLoginInput
                w="318px"
                type="text"
                name="portfolio_URL"
                label="portfolio_URL"
                placeholder="Enter your portfolio URL"
                autoCapitalize="none"
                ref={register}
              />
            </Flex>

            {/* LINKEDIN URL */}
            <Flex
              wrap="wrap"
              w="653px"
              mb="15px"
              mx="auto"
              justify="space-between"
              align="center"
            >
              <Text
                color="#131C4D"
                fontSize="18px"
                align="center"
                fontFamily="Muli"
              >
                LinkedIn URL
              </Text>
              <SignupLoginInput
                w="318px"
                type="text"
                name="linked_in"
                label="linked_in"
                placeholder="Enter your LinkedIn URL"
                autoCapitalize="none"
                ref={register}
              />
            </Flex>

            {/* SLACK USERNAME */}
            <Flex
              wrap="wrap"
              w="653px"
              mb="15px"
              mx="auto"
              justify="space-between"
              align="center"
            >
              <Text
                color="#131C4D"
                fontSize="18px"
                align="center"
                fontFamily="Muli"
              >
                Slack ID
                <Tooltip hasArrow label={info} placement="top">
                  <i
                    style={{ paddingLeft: '10px' }}
                    className="fas fa-question"
                  ></i>
                </Tooltip>
              </Text>
              <SignupLoginInput
                w="318px"
                type="text"
                name="slack"
                label="slack"
                placeholder="Enter your Slack ID"
                autoCapitalize="none"
                ref={register}
              />
            </Flex>

            {/* GITHUB USERNAME */}
            <Flex
              wrap="wrap"
              w="653px"
              mb="15px"
              mx="auto"
              justify="space-between"
              align="center"
            >
              <Text
                color="#131C4D"
                fontSize="18px"
                align="center"
                fontFamily="Muli"
              >
                Github URL
              </Text>
              <SignupLoginInput
                w="318px"
                type="text"
                name="github"
                label="github"
                placeholder="Enter your Github URL"
                autoCapitalize="none"
                ref={register}
              />
            </Flex>

            {/* DRIBBBLE URL */}
            <Flex
              wrap="wrap"
              w="653px"
              mb="15px"
              mx="auto"
              justify="space-between"
              align="center"
            >
              <Text
                color="#131C4D"
                fontSize="18px"
                align="center"
                fontFamily="Muli"
              >
                Dribbble URL
              </Text>
              <SignupLoginInput
                w="318px"
                type="text"
                name="dribble"
                label="dribble"
                placeholder="Enter your Dribbble URL"
                autoCapitalize="none"
                ref={register}
              />
            </Flex>
            <Flex
              w="100%"
              style={{ alignItems: 'center' }}
              justify="center"
              direction="column"
            >
              <Button
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
                Save
              </Button>
              <Button
                mb="30px"
                border="none"
                rounded="50px"
                h="58px"
                w="653px"
                my="2%"
                size="lg"
                color="#9194A8"
                backgroundColor="#FDFDFF"
                _hover={{ cursor: 'pointer' }}
                onClick={returnToProfile}
                data-cy="cancelUpdate"
              >
                Cancel
              </Button>
            </Flex>
          </Flex>
        </form>
      </Flex>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    userData: state.user.userData,
    isLoading: state.user.isLoading,
  }
}

export default connect(mapStateToProps, updateUser)(EditUserProfile)
