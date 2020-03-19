import React, { useRef } from 'react';
import Autocomplete from 'react-google-autocomplete';

const CustomAutocomplete = () => {
  return (
    <Autocomplete
      style={{
        width: '100%',
        height: '56px',
        marginBottom: '24px',
        borderRadius: '6px',
        border: 'none',
        backgroundColor: '#F2F6FE'
      }}
      onPlaceSelected={place => {
        let city = place.address_components[0].long_name;
        let state = place.address_components[2].short_name;
        console.log(city, state, 'line 14');
      }}
    />
  );
};

export default CustomAutocomplete;
