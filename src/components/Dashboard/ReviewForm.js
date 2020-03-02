import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

import {
  FormControl,
  FormLabel,
  Flex,
  Input,
  Textarea,
  Link,
  Button,
  ButtonGroup,
  Spinner,
  Select
} from '@chakra-ui/core';

import { TextField } from '@material-ui/core';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { connect } from 'react-redux';
import postReview from '../../state/actions';
import getCompanies from '../../state/actions';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    maxWidth: '600px'
  },
  heading: {
    maxWidth: '700px'
  },
  inputs: {
    margin: '3%'
  },
  paragraphs: {}
}));

const ReviewForm = ({
  postReview,
  getCompanies,
  companies,
  history,
  isLoading
}) => {
  const classes = useStyles();
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
        <Spinner size="xl" />
      </h1>
    );
  }

  const companyOptions = companies.map(company => {
    return { id: company.id, name: company.name };
  });

  return (
    <Flex justify="center" w="0 auto">
      <Flex justify="center" align="center" flexDir="column" maxW="600px">
        <h2> Add a Review</h2>
        <p> Company Information</p>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <Autocomplete
              id="combo-box-demo"
              options={companyOptions}
              getOptionLabel={company => company.name}
              onChange={(event, value) =>
                setNewReviewPost({
                  ...newReviewPost,
                  company_id: value ? value.id : ''
                })
              }
              style={{ width: 250 }}
              renderInput={params => (
                <TextField {...params} label="Find A Company" />
              )}
            />
            <Link to="/add-company">Need to add a company?</Link>
            <Input
              m="3"
              type="text"
              name="job_title"
              placeholder="Job Title"
              value={newReviewPost.job_title}
              onChange={changeHandler}
            />
            <Input
              m="3"
              type="text"
              name="job_location"
              placeholder="Job Location"
              value={newReviewPost.job_location}
              onChange={changeHandler}
            />
            <Input
              m="3"
              type="number"
              name="salary"
              placeholder="Salary"
              value={newReviewPost.salary}
              onChange={changeHandler}
            />
            <p>Interview Process </p>
            <Input
              m="3"
              type="number"
              name="interview_rating"
              placeholder="Interview Rating"
              value={newReviewPost.interview_rating}
              onChange={changeHandler}
            />
            <Textarea
              m="3"
              rowsMax={6}
              type="text"
              name="interview_review"
              placeholder="Describe the interview process"
              value={newReviewPost.interview_review}
              onChange={changeHandler}
            />
            <p>Overall Job Review</p>
            <Input
              m="3"
              type="number"
              name="job_rating"
              placeholder="Job rating 0-5"
              value={newReviewPost.job_rating}
              onChange={changeHandler}
            />
            <Textarea
              m="3"
              rowsMax={6}
              type="text"
              name="job_review"
              placeholder="Write a Review"
              value={newReviewPost.job_review}
              onChange={changeHandler}
            />
            <ButtonGroup>
              <Button type="submit">Add Your Review</Button>
              <Button
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
