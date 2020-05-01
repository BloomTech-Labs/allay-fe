import React from "react";
import { Link } from "react-router-dom";
import ReactGA from "react-ga"; // for google analytics
//redux
import { connect } from "react-redux";
//styles
import {
  Flex,
  Button,
  Text,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  RadioButtonGroup,
  Drawer,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  useDisclosure
} from "@chakra-ui/core";
//import modal
import Blocked from "../Reusable/BlockedModal";

function NavBar({
  history,
  isLoading,
  isBlocked,
  setSearchResults,
  trackFilters,
  setTrackFilters,
  typeFilters,
  setTypeFilters
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  // use to navigate to review form
  const navToReviewForm = () => {
    history.push("/dashboard/add-review");
    ReactGA.event({
      category: "Review",
      action: `Add new review`
    });
  };

  // use to navigate to profile page
  // const navToProfilePage = () => {
  //   history.push("/profile");
  //   ReactGA.event({
  //     category: "Profile",
  //     action: `go to profile`
  //   });
  // };
  const profile_id = localStorage.getItem("userId");
  const logout = () => {
    localStorage.clear("token");
    localStorage.clear("userId");
    history.push("/");
  };

  const handleInputChange = event => {
    event.preventDefault();
    setSearchResults(event.target.value);
  };

  // We could get this fronm the DB if we had endpoints
  const types = [
    { id: 1, criteria: "type", name: "Interview" },
    { id: 2, criteria: "type", name: "Company" }
  ];

  const tracks = [
    { id: 1, criteria: "track", name: "WEB" },
    { id: 2, criteria: "track", name: "UX" },
    { id: 3, criteria: "track", name: "DS" },
    { id: 4, criteria: "track", name: "IOS" },
    { id: 5, criteria: "track", name: "AND" }
  ];

  const handleFilter = e => {
    e.criteria === "type"
      ? typeFilters.includes(e.name)
        ? setTypeFilters(typeFilters.filter(item => item !== e.name))
        : setTypeFilters([...typeFilters, e.name])
      : trackFilters.includes(e.name)
      ? setTrackFilters(trackFilters.filter(item => item !== e.name))
      : setTrackFilters([...trackFilters, e.name]);
    e.selected = !e.selected;
  };

  return (
    <Flex
      maxW="1440px"
      w="100%"
      px="40px"
      background="#FFFFFF"
      top="0"
      position="fixed"
      overflow="hidden"
      zIndex="999"
      direction="column"
    >
      <Flex align="center" justify="space-between" pt="1%">
        <Flex align="center">
          <h1> Allay </h1>
        </Flex>
        <Flex>
          {/* Hamburger Menu */}
          <Box
            ref={btnRef}
            cursor="pointer"
            onClick={onOpen}
            data-cy="hamburger"
          >
            <Image
              size="40px"
              src={require("../../icons/hamburger-blue.svg")}
            />
          </Box>
          <Drawer
            isOpen={isOpen}
            placement="right"
            size="xs"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent bg="#344CD0">
              <DrawerCloseButton
                color="white"
                border="none"
                bg="#344CD0"
                fontSize="2em"
              />
              <DrawerHeader>
                <Flex justifyContent="center" mt="15%">
                  <Image
                    size="150px"
                    src={require("../../icons/user-logout.svg")}
                  />
                </Flex>
                <Flex
                  justifyContent="center"
                  mt="5%"
                  color="white"
                  fontWeight="light"
                  fontSize="1.5em"
                >
                  {localStorage.getItem("username")}
                </Flex>
              </DrawerHeader>
              <Flex
                background="#FFFFFF"
                mt="3%"
                color="#494B5B"
                border="none"
                py="4%"
                cursor="pointer"
                align="center"
                justifyContent="center"
                isLoading={isLoading}
                data-cy="signOut"
              >
                <Link
                  style={{
                    textDecoration: "none",
                    color: "black"
                  }}
                  to={`/profile/${profile_id}`}
                >
                  <Text fontSize="1.8em">Go to Profile</Text>
                </Link>
              </Flex>
              <Flex
                background="#FFFFFF"
                mt="3%"
                color="#494B5B"
                border="none"
                py="4%"
                cursor="pointer"
                align="center"
                justifyContent="center"
                isLoading={isLoading}
                onClick={logout}
                data-cy="signOut"
              >
                <Image
                  size="40px"
                  mr="7%"
                  src={require("../../icons/logout-gray.svg")}
                />
                <Text fontSize="1.8em">Sign out</Text>
              </Flex>
            </DrawerContent>
          </Drawer>
        </Flex>
      </Flex>

      {/* Search Bar */}
      <Flex align="center" justify="space-between" pt="1%">
        <InputGroup w="30%">
          <InputRightElement
            children={<Icon name="search-2" color="#344CD0" />}
          />
          <Input
            width="100%"
            placeholder="Search by company"
            name="searchbar"
            type="text"
            rounded="20px"
            borderColor="rgba(149, 149, 149, 0.2)"
            borderWidth="1px"
            onChange={handleInputChange}
          />
        </InputGroup>
        {isBlocked ? (
          <Blocked />
        ) : (
          <Button
            background="#344CD0"
            color="#FFFFFF"
            rounded="6px"
            border="none"
            size="lg"
            isLoading={isLoading}
            onClick={navToReviewForm}
            data-cy="addReviewButton"
          >
            Add Review
          </Button>
        )}
      </Flex>

      {/* Filtered Search Buttons */}
      <Flex
        align="space-around"
        justify="space-around"
        p="1%"
        width="100%"
        margin="0 auto"
      >
        <RadioButtonGroup
          display="flex"
          align="center"
          justifyContent="center"
          spacing={12}
          isInline
          onChange={handleFilter}
          boxShadow="none"
        >
          {types.map(type => (
            <Button
              key={type.id}
              size="lrg"
              rounded="full"
              border="none"
              _hover={
                typeFilters.includes(type.name)
                  ? "none"
                  : {
                      bg: "#E2E8F0"
                    }
              }
              _focus={{
                boxShadow: "none"
              }}
              borderRadius="30px"
              color={typeFilters.includes(type.name) ? "white" : "black"}
              py="1%"
              px="3%"
              fontWeight="light"
              background={
                typeFilters.includes(type.name) ? "#259BF8" : "#FDFDFF"
              }
              value={type}
            >
              {type.name}
            </Button>
          ))}
          {tracks.map(track => (
            <Button
              key={track.id}
              size="lrg"
              rounded="full"
              border="none"
              _active={{
                bg: "#259BF8 !important",
                color: "white"
              }}
              _hover={
                trackFilters.includes(track.name)
                  ? "none"
                  : {
                      bg: "#E2E8F0"
                    }
              }
              _focus={{
                boxShadow: "none"
              }}
              borderRadius="30px"
              color={trackFilters.includes(track.name) ? "white" : "black"}
              py="1%"
              px="3%"
              fontWeight="light"
              background={
                trackFilters.includes(track.name) ? "#259BF8" : "#FDFDFF"
              }
              value={track}
            >
              {track.name}
            </Button>
          ))}
        </RadioButtonGroup>
      </Flex>
    </Flex>
  );
}

const mapStateToProps = state => {
  return {
    isBlocked: state.auth.isBlocked
  };
};

export default connect(mapStateToProps, null)(NavBar);
