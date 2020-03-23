import React from 'react';
import { Progress } from '@chakra-ui/core';

const ProgressBar = React.forwardRef(({ ...props }, ref) => {
  return (
    <Progress
      color='whiteAlpha'
      background='#344CD0'
      isAnimated
      hasStripe
      rounded='6px'
      border='1px solid #FFFFFF'
      value={props.value}
      // ref={ref}
    />
  );
});

export default ProgressBar;
