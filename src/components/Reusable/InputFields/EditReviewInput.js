import React from 'react';
import { Input } from '@chakra-ui/core';

const EditReviewInput = React.forwardRef(({ ...props }, ref) => {
  return (
    <Input
      w={props.w ? props.w : '100%'}
      mb={props.mb ? props.mb : '4'}
      h='58px'
      py='32px'
      pl={props.pl ? props.pl : '2%'}
      rounded='3px'
      variant='outline'
      bgColor='#FDFDFF'
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
