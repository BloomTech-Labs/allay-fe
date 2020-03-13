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
        onClick={learnMore}
        background='#F2F6FE'
        borderRadius='12px'
        justify='center'
        align='center'
      >
        {/* Review content container */}
        <Flex
          w='100%'
          h='82%'
          mb='4%'
          wrap='wrap'
          justify='right'
          alignContent='center'
        >
          {/* headline line container  */}
          <Flex>
            {/* avatar box */}
            <Flex justify='center' align='center' w='88px' h='88px' mr='36px'>
              <Avatar size='xl' src={`//logo.clearbit.com/${review.domain}`} />
            </Flex>
            {/* tag container */}
            <Flex
              w='100%'
              h='32px'
              wrap='wrap'
              // overflow='hidden'
            >
              <Flex w='100%' align='center' wrap='nowrap'>
                <h2 fontSize='24px'>{review.tagline}</h2>
              </Flex>
              {/* <Flex align='center' w='40%' wrap='nowrap'> */}
              <Flex as='h3' fontSize='16px' w='100%' fontWeight='light'>
                Position: {review.job_title}
              </Flex>
            </Flex>
            {/* </Flex> */}
          </Flex>

          {/* Company name & location container */}
          <Flex
            w='100%'
            justify='flex-start'
            align='center'
            wrap='nowrap'
            my='1.5%'
          >
            <Flex align='center' w='100%' wrap='nowrap'>
              <Box as={TiArchive} mr='10px'></Box>
              <Flex as='h3' fontSize='18px' fontWeight='light' isTruncated>
                {review.company_name}
              </Flex>
            </Flex>
            <Flex align='center' w='100%' wrap='nowrap'>
              <Box as={TiLocationOutline} mr='10px'></Box>
              <Flex as='h3' fontSize='18px' fontWeight='light' isTruncated>
                {review.job_location}
              </Flex>
            </Flex>
            <Flex align='center' w='100%' wrap='nowrap'>
              {review.offer_received ? (
                <>
                  <Box as={TiThumbsUp} mr='10px'></Box>
                  <Flex as='h3' fontSize='18px' fontWeight='light'>
                    Received Offer
                  </Flex>{' '}
                </>
              ) : (
                <>
                  {' '}
                  <Box as={TiThumbsDown} mr='10px'></Box>
                  <Flex as='h3' fontSize='18px' fontWeight='light' mr='10px'>
                    No Offer
                  </Flex>{' '}
                </>
              )}
            </Flex>
          </Flex>

          {/* summary container */}
          <Flex w='100%' h='120px' wrap='nowrap' overflow='hidden'>
            <p fontSize='16px'>{review.job_review}</p>
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
