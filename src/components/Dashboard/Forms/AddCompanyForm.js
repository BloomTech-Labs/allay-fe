import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import postCompany from '../../../state/actions';
import { useForm } from 'react-hook-form';
import CustomAutocomplete from '../../Reusable/InputFields/Autocomplete.js';

// styles
import CustomSpinner from '../../CustomSpinner.js';
import OnboardingInput from '../../Reusable/InputFields/OnboardingInput.js';
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
  const [state, setState] = useState({});
  const stateHelper = value => {
    setState(value);
  };
  console.log(state, 'state 30');
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

  // let searchValue = document.getElementById('searchText');

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
              <FormLabel color='#525252'>
                Company Headquarters Location
              </FormLabel>
              <CustomAutocomplete
                stateHelper={stateHelper}
                id='Company Headquarters'
                name='Company Headquarters'
                label='Company Headquarters'
                placeholder='e.g. Los Angeles, CA'
                ref={register}
              />
              <FormLabel color='#525252'>Company Website</FormLabel>
              <OnboardingInput
                name='domain'
                label='domain'
                placeholder='e.g. lambdaschool.com'
                ref={register}
              />
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
