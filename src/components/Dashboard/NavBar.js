import React from 'react';
import ReactGA from 'react-ga'; // for google analytics
//styles
import { Flex, Button, Avatar } from '@chakra-ui/core';

export default function NavBar({ history, isLoading }) {
	// use to navigate to review form
	const navToReviewForm = () => {
    history.push('/dashboard/add-review');
    ReactGA.event({
      category: 'Review',
      action: `Add new review`
    });
	};
	return (
		<Flex maxWidth='1440px' direction='column' wrap='wrap'>
			<Flex
				w='100%'
				px='30px'
				background='#FFFFFF'
				top='0'
				position='fixed'
				overflow='hidden'
				zIndex='999'
				direction='column'
			>
				<Flex align='center' pt='1.5%'>
					<Avatar marginRight='1%' size='lg' src='https://bit.ly/broken-link' />
					<h1> Allay </h1>
				</Flex>
				<Flex align='center' pr='25px' justify='flex-end' padding='1.5% 0'>
					<Button
						variantColor='teal'
						size='sm'
						isLoading={isLoading}
						onClick={navToReviewForm}
					>
						Add A Review
					</Button>
				</Flex>
				<Flex align='center' justify='flex-start'>
					<Flex as='h2' fontSize='32px'>
						{' '}
						Recent Posts{' '}
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
}
