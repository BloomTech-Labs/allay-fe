// previously ReviewList
import React from 'react';
import { connect } from 'react-redux';
// actions
import getReview from '../../state/actions/index';
// icons
import { TiLocationOutline, TiArchive, TiThumbsUp } from 'react-icons/ti';
// styles
import { Box, Avatar, Flex } from '@chakra-ui/core';

const ReviewCard = ({ review, history }) => {
  //routes to single review
  const learnMore = () => {
    history.push(`/dashboard/${review.id}`);
  };

  return (
    <>
      <Flex
        w='100%'
        h='160px'
        px='30px'
        wrap='wrap'
        onClick={learnMore}
        justify='column'
      >
        {/* avatar box */}
        <Flex justify='center' align='center' w='15%' h='90%'>
          <Avatar size='xl' src='https://bit.ly/broken-link' />
        </Flex>
        {/* content container */}
        <Flex w='85%' flexDir='column'>
          {/* tag container */}
          <Flex justify='flex-start' w='100%' h='15%' pt='1%'>
            <Flex align='center' h='32px' mr='35px'>
              <Box as={TiArchive}></Box>
              <Flex as='h3' fontWeight='light' pl='10px'>
                {review.company_name}
              </Flex>
            </Flex>
            <Flex align='center' h='32px' mr='35px'>
              <Box as={TiLocationOutline}></Box>
              <Flex as='h3' fontWeight='light' pl='10px'>
                {review.job_location}
              </Flex>
            </Flex>
            <Flex align='center' h='32px' mr='35px'>
              <Box as={TiThumbsUp}></Box>
              <Flex as='h3' fontWeight='light' pl='10px'>
                Received 0ffer
              </Flex>
            </Flex>
            <Flex align='center' h='32px' mr='35px'>
              <Flex as='h3' fontWeight='light' pl='10px'>
                Position: {review.job_title}
              </Flex>
            </Flex>
          </Flex>
          {/* headline line container  */}
          <Flex w='100%' h='25%' align='center' wrap='wrap' pt='2%'>
            <h2>
              “The traditional two-person interview format, sometimes is not
              easy to deal with or kind of”
            </h2>
          </Flex>
          {/* summary container */}
          <Flex w='100%' h='50%' px='20px' pt='1%' wrap='nowrap'>
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
