import React from 'react';
import { Input } from '@chakra-ui/core';

const SignupLoginInput = React.forwardRef(({ ...props }, ref) => {
  const text = 'text';
  return (
    <Input
      py='32px'
      variant='filled'
      rounded='6px'
      type={props.type ? props.type : text}
      name={props.name}
      label={props.label}
      placeholder={props.placeholder}
      autoCapitalize='none'
      ref={ref}
    />
  );
});

export default SignupLoginInput;
