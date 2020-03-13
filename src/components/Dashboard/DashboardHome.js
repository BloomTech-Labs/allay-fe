import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// action
import getReview from '../../state/actions/index';
// component
import NavBar from './NavBar';
import ReviewCard from './ReviewCard';
// styles
import { Flex, Spinner } from '@chakra-ui/core';

const DashboardHome = ({ data, getReview, history, isLoading }) => {
  // search state
  const [filteredReviews, setFilteredReviews] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // pull review data
  useEffect(() => {
    getReview();
  }, [getReview]);

  // filter searchbar by company name
  useEffect(() => {
    const results = data.filter(review =>
      review.company_name.toLowerCase().includes(searchResults)
    );
    // data = results;
    setFilteredReviews(results);
  }, [searchResults]);

  return (
    <>
      <Flex w='100%' minH='100vh' justify='center'>
        <Flex maxW='1440px' w='100%' direction='column' wrap='wrap'>
          <NavBar
            history={history}
            isLoading={isLoading}
            setSearchResults={setSearchResults}
          />
          <Flex mt='15%' direction='column'>
            <Flex height='100%' w='100%' wrap='wrap'>
              {isLoading ? (
                <Flex w='100%' h='100%' justify='center' align='center'>
                  <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                  />
                </Flex>
              ) : filteredReviews.length >= 1 ? (
                filteredReviews.map(review => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    history={history}
                  />
                ))
              ) : searchResults.length > 0 ? (
                <Flex as='h3'>No Reviews</Flex>
              ) : (
                data.map(review => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    history={history}
                  />
                ))
              )}
            </Flex>
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
