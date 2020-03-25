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
  const stateHelper = value => {
    setLocation(value);
  };

  // confirm myState and replace with matching state ID
  useEffect(() => {
    if (location.myState) {
      const stateId = states.filter(i =>
        i.state_name.toLowerCase().startsWith(location.myState.toLowerCase())
      );
      setNewLocation({ ...location, myState: stateId[0].id });
    }
  }, [location]);

  //submit handler
  const submitForm = newCompany => {
    postCompany({
      ...newCompany,
      hq_city: newLocation.myCity,
      state_id: newLocation.myState
    }).then(() => history.push('/dashboard/add-review'));
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
    <Flex justify='center' w='100%' minH='100vh' bg='#F2F6FE'>
      <Flex w='45%' my='10%' px='4%' justify='center' flexDir='column'>
        <form onSubmit={handleSubmit(submitForm)}>
          <FormControl isRequired isInvalid={errors.hq_state}>
            <h2 color='#525252' align='center'>
              Add a company
            </h2>
            <FormLabel color='#525252' mt='3'>
              Company name
            </FormLabel>
            <OnboardingInput
              mb='30px'
              name='company_name'
              label='Company Name'
              placeholder='e.g. UPS'
              ref={register}
            />
            <FormLabel color='#525252'>Company headquarters location</FormLabel>
            <CustomAutocomplete
              stateHelper={stateHelper}
              h='72px'
              mb='30px'
              rounded='3px'
              variant='outline'
              id='hq_city'
              name='hq_city'
              label='hq_city'
              placeholder='e.g. Los Angeles, CA'
            />
            <FormLabel color='#525252'>Company website</FormLabel>
            <OnboardingInput
              mb='30px'
              name='domain'
              label='domain'
              placeholder='e.g. lambdaschool.com'
              ref={register}
            />
            <FormLabel color='#525252'>Company size</FormLabel>
            <Select
              mb='45px'
              h='70px'
              // w='404px'
              rounded='3px'
              variant='outline'
              backgroundColor='#FDFDFF'
              name='size_range'
              label='size_range'
              placeholder='Select company size'
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

          <Flex mt='1rem' w='100%' justify='space-between'>
            <Button
              bg='#344CD0'
              color='white'
              isLoading={formState.isSubmitting}
              type='submit'
              w='65%'
              h='72px'
              fontSize='18px'
            >
              Add
            </Button>
            <Flex
              align='center'
              justify='center'
              isloading
              height='72px'
              width='30%'
              color='#344CD0'
              fontSize='18px'
              fontWeight='bold'
              onClick={() => setIsOpen(true)}
            >
              Cancel
            </Flex>
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
                  <Flex>
                    <Flex
                      align='center'
                      justify='center'
                      isloading
                      height='56px'
                      width='30%'
                      mr='5%'
                      color='#344CD0'
                      fontSize='18px'
                      fontWeight='bold'
                      ref={cancelRef}
                      onClick={onClose}
                    >
                      Cancel
                    </Flex>
                    <Button
                      h='56px'
                      rounded='10px'
                      bg='#344CD0'
                      border='none'
                      color='white'
                      onClick={() => history.push('/dashboard/add-review')}
                      ml={3}
                    >
                      Yes I'm sure
                    </Button>
                  </Flex>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Flex>
        </form>
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
