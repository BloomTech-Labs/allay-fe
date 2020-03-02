// previously ReviewList
import React from 'react';
import { connect } from 'react-redux';
// actions
import getReview from '../../state/actions/index';
// styles
import { Box, Avatar, Flex } from '@chakra-ui/core';

const ReviewCard = ({ review, history }) => {
  //routes to single review
  const learnMore = () => {
    history.push(`/dashboard/${review.id}`);
  };

  return (
    <>
      <Flex maxW='4xl'>
        <Flex p='2' width='100%' onClick={learnMore}>
          <Flex
            p='5'
            width='15%'
            alignItems='center'
            justifyItems='center'
            flexDirection='column'
          >
            <h4>{review.company_name}</h4>
            <Avatar
              name={review.company_name}
              src='https://bit.ly/broken-link'
              zIndex='1'
            />
          </Flex>
          <Flex flexDirection='column' width='100%'>
            <Box d='flex'>
              <h3>'BIG HEADING'</h3>
            </Box>
            <Box p='2' d='flex' flexDirection='row'>
              <Box mr='3' width='55%' d='flex' justifyContent='flex-start'>
                <h4>Summary</h4>
              </Box>
              <Box mr='3' width='30%' d='flex' justifyContent='flex-start'>
                <h4>Pros</h4>
              </Box>
              <Box mr='3' width='30%' d='flex' justifyContent='flex-start'>
                <h4>Cons</h4>
              </Box>
              <Box mr='3' width='20%' d='flex' justifyContent='flex-start'>
                <h4>Salary</h4>
              </Box>
            </Box>
            <Box p='2' h='100px' d='flex' flexDirection='row' wrap='no-wrap'>
              <Box
                mr='3'
                width='55%'
                h='70px'
                d='flex'
                justifyContent='flex-start'
                fontWeight='semibold'
                as='p'
                lineHeight='tight'
                // isTruncated
                wrap='wrap'
                overflow='hidden'
              >
                {review.job_review}
              </Box>
              <Box
                mr='3'
                width='30%'
                h='70px'
                d='flex'
                justifyContent='flex-start'
                fontWeight='semibold'
                as='p'
                lineHeight='tight'
                // isTruncated
              >
                "any pros"
              </Box>
              <Box
                mr='3'
                width='30%'
                h='70px'
                d='flex'
                justifyContent='flex-start'
                fontWeight='semibold'
                as='p'
                lineHeight='tight'
                // isTruncated
              >
                "any cons"
              </Box>
              <Box
                mr='3'
                width='20%'
                h='70px'
                d='flex'
                justifyContent='flex-start'
                fontWeight='semibold'
                as='h4'
                lineHeight='tight'
                isTruncated
              >
                ${review.salary}
              </Box>
            </Box>
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
