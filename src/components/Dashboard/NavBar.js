import React, { useEffect, useState } from 'react'
import ReactGA from 'react-ga' // for google analytics
//redux
import { connect } from 'react-redux'
//styles
import {
  Flex,
  Button,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  useDisclosure,
  Menu,
  MenuButton,
  MenuOptionGroup,
  MenuItemOption,
  MenuList,
  MenuItem,
} from '@chakra-ui/core'
//import modal
import Blocked from '../Reusable/BlockedModal'
//import user
import { getUser } from '../../state/actions/userActions'

function NavBar({
  history,
  isLoading,
  isBlocked,
  setSearchResults,
  trackFilters,
  setTrackFilters,
  typeFilters,
  setTypeFilters,
  getUser,
  userData,
}) {
  const userId = window.localStorage.getItem('userId')

  // use to navigate to review form
  const navToReviewForm = () => {
    history.push('/dashboard/add-review')
    ReactGA.event({
      category: 'Review',
      action: `Add new review`,
    })
  }

  const profile_id = localStorage.getItem('userId')
  const logout = () => {
    localStorage.clear('token')
    localStorage.clear('userId')
    history.push('/')
  }

  const handleInputChange = (event) => {
    event.preventDefault()
    setSearchResults(event.target.value)
  }

  // We could get this fronm the DB if we had endpoints
  const types = [
    { id: 1, criteria: 'type', name: 'Interview' },
    { id: 2, criteria: 'type', name: 'Company' },
  ]

  const tracks = [
    { id: 1, criteria: 'track', name: 'WEB' },
    { id: 2, criteria: 'track', name: 'UX' },
    { id: 3, criteria: 'track', name: 'DS' },
    { id: 4, criteria: 'track', name: 'IOS' },
    { id: 5, criteria: 'track', name: 'AND' },
  ]

  const handleType = (name) => {
    if (typeFilters.includes(name)) {
      setTypeFilters(typeFilters.filter((item) => item !== name))
    } else {
      setTypeFilters(typeFilters.filter((item) => item !== name))
      setTypeFilters([...typeFilters, name])
    }
  }

  const handleTrack = (name) => {
    if (trackFilters.includes(name)) {
      setTrackFilters(trackFilters.filter((item) => item !== name))
    } else {
      setTrackFilters(trackFilters.filter((item) => item !== name))
      setTrackFilters([...trackFilters, name])
    }
  }

  useEffect(() => {
    getUser(userId)
  }, [])

  return (
    <Flex
      maxW="1440px"
      w="100%"
      px="40px"
      background="#FFFFFF"
      top="0"
      position="fixed"
      zIndex="999"
      direction="column"
    >
      <Flex align="center" justify="space-between" pt="1%" mb="4%" h="100px">
        <Flex color="#344CD0" align="center">
          <h1>Allay</h1>
        </Flex>

        {/* Search bar*/}
        <InputGroup w="40%">
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

        {/* Profile Icon and user menu*/}
        <Flex>
          <Menu position="absolute" height="226px">
            <MenuButton
              as={Image}
              size="50px"
              style={{
                opacity: '0.6',
                borderRadius: userData.profile_image === 'h' ? 'none' : '50%',
              }}
              src={
                userData.profile_image === 'h'
                  ? require('../../icons/user.svg')
                  : userData.profile_image
              }
            />
            <MenuList>
              <MenuItem
                border="none"
                backgroundColor="#FFF"
                data-cy="signOut"
                onClick={() => history.push(`/profile/${profile_id}`)}
              >
                Profile
              </MenuItem>
              <MenuItem
                border="none"
                backgroundColor="#FFF"
                data-cy="signOut"
                onClick={() => history.push(`/profile/${profile_id}/edit`)}
              >
                Account settings
              </MenuItem>
              <MenuItem
                border="none"
                backgroundColor="#FFF"
                onClick={logout}
                data-cy="signOut"
              >
                Log out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      <Flex>
        {/* Filtered Search Buttons */}
        <Flex
          align="space-around"
          justify="space-around"
          p="1%"
          width="100%"
          margin="0 auto"
        >
          <Heading as="h1" size="xl">
            Reviews
          </Heading>
          <Menu margin="3%" closeOnSelect={false}>
            <MenuButton
              w="309px"
              h="55px"
              bg="#FFFFFF"
              border="2px solid #EAF0FE"
              rounded="50px"
              fontFamily="Muli"
              fontSize="20px"
              fontWeight="bold"
            >
              Filter by review type
              <Icon name="triangle-down" color="#344CD0" />
            </MenuButton>
            <MenuList minWidth="240px">
              {types.map((type) => (
                <MenuOptionGroup type="checkbox">
                  <MenuItemOption
                    border="none"
                    backgroundColor="#FFF"
                    onClick={() => handleType(type.name)}
                  >
                    {type.name}
                  </MenuItemOption>
                </MenuOptionGroup>
              ))}
            </MenuList>
          </Menu>
          <Menu closeOnSelect={false}>
            <MenuButton
              w="240px"
              h="55px"
              bg="#FFFFFF"
              border="2px solid #EAF0FE"
              rounded="50px"
              fontFamily="Muli"
              fontSize="20px"
              fontWeight="bold"
            >
              Filter by field
              <Icon name="triangle-down" color="#344CD0" />
            </MenuButton>
            <MenuList minWidth="240px">
              {tracks.map((track) => (
                <MenuOptionGroup type="checkbox">
                  <MenuItemOption
                    border="none"
                    backgroundColor="#FFF"
                    onClick={() => handleTrack(track.name)}
                  >
                    {track.name}
                  </MenuItemOption>
                </MenuOptionGroup>
              ))}
            </MenuList>
          </Menu>
        </Flex>
        <Flex align="center" justify="space-between">
          {isBlocked ? (
            <Blocked />
          ) : (
            <Button
              margin="5%"
              background="#344CD0"
              color="#FFFFFF"
              rounded="35px"
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
      </Flex>
    </Flex>
  )
}

const mapStateToProps = (state) => {
  return {
    isBlocked: state.auth.isBlocked,
    userData: state.user.userData,
  }
}

export default connect(mapStateToProps, { getUser })(NavBar)
