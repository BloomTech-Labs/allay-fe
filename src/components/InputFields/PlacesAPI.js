import React, { useRef } from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from 'use-places-autocomplete';

const PlacesAutocomplete = () => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue
  } = usePlacesAutocomplete({
    // requestOptions:components=country&us,
    debounce: 300
  });
  const ref = useRef();

  const handleInput = e => {
    setValue(e.target.value);
  };

  const handleSelect = ({ description }) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter as "false"
    setValue(description, false);

    // Get latitude and longitude via utility functions
    getGeocode({ address: description }).then(results => getLatLng(results[0]));
  };

  const renderSuggestions = () =>
    data.map(suggestion => {
      console.log('************* suggestion **************', { data });
      // const city = suggestion.terms[0]
      // const state = suggestion.terms[1]
      const {
        id,
        structured_formatting: { main_text, secondary_text }
      } = suggestion;

      return (
        <li key={id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <>
      <div ref={ref}>
        <input
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder='Company Headquarters Location'
        />
        {/* We can use the "status" to decide whether we should display the dropdown or not */}
        {status === 'OK' && <ul>{renderSuggestions()}</ul>}
      </div>
    </>
  );
};

export default PlacesAutocomplete;
