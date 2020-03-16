import React from 'react';
import { Input } from '@chakra-ui/core';

const ReviewFormInput = React.forwardRef(({ ...props }, ref) => {
  const text = 'text';
  return (
    <Input
      mb='4'
      py='32px'
      variant='filled'
      rounded='6px'
      type={props.type ? props.type : text}
      name={props.name}
      placeholder={props.placeholder}
      ref={ref}
    />
  );
});

export default ReviewFormInput;
