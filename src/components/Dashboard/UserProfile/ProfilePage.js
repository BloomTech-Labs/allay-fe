import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ProfilePageReview } from './ProfilePageReview'
import GridLoader from 'react-spinners/GridLoader'
import { Flex, Image, SimpleGrid, Box, Avatar } from '@chakra-ui/core'
import { getUser } from '../../../state/actions/userActions'
import { Link } from 'react-router-dom'

const ProfilePage = (props) => {
  const id = props.match.params.id
  const userId = window.localStorage.getItem('userId')
  //
  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.user.isLoading)
  const isUpdated = useSelector((state) => state.user.isUpdated)
  const userData = useSelector((state) => state.user.userData)
  //

  const _midSectionStyles = {
    width: '40%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0% 6% 0 3%',
    height: '40px',
  }
  const _emp = {
    padding: '0 0 0 22%',
    opacity: 0.5,
  }

  // box that shows on profile update
  let changes_div = {
    position: 'absolute',
    width: '1048px',
    marginTop: '25px',
    borderRadius: '20px 20px 0 0',
    height: '50px',
    backgroundColor: '#77E0B5',
    textAlign: 'center',
    color: '#fff',
    fontSize: '16px',
    fontFamily: 'Muli',
    fontWeight: 'bold',
  }
  //array to get the correct track name
  const track = ['arrayStartsWithZero :D', 'android', 'ds', 'web', 'ios', 'ux'][
    userData.track_id
  ]

  // formating graduated date
  let graduated = userData.graduated
  graduated = new Date(graduated).toUTCString()
  graduated = graduated.split(' ').slice(2, 4).join(' ')

  // formating employed date
  let hired = userData.employed_start
  hired = new Date(hired).toUTCString()
  hired = hired.split(' ').slice(2, 4).join(' ')

  //slack link helper
  const slackID = userData.slack
  const slackLink = `https://lambda-students.slack.com/app_redirect?channel=${slackID}`

  useEffect(() => {
    dispatch(getUser(id))
  }, [dispatch, id])

  //send location: null receive undefiend send again empty recieve the same with white space, backend fix but itll do for now

  const lazySolution =
    userData.location != 'undefined undefined ' &&
    userData.location != 'undefined undefined'
      ? userData.location
      : ''
  return (
    <>
      {/* //Top Section */}

      <Flex
        maxW="1440px"
        w="100%"
        px="40px"
        py="28px"
        m="0 auto"
        justify="space-between"
        align="center"
        borderBottom="1px solid #EAF0FE"
      >
        <Flex>
          <Link
            style={{
              textDecoration: 'none',
              color: '#344CD0',
              fontFamily: 'Poppins',
              fontWeight: '600',
              fontSize: '32px',
            }}
            to="/dashboard"
          >
            <h1> Allay </h1>
          </Link>
        </Flex>

        {Number(userId) === Number(userData.id) ? (
          <Flex>
            <Image
              size="58px"
              style={{ opacity: '0.6', borderRadius: '50%' }}
              src={userData.profile_image}
              fallbackSrc={require('../../../icons/user.svg')}
            />
          </Flex>
        ) : null}
      </Flex>

      {!isLoading ? (
        <>
          <Flex Flex w="100%" pt="3%" justify="center">
            <SimpleGrid width="1048px" columns={1}>
              <Box style={{ textAlign: 'end', paddingRight: '1%' }}>
                {Number(id) === Number(userId) && (
                  <Link
                    style={{
                      textDecoration: 'none',
                      color: 'black',
                    }}
                    to={`/profile/${id}/edit`}
                  >
                    <i
                      style={{ opacity: 0.3, paddingRight: '10px' }}
                      className="far fa-edit"
                      data-cy="editProfile"
                    ></i>
                    Edit profile
                  </Link>
                )}
              </Box>
              <div
                id="changesDiv"
                style={isUpdated ? changes_div : { display: 'none' }}
              >
                Changes successfully saved
              </div>
              <Box
                style={{
                  borderRadius: '20px 20px 0 0',
                  display: 'inline-flex',
                }}
                bg="#F7F9FF"
                height="220px"
              >
                <Flex w="20%" style={{ padding: '55px 0 0 90px' }}>
                  <Avatar
                    size="2xl"
                    name={userData.first_name}
                    src={userData.profile_image}
                  />
                </Flex>
                <Flex w="80%" pl="6%">
                  <SimpleGrid width="100%" row={2} pr="70px">
                    <Flex
                      height="113px"
                      style={{
                        display: 'flex',
                      }}
                    >
                      <Box
                        height="27px"
                        style={{
                          alignSelf: 'flex-end',
                          marginLeft: '42px',
                        }}
                      >
                        <h3
                          id="profileNames"
                          style={{
                            fontSize: '27px',
                            fontFamily: 'Poppins',
                            color: ' #131C4D',
                            width: '210px',
                          }}
                        >
                          {userData.first_name} {userData.last_name}
                        </h3>
                      </Box>
                      <Box
                        width="47%"
                        height="53px"
                        style={{
                          display: 'flex',
                          alignSelf: 'flex-end',
                          alignItems: 'baseline',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span
                          style={{
                            borderRadius: '20px',
                            width: '75px',
                            height: '36px',
                            backgroundColor: '#259BF8',
                            color: '#17171b',
                            fontSize: '16px',
                            textTransform: 'uppercase',
                            textAlign: 'center',
                            marginLeft: '15%',
                            paddingTop: '6px',
                          }}
                        >
                          {track}
                        </span>

                        <h6
                          style={{
                            fontFamily: 'Muli',
                            fontWeight: 300,
                            paddingRight: '10px',
                          }}
                        >
                          {userData.graduated ? 'Alumni' : 'Student'}
                        </h6>
                      </Box>

                      <Box
                        width="120px"
                        style={{
                          alignSelf: 'flex-end',
                          textAlign: 'end',
                        }}
                        height="60px"
                      >
                        <h6
                          style={{
                            fontFamily: 'Muli',
                            fontWeight: 300,
                            paddingTop: '6px',
                          }}
                        >
                          <i
                            style={{ opacity: 0.2, paddingRight: '5px' }}
                            className="fas fa-map-marker-alt"
                          ></i>

                          {lazySolution}
                        </h6>
                      </Box>
                    </Flex>
                    <Box>
                      <SimpleGrid width="100%" columns={2}>
                        <Flex
                          width="55%"
                          justify="space-between"
                          pl="42px"
                          style={{ fontWeight: 'bold' }}
                        >
                          <a
                            style={{
                              textDecoration: 'none',
                              color: '#344CD0',
                            }}
                            target="blank"
                            href={userData.portfolio}
                          >
                            Portfolio
                          </a>

                          <a
                            style={{
                              textDecoration: 'none',
                              color: '#344CD0',
                            }}
                            target="blank"
                            href={userData.resume}
                          >
                            Resume
                          </a>
                        </Flex>
                        <Flex
                          width="62%"
                          justify="space-around"
                          justifySelf="flex-end"
                          alignItems="center"
                        >
                          {userData.linked_in ? (
                            <a target="blank" href={userData.linked_in}>
                              <Image
                                size="20px"
                                style={{ borderRadius: '60%' }}
                                src={require('../../../icons/linkedIn.png')}
                              />
                            </a>
                          ) : (
                            <Image
                              size="20px"
                              opacity=".3"
                              style={{ borderRadius: '60%' }}
                              src={require('../../../icons/linkedIn.png')}
                            />
                          )}
                          {userData.slack ? (
                            <a target="blank" href={slackLink}>
                              <Image
                                size="20px"
                                src={require('../../../icons/slack.svg')}
                              />
                            </a>
                          ) : (
                            <Image
                              opacity="0.3"
                              size="20px"
                              src={require('../../../icons/slack.svg')}
                            />
                          )}
                          {userData.github ? (
                            <a
                              style={{ height: '20px' }}
                              target="blank"
                              href={userData.github}
                            >
                              <i
                                style={{ fontSize: 'larger' }}
                                className="fab fa-github"
                              />
                            </a>
                          ) : (
                            <i
                              style={{ fontSize: 'larger', opacity: '0.3' }}
                              className="fab fa-github"
                            ></i>
                          )}

                          {userData.dribble ? (
                            <a target="blank" href={userData.dribble}>
                              <Image
                                size="20px"
                                style={{ borderRadius: '60%' }}
                                src={require('../../../icons/dribble.png')}
                              />
                            </a>
                          ) : (
                            <Image
                              size="20px"
                              opacity="0.3"
                              style={{ borderRadius: '60%' }}
                              src={require('../../../icons/dribble.png')}
                            />
                          )}
                        </Flex>
                      </SimpleGrid>
                    </Box>
                  </SimpleGrid>
                </Flex>
              </Box>
              <Box
                bg="#F7F9FF"
                pl="70px"
                height="107px"
                style={{ fontSize: '16px' }}
              >
                <h4
                  style={{
                    padding: ' 2% 0% 1% 3%',
                    fontSize: '14px',
                    color: ' #131C4D',
                  }}
                >
                  Lambda Information
                </h4>
                <Flex>
                  <Box style={_midSectionStyles}>
                    <span style={{ opacity: '.5' }}>Cohort:</span>
                    {userData.cohort}
                  </Box>
                  <Box
                    style={{
                      width: '35.5%',
                      display: ' flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0% 0% 1% 11%',
                      height: '40px',
                    }}
                  >
                    <span style={{ opacity: '.5' }}>Graduated:</span>
                    {userData.graduated ? graduated : 'N/A'}
                  </Box>
                </Flex>
              </Box>
            </SimpleGrid>
          </Flex>

          <Flex
            Flex
            w="100%"
            justify="center"
            mb="3%"
            style={{ fontSize: '16px' }}
          >
            <SimpleGrid width="1048px" columns={2}>
              <Box
                bg="#F7F9FF"
                height="260px"
                pl="70px"
                style={{ borderRadius: '0 0 0 20px' }}
              >
                <h4
                  style={{
                    padding: ' 6% 2% 5% 6%',
                    fontSize: '14px',
                    color: ' #131C4D',
                  }}
                >
                  Background
                </h4>
                <SimpleGrid
                  columns={2}
                  spacing={5}
                  style={{ paddingLeft: '6%' }}
                >
                  <Box height="20px" style={{ opacity: 0.5 }}>
                    Degree:
                  </Box>
                  <Box height="20px">{userData.highest_ed || 'N/A'}</Box>
                  <Box height="20px" style={{ opacity: 0.5 }}>
                    Field of Study:
                  </Box>
                  <Box height="20px">{userData.field_of_study || 'N/A'}</Box>
                  <Box height="20px" style={{ opacity: 0.5 }}>
                    Prior web experience:
                  </Box>
                  <Box height="20px">
                    {userData.prior_experience ? 'Yes' : 'None'}
                  </Box>
                  <Box height="20px" style={{ opacity: 0.5 }}>
                    Lambda TL/SL position:
                  </Box>
                  <Box height="20px">
                    {userData.tlsl_experience ? 'Yes' : 'None'}
                  </Box>
                </SimpleGrid>
              </Box>
              <Box
                bg="#F7F9FF"
                height="260px"
                style={{ borderRadius: '0 0 20px 0' }}
              >
                <h4
                  style={{
                    padding: ' 6% 0% 4% 8%',
                    fontSize: '14px',
                    color: ' #131C4D',
                  }}
                >
                  Current employment
                </h4>
                <SimpleGrid
                  columns={2}
                  spacing={5}
                  style={{ padding: '0 20% 0 0%' }}
                >
                  <Box height="20px" style={_emp}>
                    Company:
                  </Box>
                  <Box height="20px">{userData.employed_company || 'N/A'}</Box>
                  <Box height="20px" style={_emp}>
                    Job tittle:
                  </Box>
                  <Box height="20px">{userData.employed_title || 'N/A'}</Box>
                  <Box height="20px" style={_emp}>
                    Start date:
                  </Box>
                  <Box height="20px">
                    {userData.employed_start ? hired : 'N/A'}
                  </Box>
                  <Box height="20px" style={_emp}>
                    Remote
                  </Box>
                  <Box height="20px">
                    {userData.employed_remote ? 'Yes' : 'No'}
                  </Box>
                </SimpleGrid>
              </Box>
            </SimpleGrid>
          </Flex>

          <Flex justify="center">
            <Box width="1048px">
              Reviews written by {userData.first_name} {userData.last_name}
            </Box>
          </Flex>
          <ProfilePageReview userReviews={userData.reviews} />
        </>
      ) : (
        <Flex justify="center" pt="15%">
          <GridLoader size={50} color={'#259bf8'} />
        </Flex>
      )}
    </>
  )
}

export default ProfilePage
