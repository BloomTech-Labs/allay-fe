import React from 'react';
import { Spinner } from '@chakra-ui/core';

const CustomSpinner = () => {
  return (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />
  );
};

export default CustomSpinner;
