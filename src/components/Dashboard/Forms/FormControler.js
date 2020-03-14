import React from 'react';
//styles
import {
	Flex,
	Avatar,
	Tabs,
	TabList,
	Tab,
	TabPanel,
	TabPanels
} from '@chakra-ui/core';
import InterviewForm from './InterviewForm';

const FormControler = () => {
	return (
		// main container
		<Flex background='#E5E5E5' w='100%' minH='100vh' justify='center'>
			{/* max size */}
			<Flex maxW='1440px' w='100%'>
				{/* form container */}
				<Flex w='70%' bg='white' flexDir='column' px='2%' pt='5%'>
					<Tabs variant='unstyled'>
						{/* Start of messenger  */}
						<Flex
							align='center'
							p='1%'
							w='416px'
							mb='2%'
							bg='#F2F6FE'
							rounded='20px'
						>
							<p>
								Hello there! Thank you for choosing to post. Your reviews help
								Lambda students and alumni tremendously.
							</p>
						</Flex>
						<Flex
							align='center'
							p='1%'
							w='416px'
							mb='8%'
							bg='#F2F6FE'
							rounded='20px'
						>
							<p>What do you want to post about?</p>
						</Flex>
						{/* company container  */}
						<Flex w='100%' justify='flex-end'>
							{/* company box */}

							<Flex
								w='459px'
								h='234px'
								mb='8%'
								px='6'
								py='10'
								border='1px solid #BBBDC6'
								rounded='6px'
								flexDir='column'
							>
								<TabList>
									<Tab _selected={{ color: 'white', bg: 'blue.500' }}>
										Tab 1
									</Tab>
									<Tab _selected={{ color: 'white', bg: 'green.400' }}>
										Tab 2
									</Tab>
								</TabList>
							</Flex>
							{/* avatar */}
							<Flex h='234px' align='flex-end' ml='1%'>
								<Avatar size='md' src='https://bit.ly/broken-link' />
							</Flex>
						</Flex>
						<TabPanels>
							<TabPanel>
								<InterviewForm />
							</TabPanel>
							<TabPanel>
								<p>two!</p>
							</TabPanel>
						</TabPanels>
					</Tabs>
				</Flex>

				{/* blank space container */}
				<Flex w='30%' />
			</Flex>
		</Flex>
	);
};

export default FormControler;
