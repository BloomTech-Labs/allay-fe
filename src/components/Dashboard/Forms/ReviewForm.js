import React, { useState, useEffect, useRef } from 'react';
import ReactGA from 'react-ga'; // for google analytics
import { useForm } from 'react-hook-form';
// redux
import { connect } from 'react-redux';
// actions
import postReview from '../../../state/actions';
import getCompanies from '../../../state/actions';
import postCompany from '../../../state/actions';
// styles
import CustomSpinner from '../../CustomSpinner.js';
import ReviewFormInput from '../../InputFields/ReviewFormInput.js';
import {
  FormControl,
  Flex,
  Select,
  Textarea,
  Input,
  Button,
  ButtonGroup,
  FormErrorMessage,
  FormLabel,
  Link,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogOverlay,
  AlertDialogFooter,
  Checkbox,
  InputGroup,
  InputLeftElement,
  Icon
} from '@chakra-ui/core';

const ReviewForm = ({
  postReview,
  getCompanies,
  companies,
  history,
  isLoading
}) => {
  const { register, handleSubmit, errors, formState } = useForm();
  // specifically for the cancel button functionality
  const [isOpen, setIsOpen] = useState();
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();
  // search state
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // validating salary
  function validateSalary(value) {
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

  useEffect(() => {
    if (searchTerm.length >= 3) {
      const results = companies.filter(company =>
        company.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    }
  }, [searchTerm, companies]);

  const submitForm = data => {
    postReview(localStorage.getItem('userId'), data).then(() =>
      history.push('/dashboard')
    );
    ReactGA.event({
      category: 'Review',
      action: `Submit review`
    });
  };

  if (isLoading) {
    return (
      <Flex justify='center' align='center' w='100vh' h='100vh'>
        <CustomSpinner />
      </Flex>
    );
  }

  return (
    <Flex w='100%' bg='rgba(72, 72, 72, 0.1)'>
      <Flex
        maxW='1100px'
        w='100%'
        justify='flexStart'
        py='6rem'
        px='15rem'
        bg='white'
      >
        <Flex justify='center' align='start' flexDir='column'>
          <h2> Add a Review</h2>
          <form onSubmit={handleSubmit(submitForm)}>
            <Flex as='h3' mb='3'>
              Other Information
            </Flex>
            <FormControl isRequired>
              <FormLabel fontSize='15px' color='#525252'>
                Tag Line
              </FormLabel>
              <ReviewFormInput
                name='tagline'
                placeholder='e.g. "Best company ever!"'
                ref={register}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize='15px' color='#525252'>
                Did you receive an offer?
              </FormLabel>
              <Flex mb='4'>
                <Checkbox
                  size='md'
                  border='rgba(72, 72, 72, 0.1)'
                  name='offer_received'
                  mr='3'
                  ref={register}
                >
                  Offer Received
                </Checkbox>
                <Checkbox
                  size='md'
                  border='rgba(72, 72, 72, 0.1)'
                  name='offer_accepted'
                  ref={register}
                >
                  Offer Accepted
                </Checkbox>
              </Flex>
            </FormControl>
            <Flex as='h3' mb='3'>
              Company Information
            </Flex>
            <FormControl isRequired>
              <FormLabel fontSize='15px' color='#525252'>
                Company Name
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  py='32px'
                  children={<Icon name='search-2' color='gray.300' />}
                />
                <Input
                  mb='3'
                  py='32px'
                  variant='filled'
                  rounded='6px'
                  type='text'
                  name='company'
                  placeholder='Search for a company'
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </InputGroup>

              <Select
                h='64px'
                mb='4'
                variant='filled'
                rounded='6x'
                type='select'
                name='company_id'
                id='company_name'
                ref={register}
              >
                {searchResults.map(company => (
                  <option value={company.id} key={company.id}>
                    {company.name}
                  </option>
                ))}
              </Select>
              <Flex>
                <Link color='black' href='/add-company'>
                  Need to add a company?
                </Link>
              </Flex>
              <FormLabel fontSize='15px' mt='4' color='#525252'>
                Job Title
              </FormLabel>
              <ReviewFormInput
                name='job_title'
                placeholder='e.g. Software Engineer'
                ref={register}
              />
              <FormLabel fontSize='15px' color='#525252'>
                Job Location
              </FormLabel>
              <ReviewFormInput
                name='job_location'
                placeholder='e.g. San Francisco, CA'
                ref={register}
              />
            </FormControl>
            <FormControl isRequired isInvalid={errors.salary}>
              <FormLabel fontSize='15px' color='#525252'>
                Salary
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  mb='4'
                  py='32px'
                  color='gray.300'
                  fontSize='1.2em'
                  children='$'
                />
                <ReviewFormInput
                  type='number'
                  name='salary'
                  placeholder='e.g. 70000'
                  ref={register({ validate: validateSalary })}
                />
              </InputGroup>

              <FormErrorMessage>
                {errors.salary && errors.salary.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl>
              <Flex as='h3' mb='3'>
                Interview Process
              </Flex>
              <FormLabel fontSize='15px' color='#525252'>
                Rate your Experience
              </FormLabel>
              {/* // change to dropdown */}
              <Select
                variant='filled'
                h='64px'
                mb='4'
                rounded='6x'
                name='interview_rating'
                id='interview_rating'
                type='select'
                ref={register}
              >
                <option></option>
                <option value={5}>5 - Great</option>
                <option value={4}>4 - Good</option>
                <option value={3}>3 - Ok </option>
                <option value={2}>2 - Poor </option>
                <option value={1}>1 - Very Poor </option>
              </Select>
              <FormLabel fontSize='15px' color='#525252'>
                Interview Process
              </FormLabel>
              <Textarea
                variant='filled'
                ref={register}
                mb='4'
                h='200px'
                rowsMax={6}
                type='text'
                name='interview_review'
                placeholder='Describe the interview process.'
                rounded='6px'
              />
              <Flex as='h3' mb='3'>
                Overall Job Review
              </Flex>
              <FormLabel fontSize='15px' color='#525252'>
                Job Rating
              </FormLabel>
            </FormControl>
            <FormControl isRequired>
              <Select
                variant='filled'
                h='64px'
                mb='4'
                rounded='6x'
                name='job_rating'
                id='job_rating'
                type='select'
                ref={register}
              >
                <option></option>
                <option value={5}>5 - Great</option>
                <option value={4}>4 - Good</option>
                <option value={3}>3 - Ok </option>
                <option value={2}>2 - Poor </option>
                <option value={1}>1 - Very Poor </option>
              </Select>

              <FormLabel fontSize='15px' color='#525252'>
                Job Review
              </FormLabel>
              <Textarea
                variant='filled'
                ref={register}
                mb='4'
                h='200px'
                rowsMax={6}
                type='text'
                name='job_review'
                placeholder='Describe your experiences at your job.'
                rounded='6px'
              />
            </FormControl>
            <ButtonGroup mb='3' mt='3'>
              <Button
                w='500px'
                h='64px'
                type='submit'
                _hover={{ bg: '#979797' }}
                _active={{ bg: '#979797' }}
                bg='#615E5E'
                color='white'
                isLoading={formState.isSubmitting}
                rounded='6x'
                border='none'
              >
                Add Your Review
              </Button>
              <Button
                h='64px'
                rounded='6x'
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
          <Flex></Flex>
        </Flex>
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

export default connect(
  mapStateToProps,
  (postReview, getCompanies, postCompany)
)(ReviewForm);
