import React, { useState } from 'react'
//styles
import companyIcon from '../../../companyIcon.png'
import interviewIcon from '../../../interviewIcon.png'
import { Flex, Avatar, Image } from '@chakra-ui/core'
import AOS from 'aos'
import 'aos/dist/aos.css'

//components
import InterviewForm from './InterviewForm'
import CompanyReviewForm from './CompanyReviewForm'
import ProgressHeader from './ProgressHeader'

const FormController = ({ history }) => {
  // initialize AOS
  AOS.init()
  // state to show interview review
  const [showInterview, setShowInterview] = useState(false)
  // state to show company review
  const [showCompanyReview, setShowCompanyReview] = useState(false)
  //progress bar
  const [progress] = useState({
    prec: 99,
    prog: 0,
  })

  return (
    // main container
    <>
      <ProgressHeader progress={progress} />


      {/* Start of messenger  */}
      {/* form container */}
      <Flex margin="0 auto" width="80%">
        <Flex flexDir="column" pt="5%" width="100%">

          <Flex
            align="center"
            p="1%"
            ml="2%"
            w="45%"
            mt="20%"
            mb="2%"
            bg="#F2F6FE"
            position="relative"
            right="0"
            bottom=" 0"
            left="0"
            rounded="20px"
            data-aos="fade-right"
            data-aos-offset="200"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-mirror="false"
            data-aos-once="false"
          >
            <p>
              Hi {localStorage.getItem('username')},{' '}
              <span role="img" aria-label="smile">
                🙂
              </span>{' '}
              Thank you for choosing to post.
            </p>
          </Flex>
          <Flex
            align="center"
            p="1%"
            ml="2%"
            w="50%"
            mb="2%"
            bg="#F2F6FE"
            rounded="20px"
            data-aos="fade-right"
            data-aos-offset="200"
            data-aos-delay="1000"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="false"
          >
            <p>
              Sharing your experience through your posts encourages others to do
              the same and promotes the exchange of helpful information
            </p>
          </Flex>
          <Flex
            align="center"
            p="1%"
            ml="2%"
            w="45%"
            mb="8%"
            bg="#F2F6FE"
            rounded="20px"
            data-aos="fade-right"
            data-aos-offset="200"
            data-aos-delay="2500"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="false"
          >
            <p>What do you want to post about?</p>
          </Flex>
          {/* company container  */}

          <Flex w="100%" justify="flex-end" pb="5%">
            {/* company box */}
            <Flex
              w="36%"
              px="6%"
              py="5%"

              border="1px solid #EAF0FE"
              rounded="6px"
              flexDir="column"
              data-aos="fade-in"
              data-aos-offset="200"

              data-aos-delay="1500"

              data-aos-duration="2000"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="false"
              align="center"
            >
              <Flex w="100%" color="#494B5B" fontSize="20px" fontWeight="light">
                Choose a topic
              </Flex>
              <Flex justify="space-between" mt="3%" align="center" width="60%">
                <Flex
                  justify="center"
                  align="center"
                  w="100px"
                  h="100px"
                  onClick={() => {
                    setShowInterview(true)
                    setShowCompanyReview(false)
                  }}
                  data-cy="interviewReviewButton"
                >
                  <Image src={interviewIcon} alt="Interview Review Icon" />
                </Flex>
                <Flex
                  justify="center"
                  ml="40%"
                  w="100px"
                  h="100px"
                  mb="10%"
                  onClick={() => {
                    setShowInterview(false)
                    setShowCompanyReview(true)
                  }}
                  data-cy="companyReviewButton"
                >
                  <Image src={companyIcon} alt="Company Review Icon" />
                </Flex>
              </Flex>

              <Flex w="100%" mt="1%" justify="space-evenly">
                <Flex
                  as="h4"
                  w="96px"
                  h="44px"
                  textAlign="center"
                  color="#494B5B"
                  fontWeight="light"
                  fontSize="16px"
                >
                  Interview Review
                </Flex>
                <Flex
                  as="h4"
                  w="96px"
                  h="44px"
                  textAlign="center"
                  color="#494B5B"
                  fontWeight="light"
                  fontSize="16px"
                >
                  Company Review
                </Flex>
              </Flex>
            </Flex>
            {/* avatar */}
            <Flex
              align="flex-end"
              ml="1%"
              mr="2%"
              data-aos="fade-in"
              data-aos-offset="200"
              data-aos-delay="3000"
              data-aos-duration="2000"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="false"
              justify="flex-end"
            >
              <Flex align="center" justify="space-evenly" width="40%" mt="3%">
                <Avatar size="md" src="https://bit.ly/broken-link" />
              </Flex>
            </Flex>
          </Flex>
          {showInterview ? <InterviewForm history={history} /> : null}
          {showCompanyReview ? <CompanyReviewForm history={history} /> : null}
        </Flex>
      </Flex>
    </>
  )
}

export default FormController
