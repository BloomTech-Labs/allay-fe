import React, { useState } from 'react'
//styles
import companyIcon from '../../../companyIcon.png'
import interviewIcon from '../../../interviewIcon.png'
import { Flex, Avatar, Button, Image, Box } from '@chakra-ui/core'
import AOS from 'aos'
import 'aos/dist/aos.css'
import ProgressBar from '../../Reusable/ProgressBar'
//components
import InterviewForm from './InterviewForm'
import CompanyReviewForm from './CompanyReviewForm'

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
    mins: 10,
    prog: 2,
  })

  return (
    // main container
    <>
      <Flex
        // className="Splash"
        w="100%"
        // minH="100vh"
        justify="center"
      >
        {/* max size */}
        <Flex
          // maxW="1440px"
          w="100%"
        >
          {/* form container */}
          <Flex
            // w="70%"
            bg="white"
            justify="center"
            flexDir="column"
            // px='2%'
            pt="5%"
          >
            {/* progress header */}
            <Flex
              pt="1%"
              px="2%"
              w="100%"
              h="20%"
              background="#F2F6FE"
              top="0"
              position="fixed"
              overflow="hidden"
              zIndex="999"
              direction="column"
            >
              <Flex w="100%">
                <h2 fontSize="24px" color="#131C4D" fontFamily="poppins">
                  Write a review
                </h2>
              </Flex>

              <Flex w="100%" justify="space-between" mb="1%">
                {progress.prec === 100 ? (
                  <>
                    <Flex as="h4" size="22px">
                      {progress.prec}% Completed!
                    </Flex>{' '}
                  </>
                ) : (
                  <>
                    <Flex as="h4" fontFamily="muli" color="#131C4D" width="3em">
                      {100 - progress.prec}% completed
                    </Flex>

                    {/* <Flex color="#FFFFFF"> {progress.mins} mins</Flex> */}
                    <Button
                      border="none"
                      backgroundColor="#F2F6FE"
                      color="#344CD0"
                      fontSize="1.3em"
                      rounded="50px"
                      _hover={{ backgroundColor: '#FFF', cursor: 'pointer' }}
                      onClick={() => {
                        history.push('/dashboard')
                      }}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </Flex>
              <ProgressBar value={progress.prog} />
            </Flex>
            {/* Start of messenger  */}

            <Flex
              align="center"
              p="1%"
              ml="2%"
              // w="416px"
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
              // w="416px"
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
                Sharing your experience through your posts encourages others to
                do the same and promotes the exchange of helpful information
              </p>
            </Flex>
            <Flex
              align="center"
              p="1%"
              ml="2%"
              // w="416px"
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
            <Flex
              w="100%"
              justify="center"
              // justify="flex-end"
            >
              {/* company box */}

              <Flex
                w="50%"
                // h="234px"
                // mb="8%"
                px="6"
                py="5"
                border="1px solid #EAF0FE"
                rounded="6px"
                flexDir="column"
                data-aos="fade-in"
                data-aos-offset="200"
                data-aos-delay="3000"
                data-aos-duration="2000"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="false"
                // align="flex-start"
                align="center"
              >
                <Flex
                  w="100%"
                  color="#494B5B"
                  fontSize="20px"
                  fontWeight="light"
                >
                  Choose a topic
                </Flex>
                <Flex justify="space-between" mt="3%" align="center">
                  <Flex
                    justify="center"
                    align="center"
                    w="100px"
                    h="100px"
                    // mr='15%'
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
                    ml="5%"
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
                // h="234px"
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
      </Flex>
    </>
  )
}

export default FormController
