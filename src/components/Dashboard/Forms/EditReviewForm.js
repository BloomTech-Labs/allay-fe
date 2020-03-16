import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import getReviewById from '../../../state/actions/index.js';
import editReview from '../../../state/actions/index.js';
import NavBar from '../NavBar';

import { useForm } from 'react-hook-form';

//imported styles
import CustomSpinner from '../../CustomSpinner';
import ReviewFormInput from '../../InputFields/ReviewFormInput';
import {
  Box,
  Flex,
  Avatar,
  Icon,
  Editable,
  EditablePreview,
  EditableInput,
  Input,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Checkbox,
  InputGroup,
  InputLeftElement,
  Link,
  Select,
  Textarea,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogOverlay,
  AlertDialogFooter
} from '@chakra-ui/core';
import { TiLocationOutline, TiThumbsUp, TiThumbsDown } from 'react-icons/ti';

const SingleReview = ({
  review,
  getReviewById,
  editReview,
  getCompanies,
  companies,
  match,
  history,
  isLoading
}) => {
  const { register, handleSubmit, errors, formState } = useForm();
  const id = match.params.id;
  const [editValue, setEditValue] = useState({
    id: id
  });

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
    if (value < 0) {
      error = 'Salary cannot be less than zero.';
    }
    return error || true;
  }

  useEffect(() => {
    getReviewById(id);
  }, [id, getReviewById]);

  // useEffect(() => {
  //   setEditValue(review);
  // }, [review]);

  console.log(editValue);

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

  if (isLoading) {
    return (
      <Flex justify='center' align='center' w='100vh' h='100vh'>
        <CustomSpinner />
      </Flex>
    );
  }

  // const handleEdits = (event) => {
  // 	setEditValue({
  // 		...editValue,
  // 		// [event.target.name]: event.target.value
  // 	})
  // }

  const submitEdits = (data) => {
    console.log(data);
    editReview(editValue);
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
          <h2> Edit Review</h2>
          <form onSubmit={handleSubmit(submitEdits)}>

            <FormControl>
              <FormLabel fontSize='15px' color='#525252'>
                Tag Line
              </FormLabel>
              <Input
                name='tagline'
                placeholder={review.tagline}
                ref={register}
                value={editValue.tagline}
                onChange={e => setEditValue({ ...editValue, [e.target.name]: e.target.value })}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize='15px' mt='4' color='#525252'>
                Job Title
              </FormLabel>
              <ReviewFormInput
                name='job_title'
                placeholder='e.g. Software Engineer'
                ref={register}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize='15px' color='#525252'>
                Job Location
              </FormLabel>
              <ReviewFormInput
                name='job_location'
                placeholder='e.g. San Francisco, CA'
                ref={register}
              />
            </FormControl>

            <FormControl isInvalid={errors.salary}>
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
                <Input
                  mb='4'
                  py='32px'
                  variant='filled'
                  rounded='6px'
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

            <Flex as='h3' mb='3'>
              Interview Process
              </Flex>

            <FormControl>
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
            </FormControl>

            <FormControl>
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
            </FormControl>

            <Flex as='h3' mb='3'>
              Overall Job Review
            </Flex>

            <FormControl>
              <FormLabel fontSize='15px' color='#525252'>
                Job Rating
              </FormLabel>
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
            </FormControl>

            <FormControl>
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
                Edit Review
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
        </Flex>
      </Flex>
    </Flex >



    // <Flex w='100%' minH='100vh' justify='center'>
    //   <Flex maxW='1440px' w='100%' direction='column' wrap='wrap'>
    //     {/* <NavBar history={history} /> */}
    //     <Flex mt='15%' w='100%' maxW='1440px'>          
    //       {/* content container */}
    //       <Flex w='85%' flexDir='column'>
    //         {/* top line */}
    //         <Flex
    //           justify='space-between'
    //           px='2%'
    //           w='100%'
    //           h='32px'
    //           mt='0.5%'
    //           mb='2%'
    //           align='center'
    //         >
    //           <Flex as='h2' fontSize='32px'>
    //             {review.company_name} Interview Review
    // 					</Flex>
    //           <Flex align='center'>
    //             <Flex as='h2' fontSize='32px'>
    //               {review.interview_rating}/5
    // 						</Flex>
    //             <Icon name='star' size='24px' />
    //           </Flex>
    //         </Flex>
    //         {/* location bar */}
    //         <Flex w='100%' pl='2%' align='center'>
    //           {/* location */}
    //           <Flex h='32px' w='20%' align='center' mr='35px'>
    //             Location:
    // 						<Flex as='h3' align='center' fontWeight='light' pl='10px'>
    //               <Box as={TiLocationOutline}></Box>
    //               {/* {review.job_location} */}
    //               <form onSubmit={handleSubmit(submitEdits)}>
    //                 <Input
    //                   // defaultValue='{review.job_location}'
    //                   ref={register}
    //                   variant="filled"
    //                   mb="3"
    //                   py="15px"
    //                   type="text"
    //                   name="job_location"
    //                   value={editValue.job_location}
    //                   onChange={e => setEditValue({ ...editValue, [e.target.name]: e.target.value })}
    //                   // onChange={e => setEditValue(e.target.value)}
    //                   // placeholder='location'
    //                   rounded="6px"
    //                   placeholder={`${review.job_location}`}
    //                 >
    //                   {/* <EditablePreview />
    // 									<EditableInput /> */}
    //                 </Input>
    //               </form>
    //             </Flex>
    //           </Flex>
    //           {/* Difficulty */}
    //           <Flex align='center' h='32px' mr='35px'>
    //             Difficulty:
    // 						<Flex as='h3' fontWeight='light' pl='10px'>
    //               {review.interview_rating}/5
    // 						</Flex>
    //           </Flex>
    //           {/* offer? */}
    //           <Flex align='center' h='32px' mr='35px'>
    //             {review.offer_received ? (
    //               <>
    //                 <Box as={TiThumbsUp} mr='10px'></Box>
    //                 <Flex as='h3' fontWeight='light' mr='10px'>
    //                   Received 0ffer
    // 								</Flex>
    //               </>
    //             ) : (
    //                 <>
    //                   <Box as={TiThumbsDown} mr='10px'></Box>
    //                   <Flex as='h3' fontWeight='light' mr='10px'>
    //                     No Offer
    // 								</Flex>
    //                 </>
    //               )}
    //           </Flex>
    //         </Flex>
    //         {/* tagline */}
    //         <Flex as='h2' mb='5px' pl='2%' mt='5px'>
    //           {review.tagline}
    //         </Flex>
    //         {/* Description container */}
    //         <Flex as='p' fontSize='24px' mb='1%' pl='2%'>
    //           Description:
    // 				</Flex>
    //         <Flex as='p' fontWeight='light' fontSize='18px' px='2%'>
    //           {review.job_review}
    //         </Flex>


    //         {/* <h2> Edit Review</h2> */}
    //         <form onSubmit={handleSubmit(submitEdits)}>
    //           {/* <FormControl>
    // 						<FormLabel fontSize="15px" color="#525252">
    // 							Job Location
    //           </FormLabel>
    // 						<Input
    // 							variant="filled"
    // 							mb="3"
    // 							py="32px"
    // 							type="text"
    // 							name="job_location"
    // 							value={editValue.job_location}
    // 							onChange={e => setEditValue({ ...editValue, [e.target.name]: e.target.value })}
    // 							placeholder='location'
    // 							rounded="6px"
    // 						/>
    // 					</FormControl> */}

    //           <Button
    //             w="500px"
    //             h="64px"
    //             type="submit"
    //             _hover={{ bg: '#979797' }}
    //             _active={{ bg: '#979797' }}
    //             bg="#615E5E"
    //             color="white"
    //             rounded="6x"
    //             border="none"
    //           >
    //             Edit Review
    //           </Button>
    //         </form>
    //       </Flex>
    //     </Flex>
    //   </Flex>
    // </Flex>
  );
};

const mapStateToProps = state => {
  // console.log(state.review.dataById)
  return {
    review: state.review.dataById
  };
};

export default connect(
  mapStateToProps,
  (getReviewById, editReview))
  (SingleReview);