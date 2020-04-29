import React, { useEffect, useState } from 'react';
//components
import SignupLoginInput from '../Reusable/InputFields/SignupLoginInput.js';
import CustomAutocomplete from '../../components/Reusable/InputFields/Autocomplete';
import { states } from '../../components/Reusable/statesData';
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

const SignupAdditional = ({
	register,
	errors,
	location,
	setNewLocation,
	stateHelper,
}) => {
	//state
	const [graduated, setGraduated] = useState(false);
	const isGraduated = () => {
		setGraduated(true);
	};
	const notGraduated = () => {
		setGraduated(false);
	};
	//location helpers
	useEffect(() => {
		if (location.myState) {
			const stateId = states.filter((i) =>
				i.state_name.toLowerCase().startsWith(location.myState.toLowerCase())
			);
			setNewLocation({ ...location, myState: stateId[0].id });
		}
	}, [location]);

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

			<Flex wrap='wrap' w='653px' mx='auto' mb='20px' justify='space-between'>
				<FormLabel fontFamily='Muli'>
					Have you graduated from Lambda yet?
				</FormLabel>
				<RadioGroup isInline spacing={4} name='graduated' label='graduated'>
					<Radio key='radio1' value='1' onClick={isGraduated}>
						Yes
					</Radio>
					<Radio key='radio2' value='2' onClick={notGraduated}>
						No
					</Radio>
				</RadioGroup>
			</Flex>

			{graduated ? (
				<Flex
					wrap='wrap'
					w='653px'
					mx='auto'
					mb='30px'
					justify='space-between'
					align='center'
				>
					<FormLabel fontFamily='Muli'>When did you graduate?</FormLabel>
					<Flex align='center' alignContent='center'>
						<FormControl>
							<Select
								mr='17px'
								h='68px'
								py='16px'
								w='159px'
								rounded='2px'
								variant='outline'
								backgroundColor='#FDFDFF'
								focusBorderColor='#344CD0'
								borderColor='#EAF0FE'
								color='#BBBDC6'
								_focus={{ color: '#17171B' }}
								_hover={{ borderColor: '#BBBDC6' }}
								name='gradMonth'
								label='gradMonth'
								// placeholder='Select Your Lambda Track'
							>
								<option fontFamily='Muli' value=''>
									Month
								</option>
								<option fontFamily='Muli' value='01'>
									01
								</option>
								<option fontFamily='Muli' value={2}>
									02
								</option>
								<option fontFamily='Muli' value={3}>
									03
								</option>
								<option fontFamily='Muli' value={4}>
									04
								</option>
								<option fontFamily='Muli' value={5}>
									05
								</option>
								<option fontFamily='Muli' value={5}>
									06
								</option>
								<option fontFamily='Muli' value={5}>
									07
								</option>
								<option fontFamily='Muli' value={5}>
									08
								</option>
								<option fontFamily='Muli' value={5}>
									09
								</option>
								<option fontFamily='Muli' value={5}>
									10
								</option>
								<option fontFamily='Muli' value={5}>
									11
								</option>
								<option fontFamily='Muli' value={5}>
									12
								</option>
							</Select>
						</FormControl>
						<FormControl>
							<Select
								h='68px'
								py='16px'
								w='159px'
								rounded='2px'
								variant='outline'
								backgroundColor='#FDFDFF'
								focusBorderColor='#344CD0'
								borderColor='#EAF0FE'
								color='#BBBDC6'
								_focus={{ color: '#17171B' }}
								_hover={{ borderColor: '#BBBDC6' }}
								name='track_id'
								label='track_id'
							>
								<option fontFamily='Muli' value=''>
									Year
								</option>
							</Select>
						</FormControl>
					</Flex>
				</Flex>
			) : null}
		</>
	);
};
export default SignupAdditional;
