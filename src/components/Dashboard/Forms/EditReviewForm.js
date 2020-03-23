import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import getReviewById from '../../../state/actions/index.js';
import editReview from '../../../state/actions/index.js';
import ReactGA from 'react-ga';

import EditReviewInput from '../../Reusable/InputFields/EditReviewInput';

import { useForm } from 'react-hook-form';

//imported styles
import CustomSpinner from '../../CustomSpinner';
import {
  Flex,
  Input,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
  Select,
  Textarea,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogOverlay,
  AlertDialogFooter,
  useToast
} from '@chakra-ui/core';

const SingleReview = ({
  review,
  getReviewById,
  editReview,
  reviewEdited,
  match,
  history,
  isLoading
}) => {
  const { register, handleSubmit, errors, formState } = useForm();
  const id = match.params.id;
  const [reviewEdited2, setReviewEdited2] = useState(false);
  const [editValue, setEditValue] = useState({
    id: id
  });

  //allows the use of toasts
  const toast = useToast();

  // specifically for the cancel button functionality
  const [isOpen, setIsOpen] = useState();
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  // validating salary
  function validateSalary(value) {
    let error;
    if (value < 0) {
      error = 'Salary cannot be less than zero.';
    }
    return error || true;
  }

  useEffect(() => {
    getReviewById(id);
  }, [id, getReviewById]);

  if (isLoading) {
    return (
      <Flex justify='center' align='center' w='100vh' h='100vh'>
        <CustomSpinner />
      </Flex>
    );
  }

  const submitEdits = () => {
    editReview(review.user_id, review.review_id, editValue).then(() => {
      history.push('/dashboard')
      toast({
        title: `Review Edit Success!`,
        description: `We've successfully edited your review for you`,
        status: 'success',
        duration: 5000,
        isClosable: true
      })
    })

    // if (reviewEdited === true) {
    //   toast({
    //     title: `Review Edit Success!`,
    //     description: `We've successfully edited your review for you`,
    //     status: 'success',
    //     duration: 5000,
    //     isClosable: true
    //   })
    // } else {
    //   toast({
    //     title: `Review Edit Failed`,
    //     description: `There was an error editing your review`,
    //     status: 'error',
    //     duration: 5000,
    //     isClosable: true
    //   });
    // }

    ReactGA.event({
      category: 'Edit',
      action: `Submit edit`
    });
  };

  return (
    <Flex w='100%' bg='rgba(72, 72, 72, 0.1)'>
      <Flex
        w='100%'
        justify='center'
        py='6rem'
        px='15rem'
        bg='white'
      >
        <Flex justify='center' align='start' flexDir='column'>
          <h2> Edit Company Review</h2>
          <form onSubmit={handleSubmit(submitEdits)}>

            <FormControl>
              <FormLabel fontSize='15px' color='#525252' mt='3'>
                Job Title
              </FormLabel>
              <EditReviewInput
                name='job_title'
                placeholder={review.job_title}
                value={editValue.job_title}
                onChange={e => setEditValue({ ...editValue, [e.target.name]: e.target.value })}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize='15px' color='#525252'>
                Job Location
              </FormLabel>
              <Flex>
                <EditReviewInput
                  name='city'
                  placeholder={review.city}
                  value={editValue.city}
                  onChange={e => setEditValue({ ...editValue, [e.target.name]: e.target.value })}
                />

                <Flex p='3%' />

                <Select
                  mb='4'
                  h='58px'
                  // py='32px'
                  rounded='3px'
                  borderColor='#ECF1FE'
                  name='state_id'
                  ref={register}
                  onChange={e => setEditValue({ ...editValue, [e.target.name]: e.target.value })}
                >
                  {states.map(i => (
                    <option key={i.id} value={i.id}>
                      {i.state_name}
                    </option>
                  ))}
                  {/* <option value={0}>{review.state_name}</option>
                  <option value={1}>Alabama</option>
                  <option value={2}>Alaska</option>
                  <option value={3}>Arizona</option>
                  <option value={4}>Arkansas</option>
                  <option value={5}>California</option> */}
                </Select>

                {/* <EditReviewInput
                  name='state_name'
                  placeholder={review.state_name}
                  value={editValue.state_id}
                  onChange={e => setEditValue({ ...editValue, [e.target.name]: e.target.value })}
                /> */}
              </Flex>
            </FormControl>

            <FormControl isInvalid={errors.salary}>
              <FormLabel fontSize='15px' color='#525252'>
                Salary
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  mb='4'
                  h='58px'
                  py='32px'
                  borderColor='#ECF1FE'
                  color='gray.300'
                  fontSize='1.2em'
                  children='$'
                />
                <Input
                  mb='4'
                  h='58px'
                  py='32px'
                  borderColor='#ECF1FE'
                  rounded='3px'
                  name='salary'
                  type='number'
                  placeholder={review.salary}
                  ref={register({ validate: validateSalary })}
                  value={editValue.salary}
                  onChange={e => setEditValue({ ...editValue, [e.target.name]: e.target.value })}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.salary && errors.salary.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl>
              <FormLabel fontSize='15px' color='#525252'>
                Status
              </FormLabel>
              <EditReviewInput
                name='end_date'
                placeholder={review.end_date}
                value={editValue.end_date}
                onChange={e => setEditValue({ ...editValue, [e.target.name]: e.target.value })}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize='15px' color='#525252'>
                Start Date
              </FormLabel>
              <EditReviewInput
                name='start_date'
                placeholder={review.start_date}
                value={editValue.start_date}
                onChange={e => setEditValue({ ...editValue, [e.target.name]: e.target.value })}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize='15px' color='#525252'>
                End Date
              </FormLabel>
              <EditReviewInput
                name='end_date'
                placeholder={review.end_date}
                value={editValue.end_date}
                onChange={e => setEditValue({ ...editValue, [e.target.name]: e.target.value })}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize='15px' color='#525252'>
                Working Hours
              </FormLabel>
              <EditReviewInput
                name='typical_hours'
                placeholder={review.typical_hours}
                value={editValue.typical_hours}
                onChange={e => setEditValue({ ...editValue, [e.target.name]: e.target.value })}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize='15px' color='#525252'>
                Job Review
              </FormLabel>
              <Textarea
                mb='4'
                h='144px'
                rounded='3px'
                borderColor='#ECF1FE'
                rowsMax={6}
                name='comment'
                type='text'
                placeholder={review.comment}
                ref={register}
                value={editValue.comment}
                onChange={e => setEditValue({ ...editValue, [e.target.name]: e.target.value })}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize='15px' color='#525252'>
                Job Rating
              </FormLabel>
              <Select
                mb='4'
                h='58px'
                rounded='3px'
                borderColor='#ECF1FE'
                name='job_rating'
                ref={register}
                onChange={e => setEditValue({ ...editValue, [e.target.name]: e.target.value })}
              >
                <option value={5}>5 - Great</option>
                <option value={4}>4 - Good</option>
                <option value={3}>3 - Ok </option>
                <option value={2}>2 - Poor </option>
                <option value={1}>1 - Very Poor </option>
              </Select>
            </FormControl>

            <ButtonGroup mb='3' mt='3'>
              <Button
                w='500px'
                h='56px'
                type='submit'
                bg='#344CD0'
                color='white'
                isLoading={formState.isSubmitting}
                rounded='10px'
                border='none'
              >
                Edit Review
              </Button>
              <Button
                h='56px'
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
        </Flex>
      </Flex>
    </Flex >
  );
};

const mapStateToProps = state => {
  return {
    review: state.review.dataById,
    reviewEdited: state.review.reviewEdited
  };
};

export default connect(
  mapStateToProps,
  (getReviewById, editReview))
  (SingleReview);