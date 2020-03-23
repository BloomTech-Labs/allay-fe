import React from 'react';
import { Input } from '@chakra-ui/core';

const EditReviewInput = React.forwardRef(({ ...props }, ref) => {
  return (
    <Input
      mb='4'
      h='58px'
      py='32px'
      borderColor='#ECF1FE'
      rounded='3px'
      name={props.name}
      type={props.type ? props.type : 'text'}
      placeholder={props.placeholder}
      autoCapitalize='none'
      ref={ref}
      value={props.value}
      onChange={props.onChange}
    /> 
  );
});

export default EditReviewInput;