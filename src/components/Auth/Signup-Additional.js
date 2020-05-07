import React, { useEffect, useState } from 'react'
//components
import SignupLoginInput from '../Reusable/InputFields/SignupLoginInput.js'
import CustomAutocomplete from '../Reusable/InputFields/Autocomplete'

//styles
import {
  Image,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Flex,
  Text,
  Radio,
  Select,
  Tooltip,
  Box,
} from '@chakra-ui/core'

const SignupAdditional = ({
  register,
  errors,
  location,
  setNewLocation,
  stateHelper,
  validateFieldOfStudy,
  uploadImage,
  profile_image,
  uploadResume,
  profile_resume,
}) => {
  // graduated state
  const [graduated, setGraduated] = useState(false)
  const [years, setYears] = useState([])
  const isGraduated = () => {
    setGraduated(true)
  }
  const notGraduated = () => {
    setGraduated(false)
  }
  const [employed, setEmployed] = useState(false)
  const isEmployed = () => {
    setEmployed(true)
  }
  const notEmployed = () => {
    setEmployed(false)
  }

  //radio button state
  const [priorExp] = useState(false)
  const [tlsl] = useState(false)
  const [remote] = useState(false)

  //location helpers
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

  // year helper
  useEffect(() => {
    const year = new Date().getFullYear()
    setYears(Array.from(new Array(20), (val, index) => year - index))
  }, [])

  ///info for slack ID
  const info = (
    <Box>
      <Image
        objectFit="fit"
        width="300px"
        height="300px"
        src={require('../../icons/slackID.jpg')}
        alt="slack info"
      />
    </Box>
  )

  return (
    <>
      <Flex
        wrap="wrap"
        w="653px"
        mx="auto"
        mb="61px"
        justify="flex-start"
        fontSize="16px"
      >
        <Text fontFamily="Muli">
          The information below will be visible on your profile page by others
        </Text>
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
        {!profile_image ? (
          <Image size="100px" src={require('../../icons/user.png')} />
        ) : (
          <Image
            size="100px"
            style={{ borderRadius: '50px' }}
            src={profile_image}
          />
        )}
        <Flex alignItems="center">
          <input
            type="file"
            filename="image"
            placeholder="Upload profile picture"
            onChange={uploadImage}
            style={{
              opacity: '1',
              width: '105px',
              color: 'transparent',
              backgroundColor: 'transparent',
            }}
          />
          <label for="files" class="btn">
            Upload profile image
          </label>
        </Flex>
      </Flex>

      {/* LOCATION OF USER */}
      <Flex wrap="wrap" w="653" justify="center">
        <FormControl>
          <FormLabel fontFamily="Muli">Location (City, State)</FormLabel>
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
            placeholder="e.g. Los Angeles, CA"
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
        <FormLabel fontFamily="Muli">
          Have you graduated from Lambda yet?
        </FormLabel>

        <Radio
          name="graduated"
          id="graduated-1"
          value={true}
          isInvalid
          defaultChecked={graduated === true}
          onClick={isGraduated}
        >
          Yes
        </Radio>
        <Radio
          isInvalid
          name="graduated"
          id="graduated-2"
          value={false}
          defaultChecked={graduated === false}
          onClick={notGraduated}
        >
          No
        </Radio>
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
          <FormLabel fontFamily="Muli">When did you graduate?</FormLabel>
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
          <FormLabel fontFamily="Muli">Highest level of education</FormLabel>
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
        <FormControl isInvalid={errors.fieldOfStudy}>
          <FormLabel fontFamily="Muli">Field of study</FormLabel>
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
      <Flex wrap="wrap" w="653px" mx="auto" mb="30px" justify="space-between">
        <FormLabel fontFamily="Muli">
          Prior to Lambda did you have any experience in your track?
        </FormLabel>

        <Radio
          isInvalid
          name="prior_experience"
          id="priorExp-1"
          ref={register}
          value={true}
          defaultChecked={priorExp === true}
        >
          Yes
        </Radio>
        <Radio
          isInvalid
          name="prior_experience"
          id="priorExp-2"
          ref={register}
          value={false}
          defaultChecked={priorExp === false}
        >
          No
        </Radio>
      </Flex>

      {/* DID YOU TL/SL */}
      <Flex wrap="wrap" w="653px" mx="auto" mb="100px" justify="space-between">
        <FormLabel fontFamily="Muli">
          Have you been a TL/SL while at Lambda?
        </FormLabel>

        <Radio
          isInvalid
          name="tlsl_experience"
          id="TLSL-1"
          value={true}
          ref={register}
          defaultChecked={tlsl === false}
        >
          Yes
        </Radio>
        <Radio
          isInvalid
          name="tlsl_experience"
          id="TLSL-2"
          value={false}
          ref={register}
          defaultChecked={tlsl === false}
        >
          No
        </Radio>
      </Flex>

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
        <FormLabel fontFamily="Muli">
          Are you currently employed in your field of study?
        </FormLabel>

        <Radio
          isInvalid
          name="employed"
          id="employed-1"
          value={true}
          defaultChecked={employed === true}
          onClick={isEmployed}
        >
          Yes
        </Radio>
        <Radio
          isInvalid
          name="employed"
          id="employed-2"
          value={false}
          defaultChecked={employed === false}
          onClick={notEmployed}
        >
          No
        </Radio>
      </Flex>

      {/* EMPLOYED COMPANY NAME AND JOB TITLE */}
      {employed ? (
        <Flex wrap="wrap" w="653" justify="center">
          <FormControl>
            <FormLabel fontFamily="Muli">Company name</FormLabel>
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
            <FormLabel fontFamily="Muli">Job title</FormLabel>
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
        <Flex wrap="wrap" w="653px" mx="auto" mb="30px" justify="space-between">
          <FormLabel fontFamily="Muli">Are you working remotely?</FormLabel>

          <Radio
            isInvalid
            name="employed_remote"
            id="employed_remote-1"
            value={true}
            ref={register}
            defaultChecked={remote === true}
          >
            Yes
          </Radio>
          <Radio
            isInvalid
            name="employed_remote"
            id="employed_remote-2"
            value={false}
            ref={register}
            defaultChecked={remote === false}
          >
            No
          </Radio>
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
          <FormLabel fontFamily="Muli">When did you start?</FormLabel>
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
          Online presence
        </Text>
      </Flex>

      {/* RESUME UPLOAD */}
      <Flex
        wrap="wrap"
        w="653px"
        mb="30px"
        mx="auto"
        justify="space-between"
        align="center"
      >
        <Text align="center" fontFamily="Muli">
          Resume
        </Text>
        <Flex width="270px">
          <input
            type="file"
            filename="image"
            placeholder="Upload profile picture"
            onChange={uploadResume}
            style={{
              opacity: '1',
              width: '105px',
              color: 'transparent',
              backgroundColor: 'transparent',
            }}
          />
          <label for="files" class="btn">
            {!profile_resume ? (
              'Upload resume'
            ) : (
              <i
                style={{
                  fontSize: '1.4rem',
                  color: 'green',
                  paddingLeft: '20px',
                }}
                class="far fa-check-circle"
              ></i>
            )}
          </label>
        </Flex>
      </Flex>

      {/* CONTACT EMAIL */}
      <Flex
        wrap="wrap"
        w="653px"
        mb="15px"
        mx="auto"
        justify="space-between"
        align="center"
      >
        <Text align="center" fontFamily="Muli">
          Email address
        </Text>
        <SignupLoginInput
          w="318px"
          type="email"
          name="contact_email"
          label="contact_email"
          placeholder="Enter your email address"
          autoCapitalize="none"
          ref={register}
        />
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
        <Text align="center" fontFamily="Muli">
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
        <Text align="center" fontFamily="Muli">
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
        <Text align="center" fontFamily="Muli">
          SLack ID
          <Tooltip hasArrow label={info} placement="top">
            <i style={{ paddingLeft: '10px' }} class="fas fa-question"></i>
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
        <Text align="center" fontFamily="Muli">
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
        <Text align="center" fontFamily="Muli">
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
    </>
  )
}
export default SignupAdditional
