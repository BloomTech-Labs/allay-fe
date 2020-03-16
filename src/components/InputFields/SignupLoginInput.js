import React from 'react';
import { Input } from '@chakra-ui/core';

const SignupLoginInput = React.forwardRef(({ ...props }, ref) => {
  return (
    <Input
      py='32px'
      variant='filled'
      rounded='6px'
      type={props.type}
      name={props.name}
      placeholder={props.placeholder}
      autoCapitalize='none'
      ref={ref}
    />
  );
});

export default SignupLoginInput;
