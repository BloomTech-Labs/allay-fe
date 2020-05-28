import React, { useEffect, useState } from 'react'
import ReactGA from 'react-ga' // for google analytics
//redux
import { connect } from 'react-redux'
//styles
import {
  Spinner,
  Box,
  Flex,
  Button,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  Badge,
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

  // image helper
  const [imageTimeout, setImageTimeout] = useState(true)
  useEffect(() => {
    setTimeout(function () {
      setImageTimeout(false)
    }, 1500)
  }, [])

  const logout = () => {
    localStorage.clear('token')
    localStorage.clear('userId')
    history.push('/')
  }

  const handleInputChange = (event) => {
    event.preventDefault()
    setSearchResults(event.target.value.toLowerCase())
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
    { id: 4, criteria: 'track', name: 'iOS' },
    { id: 5, criteria: 'track', name: 'Android' },
  ]

  //track badge colors and background color picker
  const trackFontColor = (trackName) => {
    switch (trackName) {
      case 'DS':
        return '#35694F'
        break
      case 'WEB':
        return '#474EA7'
        break
      case 'iOS' || 'IOS':
        return '#8E3D19'
        break
      case 'Android':
        return '#4B3569'
        break
      case 'UX':
        return '#9F3A5A'
        break
      default:
        return
    }
  }
  const trackColorPicker = (trackName) => {
    switch (trackName) {
      case 'DS':
        return '#D3F2CD'
        break
      case 'WEB':
        return '#DBEBFD'
        break
      case 'iOS' || 'IOS':
        return '#F4E6BE'
        break
      case 'Android':
        return '#E9D9FF'
        break
      case 'UX':
        return '#F9E3DE'
        break
      default:
        return
    }
  }
  ///
  //// handle type filter and state for the badge / show
  const [type, setType] = useState([])
  const handleType = (name) => {
    if (typeFilters.includes(name)) {
      setTypeFilters(typeFilters.filter((item) => item !== name))
      setType(type.filter((x) => x !== name))
    } else {
      setTypeFilters(typeFilters.filter((item) => item !== name))
      setTypeFilters([...typeFilters, name])
      setType([...type, name])
    }
  }

  const typeBadge = (name) => {
    return name.map((typeName, index) => (
      <Badge
        key={`ReviewBadge-${index}`}
        backgroundColor="#E2E2E2"
        color="#131C4D"
        fontFamily="Muli"
        fontWeight="normal"
        p="5px 15px"
        m="5px"
        style={{ borderRadius: '50px' }}
        variantColor="green"
      >
        {typeName}
      </Badge>
    ))
  }
  //// handle track filter and state for the badge color / show

  const [track, setTrack] = useState([])
  const handleTrack = (name) => {
    if (trackFilters.includes(name)) {
      setTrackFilters(trackFilters.filter((item) => item !== name))
      setTrack(track.filter((x) => x !== name))
    } else {
      setTrackFilters(trackFilters.filter((item) => item !== name))
      setTrackFilters([...trackFilters, name])
      setTrack([...track, name])
    }
  }

  const trackBadge = (name) => {
    return name
      .map((typeName, index) => {
        if (index < 2) {
          return (
            <Badge
              key={`TrackBadge-${index}`}
              p="5px 15px"
              m="2px"
              fontFamily="Muli"
              fontWeight="normal"
              backgroundColor={trackColorPicker(typeName)}
              color={trackFontColor(typeName)}
              style={{ borderRadius: '50px' }}
              variantColor="green"
            >
              {typeName}
            </Badge>
          )
        } else {
          return (
            <Badge
              key={`TrackBadge-${index}`}
              backgroundColor="#E2E2E2"
              color="#131C4D"
              fontFamily="Muli"
              fontWeight="normal"
              p="5px 15px"
              m="2px"
              style={{ borderRadius: '50px' }}
              variantColor="green"
            >
              . . .
            </Badge>
          )
        }
      })
      .filter((item, index) => index < 3)
  }

  useEffect(() => {
    getUser(userId)
  }, [getUser, userId])

  return (
    <Flex
      maxW="1440px"
      w="100%"
      background="#FFFFFF"
      top="0"
      position="fixed"
      zIndex="999"
      direction="column"
    >
      <Flex
        align="center"
        justify="space-between"
        py="28px"
        mb="4%"
        h="100px"
        borderBottom="1px solid #EAF0FE"
      >
        <Flex color="#344CD0" align="center" pl="40px">
          <h1 fontFamily="Poppins" fontWeight="600" fontSize="32px">
            Allay
          </h1>
        </Flex>

        {/* Search bar*/}
        <InputGroup w="40%">
          <InputRightElement>
            <Icon name="search-2" color="#344CD0" />
          </InputRightElement>
          <Input
            width="100%"
            placeholder="Search for company or position..."
            name="searchbar"
            type="text"
            rounded="20px"
            borderColor="rgba(149, 149, 149, 0.2)"
            borderWidth="1px"
            onChange={handleInputChange}
          />
        </InputGroup>

        {/* Profile Icon and user menu*/}
        <Flex pr="40px">
          <Menu position="absolute" height="226px">
            {imageTimeout ? (
              <Spinner />
            ) : (
              <MenuButton
                data-cy="profileButton"
                as={Image}
                size="58px"
                cursor="pointer"
                style={{
                  borderRadius: '50%',
                }}
                src={userData.profile_image}
                fallbackSrc={require('../../icons/user.svg')}
              />
            )}
            <MenuList>
              <MenuItem
                border="none"
                backgroundColor="#FFF"
                onClick={() => history.push(`/profile/${userId}`)}
                data-cy="profileLink"
              >
                Profile
              </MenuItem>
              <MenuItem
                border="none"
                backgroundColor="#FFF"
                onClick={() => history.push(`/profile/${userId}/edit`)}
                data-cy="editProfileMenuOption"
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

      <Box>
        {/* Filtered Search Buttons */}
        <Flex
          align="center"
          width="100%"
          margin="0 auto"
          justify="space-between"
          px="40px"
        >
          <Heading
            as="h1"
            fontSize="36px"
            fontFamily="Poppins"
            fontWeight="600"
            color="#131C4D"
          >
            Reviews
          </Heading>
          <Flex>
            <Menu margin="3%" closeOnSelect={false}>
              <MenuButton
                outline="none"
                w="309px"
                h="65px"
                bg="#FFFFFF"
                mr="20px"
                border="2px solid #EAF0FE"
                rounded="32px"
                fontFamily="Muli"
                fontSize="20px"
                fontWeight="bold"
              >
                <Flex
                  justify="space-between"
                  align="center"
                  pl={track.length > 0 ? '10px' : '30px'}
                  pr="18px"
                >
                  <Flex w="100%">
                    {type.length > 0
                      ? typeBadge(type)
                      : 'Filter by review type'}
                  </Flex>

                  <Icon name="triangle-down" color="#344CD0" fontSize="16px" />
                </Flex>
              </MenuButton>
              <MenuList minWidth="240px">
                {types.map((type) => (
                  <MenuOptionGroup
                    key={type.name}
                    defaultValue={typeFilters}
                    type="checkbox"
                  >
                    <MenuItemOption
                      border="none"
                      backgroundColor="#FFF"
                      value={type.name}
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
                outline="none"
                w="260px"
                h="65px"
                bg="#FFFFFF"
                border="2px solid #EAF0FE"
                rounded="32px"
                fontFamily="Muli"
                fontSize="20px"
                fontWeight="bold"
              >
                <Flex
                  justify="space-between"
                  align="center"
                  pl={track.length > 0 ? '10px' : '30px'}
                  pr="18px"
                >
                  <Flex w="100%">
                    {track.length > 0 ? trackBadge(track) : 'Filter by field'}
                  </Flex>

                  <Icon name="triangle-down" color="#344CD0" fontSize="16px" />
                </Flex>
              </MenuButton>
              <MenuList minWidth="240px">
                {tracks.map((track) => (
                  <MenuOptionGroup
                    key={track.name}
                    defaultValue={trackFilters}
                    type="checkbox"
                  >
                    <MenuItemOption
                      border="none"
                      backgroundColor="#FFF"
                      value={track.name}
                      onClick={() => handleTrack(track.name)}
                    >
                      {track.name}
                    </MenuItemOption>
                  </MenuOptionGroup>
                ))}
              </MenuList>
            </Menu>
          </Flex>
          {isBlocked ? (
            <Blocked />
          ) : (
            <Button
              background="#344CD0"
              color="#FDFDFF"
              _hover={{ bg: '#4254BA', cursor: 'pointer' }}
              fontFamily="Muli"
              fontWeight="bold"
              fontSize="20px"
              rounded="35px"
              p="19px 20px"
              w="180px"
              h="63px"
              border="none"
              size="lg"
              isLoading={isLoading}
              onClick={navToReviewForm}
              data-cy="addReviewButton"
            >
              Write a review
            </Button>
          )}
        </Flex>
      </Box>
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
