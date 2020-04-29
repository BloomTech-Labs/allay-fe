import React, { useEffect } from 'react';
//components
import SignupLoginInput from '../Reusable/InputFields/SignupLoginInput.js';
import CustomAutocomplete from '../../components/Reusable/InputFields/Autocomplete';
import { states } from '../../components/Reusable/statesData';
import DatePicker from 'react-datepicker';
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
	RadioGroup,
	Radio,
	InputGroup,
	InputRightElement,
	Select,
	Input,
} from '@chakra-ui/core';
import 'react-datepicker/dist/react-datepicker.css';

const SignupAdditional = ({
	register,
	errors,
	location,
	setNewLocation,
	stateHelper,
	startDate,
	setStartDate,
}) => {
	//location helpers
	useEffect(() => {
		if (location.myState) {
			const stateId = states.filter((i) =>
				i.state_name.toLowerCase().startsWith(location.myState.toLowerCase())
			);
			setNewLocation({ ...location, myState: stateId[0].id });
		}
		console.log('date', startDate);
	}, [location, startDate]);

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
				<Text>Cloudinary upload here</Text>
			</Flex>

			<Flex wrap='wrap' w='653' justify='center'>
				<FormControl>
					<FormLabel fontFamily='Muli'>Location</FormLabel>
					<CustomAutocomplete
						stateHelper={stateHelper}
						w='653px'
						h='58px'
						mb='30px'
						rounded='2px'
						variant='outline'
						bgColor='#FDFDFF'
						focusBorderColor='#344CD0'
						borderColor='#EAF0FE'
						color='#17171B'
						_hover={{ borderColor: '#BBBDC6' }}
						_placeholder={{ color: '#BBBDC6' }}
						id='location'
						name='location'
						label='location'
						placeholder='e.g. Los Angeles, CA'
					/>
				</FormControl>
			</Flex>

			<Flex wrap='wrap' w='653px' mx='auto' justify='space-between'>
				<FormLabel fontFamily='Muli'>
					Have you graduated from Lambda yet?
				</FormLabel>
				<RadioGroup isInline spacing={4} name='graduated' label='graduated'>
					<Radio key='1' value='1'>
						Yes
					</Radio>
					<Radio key='2' value='2'>
						No
					</Radio>
				</RadioGroup>
			</Flex>

			<Flex wrap='wrap' w='653px' mx='auto' mb='200px' justify='center'>
				<FormLabel fontFamily='Muli'>When did you graduate?</FormLabel>
				<DatePicker
					selected={startDate}
					onChange={(date) => setStartDate(date)}
					dateFormat='MM/yyyy'
					showMonthYearPicker
				/>
			</Flex>
		</>
	);
};
export default SignupAdditional;
