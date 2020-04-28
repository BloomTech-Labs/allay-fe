import React from 'react';
//components
import SignupLoginInput from '../Reusable/InputFields/SignupLoginInput.js';
import userImage from '../../icons/user.png';
//styles
import {
	Image,
	Button,
	FormControl,
	FormLabel,
	FormHelperText,
	FormErrorMessage,
	Flex,
	Text,
	InputGroup,
	InputRightElement,
	Select,
	Input,
} from '@chakra-ui/core';

const SignupAdditional = ({ register }) => {
	return (
		<>
			<Flex
				wrap='wrap'
				w='653px'
				mx='auto'
				mb='61px'
				justify='flex-start'
				fontSize='16px'
			>
				<Text fontFamily='Muli'>
					The information below will be visible on your profile page by others
				</Text>
			</Flex>

			<Flex wrap='wrap' w='653px' mx='auto' mb='55px' justify='flex-start'>
				<Image size='100px' src={require('../../icons/user.png')} />
				<Input
					mb='30px'
					mr='17px'
					h='68px'
					py='16px'
					w='318px'
					type='file'
					rounded='2px'
					variant='outline'
					backgroundColor='#FDFDFF'
					focusBorderColor='#344CD0'
					borderColor='#EAF0FE'
					color='#BBBDC6'
					_focus={{ color: '#17171B' }}
					_hover={{ borderColor: '#BBBDC6' }}
					name='profileImage'
					label='profileImage'
					ref={register}
				/>
			</Flex>
		</>
	);
};
export default SignupAdditional;
