import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import postCompany from '../../../state/actions';
import { useForm } from 'react-hook-form';
import Autocomplete from 'react-google-autocomplete';

// styles
import CustomSpinner from '../../CustomSpinner.js';
import OnboardingInput from '../../InputFields/OnboardingInput.js';
import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter
} from '@chakra-ui/core';

const AddCompanyForm = ({ isLoading, postCompany, history }) => {
  const { register, handleSubmit, errors, formState } = useForm();

  function validateCompanyState(value) {
    let error;
    if (!value) {
      error = 'Company name is required';
    } else if (value.length !== 2) {
      error = 'Must abbreviate state';
    }
    return error || true;
  }

  const submitForm = newCompany => {
    postCompany(newCompany).then(() => history.push('/dashboard/add-review'));
  };

  // specifically for the cancel button functionality
  const [isOpen, setIsOpen] = useState();
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  if (isLoading) {
    return (
      <Flex justify='center' align='center' w='100vh' h='100vh'>
        <CustomSpinner />
      </Flex>
    );
  }

  return (
    <Flex bg='rgba(72, 72, 72, 0.1)' w='100%' minH='100vh'>
      <Flex
        justify='flexStart'
        maxW='1100px'
        w='100%'
        py='6rem'
        px='15rem'
        bg='white'
      >
        <Flex justify='center' flexDir='column'>
          <form onSubmit={handleSubmit(submitForm)}>
            <FormControl isRequired isInvalid={errors.hq_state}>
              <h2> Add a Company</h2>
              <FormLabel color='#525252'>Company Name</FormLabel>
              <OnboardingInput
                name='name'
                label='Company Name'
                placeholder='e.g. UPS'
                ref={register}
              />
              <FormLabel color='#525252'>City, St</FormLabel>
              <Autocomplete
                style={{
                  width: '100%',
                  height: '56px',
                  marginBottom: '24px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: '#F2F6FE'
                }}
                type='input'
                name='job_location'
                // placeholder={review.job_location}
                ref={register}
                // value={editValue.job_location}
                // onChange={e =>
                //   setEditValue({
                //     ...editValue,
                //     [e.target.name]: e.target.value
                //   })
                // }
                onPlaceSelected={place => {
                  let city = place.address_components[0].long_name;
                  let state = place.address_components[2].short_name;
                  console.log(city, state, 'line 191');
                }}
              />
              {/* <OnboardingInput
                name='hq_city'
                label='City'
                placeholder='e.g. Los Angeles'
                ref={register}
              /> */}

              <FormLabel color='#525252'>State</FormLabel>
              <OnboardingInput
                name='hq_state'
                label='State'
                placeholder='e.g. CA'
                ref={register({ validate: validateCompanyState })}
              />
              <FormErrorMessage>
                {errors.hq_state && errors.hq_state.message}
              </FormErrorMessage>
            </FormControl>
            <ButtonGroup mt='1rem' spacing={2}>
              <Button
                bg='#615E5E'
                color='white'
                _hover={{ bg: '#979797' }}
                _active={{
                  bg: '#979797'
                }}
                isLoading={formState.isSubmitting}
                type='submit'
                size='md'
                w='500px'
                h='64px'
              >
                Add
              </Button>
              <Button
                isloading
                size='md'
                height='64px'
                width='100px'
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
                    <Button
                      onClick={() => history.push('/dashboard/add-review')}
                      ml={3}
                    >
                      Yes I'm sure
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </ButtonGroup>
          </form>
        </Flex>
      </Flex>
    </Flex>
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.company.fetchingData
  };
};
export default connect(mapStateToProps, postCompany)(AddCompanyForm);
