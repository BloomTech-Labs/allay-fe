import React, { useState, useRef } from 'react';
import { Input } from '@chakra-ui/core';

const OnboardingInput = () => {
  return (
    <Input
      mb="1rem"
      py="32px"
      variant="filled"
      borderRadius="none"
      type="text"
    />
  );
};

export default OnboardingInput;
