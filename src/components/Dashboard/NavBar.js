import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga'; // for google analytics
//styles
import {
  Flex,
  Button,
  Avatar,
  Input,
  Radio,
  RadioGroup,
  RadioButtonGroup
} from '@chakra-ui/core';

export default function NavBar({
  history,
  isLoading,
  setSearchResults,
  filters,
  setFilters
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

  const [selectedTracks, setSelectedTracks] = useState(tracks);

  useEffect(() => {
    const newArray = tracks.map(track => ({ ...track, selected: false }));
    setSelectedTracks(newArray);
  }, []);

  const handleFilter = e => {
    filters === e.id ? setFilters() : setFilters(e.id);
    e.selected = !e.selected;
  };

  console.log('filters', filters);

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
          <Avatar mr='12%' size='lg' src='https://bit.ly/broken-link' />
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
        <RadioButtonGroup onChange={handleFilter} isInline>
          {selectedTracks.map(track => (
            <Button
              variantColor={track.selected ? 'blue' : 'gray'}
              value={track}
            >
              {track.prefix}
            </Button>
          ))}
        </RadioButtonGroup>
        <Button
          variantColor='teal'
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
          <Flex as='h2' fontSize='32px' display='none'>
            Recent Posts
          </Flex>
        ) : (
          <Flex as='h2' fontSize='32px'>
            Recent Posts
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
