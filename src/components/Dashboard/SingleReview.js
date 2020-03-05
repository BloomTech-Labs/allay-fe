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
          <Flex w='100%' h='160px' px='30px' wrap='wrap' justify='column'>
            {/* avatar */}
            <Flex justify='center' align='center' w='15%' h='90%'>
              <Avatar size='xl' src='https://bit.ly/broken-link' />
            </Flex>
            {/* tag */}
            <Flex>
              <Box ml='10%'>
                <Flex justifyContent='space-between'>
                  <Flex as='h2' fontSize='32px'>
                    {review.company_name} Interview Review
                  </Flex>
                  <Flex as='h2' fontSize='32px'>
                    icon{review.interview_rating}
                  </Flex>
                </Flex>
                <Flex justify='flex-start' w='100%' h='15%' pt='1%'>
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
                  <Flex>
                    <Flex as='h2' fontWeight='light' mt='5px'>
                      “insert users headline here insert users headline here
                      insert users”
                    </Flex>
                  </Flex>
                  <Box>
                    <Flex as='p'>Description: </Flex>
                    <Flex>
                      {/* I interviewed at {review.company_name} in
                      {review.job_location} for a {review.job_title} position.
                      The interview process was {review.interview_rating}.
                      {review.interview_review} */}
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
