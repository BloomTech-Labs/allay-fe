import React from 'react';
//styles
import { Flex, Button, Avatar } from '@chakra-ui/core';

export default function NavBar({ history, isLoading }) {
  // use to navigate to review form
  const navToReviewForm = () => {
    history.push('/dashboard/add-review');
  };
  return (
    // <Flex w='1440px' direction='column' wrap='wrap'>
    <Flex
      w='1440px'
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
          <Avatar mr='12%' size='lg' src='https://bit.ly/broken-link' />
          <h1> Allay </h1>
        </Flex>

        <Flex align='center'>
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
        </Flex>
      </Flex>
      <Flex align='center' pr='25px' justify='flex-end' padding='1.5% 0'>
        {/* <Button
            variantColor='teal'
            rounded='6px'
            border='none'
            size='lg'
            isLoading={isLoading}
            onClick={navToReviewForm}
          >
            Add A Review
          </Button> */}
      </Flex>
      <Flex align='center' justify='flex-start'>
        <Flex as='h2' fontSize='32px'>
          {' '}
          Recent Posts{' '}
        </Flex>
      </Flex>
    </Flex>
    // </Flex>
  );
}
