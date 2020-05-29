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
  Flex,
  Select,
  Input,
  Textarea,
  Button,
  FormLabel,
  Checkbox,
  InputGroup,
  InputLeftElement,
  Avatar,
  RadioButtonGroup,
  CheckboxGroup,
  Link,
} from '@chakra-ui/core'
import AOS from 'aos'
import 'aos/dist/aos.css'
//
import axiosToDS from '../../../utils/axiosToDS'
import CustomSpinner from '../../CustomSpinner'

const InterviewForm = ({
  loadingCompanies,
  getCompanies,
  companies,
  postReview,
  history,
}) => {
  //initialize animations
  AOS.init()
  const { register, handleSubmit, formState } = useForm()

  // state "state"
  const [location, setLocation] = useState({})
  const [newLocation, setNewLocation] = useState({})
  const stateSelectorHelper = (value) => {
    setLocation(value)
  }

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

  // star rating
  const [starState, setStarState] = useState(0)

  // custom radio button state offer status
  const [offer, setOffer] = useState(1)

  //progress bar
  const [progress, setProgress] = useState({
    prec: 99,
    time: 8,
    prog: 2,
  })
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

  // state for visibility
  const [Tag2, setTag2] = useState(false)
  const [Tag3, setTag3] = useState(false)
  const [Tag4, setTag4] = useState(false)
  const [Tag5, setTag5] = useState(false)
  const [Tag6, setTag6] = useState(false)
  const [Tag7, setTag7] = useState(false)
  const [Tag8, setTag8] = useState(false)
  const [Tag9, setTag9] = useState(false)

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
      block: 'start',
    })
  }, [getCompanies])

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
      prec: 80,
      time: 6,
      prog: 20,
    })
    const element = document.getElementById('Tag2')
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
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
      prec: 70,
      time: 5,
      prog: 30,
    })
    const element = document.getElementById('Tag3')
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
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
      prec: 60,
      time: 4,
      prog: 40,
    })
    const element = document.getElementById('Tag4')
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
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
      prec: 50,
      time: 3,
      prog: 50,
    })
    const element = document.getElementById('Tag5')
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
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
      prec: 40,
      time: 2,
      prog: 60,
    })
    const element = document.getElementById('Tag6')
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
    setThinking(false)
  }

  // 7th tag
  const time6 = () => {
    clearTimeout(timer)
    clearTimeout(dotTimer)
    dotTimer = setTimeout(dots, 300)
    timer = setTimeout(routeTo7, 1000)
  }
  const routeTo7 = () => {
    setTag7(true)
    setProgress({
      prec: 30,
      time: 1,
      prog: 70,
    })
    const element = document.getElementById('Tag7')
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
    setThinking(false)
  }

  // 8th tag
  const time7 = () => {
    clearTimeout(timer)
    clearTimeout(dotTimer)
    dotTimer = setTimeout(dots, 300)
    timer = setTimeout(routeTo8, 1000)
  }
  const routeTo8 = () => {
    setTag8(true)
    setProgress({
      prec: 20,
      time: 1,
      prog: 85,
    })
    const element = document.getElementById('Tag8')
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
    setThinking(false)
  }

  // 9th tag
  const time8 = () => {
    clearTimeout(timer)
    clearTimeout(dotTimer)
    dotTimer = setTimeout(dots, 300)
    timer = setTimeout(routeTo9, 1000)
  }
  const routeTo9 = () => {
    setTag9(true)
    setProgress({
      prec: 100,
      time: 0,
      prog: 100,
    })
    const element = document.getElementById('Tag9')
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
    setThinking(false)
  }

  // custom select for offer accepted
  const CustomRadio = React.forwardRef((props, ref) => {
    const { isChecked, isDisabled, value, ...rest } = props
    return (
      <Button
        ref={ref}
        variantColor={isChecked ? 'blue' : 'gray'}
        aria-checked={isChecked}
        role="radio"
        isDisabled={isDisabled}
        {...rest}
      />
    )
  })
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
      review_type_id: 2,
      overall_rating: starState,
      offer_status_id: offer,
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
    <div>
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
          pt="10%"
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
                bg="#F2F6FE"
                rounded="20px"
                data-aos="fade-up"
                data-aos-offset="200"
                data-aos-delay="50"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="true"
              >
                <p>Great! I will need some general details to get started.</p>
              </Flex>
              {/* company container  */}
              <Flex w="100%" justify="flex-end">
                {/* company box */}
                <Flex
                  w="459px"
                  h="379px"
                  px="6"
                  py="10"
                  border="1px solid #BBBDC6"
                  rounded="6px"
                  flexDir="column"
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
                  <FormLabel>2. Job title</FormLabel>
                  <Input
                    h="56px"
                    mb="6"
                    rounded="6px"
                    type="text"
                    variant="filled"
                    label="job_title"
                    name="job_title"
                    autoCapitalize="none"
                    ref={register}
                  />
                  <FormLabel>3. Place of interview</FormLabel>
                  <CustomAutoComplete
                    stateHelper={stateSelectorHelper}
                    id="Company Headquarters"
                    name="Company Headquarters"
                    label="Company Headquarters"
                    placeholder="e.g. Los Angeles, CA"
                    textTransform="capitalize"
                    h="56px"
                    mb="6"
                  />
                </Flex>

                {/* avatar */}
                <Flex
                  h="379px"
                  mt="5px"
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
                data-aos-offset="200"
                data-aos-delay="1000"
                data-aos-duration="1500"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="true"
                data-aos-anchor="Tag1"
              >
                <Button
                  data-cy="interviewReviewFormButton"
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

              {/* second prompt */}
              {Tag2 ? (
                <>
                  <Flex
                    id="Tag2"
                    align="center"
                    h="5%"
                    w="416px"
                    py="1%"
                    px="1%"
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
                    <p>Thank you for that information.</p>
                  </Flex>
                  <Flex
                    id="roundsTag"
                    justify="center"
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
                    <p>
                      For the quality of this review I will ask some in depth
                      questions. Let’s begin with how many rounds of interviews
                      you had? Please include phone interviews and onsite
                      interviews.
                    </p>
                  </Flex>
                  {/* rounds container  */}
                  <Flex w="100%" justify="flex-end">
                    {/* rounds box */}
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
                      data-aos-delay="2000"
                      data-aos-duration="1500"
                      data-aos-easing="ease-in-out"
                      data-aos-mirror="true"
                      data-aos-once="true"
                      data-aos-anchor="roundsTag"
                    >
                      <FormLabel>Select rounds of interviews</FormLabel>
                      <Select
                        h="56px"
                        mb="6"
                        rounded="6px"
                        variant="filled"
                        label="interview_rounds"
                        name="interview_rounds"
                        placeholder="Select one"
                      >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                      </Select>
                    </Flex>
                    {/* avatar */}
                    <Flex
                      h="150px"
                      align="flex-end"
                      ml="1%"
                      data-aos="fade-in"
                      data-aos-offset="200"
                      data-aos-delay="2000"
                      data-aos-duration="1500"
                      data-aos-easing="ease-in-out"
                      data-aos-mirror="true"
                      data-aos-once="true"
                      data-aos-anchor="roundsTag"
                    >
                      <Avatar size="md" src="https://bit.ly/broken-link" />
                    </Flex>
                  </Flex>
                  <Flex
                    justify="flex-end"
                    mb="5%"
                    data-aos="fade-in"
                    data-aos-offset="200"
                    data-aos-delay="2000"
                    data-aos-duration="1500"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="true"
                    data-aos-once="true"
                    data-aos-anchor="roundsTag"
                  >
                    <Button
                      data-cy="interviewReviewFormButton"
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
              {/* third prompt */}
              {Tag3 ? (
                <>
                  <Flex
                    id="Tag3"
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
                  >
                    <p>
                      To better assist you I have included several different
                      interview types to choose from. Please select all types
                      that best describes the interview process you went
                      through.
                    </p>
                  </Flex>
                  <Flex w="100%" justify="flex-end">
                    {/* types of interview box */}
                    <Flex
                      w="459px"
                      h="220px"
                      px="6"
                      py="8"
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
                      data-aos-anchor="Tag3"
                    >
                      <FormLabel>Select types of interviews</FormLabel>
                      <CheckboxGroup>
                        <Flex>
                          <Flex direction="column" pr="0.5%">
                            <Checkbox
                              size="md"
                              border="rgba(72, 72, 72, 0.1)"
                              name="phone_interview"
                              ref={register}
                            >
                              Phone interview
                            </Checkbox>
                            <Checkbox
                              size="md"
                              border="rgba(72, 72, 72, 0.1)"
                              name="resume_review"
                              ref={register}
                            >
                              Resume review
                            </Checkbox>
                            <Checkbox
                              size="md"
                              border="rgba(72, 72, 72, 0.1)"
                              name="take_home_assignments"
                              ref={register}
                            >
                              Take home assignments
                            </Checkbox>
                            <Checkbox
                              size="md"
                              border="rgba(72, 72, 72, 0.1)"
                              name="online_coding_assignments"
                              ref={register}
                            >
                              Online coding tests
                            </Checkbox>
                          </Flex>
                          <Flex direction="column">
                            <Checkbox
                              size="md"
                              border="rgba(72, 72, 72, 0.1)"
                              name="portfolio_review"
                              ref={register}
                            >
                              Portfolio review
                            </Checkbox>
                            <Checkbox
                              size="md"
                              border="rgba(72, 72, 72, 0.1)"
                              name="screen_share"
                              ref={register}
                            >
                              Screen share
                            </Checkbox>
                            <Checkbox
                              size="md"
                              border="rgba(72, 72, 72, 0.1)"
                              name="open_source_contribution"
                              ref={register}
                            >
                              Open source contribution
                            </Checkbox>
                            <Checkbox
                              size="md"
                              border="rgba(72, 72, 72, 0.1)"
                              name="side_projects"
                              ref={register}
                            >
                              Side projects
                            </Checkbox>
                          </Flex>
                        </Flex>
                      </CheckboxGroup>
                    </Flex>
                    {/* avatar */}
                    <Flex
                      h="220px"
                      align="flex-end"
                      ml="1%"
                      data-aos="fade-in"
                      data-aos-offset="120"
                      data-aos-delay="0"
                      data-aos-duration="1500"
                      data-aos-easing="ease-in-out"
                      data-aos-mirror="true"
                      data-aos-once="true"
                      id="Tag3"
                    >
                      <Avatar size="md" src="https://bit.ly/broken-link" />
                    </Flex>
                  </Flex>
                  <Flex
                    justify="flex-end"
                    mb="5%"
                    data-aos="fade-in"
                    data-aos-offset="120"
                    data-aos-delay="0"
                    data-aos-duration="1500"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="true"
                    data-aos-once="true"
                    id="Tag3"
                  >
                    <Button
                      data-cy="interviewReviewFormButton"
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
              {/* fourth prompt */}
              {Tag4 ? (
                <>
                  <Flex
                    id="Tag4"
                    align="center"
                    p="1%"
                    mb="2%"
                    h="5%"
                    w="416px"
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
                    <p>Great!</p>
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
                    data-aos-delay="1200"
                    data-aos-duration="1000"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="true"
                    data-aos-once="true"
                  >
                    <p>
                      Use this section to describe your interview experience
                      using the options selected above for reference.
                    </p>
                  </Flex>
                  <Flex w="100%" justify="flex-end">
                    {/* long hand interview box */}
                    <Flex
                      w="459px"
                      h="242px"
                      px="6"
                      py="8"
                      border="1px solid #BBBDC6"
                      rounded="6px"
                      flexDir="column"
                      justify="space-evenly"
                      data-aos="fade-in"
                      data-aos-offset="120"
                      data-aos-delay="2600"
                      data-aos-duration="1500"
                      data-aos-easing="ease-in-out"
                      data-aos-mirror="true"
                      data-aos-once="true"
                      data-aos-anchor="Tag4"
                    >
                      <FormLabel>Describe the interview process</FormLabel>
                      <Textarea
                        variant="filled"
                        h="144px"
                        rowsMax={6}
                        type="text"
                        name="comment"
                        placeholder="What questions came up? What did you discuss? What did you come away with from this interview? "
                        rounded="6px"
                        resize="none"
                        ref={register}
                        data-cy="interviewComment"
                      />
                    </Flex>
                    {/* avatar */}
                    <Flex
                      h="242px"
                      align="flex-end"
                      ml="1%"
                      data-aos="fade-in"
                      data-aos-offset="120"
                      data-aos-delay="2600"
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
                    data-aos-delay="2600"
                    data-aos-duration="1500"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="true"
                    data-aos-once="true"
                    data-aos-anchor="Tag4"
                  >
                    <Button
                      data-cy="interviewReviewFormButton"
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
                    <p>
                      Thanks! Your opinion is very valuable and helps Lambda
                      job-seekers be better prepared.
                    </p>
                  </Flex>
                  <Flex
                    id="Tag5"
                    align="center"
                    h="5%"
                    p="1%"
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
                    <p>
                      Please provide a difficulty rating for your interview. How
                      easy or hard was the interview?
                    </p>
                  </Flex>
                  {/* diff container  */}
                  <Flex w="100%" justify="flex-end">
                    {/* diff box */}
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
                      data-aos-delay="3000"
                      data-aos-duration="1500"
                      data-aos-easing="ease-in-out"
                      data-aos-mirror="true"
                      data-aos-once="true"
                      data-aos-anchor="Tag5"
                    >
                      <FormLabel>Rate the difficulty</FormLabel>
                      <Select
                        h="56px"
                        mb="6"
                        rounded="6px"
                        variant="filled"
                        label="difficulty_rating"
                        name="difficulty_rating"
                        placeholder="Select one"
                        ref={register}
                      >
                        <option value={5}>Very difficult</option>
                        <option value={4}>Difficult</option>
                        <option value={3}>Average</option>
                        <option value={2}>Easy</option>
                        <option value={1}>Very easy</option>
                      </Select>
                    </Flex>
                    {/* avatar */}
                    <Flex
                      h="150px"
                      align="flex-end"
                      ml="1%"
                      data-aos="fade-in"
                      data-aos-offset="200"
                      data-aos-delay="3000"
                      data-aos-duration="1500"
                      data-aos-easing="ease-in-out"
                      data-aos-mirror="true"
                      data-aos-once="true"
                      data-aos-anchor="Tag5"
                    >
                      <Avatar size="md" src="https://bit.ly/broken-link" />
                    </Flex>
                  </Flex>
                  <Flex
                    justify="flex-end"
                    mb="8%"
                    data-aos="fade-in"
                    data-aos-offset="200"
                    data-aos-delay="2700"
                    data-aos-duration="1500"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="true"
                    data-aos-once="true"
                    data-aos-anchor="Tag5"
                  >
                    <Button
                      data-cy="interviewReviewFormButton"
                      h="56px"
                      w="17%"
                      mt="2%"
                      rounded="35px"
                      border="1px solid #344CD0"
                      color="#344CD0"
                      backgroundColor="#FFF"
                      _hover={{ backgroundColor: '#F2F6FE', cursor: 'pointer' }}
                      onClick={time5}
                    >
                      Next
                    </Button>
                  </Flex>
                </>
              ) : null}
              {/* 6th prompt */}
              {Tag6 ? (
                <>
                  <Flex
                    id="Tag6"
                    justify="center"
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
                  >
                    <p>
                      Your review is almost complete. Tell me how your interview
                      process ended. Did you recieve an offer?
                    </p>
                  </Flex>
                  {/* offer container  */}
                  <Flex w="100%" justify="flex-end">
                    {/* diff box */}
                    <Flex
                      w="459px"
                      h="176px"
                      mb="8%"
                      py="6"
                      border="1px solid #BBBDC6"
                      rounded="6px"
                      flexDir="column"
                      data-aos="fade-in"
                      data-aos-offset="200"
                      data-aos-delay="1000"
                      data-aos-duration="1500"
                      data-aos-easing="ease-in-out"
                      data-aos-mirror="true"
                      data-aos-once="true"
                    >
                      <Flex w="100%" justify="center">
                        <RadioButtonGroup
                          display="flex"
                          flexDir="column"
                          spacing={0}
                          label="offer_status_id"
                          name="offer_status_id"
                          defaultValue="1"
                          onChange={(val) => {
                            setOffer(val)
                            time6()
                          }}
                        >
                          <CustomRadio value="1" w="100%">
                            No offer
                          </CustomRadio>
                          <CustomRadio value="2" w="100%" data-cy="accepted">
                            Accepted
                          </CustomRadio>
                          <CustomRadio value="3" w="100%">
                            Declined
                          </CustomRadio>
                        </RadioButtonGroup>
                      </Flex>
                    </Flex>
                    {/* avatar */}
                    <Flex
                      h="176px"
                      align="flex-end"
                      ml="1%"
                      data-aos="fade-in"
                      data-aos-offset="200"
                      data-aos-delay="1000"
                      data-aos-duration="1500"
                      data-aos-easing="ease-in-out"
                      data-aos-mirror="true"
                      data-aos-once="true"
                    >
                      <Avatar size="md" src="https://bit.ly/broken-link" />
                    </Flex>
                  </Flex>
                </>
              ) : null}
              {/* 7th prompt */}
              {Tag7 ? (
                <>
                  <Flex
                    id="Tag7"
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
                    <p>Thank you for that information.</p>
                  </Flex>
                  <Flex
                    id="salaryTag"
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
                      If you were offered, asked, or negotiated a salary,
                      including it in your review increases the helpfulness of
                      this post.
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
                      data-aos-offset="200"
                      data-aos-delay="1000"
                      data-aos-duration="3000"
                      data-aos-easing="ease-in-out"
                      data-aos-mirror="true"
                      data-aos-once="true"
                      data-aos-anchor="salaryTag"
                    >
                      <FormLabel>Salary</FormLabel>
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
                          rounded="6px"
                          type="number"
                          variant="filled"
                          label="salary"
                          name="salary"
                          autoCapitalize="none"
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
                      data-aos-duration="3000"
                      data-aos-easing="ease-in-out"
                      data-aos-mirror="true"
                      data-aos-once="true"
                      data-aos-anchor="salaryTag"
                    >
                      <Avatar size="md" src="https://bit.ly/broken-link" />
                    </Flex>
                  </Flex>
                  <Flex
                    justify="flex-end"
                    mb="5%"
                    data-aos="fade-in"
                    data-aos-offset="200"
                    data-aos-delay="1000"
                    data-aos-duration="3000"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="true"
                    data-aos-once="true"
                    data-aos-anchor="salaryTag"
                  >
                    <Button
                      data-cy="interviewReviewFormButton"
                      h="56px"
                      w="17%"
                      mt="2%"
                      rounded="35px"
                      border="1px solid #344CD0"
                      color="#344CD0"
                      backgroundColor="#FFF"
                      _hover={{ backgroundColor: '#F2F6FE', cursor: 'pointer' }}
                      onClick={time7}
                    >
                      Next
                    </Button>
                  </Flex>
                </>
              ) : null}
              {/* 8th prompt */}
              {Tag8 ? (
                <>
                  <Flex
                    id="Tag8"
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
                    <p>Thanks!</p>
                  </Flex>
                  <Flex
                    id="ratingTag"
                    align="center"
                    p="1%"
                    h="5%"
                    w="416px"
                    mb="8%"
                    bg="#F2F6FE"
                    rounded="20px"
                    data-aos="fade-right"
                    data-aos-offset="200"
                    data-aos-delay="900"
                    data-aos-duration="1000"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="true"
                    data-aos-once="true"
                  >
                    <p>
                      Last question. How would you rate your overall interview
                      experience?
                    </p>
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
                      data-aos-duration="1000"
                      data-aos-easing="ease-in-out"
                      data-aos-mirror="true"
                      data-aos-once="true"
                    >
                      <FormLabel mb="4">Rate overall experience</FormLabel>
                      <Flex justify="center" w="100%">
                        <BeautyStars
                          name="interviewRating"
                          value={starState}
                          activeColor="#344CD0"
                          onChange={(value) => {
                            setStarState(value)
                            time8()
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
              {Tag9 ? (
                <>
                  <Flex
                    id="Tag9"
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
                    <p>Thank you! Don’t forget to hit submit.</p>
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
                        data-cy="interviewReviewSubmit"
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
    </div>
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
)(InterviewForm)
