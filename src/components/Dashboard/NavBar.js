import React, { useRef } from 'react';
import ReactGA from 'react-ga'; // for google analytics
//styles
import {
	Flex,
	Button,
	Avatar,
	Image,
	Input,
	InputGroup,
	InputRightElement,
	Icon,
	RadioButtonGroup,
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Box,
	useDisclosure
} from '@chakra-ui/core';

export default function NavBar({
	history,
	isLoading,
	setSearchResults,
	trackFilters,
	setTrackFilters,
	typeFilters,
	setTypeFilters
}) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = React.useRef();

	// use to navigate to review form
	const navToReviewForm = () => {
		history.push('/dashboard/add-review');
		ReactGA.event({
			category: 'Review',
			action: `Add new review`
		});
	};

	const logout = () => {
		localStorage.clear('token');
		localStorage.clear('userId');
		history.push('/');
	};

	const handleInputChange = event => {
		event.preventDefault();
		setSearchResults(event.target.value);
	};

	// We could get this fronm the DB if we had endpoints
	const types = [
		{ id: 1, name: 'Interview' },
		{ id: 2, name: 'Company' }
	];

	const tracks = [
		{ id: 1, name: 'WEB' },
		{ id: 2, name: 'UX' },
		{ id: 3, name: 'DS' },
		{ id: 4, name: 'IOS' },
		{ id: 5, name: 'AND' }
	];

	const handleTracks = e => {
		trackFilters.includes(e.name)
			? setTrackFilters(trackFilters.filter(item => item !== e.name))
			: setTrackFilters([...trackFilters, e.name]);
		e.selected = !e.selected;
	};

	const handleTypes = e => {
		typeFilters.includes(e.name)
			? setTypeFilters(typeFilters.filter(item => item !== e.name))
			: setTypeFilters([...typeFilters, e.name]);
		e.selected = !e.selected;
	};

	return (
		<Flex
			maxW='1440px'
			w='100%'
			px='40px'
			background='#FFFFFF'
			top='0'
			position='fixed'
			overflow='hidden'
			zIndex='999'
			direction='column'
		>
			<Flex align='center' justify='space-between' pt='2%'>
				<Flex align='center'>
					<h1> Allay </h1>
				</Flex>
				<Flex>

					{/* Hamburger Menu */}
					<Box ref={btnRef} cursor='pointer' onClick={onOpen}>
						<Image size='70px' src={require('../../icons/hamburger-blue.png')} />
					</Box>
					<Drawer
						isOpen={isOpen}
						placement="right"
						onClose={onClose}
						finalFocusRef={btnRef}
					>
						<DrawerOverlay />
						<DrawerContent>
							<DrawerCloseButton />
							<DrawerHeader>
								<Avatar mr='12%' size='md' src='https://bit.ly/broken-link' />
							</DrawerHeader>

							<DrawerBody>
								<Button
									background='#344CD0'
									color='#FFFFFF'
									rounded='6px'
									border='none'
									size='lg'
									isLoading={isLoading}
									onClick={logout}
								>
									Logout
								</Button>
							</DrawerBody>

							<DrawerFooter>
								<Button variant="outline" mr={3} onClick={onClose}>
									Cancel
            </Button>
								<Button color="blue">Save</Button>
							</DrawerFooter>
						</DrawerContent>
					</Drawer>
				</Flex>
			</Flex>

			{/* Search Bar */}
			<Flex align='center' justify='space-between' pt='2%'>
				<InputGroup w='40%'>
					<InputRightElement
						children={<Icon name='search-2' color='#344CD0' />}
					/>
					<Input
						width='100%'
						placeholder='Search by company'
						type='text'
						rounded='20px'
						borderColor='rgba(149, 149, 149, 0.2)'
						borderWidth='1px'
						onChange={handleInputChange}
					/>
				</InputGroup>
				<Button
					background='#344CD0'
					color='#FFFFFF'
					rounded='6px'
					border='none'
					size='lg'
					isLoading={isLoading}
					onClick={navToReviewForm}
				>
					Add Review
				</Button>
			</Flex>

			<Flex align='center' justify='space-around' pt='2%'>
				<RadioButtonGroup
					align='center'
					justify='space-between'
					width='80%'
					onChange={handleTypes}
				>
					{types.map(type => (
						<Button
							key={type.id}
							size='sm'
							rounded='full'
							marginBottom='10px'
							variantColor={typeFilters.includes(type.name) ? 'blue' : 'gray'}
							value={type}
						>
							{type.name}
						</Button>
					))}
				</RadioButtonGroup>
				<RadioButtonGroup
					align='center'
					justify='space-between'
					width='80%'
					onChange={handleTracks}
				>
					{tracks.map(track => (
						<Button
							key={track.id}
							size='sm'
							rounded='full'
							marginBottom='10px'
							variantColor={trackFilters.includes(track.name) ? 'blue' : 'gray'}
							value={track}
						>
							{track.name}
						</Button>
					))}
				</RadioButtonGroup>
			</Flex>
			<Flex align='center' justify='flex-start'>
				{window.location.href.includes('dashboard/') ? (
					<Flex as='h2' my='1%' display='none'>
						Recent Posts
					</Flex>
				) : (
						<Flex as='h2' mt='1%'>
							Recent Posts
						</Flex>
					)}
			</Flex>
		</Flex>
	);
}
