import React, { useState } from 'react';
import Script from 'react-load-script';
import { Input } from '@chakra-ui/core';

// To disable any eslint 'google not defined' errors
/*global google */

function CustomAutocomplete({ ...props }, ref) {
  let autocomplete = null;
  let [state, setState] = useState({ myCity: '', myState: '' });
  console.log(state, 'line 11');

  const handleScriptLoad = () => {
    // Declare Options For Autocomplete
    const options = {
      types: ['(cities)'],
      componentRestrictions: { country: 'us' }
    };

    // Initialize Google Autocomplete settings
    let searchValue = document.getElementById(props.id);
    autocomplete = new google.maps.places.Autocomplete(searchValue, options);

    /* Avoid paying for data that you don't need by restricting the set of 
    place fields that are returned to just the address components and formatted
    address.*/
    autocomplete.setFields(['address_components', 'formatted_address']);

    // Fire Event when a suggested name is selected
    autocomplete.addListener('place_changed', handlePlaceSelect);
  };

  function handlePlaceSelect() {
    // Extract City & State From Address Object
    const locationObject = autocomplete.getPlace();
    const location = locationObject.address_components;

    // Set state if address exists
    if (location) {
      setState({
        myCity: location[0].long_name,
        myState: location[2].short_name
      });
    }
  }

  return (
    <>
      <Script
        type='text/javascript'
        url='https://maps.googleapis.com/maps/api/js?key=AIzaSyBkA6IWP37R_cBkFM3qugagg0pJmPGgVUQ&libraries=places'
        onLoad={handleScriptLoad}
      />
      <Input
        id={props.id}
        name={props.name}
        label={props.label}
        placeholder={props.placeholder}
        ref={ref}
        style={{
          width: '100%',
          height: '56px',
          marginBottom: '24px',
          borderRadius: '6px',
          border: 'none',
          backgroundColor: '#F2F6FE'
        }}
      />
    </>
  );
}

const forwardedInput = React.forwardRef(CustomAutocomplete);
export default forwardedInput;
