import React, { useState } from 'react';
import Autocomplete from 'react-google-autocomplete';

const CustomAutocomplete = () => {
  return (
    <Autocomplete
      style={{ width: '90%' }}
      onPlaceSelected={place => {
        let city = place.address_components[0].long_name;
        let state = place.address_components[2].short_name;
        console.log(city, state);
      }}
    />
  );
};

export default CustomAutocomplete;
