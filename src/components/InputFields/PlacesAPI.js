import React, { useState, useRef } from 'react';
// import usePlacesAutocomplete from 'use-places-autocomplete';

// const PlacesAutocomplete = () => {
//   const {
//     ready,
//     value,
//     suggestions: { status, data },
//     setValue
//   } = usePlacesAutocomplete({
//     componentRestrictions: { country: 'us', type: 'locality' },
//     debounce: 300
//   });
//   const ref = useRef();

//   const handleInput = e => {
//     setValue(e.target.value);
//   };

//   const handleSelect = ({ description }) => () => {
//     setValue(description, false);
//   };

//   const renderSuggestions = () =>
//     data.map(suggestion => {
//       const {
//         id,
//         structured_formatting: { main_text, secondary_text }
//       } = suggestion;

//       return (
//         <li key={id} onClick={handleSelect(suggestion)}>
//           {console.log(
//             '************ description ***********',
//             suggestion.description
//           )}
//           <strong>{main_text}</strong> <small>{secondary_text}</small>
//         </li>
//       );
//     });

//   return (
//     <>
//       <div ref={ref}>
//         <input
//           value={value}
//           onChange={handleInput}
//           disabled={!ready}
//           placeholder='Company Headquarters'
//         />
//         {/* We can use the "status" to decide whether we should display the dropdown or not */}
//         {status === 'OK' && <ul>{renderSuggestions()}</ul>}
//       </div>
//     </>
//   );
// };

// export default PlacesAutocomplete;
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const usePlacesAutocomplete = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder='Search'
      minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
      listViewDisplayed='auto' // true/false/undefined
      fetchDetails={true}
      renderDescription={row => row.description} // custom description render
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      getDefaultValue={() => ''}
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: 'YOUR API KEY',
        language: 'en', // language of the results
        types: '(cities)', // default: 'geocode'
        country: 'us'
      }}
      styles={{
        textInputContainer: {
          width: '100%'
        },
        description: {
          fontWeight: 'bold'
        },
        predefinedPlacesDescription: {
          color: '#1faadb'
        }
      }}
      // currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
      // currentLocationLabel='Current location'
      nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: 'distance'
        // type: 'cafe'
      }}
      GooglePlacesDetailsQuery={{
        // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
        fields: 'formatted_address'
      }}
      filterReverseGeocodingByTypes={[
        'locality',
        'administrative_area_level_3'
      ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      // predefinedPlaces={[homePlace, workPlace]}
      debounce={300} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      // renderLeftButton={() => <Image source={require('path/custom/left-icon')} />}
      // renderRightButton={() => <Text>Custom text after the input</Text>}
    />
  );
};

export default usePlacesAutocomplete;
