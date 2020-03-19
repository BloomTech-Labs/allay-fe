import React from 'react';
import ReactGA from 'react-ga'; // for google analytics
import CustomAutocomplete from '../InputFields/PlacesAPI.js';
//styles
import {
  Flex,
  Button,
  Avatar,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  RadioButtonGroup
} from '@chakra-ui/core';

export default function NavBar({
  history,
  isLoading,
  setSearchResults,
  trackFilters,
  setTrackFilters
}) {
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

  // temporary object until setup in db
  const tracks = [
    { id: 1, prefix: 'WEB' },
    { id: 2, prefix: 'UX' },
    { id: 3, prefix: 'DS' },
    { id: 4, prefix: 'IOS' },
    { id: 5, prefix: 'AND' }
  ];

  const handleFilter = e => {
    trackFilters.includes(e.id)
      ? setTrackFilters(trackFilters.filter(item => item !== e.id))
      : setTrackFilters([...trackFilters, e.id]);
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
          <Avatar mr='12%' size='xl' src='https://bit.ly/broken-link' />
          <h1> Allay </h1>
          <CustomAutocomplete />
        </Flex>
      </Flex>
      <Flex align='center' justify='space-between' pt='2%'>
        <InputGroup w='40%'>
          <InputRightElement
            children={<Icon name='search-2' color='#344CD0' />}
          />
          <Input
            width='100%'
            placeholder='Search'
            type='text'
            rounded='20px'
            borderColor='rgba(149, 149, 149, 0.2)'
            borderWidth='1px'
            onChange={handleInputChange}
          />
        </InputGroup>
        <RadioButtonGroup onChange={handleFilter} isInline>
          {tracks.map(track => (
            <Button
              size='sm'
              rounded='full'
              variantColor={trackFilters.includes(track.id) ? 'blue' : 'gray'}
              value={track}
            >
              {track.prefix}
            </Button>
          ))}
        </RadioButtonGroup>
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
