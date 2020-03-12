import React from 'react';
import { Input } from '@chakra-ui/core';

function ReviewFormInput(props) {
  // console.log('*********** props **********', props.placeholder);
  return (
    <Input
      type='text'
      variant='filled'
      py='32px'
      mb='1rem'
      rounded='6px'
      name={props.name}
      label={props.label}
      placeholder={props.placeholder}
    />
  );
}

export default ReviewFormInput;
