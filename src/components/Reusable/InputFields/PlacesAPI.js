import React, { useState } from 'react';
import Autocomplete from 'react-google-autocomplete';
const CustomAutocomplete = () => {
  // let [city, setCity] = useState('');
  // let [state, setState] = useState('');
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
        city = place.address_components[0].long_name;
        state = place.address_components[2].short_name;
        console.log(city, state, 'line 14');
        setCity = { city };
        setState = { state };
      }}
    />
  );
};

export default CustomAutocomplete;
