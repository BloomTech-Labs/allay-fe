import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// action
import getReview from '../../state/actions/index';
// component
import ReviewCard from './ReviewCard';
// styles
import { Flex, Button, Avatar } from '@chakra-ui/core';

const DashboardHome = ({ data, getReview, history, isLoading }) => {
  // pull review data
  useEffect(() => {
    getReview();
  }, [getReview]);

  // use to navigate to review form
  const navToReviewForm = () => {
    history.push('/dashboard/add-review');
  };

  return (
    <>
      <Flex maxWidth='900px' margin='0 auto' direction='column' wrap='wrap'>
        <Flex className='Fixed' direction='column'>
          <Flex align='center' padding='1.5% 0'>
            <Avatar marginRight='2%' src='https://bit.ly/broken-link' />
            <h1> Allay </h1>
          </Flex>
          <Flex align='center' justify='flex-end' padding='1.5% 0'>
            <Button
              variantColor='teal'
              size='sm'
              isLoading={isLoading}
              onClick={navToReviewForm}
            >
              Add A Review
            </Button>
          </Flex>
        </Flex>
        <Flex marginTop='15%' direction='column'>
          <Flex align='center' justify='flex-start' padding='1.5% 0'>
            <h3> Recent Posts </h3>
          </Flex>
          <Flex height='100%' direction='column'>
            {data.map(review => (
              <ReviewCard key={review.id} review={review} history={history} />
            ))}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.review.fetchingData,
    data: state.review.data
  };
};
export default connect(mapStateToProps, getReview)(DashboardHome);
