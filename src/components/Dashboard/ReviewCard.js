// previously ReviewList
import React from 'react';
import { connect } from 'react-redux';
// actions
import getReview from '../../state/actions/index';
// icons
import {
  TiLocationOutline,
  TiArchive,
  TiThumbsUp,
  TiThumbsDown
} from 'react-icons/ti';
// styles
import { Box, Avatar, Flex } from '@chakra-ui/core';
import BeautyStars from 'beauty-stars';

const ReviewCard = ({ review, history }) => {
  //routes to single review
  const learnMore = () => {
    history.push(`/dashboard/${review.id}`);
  };

  return (
    <>
      {/* Review container */}
      <Flex
        w='45%'
        h='312px'
        mb='1%'
        mt='3%'
        ml='2.5%'
        px='30px'
        wrap='nowrap'
        background='#F2F6FE'
        borderRadius='12px'
        justify='center'
        align='center'
        onClick={learnMore}
      >
        {/* Review content container */}
        <Flex
          w='100%'
          h='82%'
          mx='5%'
          wrap='wrap'
          justify='right'
          alignContent='center'
        >
          {/* headline line container  */}
          <Flex w='100%' h='100px' mb='3%'>
            {/* avatar box */}
            <Box justify='center' align='center' h='88px' mr='36px'>
              <Avatar size='xl' src={`//logo.clearbit.com/${review.domain}`} />
            </Box>
            {/* tag container */}
            <Flex w='100%' h='32px' wrap='wrap'>
              <Flex
                as='h2'
                w='100%'
                align='center'
                wrap='nowrap'
                overflow='hidden'
                isTruncated
              >
                {review.tagline}
              </Flex>
              <Flex as='h4' w='100%' align='center' wrap='nowrap'>
                Job Rating: {review.job_rating}
                {/* {Array(5)
                  .fill('')
                  .map((_, i) => (
                    <StarIcon
                      key={i}
                      color={i < review.job_rating ? 'teal.500' : 'gray.300'}
                    />
                  ))} */}
              </Flex>
              {/* <Flex align='center' w='40%' wrap='nowrap'> */}
              <Flex as='p' w='100%' fontWeight='light'>
                Position: {review.job_title}
              </Flex>
            </Flex>
            {/* </Flex> */}
          </Flex>

          {/* Company name & location container */}
          <Flex
            w='100%'
            justify='center'
            align='center'
            wrap='nowrap'
            mb='1%'
            mt=''
          >
            <Flex align='center' w='100%' wrap='nowrap'>
              <Box as={TiArchive} mr='10px'></Box>
              <Flex as='p' font-size='18' fontWeight='light' overflow='hidden'>
                {review.company_name}
              </Flex>
            </Flex>
            <Flex align='center' w='100%' wrap='nowrap'>
              <Box as={TiLocationOutline} mr='10px'></Box>
              <Flex as='p' font-size='18' fontWeight='light'>
                {review.job_location}
              </Flex>
            </Flex>
            <Flex align='center' w='100%' wrap='nowrap'>
              {review.offer_received ? (
                <>
                  <Box as={TiThumbsUp} mr='10px'></Box>
                  <Flex as='p' font-size='18' fontWeight='light'>
                    Received Offer
                  </Flex>{' '}
                </>
              ) : (
                <>
                  {' '}
                  <Box as={TiThumbsDown} mr='10px'></Box>
                  <Flex as='p' font-size='18' fontWeight='light' mr='10px'>
                    No Offer
                  </Flex>{' '}
                </>
              )}
            </Flex>
          </Flex>

          {/* summary container */}
          <Flex w='100%' h='95px' overflow='hidden'>
            <p>{review.job_review}</p>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

const mapStateToProps = state => {
  return {
    data: state.review.data
  };
};
export default connect(mapStateToProps, getReview)(ReviewCard);
