import React from 'react';
import { Input } from '@chakra-ui/core';

function OnboardingInput({ ...props }, ref) {
  return (
    <Input
      w='100%'
      h='58px'
      py='32px'
      rounded='3px'
      variant='outline'
      bgColor='#FDFDFF'
      mb={props.mb}
      type={props.type ? props.type : 'text'}
      name={props.name}
      label={props.label}
      placeholder={props.placeholder}
      ref={ref}
    />
  );
}

const forwardedInput = React.forwardRef(OnboardingInput);

export default forwardedInput;
