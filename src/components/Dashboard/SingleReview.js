import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import getReviewById from '../../state/actions/index';
import NavBar from './NavBar';

//imported styles
import { Box, Heading, Flex, Avatar, Text } from '@chakra-ui/core';
import { TiLocationOutline, TiThumbsUp } from 'react-icons/ti';

const SingleReview = ({ review, getReviewById, match }) => {
  const id = match.params.id;

  useEffect(() => {
    getReviewById(id);
  }, [id, getReviewById]);

  return (
    <Flex w='100%' minH='100vh' justify='center'>
      <Flex w='1440px' direction='column' wrap='wrap'>
        <NavBar />
        <Box bg='red' mt='14rem'>
          <Flex w='90%' h='160px' ml='5%' px='30px' justify='column'>
            {/* avatar */}
            <Flex justify='center' align='center' w='15%' h='90%'>
              <Avatar size='xl' src='https://bit.ly/broken-link' />
            </Flex>
            {/* tag */}
            <Flex>
              <Box ml='5%'>
                <Flex justifyContent='space-between'>
                  <Flex as='h2' fontSize='32px'>
                    {review.company_name} Interview Review
                  </Flex>
                  <Flex as='h2' fontSize='32px'>
                    icon{review.interview_rating}/10
                  </Flex>
                </Flex>
                {/* tag */}
                <Flex justify='flex-start' w='100%' h='15%' mb='2%' pt='1%'>
                  <Flex align='center' h='32px' mr='35px'>
                    Location:
                    <Flex as='h3' fontWeight='light' pl='10px'>
                      <Box as={TiLocationOutline}></Box>
                      {review.job_location}
                    </Flex>
                  </Flex>
                  <Flex align='center' h='32px' mr='35px'>
                    Difficulty:
                    <Flex as='h3' fontWeight='light' pl='10px'>
                      {review.interview_rating}/10
                    </Flex>
                  </Flex>
                  <Flex align='center' h='32px' mr='35px'>
                    <Box as={TiThumbsUp}></Box>
                    <Flex as='h3' fontWeight='light' pl='10px'>
                      {/* {Received 0ffer} */}
                    </Flex>
                  </Flex>
                </Flex>
                <Box>
                  <Flex as='h2' fontWeight='light' mb='2%' mt='5px'>
                    “insert users headline here insert users headline here
                    insert users”
                  </Flex>

                  <Box>
                    <Flex as='p' fontSize='24px' mb='1%'>
                      Description:
                    </Flex>
                    <Flex fontWeight='light' as='p' fontSize='18px'>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </Flex>
                  </Box>
                </Box>
              </Box>
              {/* <Typography>Salary: {review.salary}</Typography>
            
          <Typography>Posted by: {review.reviewer}</Typography> */}
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

const mapStateToProps = state => {
  return {
    review: state.review.dataById
  };
};

export default connect(mapStateToProps, getReviewById)(SingleReview);
