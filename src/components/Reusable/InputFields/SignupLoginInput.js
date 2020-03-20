import React from 'react';
import { Input } from '@chakra-ui/core';

const SignupLoginInput = React.forwardRef(({ ...props }, ref) => {
  return (
    <Input
      w='404px'
      h='58px'
      py='32px'
      variant='outline'
      bgColor='#FDFDFF'
      rounded='3px'
      borderColor='red'
      type={props.type ? props.type : 'text'}
      name={props.name}
      label={props.label}
      placeholder={props.placeholder}
      autoCapitalize='none'
      ref={ref}
    />
  );
});

export default SignupLoginInput;
