import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import ReactGA from 'react-ga' // for google analytics
import { states } from '../../Reusable/statesData'
// redux
import { connect } from 'react-redux'
// actions
import postReview from '../../../state/actions'
import getCompanies from '../../../state/actions'
import postCompany from '../../../state/actions'
// styles
import ProgressHeader from '../Forms/ProgressHeader'
import CustomAutoComplete from '../../Reusable/InputFields/Autocomplete'
import BeautyStars from 'beauty-stars'
import { ThinkingDots } from '../../Reusable/ThinkingDots'
import {
  FormControl,
  Input,
  Flex,
  Select,
  Textarea,
  Button,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Avatar,
  Link,
} from '@chakra-ui/core'
import AOS from 'aos'
import 'aos/dist/aos.css'
//
import axiosToDS from '../../../utils/axiosToDS'
import CustomSpinner from '../../CustomSpinner'

const ReviewForm2 = ({
  history,
  loadingCompanies,
  companies,
  getCompanies,
  postReview,
}) => {
  //initialize animations
  AOS.init()
  const { register, handleSubmit, formState } = useForm()

  // thinking state
  const [thinking, setThinking] = useState(false)
  const dots = () => {
    setThinking(true)
  }

  // search state
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])

  // no company state
  const [noCompany, setNoCompany] = useState(false)

  // location "state"
  const [location, setLocation] = useState({})
  const [newLocation, setNewLocation] = useState({})
  const stateSelectorHelper = (value) => {
    setLocation(value)
  }

  // star rating
  const [starState, setStarState] = useState(0)

  //progress bar
  const [progress, setProgress] = useState({
    prec: 99,
    time: 8,
    prog: 2,
  })

  // state for visibility
  const [Tag2, setTag2] = useState(false)
  const [Tag3, setTag3] = useState(false)
  const [Tag4, setTag4] = useState(false)
  const [Tag5, setTag5] = useState(false)
  const [Tag6, setTag6] = useState(false)

  // brings to top on render
  useEffect(() => {
    getCompanies()
    setProgress({
      prec: 95,
      time: 7,
      prog: 5,
    })
    const element = document.getElementById('Tag1')
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }, [getCompanies])

  // company search function
  useEffect(() => {
    if (searchTerm.length >= 3) {
      const results = companies.filter((company) =>
        company.company_name.toLowerCase().startsWith(searchTerm.toLowerCase())
      )
      setSearchResults(results)
      if (results.length === 0) {
        setNoCompany(true)
      } else {
        setNoCompany(false)
      }
    }
  }, [searchTerm, companies])

  // state confirmation search function
  useEffect(() => {
    if (location.myState) {
      const stateId = states.filter((i) =>
        i.state_name.toLowerCase().startsWith(location.myState.toLowerCase())
      )
      setNewLocation({ ...location, myState: stateId[0].id })
    }
  }, [location])

  // timers for moves
  let timer = null
  let dotTimer = null

  // 2nd tag
  const time1 = () => {
    clearTimeout(timer)
    clearTimeout(dotTimer)
    dotTimer = setTimeout(dots, 300)
    timer = setTimeout(routeTo2, 1000)
  }
  const routeTo2 = () => {
    setTag2(true)
    setProgress({
      prec: 70,
      time: 6,
      prog: 20,
    })
    const element = document.getElementById('Tag2')
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setThinking(false)
  }

  // 3rd tag
  const time2 = () => {
    clearTimeout(timer)
    clearTimeout(dotTimer)
    dotTimer = setTimeout(dots, 300)
    timer = setTimeout(routeTo3, 1000)
  }
  const routeTo3 = () => {
    setTag3(true)
    setProgress({
      prec: 65,
      time: 4,
      prog: 35,
    })
    const element = document.getElementById('Tag3')
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setThinking(false)
  }

  //4th tag
  const time3 = () => {
    clearTimeout(timer)
    clearTimeout(dotTimer)
    dotTimer = setTimeout(dots, 300)
    timer = setTimeout(routeTo4, 1000)
  }
  const routeTo4 = () => {
    setTag4(true)
    setProgress({
      prec: 45,
      time: 2,
      prog: 65,
    })
    const element = document.getElementById('Tag4')
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setThinking(false)
  }

  // 5th tag
  const time4 = () => {
    clearTimeout(timer)
    clearTimeout(dotTimer)
    dotTimer = setTimeout(dots, 300)
    timer = setTimeout(routeTo5, 1000)
  }
  const routeTo5 = () => {
    setTag5(true)
    setProgress({
      prec: 20,
      time: 1,
      prog: 80,
    })
    const element = document.getElementById('Tag5')
    element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setThinking(false)
  }

  // 6th tag
  const time5 = () => {
    clearTimeout(timer)
    clearTimeout(dotTimer)
    dotTimer = setTimeout(dots, 300)
    timer = setTimeout(routeTo6, 1000)
  }
  const routeTo6 = () => {
    setTag6(true)
    setProgress({
      prec: 100,
      time: 0,
      prog: 100,
    })
    const element = document.getElementById('Tag6')
    element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setThinking(false)
  }

  //push to dashboard and send info to DS for review
  const sendInfoToDS = (data) => {
    var dataForDS = JSON.stringify(data)
    axiosToDS()
      .post('/check_review', dataForDS)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
    history.push('/dashboard')
  }

  //submit handler
  const submitForm = (data) => {
    postReview(localStorage.getItem('userId'), {
      ...data,
      review_type_id: 1,
      overall_rating: starState,
      city: newLocation.myCity,
      state_id: newLocation.myState,
    }).then(() => sendInfoToDS(data))
    ReactGA.event({
      category: 'Review',
      action: `Submit review`,
    })
  }

  return (
    // main container

    <>
      <Flex justify="center">
        <ProgressHeader progress={progress} />
      </Flex>

      <Flex w="100%" margin="0 auto" minH="100vh">
        {thinking ? (
          <>
            <Flex
              bottom="0"
              position="fixed"
              overflow="hidden"
              zIndex="999"
              pt="5%"
              pl="15%"
            >
              <ThinkingDots />
            </Flex>
          </>
        ) : null}
        {/* form container */}
        <Flex
          w="100%"
          bg="#FFF"
          flexDir="column"
          px="2%"
          pt="5%"
          margin="0 auto"
        >
          {/*--------------- start of form ---------------  */}
          <form onSubmit={handleSubmit(submitForm)}>
            <FormControl isRequired>
              {/* first prompt */}
              <Flex
                id="Tag1"
                align="center"
                h="5%"
                p="1%"
                w="416px"
                mb="8%"
                mt="5%"
                bg="#F2F6FE"
                rounded="20px"
                data-aos="fade-right"
                data-aos-offset="200"
                data-aos-delay="50"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="true"
              >
                <p>Tell me some details so we can get started</p>
              </Flex>
              {/* form container  */}
              <Flex w="100%" justify="flex-end">
                {/* company box */}
                <Flex
                  w="459px"
                  h="700px"
                  px="6"
                  py="8"
                  border="1px solid #BBBDC6"
                  rounded="6px"
                  flexDir="column"
                  justify="space-evenly"
                  data-aos="fade-in"
                  data-aos-offset="200"
                  data-aos-delay="1000"
                  data-aos-duration="1500"
                  data-aos-easing="ease-in-out"
                  data-aos-mirror="true"
                  data-aos-once="true"
                  data-aos-anchor="Tag1"
                >
                  <FormLabel>1. Company name</FormLabel>
                  {loadingCompanies ? (
                    <>
                      <Flex justify="center" w="100%">
                        <CustomSpinner />
                      </Flex>
                    </>
                  ) : (
                    <>
                      {' '}
                      <Input
                        h="56px"
                        variant="filled"
                        rounded="6px"
                        textTransform="capitalize"
                        type="text"
                        label="company_name"
                        name="company_name"
                        list="company_name"
                        ref={register}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <datalist id="company_name">
                        {searchResults.map((company) => (
                          <option value={company.company_name} key={company.id}>
                            {company.company_name}
                          </option>
                        ))}
                      </datalist>
                      {noCompany ? (
                        <>
                          <Link mb="3" color="grey" href="/add-company">
                            Oops, you need to add that company!
                          </Link>
                        </>
                      ) : (
                        <Flex mb="6" />
                      )}
                    </>
                  )}
                  <FormLabel>2. Status at the company</FormLabel>
                  <Select
                    h="56px"
                    mb="6"
                    rounded="6px"
                    variant="filled"
                    label="work_status_id"
                    name="work_status_id"
                    placeholder="Select one"
                    ref={register}
                  >
                    <option value={1}>Current Employee</option>
                    <option value={2}>Former Employee</option>
                    <option value={3}>Full Time</option>
                    <option value={4}>Part Time</option>
                    <option value={5}>Intern</option>
                  </Select>
                  <FormLabel>3. Job Title</FormLabel>
                  <Input
                    h="56px"
                    mb="6"
                    variant="filled"
                    rounded="6px"
                    autoCapitalize="none"
                    type="text"
                    label="job_title"
                    name="job_title"
                    list="job_title"
                    ref={register}
                  />
                  <FormLabel>3. Location of company</FormLabel>
                  <CustomAutoComplete
                    stateHelper={stateSelectorHelper}
                    id="Company Headquarters"
                    name="Company Headquarters"
                    label="Company Headquarters"
                    placeholder="e.g. Los Angeles, CA"
                  />
                  <FormLabel mt="6">5. Length of position</FormLabel>
                  <Flex w="100%" justify="space-between">
                    <Input
                      type="number"
                      min="1970"
                      max="2030"
                      h="56px"
                      variant="filled"
                      rounded="6px"
                      w="45%"
                      mr="2%"
                      label="start_date"
                      name="start_date"
                      placeholder="YYYY"
                      ref={register}
                    />

                    <Input
                      h="56px"
                      variant="filled"
                      rounded="6px"
                      autoCapitalize="none"
                      type="number"
                      min="1970"
                      max="2030"
                      w="45%"
                      label="end_date"
                      name="end_date"
                      placeholder="YYYY"
                      ref={register}
                    />
                  </Flex>
                </Flex>
                {/* avatar */}
                <Flex
                  h="700px"
                  align="flex-end"
                  ml="1%"
                  data-aos="fade-in"
                  data-aos-offset="200"
                  data-aos-delay="1000"
                  data-aos-duration="1500"
                  data-aos-easing="ease-in-out"
                  data-aos-mirror="true"
                  data-aos-once="true"
                  data-aos-anchor="Tag1"
                >
                  <Avatar size="md" src="https://bit.ly/broken-link" />
                </Flex>
              </Flex>
              <Flex
                justify="flex-end"
                mb="5%"
                data-aos="fade-in"
                data-aos-offset="120"
                data-aos-delay="1000"
                data-aos-duration="1500"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="true"
                data-aos-anchor="Tag1"
              >
                <Button
                  data-cy="companyReviewFormButton"
                  h="56px"
                  w="17%"
                  mt="2%"
                  rounded="35px"
                  border="1px solid #344CD0"
                  color="#344CD0"
                  backgroundColor="#FFF"
                  _hover={{ backgroundColor: '#F2F6FE', cursor: 'pointer' }}
                  onClick={time1}
                >
                  Next
                </Button>
              </Flex>
              {/* Second prompt */}
              {Tag2 ? (
                <>
                  <Flex
                    id="Tag2"
                    align="center"
                    p="1%"
                    mb="2%"
                    h="5%"
                    w="45%"
                    bg="#F2F6FE"
                    rounded="20px"
                    data-aos="fade-right"
                    data-aos-offset="200"
                    data-aos-delay="50"
                    data-aos-duration="1000"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="true"
                    data-aos-once="true"
                  >
                    <p>Thank you for that information.</p>
                  </Flex>
                  <Flex
                    id="Tag2"
                    align="center"
                    p="1%"
                    h="5%"
                    w="416px"
                    mb="8%"
                    bg="#F2F6FE"
                    rounded="20px"
                    data-aos="fade-right"
                    data-aos-offset="200"
                    data-aos-delay="800"
                    data-aos-duration="1000"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="true"
                    data-aos-once="true"
                  >
                    <p>
                      Please add some comments below. Helpful comments include
                      information about company culture, work environment,
                      career growth, salary, etc.
                    </p>
                  </Flex>
                  <Flex w="100%" justify="flex-end">
                    {/* long hand interview box */}
                    <Flex
                      w="459px"
                      h="350px"
                      px="6"
                      py="8"
                      border="1px solid #BBBDC6"
                      rounded="6px"
                      flexDir="column"
                      justify="space-evenly"
                      data-aos="fade-in"
                      data-aos-offset="120"
                      data-aos-delay="2400"
                      data-aos-duration="1500"
                      data-aos-easing="ease-in-out"
                      data-aos-mirror="true"
                      data-aos-once="true"
                      data-aos-anchor="Tag2"
                    >
                      <FormLabel>Comments</FormLabel>
                      <Textarea
                        variant="filled"
                        resize="none"
                        h="250px"
                        rowsMax={6}
                        type="text"
                        name="comment"
                        rounded="6px"
                        ref={register}
                        data-cy="companyComment"
                      />
                    </Flex>
                    {/* avatar */}
                    <Flex
                      h="350px"
                      align="flex-end"
                      ml="1%"
                      data-aos="fade-in"
                      data-aos-offset="120"
                      data-aos-delay="2400"
                      data-aos-duration="1500"
                      data-aos-easing="ease-in-out"
                      data-aos-mirror="true"
                      data-aos-once="true"
                      data-aos-anchor="Tag2"
                    >
                      <Avatar size="md" src="https://bit.ly/broken-link" />
                    </Flex>
                  </Flex>
                  <Flex
                    justify="flex-end"
                    mb="5%"
                    data-aos="fade-in"
                    data-aos-offset="120"
                    data-aos-delay="2400"
                    data-aos-duration="1500"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="true"
                    data-aos-once="true"
                    data-aos-anchor="Tag2"
                  >
                    <Button
                      data-cy="companyReviewFormButton"
                      h="56px"
                      w="17%"
                      mt="2%"
                      rounded="35px"
                      border="1px solid #344CD0"
                      color="#344CD0"
                      backgroundColor="#FFF"
                      _hover={{ backgroundColor: '#F2F6FE', cursor: 'pointer' }}
                      onClick={time2}
                    >
                      Next
                    </Button>
                  </Flex>
                </>
              ) : null}
              {/* 3rd prompt */}
              {Tag3 ? (
                <>
                  <Flex
                    id="Tag3"
                    align="center"
                    h="5%"
                    p="1%"
                    w="416px"
                    mb="2%"
                    bg="#F2F6FE"
                    rounded="20px"
                    data-aos="fade-right"
                    data-aos-offset="200"
                    data-aos-delay="50"
                    data-aos-duration="1000"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="true"
                    data-aos-once="true"
                  >
                    <p>Thank you for sharing that.</p>
                  </Flex>
                  <Flex
                    align="center"
                    h="5%"
                    p="1%"
                    w="416px"
                    mb="8%"
                    bg="#F2F6FE"
                    rounded="20px"
                    data-aos="fade-right"
                    data-aos-offset="200"
                    data-aos-delay="1500"
                    data-aos-duration="1000"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="true"
                    data-aos-once="true"
                  >
                    <p>
                      To better understand company culture, would you please add
                      a few more details?
                    </p>
                  </Flex>
                  {/* hours container  */}
                  <Flex w="100%" justify="flex-end">
                    {/* hours box */}
                    <Flex
                      w="459px"
                      h="136px"
                      p="6"
                      border="1px solid #BBBDC6"
                      rounded="6px"
                      flexDir="column"
                      data-aos="fade-in"
                      data-aos-offset="120"
                      data-aos-delay="2800"
                      data-aos-duration="1500"
                      data-aos-easing="ease-in-out"
                      data-aos-mirror="true"
                      data-aos-once="true"
                      data-aos-anchor="Tag3"
                    >
                      <FormLabel>Working hours</FormLabel>
                      <Select
                        h="56px"
                        rounded="6px"
                        variant="filled"
                        label="typical_hours"
                        name="typical_hours"
                        placeholder="Select one"
                        ref={register}
                      >
                        <option value={29}>Less than 30 hours</option>
                        <option value={30}>30 hours+</option>
                        <option value={40}>40 hours+</option>
                        <option value={50}>50 hours+</option>
                        <option value={60}>60 hours+</option>
                      </Select>
                    </Flex>
                    {/* avatar */}
                    <Flex
                      h="136px"
                      align="flex-end"
                      ml="1%"
                      data-aos="fade-in"
                      data-aos-offset="200"
                      data-aos-delay="2800"
                      data-aos-duration="1500"
                      data-aos-easing="ease-in-out"
                      data-aos-mirror="true"
                      data-aos-once="true"
                      data-aos-anchor="Tag3"
                    >
                      <Avatar size="md" src="https://bit.ly/broken-link" />
                    </Flex>
                  </Flex>
                  <Flex
                    justify="flex-end"
                    mb="5%"
                    data-aos="fade-in"
                    data-aos-offset="120"
                    data-aos-delay="2800"
                    data-aos-duration="1500"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="true"
                    data-aos-once="true"
                    data-aos-anchor="Tag3"
                  >
                    <Button
                      data-cy="companyReviewFormButton"
                      h="56px"
                      w="17%"
                      mt="2%"
                      rounded="35px"
                      border="1px solid #344CD0"
                      color="#344CD0"
                      backgroundColor="#FFF"
                      _hover={{ backgroundColor: '#F2F6FE', cursor: 'pointer' }}
                      onClick={time3}
                    >
                      Next
                    </Button>
                  </Flex>
                </>
              ) : null}
              {/* 4th prompt */}
              {Tag4 ? (
                <>
                  <Flex
                    id="Tag4"
                    align="center"
                    h="5%"
                    p="1%"
                    w="416px"
                    mb="8%"
                    bg="#F2F6FE"
                    rounded="20px"
                    data-aos="fade-right"
                    data-aos-offset="200"
                    data-aos-delay="50"
                    data-aos-duration="1000"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="true"
                    data-aos-once="true"
                  >
                    <p>
                      Posting your hiring salary helps many job-seekers
                      negotiate fair salaries.
                    </p>
                  </Flex>
                  {/* salary container  */}
                  <Flex w="100%" justify="flex-end">
                    {/* salary box */}
                    <Flex
                      w="459px"
                      h="150px"
                      p="6"
                      border="1px solid #BBBDC6"
                      rounded="6px"
                      flexDir="column"
                      justify="space-evenly"
                      data-aos="fade-in"
                      data-aos-offset="120"
                      data-aos-delay="1000"
                      data-aos-duration="1500"
                      data-aos-easing="ease-in-out"
                      data-aos-mirror="true"
                      data-aos-once="true"
                      data-aos-anchor="Tag4"
                    >
                      <FormLabel>Hiring salary</FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          mb="4"
                          py="28px"
                          color="gray.300"
                          fontSize="1.2em"
                          children="$"
                        />
                        <Input
                          h="56px"
                          mb="6"
                          variant="filled"
                          rounded="6px"
                          autoCapitalize="none"
                          type="number"
                          label="salary"
                          name="salary"
                          ref={register}
                        />
                      </InputGroup>
                    </Flex>
                    {/* avatar */}
                    <Flex
                      h="150px"
                      align="flex-end"
                      ml="1%"
                      data-aos="fade-in"
                      data-aos-offset="200"
                      data-aos-delay="1000"
                      data-aos-duration="1500"
                      data-aos-easing="ease-in-out"
                      data-aos-mirror="true"
                      data-aos-once="true"
                      data-aos-anchor="Tag4"
                    >
                      <Avatar size="md" src="https://bit.ly/broken-link" />
                    </Flex>
                  </Flex>
                  <Flex
                    justify="flex-end"
                    mb="5%"
                    data-aos="fade-in"
                    data-aos-offset="120"
                    data-aos-delay="1000"
                    data-aos-duration="1500"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="true"
                    data-aos-once="true"
                    data-aos-anchor="Tag4"
                  >
                    <Button
                      data-cy="companyReviewFormButton"
                      h="56px"
                      w="17%"
                      mt="2%"
                      rounded="35px"
                      border="1px solid #344CD0"
                      color="#344CD0"
                      backgroundColor="#FFF"
                      _hover={{ backgroundColor: '#F2F6FE', cursor: 'pointer' }}
                      onClick={time4}
                    >
                      Next
                    </Button>
                  </Flex>
                </>
              ) : null}
              {/* 5th prompt */}
              {Tag5 ? (
                <>
                  <Flex
                    id="Tag5"
                    align="center"
                    h="5%"
                    w="416px"
                    p="1%"
                    mb="2%"
                    bg="#F2F6FE"
                    rounded="20px"
                    data-aos="fade-right"
                    data-aos-offset="200"
                    data-aos-delay="50"
                    data-aos-duration="1000"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="true"
                    data-aos-once="true"
                  >
                    <p>Awesome! Thank you for sharing that.</p>
                  </Flex>
                  <Flex
                    align="center"
                    p="1%"
                    h="5%"
                    w="416px"
                    mb="8%"
                    bg="#F2F6FE"
                    rounded="20px"
                    data-aos="fade-right"
                    data-aos-offset="200"
                    data-aos-delay="1000"
                    data-aos-duration="1000"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="true"
                    data-aos-once="true"
                  >
                    <p>One last question.</p>
                  </Flex>
                  {/* overall container  */}
                  <Flex w="100%" justify="flex-end">
                    {/* overall box */}
                    <Flex
                      w="459px"
                      h="136px"
                      mb="8%"
                      p="6"
                      border="1px solid #BBBDC6"
                      rounded="6px"
                      flexDir="column"
                      data-aos="fade-in"
                      data-aos-offset="200"
                      data-aos-delay="1500"
                      data-aos-duration="1500"
                      data-aos-easing="ease-in-out"
                      data-aos-mirror="true"
                      data-aos-once="true"
                    >
                      <FormLabel mb="4">
                        Please rate your overall experience.
                      </FormLabel>
                      <Flex justify="center" w="100%">
                        <BeautyStars
                          name="companyOverall"
                          value={starState}
                          activeColor="#344CD0"
                          onChange={(value) => {
                            setStarState(value)
                            time5()
                          }}
                        />
                      </Flex>
                    </Flex>
                    {/* avatar */}
                    <Flex
                      h="136px"
                      align="flex-end"
                      ml="1%"
                      data-aos="fade-in"
                      data-aos-offset="200"
                      data-aos-delay="1500"
                      data-aos-duration="1500"
                      data-aos-easing="ease-in-out"
                      data-aos-mirror="true"
                      data-aos-once="true"
                      data-aos-anchor="Tag5"
                    >
                      <Avatar size="md" src="https://bit.ly/broken-link" />
                    </Flex>
                  </Flex>
                </>
              ) : null}
              {/* 6th prompt */}
              {Tag6 ? (
                <>
                  <Flex
                    id="Tag6"
                    align="center"
                    p="1%"
                    h="5%"
                    w="416px"
                    mb="8%"
                    bg="#F2F6FE"
                    rounded="20px"
                    data-aos="fade-right"
                    data-aos-offset="200"
                    data-aos-delay="50"
                    data-aos-duration="1000"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="true"
                    data-aos-once="true"
                    data-aos-anchor="#ratingTag"
                  >
                    <p>Thank you! Don’t forget to hit submit. </p>
                  </Flex>
                  {/* submit container  */}
                  <Flex w="100%" justify="flex-end">
                    {/* submit box */}
                    <Flex
                      w="459px"
                      h="136px"
                      mb="8%"
                      p="6"
                      justify="center"
                      align="center"
                      border="1px solid #BBBDC6"
                      rounded="6px"
                      flexDir="column"
                      data-aos="fade-in"
                      data-aos-offset="200"
                      data-aos-delay="1500"
                      data-aos-duration="1000"
                      data-aos-easing="ease-in-out"
                      data-aos-mirror="true"
                      data-aos-once="true"
                    >
                      <Button
                        bg="#344CD0"
                        color="white"
                        type="submit"
                        isLoading={formState.isSubmitting}
                        rounded="6px"
                        border="none"
                        data-cy="companyReviewSubmit"
                      >
                        Submit
                      </Button>
                    </Flex>
                    {/* avatar */}
                    <Flex
                      h="136px"
                      align="flex-end"
                      ml="1%"
                      data-aos="fade-in"
                      data-aos-offset="200"
                      data-aos-delay="1500"
                      data-aos-duration="1000"
                      data-aos-easing="ease-in-out"
                      data-aos-mirror="true"
                      data-aos-once="true"
                    >
                      <Avatar size="md" src="https://bit.ly/broken-link" />
                    </Flex>
                  </Flex>
                </>
              ) : null}
            </FormControl>
          </form>
        </Flex>
      </Flex>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    loadingCompanies: state.company.isLoading,
    companies: state.company.data,
  }
}

export default connect(
  mapStateToProps,
  (postReview, getCompanies, postCompany)
)(ReviewForm2)
