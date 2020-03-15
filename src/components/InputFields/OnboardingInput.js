import React from 'react';
import { Input } from '@chakra-ui/core';

function OnboardingInput({ ...props }, ref) {
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
      ref={ref}
    />
  );
}

const forwardedInput = React.forwardRef(OnboardingInput);

export default forwardedInput;
