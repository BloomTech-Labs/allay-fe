// import React from 'react';
// import { Input } from '@chakra-ui/core';

// function ReviewFormInput({ ...props }, ref) {
//   return (
//     <Input
//       mb='1rem'
//       py='32px'
//       variant='filled'
//       rounded='6px'
//       type='text'
//       name={props.name}
//       label={props.label}
//       placeholder={props.placeholder}
//       ref={ref}
//     />
//   );
// }

// const forwardedInput = React.forwardRef(ReviewFormInput);
// export default forwardedInput;

import React from 'react';
import { Input } from '@chakra-ui/core';

const ReviewFormInput = React.forwardRef(({ ...props }, ref) => {
  return (
    <Input
      mb='4'
      py='32px'
      variant='filled'
      rounded='6px'
      type='text'
      type={props.type}
      name={props.name}
      placeholder={props.placeholder}
      ref={ref}
    />
  );
});

export default ReviewFormInput;
