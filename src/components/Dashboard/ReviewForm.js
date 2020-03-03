import React, { useState, useEffect, useRef } from 'react';

import { useForm } from 'react-hook-form';
// import { Link } from 'react-router-dom';

import {
  FormControl,
  Flex,
  Select,
  Input,
  Textarea,
  Button,
  ButtonGroup,
  Spinner,
  FormErrorMessage,
  FormLabel,
  Link,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogOverlay,
  AlertDialogFooter
} from '@chakra-ui/core';

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
  const { register, handleSubmit, errors, formState } = useForm();

  // validating salary
  function validateSalary(value) {
    console.log('validate', value);
    let error;
    if (!value) {
      error = 'Salary is required';
    } else if (value < 0) {
      error = 'Salary cannot be less than zero.';
    }
    return error || true;
  }

  useEffect(() => {
    getCompanies();
  }, [getCompanies]);

  const submitForm = data => {
    postReview(localStorage.getItem('userId'), data).then(() =>
      history.push('/dashboard')
    );
  };

  // specifically for the cancel button functionality
  const [isOpen, setIsOpen] = useState();
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  if (isLoading) {
    return (
      <h1>
        <Spinner size='xl' />
      </h1>
    );
  }

  return (
    <Flex justify='center' w='0 auto'>
      <Flex align='start' flexDir='column'>
        <h2> Add a Review</h2>
        <Flex as='h3' mb='3'>
          Company Information
        </Flex>
        <form onSubmit={handleSubmit(submitForm)}>
          <FormControl isRequired>
            <FormLabel fontSize='15px' color='#525252'>
              Company Name
            </FormLabel>
            <Select
              variant='filled'
              borderRadius='none'
              placeholder='Select a company'
              name='company_id'
              id='company_name'
              type='select'
              ref={register}
            >
              {companies.map(company => (
                <option value={company.id} key={company.id}>
                  {company.name}
                </option>
              ))}
            </Select>
            <Flex>
              <Link href='/add-company' color='black'>
                Need to add a company?
              </Link>
            </Flex>
            <FormLabel fontSize='15px' mt='3' color='#525252'>
              Job Title
            </FormLabel>
            <Input
              variant='filled'
              ref={register}
              mb='3'
              type='text'
              name='job_title'
              placeholder='e.g. Software Engineer'
              borderRadius='none'
            />
            <FormLabel fontSize='15px' color='#525252'>
              Job Location
            </FormLabel>
            <Input
              variant='filled'
              ref={register}
              mb='3'
              type='text'
              name='job_location'
              placeholder='City, State'
              borderRadius='none'
            />
          </FormControl>
          <FormControl isRequired isInvalid={errors.salary}>
            <FormLabel fontSize='15px' color='#525252'>
              Salary
            </FormLabel>
            <Input
              variant='filled'
              ref={register({ validate: validateSalary })}
              mb='3'
              type='number'
              name='salary'
              borderRadius='none'
              placeholder='e.g. 70,000'
            />
            <FormErrorMessage>
              {errors.salary && errors.salary.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isRequired>
            <Flex as='h3' mb='3'>
              Interview Process
            </Flex>
            <FormLabel fontSize='15px' color='#525252'>
              Interview Difficulty
            </FormLabel>
            <Input
              variant='filled'
              min='1'
              max='5'
              ref={register}
              mb='3'
              type='number'
              name='interview_rating'
              placeholder='1 to 5, very difficult to very easy'
              borderRadius='none'
            />
            <FormLabel fontSize='15px' color='#525252'>
              Interview Process
            </FormLabel>
            <Textarea
              variant='filled'
              ref={register}
              mb='3'
              rowsMax={6}
              type='text'
              name='interview_review'
              placeholder='Describe the interview process.'
              borderRadius='none'
            />
            <Flex as='h3' mb='3'>
              Overall Job Review
            </Flex>
            <FormLabel fontSize='15px' color='#525252'>
              Job Rating
            </FormLabel>
            <Input
              variant='filled'
              min='1'
              max='5'
              ref={register}
              mb='3'
              type='number'
              name='job_rating'
              placeholder='1 to 5, terrible to great'
              borderRadius='none'
            />
            <FormLabel fontSize='15px' color='#525252'>
              Job Review
            </FormLabel>
            <Textarea
              variant='filled'
              ref={register}
              mb='3'
              rowsMax={6}
              type='text'
              name='job_review'
              placeholder='Describe your experiences at your job.'
              borderRadius='none'
            />
          </FormControl>
          <ButtonGroup mb='3' mt='3'>
            <Button
              w='20rem'
              type='submit'
              _hover={{ bg: '#979797' }}
              _active={{ bg: '#979797' }}
              bg='#615E5E'
              color='white'
              isLoading={formState.isSubmitting}
            >
              Add Your Review
            </Button>
            <Button
              border='2px solid #615E5E'
              bg='none'
              color='#615E5E'
              onClick={() => setIsOpen(true)}
            >
              Cancel
            </Button>
            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay />
              <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                  Cancel form?
                </AlertDialogHeader>
                <AlertDialogBody>
                  Are you sure? You can't undo this action.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button onClick={() => history.push('/dashboard')} ml={3}>
                    Yes I'm sure
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </ButtonGroup>
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
