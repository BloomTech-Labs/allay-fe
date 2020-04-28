import React from 'react';
import { Input } from '@chakra-ui/core';

const SignupLoginInput = React.forwardRef(({ ...props }, ref) => {
	return (
		<Input
			w={props.w ? props.w : '404px'}
			h='58px'
			py='32px'
			rounded='2px'
			mb={props.mb}
			mr={props.mr ? props.mr : '0'}
			variant='outline'
			bgColor='#FDFDFF'
			focusBorderColor='#344CD0'
			borderColor='#EAF0FE'
			color='#17171B'
			_hover={{ borderColor: '#9194A8' }}
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
