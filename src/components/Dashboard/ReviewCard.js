import React, { useState, useRef } from 'react'
import { connect } from 'react-redux'

import BlockButton from './AdminButtons/BlockButton'
import ContentButton from './AdminButtons/ContentButton'
import ReactGA from 'react-ga'
// actions
import deleteReview from '../../state/actions/index'

// styles
import {
  Box,
  Text,
  Avatar,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalCloseButton,
  Button,
  Icon,
  Image,
  Badge,
  PseudoBox,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/core'
import { GoLocation } from 'react-icons/go'
import { FaRegBuilding } from 'react-icons/fa'
import { MdRateReview } from 'react-icons/md'
//for time display
var moment = require('moment') // require
const ReviewCard = ({ review, history, deleteReview, isAdmin }) => {
  const singleReview = review

  //deletes the review in question
  const submitDelete = (user_id, review_id) => {
    if (review.user_id && review.review_id) {
      deleteReview(review.user_id, review.review_id).then(() => {
        // window.location.reload();
        history.push('/dashboard')
      })
    } else {
      deleteReview(user_id, review_id).then(() => {
        // window.location.reload();
        history.push('/dashboard')
      })
    }

    ReactGA.event({
      category: 'Review Delete',
      action: `Submit delete`,
    })
  }
  // useEffect(() => {}, [submitDelete])
  // basic usage for the SingleReview modal
  const { isOpen, onOpen, onClose } = useDisclosure()
  const loginId = localStorage.getItem('userId')

  // specifically for the cancel review delete button functionality
  const [isOpen2, setIsOpen2] = useState()
  const onClose2 = () => setIsOpen2(false)
  const cancelRef = useRef()

  //routes to single review
  const navToEditRoute = () =>
    review.review_type === 'Company'
      ? history.push({
          pathname: `/dashboard/review/${review.review_id}`,
          state: singleReview,
        })
      : history.push(`/dashboard/interview/${review.review_id}`)

  //routes to user's profile page
  const navToProfile = (e) => {
    e.preventDefault()
    history.push(`/profile/${review.user_id}`)
  }

  // adjust logo for api call
  // const adjustedName = review.company_name.replace(' ', '+')

  // adjust date of posting
  let tempDate = new Date(review.created_at).toUTCString()
  const tempDay = tempDate.split(' ').slice(1, 2)
  const tempMonth = tempDate.split(' ').slice(2, 3)
  const tempYear = tempDate.split(' ').slice(3, 4)
  const adjustedDate = `${tempMonth} ${tempDay}, ${tempYear}`

  //track name font color picker
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
  //track name background color picker
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

  //remove white space from company name for logo usage
  let stripped = review.company_name.replace(/ /g, '')
  let com = '.com'
  const logo = stripped.concat(com)

  const created = moment(review.created_at).fromNow()

  return (
    <>
      {/* ------------------------------------------------------------------------------------------------ */}
      {/* ---------------------------------------Modal Cards (for edit)----------------------------------- */}
      {/* ------------------------------------------------------------------------------------------------ */}

      <Modal
        preserveScrollBarGap
        isOpen={isOpen}
        onClose={onClose}
        size="950px"
      >
        <ModalOverlay />
        <ModalContent w="100%" wrap="nowrap">
          <ModalCloseButton
            data-cy="reviewCloseButton"
            background="none"
            border="none"
          />

          {/* LEFT SIDE MODAL */}
          <Flex
            direction="column"
            justify="space-between"
            align="flex-start"
            position="relative"
            w="261px"
            height="100%"
            top="0"
            left="0"
            pb="50px"
            pt="35px"
            pl="40px"
            bg="#F2F6FE"
            borderRadius="0px 40px 40px 0px"
          >
            {/* USER AVATAR AND NAME */}
            <Flex
              justify="space-evenly"
              align="center"
              mb="30px"
              onClick={navToProfile}
              style={{ cursor: 'pointer' }}
            >
              {review.user_profile_image === 'h' ? (
                <Image
                  size="40px"
                  mr="7px"
                  style={{ opacity: '0.6' }}
                  src={require('../../icons/user.svg')}
                />
              ) : (
                <Image
                  size="40px"
                  mr="7px"
                  style={{ opacity: '0.6', borderRadius: '50%' }}
                  src={review.user_profile_image}
                />
              )}
              <Text color="#131C4D" fontSize="14px" fontFamily="Muli">
                By {review.user_first_name} {review.user_last_name}
              </Text>
            </Flex>
            {/* COMPANY LOGO AND REVIEW STARS */}
            <Flex
              direction="column"
              justify="center"
              align="flex-start"
              mb="20px"
            >
              <Image
                w="148px"
                h="70px"
                src={`https://logo.clearbit.com/${
                  review.logo !== 'unknown' ? review.logo : logo
                }`}
                fallbackSrc={`http://samscct.com/wp-content/uploads/2014/09/no-logo.png`}
              />

              <Flex mt="13px">
                {Array(5)
                  .fill('')
                  .map((_, i) => (
                    <Icon
                      name="star"
                      key={i}
                      color={i < review.overall_rating ? '#F9DC76' : '#DADADD'}
                      ml="4px"
                    />
                  ))}
              </Flex>
            </Flex>
            {/* COMPANY LOCATION AND NAME */}
            <Flex
              direction="column"
              justify="center"
              align="flex-start"
              mb="40px"
            >
              <Flex mb="5px">
                <Box as={GoLocation} size="21px" color="#BBBDC6" mr="7px" />
                <Text color="#BBBDC6" fontSize="14px" fontFamily="Muli">
                  {review.city}, {review.state_name}
                </Text>
              </Flex>
              <Flex>
                <Box as={FaRegBuilding} size="21px" color="#BBBDC6" mr="7px" />
                <Text color="#BBBDC6" fontSize="14px" fontFamily="Muli">
                  {review.company_name}
                </Text>
              </Flex>
            </Flex>
            {/* JOB/INTERVIEW INFORMATION */}
            <Flex direction="column" justify="space-between" align="flex-start">
              <Flex
                direction="column"
                justify="flex-start"
                align="flex-start"
                mb="20px"
              >
                <Text
                  color="#131C4C"
                  fontSize="18px"
                  fontFamily="Muli"
                  fontWeight="bold"
                >
                  {review.job_title}
                </Text>
                <Text
                  color="#9194A8"
                  fontSize="14px"
                  fontFamily="Muli"
                  fontWeight="bold"
                >
                  Job title
                </Text>
              </Flex>
              <Flex
                direction="column"
                justify="flex-start"
                align="flex-start"
                mb="20px"
              >
                <Text
                  color="#131C4C"
                  fontSize="18px"
                  fontFamily="Muli"
                  fontWeight="bold"
                >{`${review.salary}.00`}</Text>
                <Text
                  color="#9194A8"
                  fontSize="14px"
                  fontFamily="Muli"
                  fontWeight="bold"
                >
                  Salary
                </Text>
              </Flex>
              <Flex
                direction="column"
                justify="flex-start"
                align="flex-start"
                mb="20px"
              >
                {review.review_type === 'Company' ? (
                  <Text
                    color="#131C4C"
                    fontSize="18px"
                    fontFamily="Muli"
                    fontWeight="bold"
                  >
                    {review.work_status}
                  </Text>
                ) : review.difficulty_rating === 1 ? (
                  <Text
                    color="#131C4C"
                    fontSize="18px"
                    fontFamily="Muli"
                    fontWeight="bold"
                  >
                    Very easy
                  </Text>
                ) : review.difficulty_rating === 2 ? (
                  <Text
                    color="#131C4C"
                    fontSize="18px"
                    fontFamily="Muli"
                    fontWeight="bold"
                  >
                    Easy
                  </Text>
                ) : review.difficulty_rating === 3 ? (
                  <Text
                    color="#131C4C"
                    fontSize="18px"
                    fontFamily="Muli"
                    fontWeight="bold"
                  >
                    Somewhat easy
                  </Text>
                ) : review.difficulty_rating === 4 ? (
                  <Text
                    color="#131C4C"
                    fontSize="18px"
                    fontFamily="Muli"
                    fontWeight="bold"
                  >
                    Somewhat hard
                  </Text>
                ) : review.difficulty_rating === 5 ? (
                  <Text
                    color="#131C4C"
                    fontSize="18px"
                    fontFamily="Muli"
                    fontWeight="bold"
                  >
                    Hard
                  </Text>
                ) : (
                  <Text
                    color="#131C4C"
                    fontSize="18px"
                    fontFamily="Muli"
                    fontWeight="bold"
                  >
                    N/A
                  </Text>
                )}

                <Text
                  color="#9194A8"
                  fontSize="14px"
                  fontFamily="Muli"
                  fontWeight="bold"
                >
                  {review.review_type === 'Company'
                    ? 'Status'
                    : 'Interview difficulty'}
                </Text>
              </Flex>
              <Flex
                direction="column"
                justify="flex-start"
                align="flex-start"
                mb="20px"
              >
                {review.review_type === 'Company' ? (
                  <Text
                    color="#131C4C"
                    fontSize="18px"
                    fontFamily="Muli"
                    fontWeight="bold"
                  >
                    {review.start_date} -{' '}
                    {review.end_date ? review.end_date : 'Present'}
                  </Text>
                ) : (
                  <Text
                    color="#131C4C"
                    fontSize="18px"
                    fontFamily="Muli"
                    fontWeight="bold"
                  >
                    {review.offer_status}
                  </Text>
                )}
                <Text
                  color="#9194A8"
                  fontSize="14px"
                  fontFamily="Muli"
                  fontWeight="bold"
                >
                  {review.review_type === 'Company' ? 'Dates' : 'Job offer?'}
                </Text>
              </Flex>
            </Flex>
            <Flex>
              {Number(loginId) === Number(review.user_id) ? (
                <Image
                  src={require('../../icons/edit.png')}
                  onClick={navToEditRoute}
                  cursor="pointer"
                  size="1.5em"
                  mr="12px"
                  data-cy="editModalReview"
                />
              ) : null}
              {Number(loginId) === Number(review.user_id) ? (
                <Image
                  data-cy="deleteModalReview"
                  src={require('../../icons/trash.png')}
                  onClick={() => setIsOpen2(true)}
                  cursor="pointer"
                  size="1.5em"
                />
              ) : null}
              <AlertDialog
                isOpen={isOpen2}
                leastDestructiveRef={cancelRef}
                onClose={onClose2}
              >
                <AlertDialogOverlay />
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Delete review
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Are you sure? You can't undo this action afterwards.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Flex
                      align="center"
                      justify="center"
                      height="56px"
                      width="30%"
                      color="#344CD0"
                      fontSize="16px"
                      fontWeight="bold"
                      ref={cancelRef}
                      onClick={onClose2}
                    >
                      Cancel
                    </Flex>
                    <Button
                      data-cy="confirmDeleteModalReview"
                      h="56px"
                      rounded="10px"
                      border="none"
                      color="white"
                      variantColor="red"
                      ml={3}
                      onClick={submitDelete}
                    >
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </Flex>
          </Flex>
          {/* RIGHT SIDE MODAL */}
          <Flex
            direction="column"
            justify="flex-start"
            align="flex-start"
            position="absolute"
            w="575px"
            h="100%"
            ml="291px"
            mb="50px"
            mt="35px"
          >
            {/* TYPE OF REVIEW, TRACK, DATE POSTED */}
            <Flex justify="space-between" w="100%" mb="70px">
              <Flex justify="space-between">
                <Box as={MdRateReview} size="24px" color="#BBBDC6" mr="4px" />
                <Text
                  mr="40px"
                  color="#131C4D"
                  fontFamily="Muli"
                  fontSize="14px"
                >
                  {review.review_type === 'Company'
                    ? 'Company Review'
                    : 'Interview Review'}
                </Text>
                <Badge
                  backgroundColor={
                    review.track_name === 'WEB'
                      ? '#DBEBFD'
                      : review.track_name === 'iOS'
                      ? '#F4E6BE'
                      : review.track_name === 'UX'
                      ? '#F9E3DE'
                      : review.track_name === 'DS'
                      ? '#D3F2CD'
                      : review.track_name === 'Android'
                      ? '#E9D9FF'
                      : '#DBEBFD'
                  }
                  color={
                    review.track_name === 'WEB'
                      ? '#474EA7'
                      : review.track_name === 'iOS'
                      ? '#8E3D19'
                      : review.track_name === 'UX'
                      ? '#9F3A5A '
                      : review.track_name === 'DS'
                      ? '#35694F'
                      : review.track_name === 'Android'
                      ? '#4B3569'
                      : '#474EA7'
                  }
                  fontSize="16px "
                  fontWeight="light"
                  fontFamily="Muli"
                  rounded="full"
                  px="15px"
                  pt="2px"
                  overflow="hidden"
                >
                  {review.track_name}
                </Badge>
              </Flex>
              <Text color="#9194A8" fontSize="14px" fontFamily="Muli">
                {adjustedDate}
              </Text>
            </Flex>
            {/* INTERVIEW TYPES */}
            {review.review_type === 'Interview' ? (
              <Flex color="#9194A8" fontSize="14px" fontFamily="Muli">
                Interviews
              </Flex>
            ) : null}
            {review.review_type === 'Interview' ? (
              <Flex
                justify="flex-start"
                wrap="wrap"
                whiteSpace="nowrap"
                width="100%"
                mb="50px"
              >
                {review.phone_interview ? (
                  <Flex
                    as="p"
                    color="#131C4D"
                    fontSize="16px"
                    fontFamily="Muli"
                    bg="#EAF0FE"
                    px="1%"
                    mt="1.5%"
                    mr="3%"
                    rounded="3px"
                  >
                    Phone screening
                  </Flex>
                ) : null}
                {review.resume_review ? (
                  <Flex
                    as="p"
                    color="#131C4D"
                    fontSize="16px"
                    fontFamily="Muli"
                    bg="#EAF0FE"
                    px="1%"
                    mt="1.5%"
                    mr="3%"
                    rounded="3px"
                  >
                    Resume review
                  </Flex>
                ) : null}
                {review.take_home_assignments ? (
                  <Flex
                    as="p"
                    color="#131C4D"
                    fontSize="16px"
                    fontFamily="Muli"
                    bg="#EAF0FE"
                    px="1%"
                    mt="1.5%"
                    mr="3%"
                    rounded="3px"
                  >
                    Take home assignments
                  </Flex>
                ) : null}
                {review.online_coding_assignments ? (
                  <Flex
                    as="p"
                    color="#131C4D"
                    fontSize="16px"
                    fontFamily="Muli"
                    bg="#EAF0FE"
                    px="1%"
                    mt="1.5%"
                    mr="3%"
                    rounded="3px"
                  >
                    Online coding assignments
                  </Flex>
                ) : null}
                {review.portfolio_review ? (
                  <Flex
                    as="p"
                    color="#131C4D"
                    fontSize="16px"
                    fontFamily="Muli"
                    bg="#EAF0FE"
                    px="1%"
                    mt="1.5%"
                    mr="3%"
                    rounded="3px"
                  >
                    Portfolio review
                  </Flex>
                ) : null}
                {review.screen_share ? (
                  <Flex
                    as="p"
                    color="#131C4D"
                    fontSize="16px"
                    fontFamily="Muli"
                    bg="#EAF0FE"
                    px="1%"
                    mt="1.5%"
                    mr="3%"
                    rounded="3px"
                  >
                    Screen share
                  </Flex>
                ) : null}
                {review.open_source_contribution ? (
                  <Flex
                    as="p"
                    color="#131C4D"
                    fontSize="16px"
                    fontFamily="Muli"
                    bg="#EAF0FE"
                    px="1%"
                    mt="1.5%"
                    mr="3%"
                    rounded="3px"
                  >
                    Open source contribution
                  </Flex>
                ) : null}
                {review.side_projects ? (
                  <Flex
                    as="p"
                    color="#131C4D"
                    fontSize="16px"
                    fontFamily="Muli"
                    bg="#EAF0FE"
                    px="1%"
                    mt="1.5%"
                    mr="3%"
                    rounded="3px"
                  >
                    Side projects
                  </Flex>
                ) : null}
              </Flex>
            ) : null}
            {/* DESCRIPTION */}
            <Flex direction="column">
              <Text color="#9194A8" fontSize="14px" fontFamily="Muli" mb="7px">
                Description
              </Text>
              <Text
                color="#131C4D"
                fontSize="16px"
                fontFamily="Muli"
                lineHeight="23px"
              >
                {review.comment}
              </Text>
            </Flex>
          </Flex>
          {/* ADMIN BUTTONS */}
          <ModalFooter
            w="689px"
            ml="261px"
            mb="20px"
            position="absolute"
            bottom="0"
          >
            <BlockButton user_id={review.user_id} isAdmin={isAdmin} />
            <ContentButton
              isAdmin={isAdmin}
              submitDelete={submitDelete}
              user_id={review.user_id}
              review_id={review.review_id}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* ------------------------------------------------------------------------------------------------ */}
      {/* ---------------------------------------DashBoard Cards------------------------------------------ */}
      {/* ------------------------------------------------------------------------------------------------ */}

      {/* Review container */}
      <PseudoBox
        mb="3%"
        mx="2.5%"
        px="1%"
        py="1%"
        border="1px solid #E9F0FF"
        width="408px"
        height="309px"
        borderRadius="12px"
        display="flex"
        flexDir="column"
        _hover={{ bg: '#E9F0FF' }}
        onClick={onOpen}
        data-cy="modalCard"
      >
        {/* Review content container */}
        <Flex flexDir="column">
          {/* headline container  */}
          <Flex maxW="530px">
            <Flex
              height="115px"
              justify="space-between"
              maxW="391px"
              p="2% 5%"
              wrap="wrap"
            >
              <Flex maxW="300px">
                {review.review_type === 'Company' ? (
                  <Image
                    width="106px"
                    height="40px"
                    src={`https://logo.clearbit.com/${
                      review.logo !== 'unknown' ? review.logo : logo
                    }`}
                    fallbackSrc={`http://samscct.com/wp-content/uploads/2014/09/no-logo.png`}
                  />
                ) : (
                  <Text style={{ fontSize: '22px', fontWeight: 'bold' }}>
                    {' '}
                    {review.job_title}
                  </Text>
                )}
              </Flex>
              <i
                style={{ alignSelf: 'center', fontSize: '22px', opacity: '.2' }}
                className="far fa-heart"
              ></i>
              <Flex justify="space-between" width="391px" pt="2%">
                <Flex align="center">
                  {Array(5)
                    .fill('')
                    .map((_, i) => (
                      <Icon
                        name="star"
                        key={i}
                        color={i < review.overall_rating ? '#F9DC76' : '#fff'}
                        ml="8%"
                      />
                    ))}
                </Flex>
                <Flex>
                  <Text
                    style={{
                      color: '#BBBDC6',
                      fontSize: '14px',
                      fontWeight: 'bold',
                    }}
                  >
                    {created}
                  </Text>
                  {/* )} */}
                </Flex>
              </Flex>
              <Flex width="391px" height="45px" pt="15px">
                <Box as={MdRateReview} size="24px" color="#BBBDC6" mr="4px" />
                <span style={{ paddingLeft: '5px' }}>
                  {review.review_type} review
                </span>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        {/* summary container */}
        <Flex width="100%" height="100px">
          <Flex m="10px 20px" w="348px" h="55px" overflow="hidden">
            <p style={{ fontSize: '14px', color: 'gray' }}>{review.comment}</p>
          </Flex>
        </Flex>
        <Flex
          margin="0px 12px 0px 20px"
          align="center"
          pt="5px"
          height="40px"
          justify="space-between"
        >
          <Flex alignItems="center">
            <Avatar size="md" src={review.user_profile_image} />
            <Text pl="5px" fontSize="14px">
              {review.user_first_name} {review.user_last_name}
            </Text>
          </Flex>
          <Badge
            backgroundColor={trackColorPicker(review.track_name)}
            color={trackFontColor(review.track_name)}
            fontSize="1em"
            fontWeight="light"
            rounded="full"
            textAlign="center"
            pt="5px"
            overflow="hidden"
            ml="10px"
            width="58px"
            height="36px"
          >
            <span>{review.track_name}</span>
          </Badge>
        </Flex>
      </PseudoBox>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    reviewDeleted: state.review.reviewDeleted,
    isAdmin: state.auth.isAdmin,
  }
}
export default connect(mapStateToProps, deleteReview)(ReviewCard)
