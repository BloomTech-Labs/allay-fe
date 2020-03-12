import React from 'react';
import { Input } from '@chakra-ui/core';

const OnboardingInput = props => {
  return (
    <Input
      mb='1rem'
      py='32px'
      variant='filled'
      borderRadius='none'
      type='text'
      name={props.name}
      label={props.label}
      placeholder={props.placeholder}
      // ref={props.register}
    />
  );
};

export default OnboardingInput;
