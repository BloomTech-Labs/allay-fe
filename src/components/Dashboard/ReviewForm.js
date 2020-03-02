import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
// import { Link } from 'react-router-dom';

import {
  FormControl,
  Flex,
  Text,
  Input,
  Textarea,
  Link,
  Button,
  ButtonGroup,
  Spinner
} from '@chakra-ui/core';

import { TextField } from '@material-ui/core';

import Autocomplete from '@material-ui/lab/Autocomplete';
import { connect } from 'react-redux';
import postReview from '../../state/actions';
import getCompanies from '../../state/actions';

const ReviewForm = ({
  postReview,
  getCompanies,
  companies,
  history,
  isLoading
}) => {
  const [newReviewPost, setNewReviewPost] = useState({
    company_id: '',
    job_title: '',
    job_location: '',
    salary: '',
    interview_review: '',
    interview_rating: '',
    job_review: '',
    job_rating: ''
  });

  useEffect(() => {
    getCompanies();
  }, [getCompanies]);

  const changeHandler = e => {
    setNewReviewPost({
      ...newReviewPost,
      [e.target.name]:
        e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
    });
  };
  console.log(newReviewPost);

  const handleSubmit = e => {
    e.preventDefault();
    postReview(localStorage.getItem('userId'), newReviewPost).then(() =>
      history.push('/dashboard')
    );
  };

  if (isLoading) {
    return (
      <h1>
        <Spinner size='xl' />
      </h1>
    );
  }

  const companyOptions = companies.map(company => {
    return { id: company.id, name: company.name };
  });

  return (
    <Flex justify='center' w='0 auto'>
      <Flex align='start' flexDir='column'>
        <h2> Add a Review</h2>
        <Flex as='h3' mb='3'>
          {' '}
          Company Information
        </Flex>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <Text fontSize='15px' color='#6B778C'>
              Company Name
            </Text>
            <Autocomplete
              id='combo-box-demo'
              options={companyOptions}
              getOptionLabel={company => company.name}
              onChange={value =>
                setNewReviewPost({
                  ...newReviewPost,
                  company_id: value ? value.id : ''
                })
              }
              style={{ width: 250 }}
              renderInput={params => <TextField {...params} />}
            />
            <Link href='/add-company' color='black'>
              Need to add a company?
            </Link>
            <Text fontSize='15px' color='#6B778C' mt='3'>
              Job Title
            </Text>
            <Input
              mb='3'
              type='text'
              name='job_title'
              value={newReviewPost.job_title}
              onChange={changeHandler}
            />
            <Text fontSize='15px' color='#6B778C'>
              Job Location
            </Text>
            <Input
              mb='3'
              type='text'
              name='job_location'
              value={newReviewPost.job_location}
              onChange={changeHandler}
            />
            <Text fontSize='15px' color='#6B778C'>
              Salary
            </Text>
            <Input
              mb='3'
              type='number'
              name='salary'
              value={newReviewPost.salary}
              onChange={changeHandler}
            />
            <Flex as='h3' mb='3'>
              Interview Process
            </Flex>
            <Text fontSize='15px' color='#6B778C'>
              Interview Difficulty
            </Text>
            <Input
              mb='3'
              type='number'
              name='interview_rating'
              value={newReviewPost.interview_rating}
              onChange={changeHandler}
            />
            <Text fontSize='15px' color='#6B778C'>
              Interview Process
            </Text>
            <Textarea
              mb='3'
              rowsMax={6}
              type='text'
              name='interview_review'
              value={newReviewPost.interview_review}
              onChange={changeHandler}
            />
            <Flex as='h3' mb='3'>
              Overall Job Review
            </Flex>
            <Text fontSize='15px' color='#6B778C'>
              Job Rating
            </Text>
            <Input
              mb='3'
              type='number'
              name='job_rating'
              value={newReviewPost.job_rating}
              onChange={changeHandler}
            />
            <Text fontSize='15px' color='#6B778C'>
              Job Review
            </Text>
            <Textarea
              mb='3'
              rowsMax={6}
              type='text'
              name='job_review'
              value={newReviewPost.job_review}
              onChange={changeHandler}
            />
            <ButtonGroup mb='3'>
              <Button type='submit' bg='#615E5E' color='white'>
                Add Your Review
              </Button>
              <Button
                border='2px solid #615E5E'
                bg='none'
                color='#615E5E'
                onClick={() =>
                  alert(
                    'Are you sure you want to cancel?',
                    history.push('/dashboard')
                  )
                }
              >
                Cancel
              </Button>
            </ButtonGroup>
          </FormControl>
        </form>
      </Flex>
    </Flex>
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.review.fetchingData,
    companies: state.company.data
  };
};

export default connect(mapStateToProps, (postReview, getCompanies))(ReviewForm);
