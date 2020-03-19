import React from 'react';
import { Input } from '@chakra-ui/core';

const ReviewFormInput = React.forwardRef(({ ...props }, ref) => {
	return (
		<Input
			h='56px'
			mb='6'
			mr={props.mr}
			w={props.w}
			variant='filled'
			rounded='6px'
			label={props.label}
			list={props.list}
			type={props.type ? props.type : 'text'}
			name={props.name}
			placeholder={props.placeholder}
			ref={ref}
			autoCapitalize='none'
			min={props.min}
			max={props.max}
			onChange={props.onChange}
			onKeyUp={props.onKeyUp}
		/>
	);
});

export default ReviewFormInput;
