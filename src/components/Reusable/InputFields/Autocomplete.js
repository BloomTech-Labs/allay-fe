import React, { useState, useEffect } from "react";
import Script from "react-load-script";
import { Input } from "@chakra-ui/core";

// To disable any eslint 'google not defined' errors
/*global google */

function CustomAutocomplete({ ...props }, ref) {
  let autocomplete = null;
  let [state, setState] = useState({ myCity: "", myState: "" });

  useEffect(() => {
    props.stateHelper(state);
  }, [state, props]);

  const handleScriptLoad = () => {
    // Declare Options For Autocomplete
    const options = {
      types: ["(cities)"],
      componentRestrictions: { country: "us" },
    };

    // Initialize Google Autocomplete settings
    let searchValue = document.getElementById(props.id);
    autocomplete = new google.maps.places.Autocomplete(searchValue, options);

    /* Avoid paying for data that you don't need by restricting the set of 
    place fields that are returned to just the address components and formatted
    address.*/
    autocomplete.setFields(["address_components", "formatted_address"]);

    // Fire Event when a suggested name is selected
    autocomplete.addListener("place_changed", handlePlaceSelect);
  };
  function handlePlaceSelect() {
    // Extract City & State From Address Object
    const locationObject = autocomplete.getPlace();
    const location = locationObject.address_components;
    const locationCity = location[0].long_name;
    if (location[2].short_name.includes("US")) {
      var locationState = location[1].short_name;
    } else {
      // eslint-disable-next-line no-redeclare
      var locationState = location[2].short_name.includes("County")
        ? location[3].short_name
        : location[2].short_name;
    }

    // Set state if address exists
    if (locationObject) {
      setState({
        myCity: locationCity,
        myState: locationState,
      });
    }
  }

  return (
    <>
      <Script
        type="text/javascript"
        url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBkA6IWP37R_cBkFM3qugagg0pJmPGgVUQ&libraries=places"
        onLoad={handleScriptLoad}
      />
      <Input
        w={props.w}
        h={props.h ? props.h : "56px"}
        mb={props.mb}
        id={props.id}
        name={props.name}
        label={props.label}
        placeholder={props.placeholder}
        variant={props.variant ? props.variant : "filled"}
        bgColor={props.bgColor}
        focusBorderColor={props.focusBorderColor}
        borderColor={props.borderColor}
        color={props.color}
        _hover={props._hover}
        _placeholder={props._placeholder}
        rounded={props.rounded ? props.rounded : "6px"}
        ref={ref}
        onChange={props.onChange}
      />
    </>
  );
}

const forwardedInput = React.forwardRef(CustomAutocomplete);
export default forwardedInput;
