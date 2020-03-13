import React from 'react';
import ReactGA from 'react-ga'; // for google analytics
//styles
import { Flex, Button, Avatar, Input } from '@chakra-ui/core';

export default function NavBar({ history, isLoading, setSearchResults }) {
  // use to navigate to review form
  const navToReviewForm = () => {
    history.push('/dashboard/add-review');
    ReactGA.event({
      category: 'Review',
      action: `Add new review`
    });
  };

  const handleInputChange = event => {
    event.preventDefault();
    setSearchResults(event.target.value);
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
          <Avatar mr='12%' size='xl' src='https://bit.ly/broken-link' />
          <h1> Allay </h1>
        </Flex>
      </Flex>
      <Flex align='center' justify='space-between' pt='2%'>
        <Input
          placeholder='Search'
          type='text'
          rounded='20px'
          borderColor='#F2F6FE'
          borderWidth='2px'
          width='35%'
          onChange={handleInputChange}
        />
        <Button
          // variantColor='teal'
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
      {/* <Flex align='center' pr='25px' justify='flex-end' padding='1.5% 0'>
				<Button
            variantColor='teal'
            rounded='6px'
            border='none'
            size='lg'
            isLoading={isLoading}
            onClick={navToReviewForm}
          >
            Add A Review
          </Button>
			</Flex> */}
      <Flex align='center' justify='flex-start'>
        {window.location.href.includes('dashboard/') ? (
          <Flex as='h2' my='1%' display='none'>
            Recent Posts
          </Flex>
        ) : (
          <Flex as='h2' my='1%'>
            Recent Posts
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
