import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import postCompany from '../../state/actions';
import { useForm } from 'react-hook-form';

// styles
import {
  Input,
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
    console.log('validate', value);
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

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        <Flex m='20px auto' w='20rem' justify='center' flexDir='column'>
          <FormControl isRequired isInvalid={errors.hq_state}>
            <h2> Add a Company</h2>
            <FormLabel color='#525252'>Company Name</FormLabel>
            <Input
              mb='1rem'
              variant='filled'
              borderRadius='none'
              type='text'
              name='name'
              label='Company Name'
              placeholder='Ex: UPS'
              ref={register}
            />

            <FormLabel color='#525252'>City</FormLabel>
            <Input
              mb='1rem'
              variant='filled'
              borderRadius='none'
              type='text'
              name='hq_city'
              label='City'
              placeholder='Ex: Los Angeles'
              ref={register}
            />

            <FormLabel color='#525252'>State</FormLabel>
            <Input
              mb='1rem'
              borderRadius='none'
              variant='filled'
              label='State'
              type='text'
              name='hq_state'
              placeholder='Ex: CA'
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
              height='48px'
              width='200px'
            >
              Add
            </Button>
            <Button
              isloading
              size='md'
              height='48px'
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
        </Flex>
      </form>
    </>
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.company.fetchingData
  };
};
export default connect(mapStateToProps, postCompany)(AddCompanyForm);
