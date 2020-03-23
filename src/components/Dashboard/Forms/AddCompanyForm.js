import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import postCompany from '../../../state/actions';
import { useForm } from 'react-hook-form';
import CustomAutocomplete from '../../Reusable/InputFields/Autocomplete.js';
import { states } from '../../Reusable/statesData.js';

// styles
import CustomSpinner from '../../CustomSpinner.js';
import OnboardingInput from '../../Reusable/InputFields/OnboardingInput.js';
import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Select
} from '@chakra-ui/core';

const AddCompanyForm = ({ isLoading, postCompany, history }) => {
  const { register, handleSubmit, errors, formState } = useForm();
  const [location, setLocation] = useState({});
	const [newLocation, setNewLocation] = useState({});
	const stateSelectorHelper = value => {
		setLocation(value);
	};

  // function validateCompanyState(value) {
  //   let error;
  //   if (!value) {
  //     error = 'Company name is required';
  //   } else if (value.length !== 2) {
  //     error = 'Must abbreviate state';
  //   }
  //   return error || true;
  // }

  // confirm myState and replace with matching state ID
  useEffect(() => {
    if (location.myState) {
      const stateId = states.filter(i =>
        i.state_name.toLowerCase().startsWith(location.myState.toLowerCase())
      );
      const setNewLocation = { ...location, myState: stateId[0].id };
    }
  }, [location]);

  // const submitForm = newCompany => {
  //   postCompany(newCompany).then(() => history.push('/dashboard/add-review'));
  // };

  //submit handler
	const submitForm = newCompany => {
		postCompany(newCompany) {
			name:name,
			city: newLocation.myCity,
      state_id: newLocation.myState,
      domain:domain
    })
    .then(() => history.push('/dashboard/add-review'));
		
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
              <FormLabel color='#525252'>
                Company Headquarters Location
              </FormLabel>
              <CustomAutocomplete
                stateHelper={stateHelper}
                id='hq_city'
                name='hq_city'
                label='hq_city'
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
              <FormLabel color='#525252'>Company Size</FormLabel>
              <Select
                mb='30px'
                h='70px'
                // w='404px'
                rounded='3px'
                variant='outline'
                backgroundColor='#FDFDFF'
                name='size_range'
                label='size_range'
                placeholder='Select Company Size'
                ref={register}
              >
                <option value='1-10'>1-10</option>
                <option value='11-50'>11-50</option>
                <option value='51-200'>51-200</option>
                <option value='201-500'>201-500</option>
                <option value='501-1000'>501-1000</option>
                <option value='1001-5000'>1001-5000</option>
                <option value='5001-10,000'>5001-10,000</option>
                <option value='10,001+'>10,001+</option>
              </Select>
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
