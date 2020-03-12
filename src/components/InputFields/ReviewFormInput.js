import React from 'react';
import { Input } from '@chakra-ui/core';
// import { useForm } from 'react-hook-form';

const ReviewFormInput = React.forwardRef((props, ref) => {
  console.log('*********** props **********', props);
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
      // ref={ref}
    />
  );
});

export default ReviewFormInput;
