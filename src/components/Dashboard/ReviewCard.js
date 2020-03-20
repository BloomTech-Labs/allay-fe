// previously ReviewList
import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import ReactGA from 'react-ga';
// actions
import getReview from '../../state/actions/index';
import deleteReview from '../../state/actions/index';

// icons
import {
  TiLocationOutline,
  TiArchive,
  TiThumbsUp,
  TiThumbsDown,
  TiGlobe
} from 'react-icons/ti';
import { GiWeightLiftingUp } from 'react-icons/gi';
// styles
import {
  Box,
  Avatar,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalCloseButton,
  Button,
  Icon,
  PseudoBox,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
  useDisclosure
} from '@chakra-ui/core';

const ReviewCard = ({ review, reviewDeleted, history, deleteReview }) => {
  //allows the use of toasts
  const toast = useToast();

  //toggle to determine whether deleting worked
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  // basic usage for the SingleReview modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const loginId = localStorage.getItem('userId');

  // specifically for the cancel review delete button functionality
  const [isOpen2, setIsOpen2] = useState();
  const onClose2 = () => setIsOpen2(false);
  const cancelRef = useRef();

  //routes to single review
  const navToEditRoute = () => {
    history.push(`/dashboard/${review.interview_review_id}`);
  };

  //deletes the review in question
  const submitDelete = () => {
    deleteReview(review.user_id, review.interview_review_id).then(() => {
      window.location.reload();
      // history.push('/dashboard')
      toast({
        title: 'Review Deleted',
        description: `We've successfully deleted your review for you`,
        status: 'success',
        duration: 5000,
        isClosable: true
      });
    });

    // if (reviewDeleted === true) {
    // 	toast({
    // 		title: 'Review Deleted',
    // 		description: `We've successfully deleted your review for you`,
    // 		status: 'success',
    // 		duration: 5000,
    // 		isClosable: true
    // 	})
    // } else {
    // 	toast({
    // 		title: 'Review Not Deleted',
    // 		description: `There was an error deleting your review`,
    // 		status: 'error',
    // 		duration: 5000,
    // 		isClosable: true
    // 	});
    // }

    ReactGA.event({
      category: 'Delete',
      action: `Submit delete`
    });
  };

  return (
    <>
      {/* ------------------------------------------------------------------------------------------------ */}
      {/* ---------------------------------------Modal Cards---------------------------------------------- */}
      {/* ------------------------------------------------------------------------------------------------ */}
      <Modal isOpen={isOpen} onClose={onClose} size='80%'>
        <ModalOverlay />
        <ModalContent w='100%' px='12%' py='3%' wrap='nowrap'>
          <ModalCloseButton background='none' border='none' />

          {/* Basic info container */}
          {/* <SingleReview /> */}
          <Flex align='center'>
            <Flex align='center'>
              <Avatar size='2xl' src={`//logo.clearbit.com/${review.domain}`} />
            </Flex>
            <Flex flexDir='column' pl='4%'>
              <Flex as='h1' w='100%' align='center' wrap='nowrap'>
                {review.company_name} Interview Review
              </Flex>
              <Flex
                as='h2'
                fontSize='lg'
                w='100%'
                fontWeight='medium'
                align='center'
                wrap='nowrap'
              >
                <Flex>Interview Review:</Flex>
                <Flex ml='2%'>
                  {Array(5)
                    .fill('')
                    .map((_, i) => (
                      <Icon
                        name='star'
                        key={i}
                        color={
                          i < review.interview_rating ? 'black' : 'gray.300'
                        }
                      />
                    ))}
                </Flex>
              </Flex>
              <Flex as='p' fontSize='md' align='center' wrap='nowrap'>
                Position: {review.job_title}
              </Flex>
            </Flex>
          </Flex>

          {/* Secondary info container */}
          <Flex w='100%' flexDir='column'>
            <Flex w='100%' mt='1.5%' overflow='hidden' justify='space-between'>
              <Flex align='center' wrap='nowrap'>
                <Box as={TiLocationOutline} mr='5px'></Box>
                <Flex as='h3' fontWeight='light' fontSize='lg' isTruncated>
                  {review.job_location}
                </Flex>
              </Flex>
              <Flex align='center' wrap='nowrap'>
                {review.offer_received ? (
                  <>
                    <Box as={TiThumbsUp} mr='5px'></Box>
                    <Flex as='h3' fontWeight='light' fontSize='lg'>
                      Received 0ffer
                    </Flex>{' '}
                  </>
                ) : (
                  <>
                    {' '}
                    <Box as={TiThumbsDown} mr='5px'></Box>
                    <Flex as='h3' fontWeight='light' fontSize='lg'>
                      No Offer
                    </Flex>{' '}
                  </>
                )}
              </Flex>
              <Flex align='center' wrap='nowrap'>
                <Box as={GiWeightLiftingUp} mr='5px'></Box>
                <Flex as='h3' fontWeight='light' fontSize='lg' isTruncated>
                  Difficult
                </Flex>
              </Flex>
              <Flex align='center' wrap='nowrap'>
                <Box as={TiGlobe} mr='5px'></Box>
                <Flex as='h3' fontWeight='light' fontSize='lg' isTruncated>
                  4 Rounds
                </Flex>
              </Flex>
            </Flex>
          </Flex>

          {/* Types container */}
          <Flex
            as='h2'
            fontWeight='medium'
            fontSize='xl'
            w='100%'
            mt='3%'
            mb='1.5%'
            overflow='hidden'
          >
            Interview Types
          </Flex>
          <Flex justify='space-between' wrap='wrap' whiteSpace='nowrap' mb='2%'>
            <Flex as='p' bg='#F2F6FE' px='1%' mb='1.5%'>
              Phone screening
            </Flex>
            <Flex as='p' bg='#F2F6FE' px='1%' mb='1.5%'>
              Online coding test
            </Flex>
            <Flex as='p' bg='#F2F6FE' px='1%' mb='1.5%'>
              Behavioral questions
            </Flex>
            <Flex as='p' bg='#F2F6FE' px='1%' mb='1.5%'>
              Case interviews
            </Flex>
            <Flex as='p' bg='#F2F6FE' px='1%' mb='1.5%'>
              Whiteboarding
            </Flex>
          </Flex>

          {/* Review container */}
          <Flex as='p' w='100%' wrap='nowrap' overflow='hidden'>
            {review.job_review}
          </Flex>

          <Flex w='100%' mt='3%' align='center'>
            <Flex fontWeight='medium' fontSize='xl' wrap='nowrap'>
              Overall Rating
            </Flex>
            <Flex ml='1.5%'>
              {Array(5)
                .fill('')
                .map((_, i) => (
                  <Icon
                    name='star'
                    key={i}
                    color={i < review.job_rating ? 'black' : 'gray.300'}
                  />
                ))}
            </Flex>
          </Flex>
          <Flex as='h2' w='100%' wrap='nowrap' overflow='hidden' mt='1.5%'>
            <Flex fontWeight='medium' fontSize='xl'>
              Salary Offered
            </Flex>
            <Flex ml='1.5%' fontWeight='light' fontSize='xl'>
              ${review.salary}
            </Flex>
          </Flex>

          <ModalFooter>
            {Number(loginId) === Number(review.user_id) ? (
              <Button
                background='#344CD0'
                color='#FFFFFF'
                rounded='6px'
                border='none'
                size='lg'
                mr='2%'
                onClick={navToEditRoute}
              >
                Edit
              </Button>
            ) : null}
            {Number(loginId) === Number(review.user_id) ? (
              <Button
                background='#D31122'
                color='#FFFFFF'
                rounded='6px'
                border='none'
                size='lg'
                mr='2%'
                onClick={() => setIsOpen2(true)}
              >
                Delete
              </Button>
            ) : null}
            <AlertDialog
              isOpen={isOpen2}
              leastDestructiveRef={cancelRef}
              onClose={onClose2}
            >
              <AlertDialogOverlay />
              <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                  Delete Review
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure? You can't undo this action afterwards.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose2}>
                    Cancel
                  </Button>
                  <Button variantColor='red' ml={3} onClick={submitDelete}>
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* ------------------------------------------------------------------------------------------------ */}
      {/* ---------------------------------------DashBoard Cards------------------------------------------ */}
      {/* ------------------------------------------------------------------------------------------------ */}
      {/* Review container */}
      <PseudoBox
        w='45%'
        // h='50%'
        mt='3%'
        mx='2.5%'
        p='3.5%'
        wrap='nowrap'
        background='#F2F6FE'
        borderRadius='12px'
        display='flex'
        justifyContent='center'
        alignItems='center'
        _hover={{ bg: '#4EADF9', color: 'white' }}
        onClick={onOpen}
      >
        {/* Review content container */}
        <Flex w='100%' wrap='wrap' justify='right' alignContent='center'>
          {/* headline line container  */}
          <Flex w='100%' h='100px' mb='3%'>
            {/* avatar box */}
            <Box justify='center' align='center' h='88px' mr='36px'>
              <Avatar size='xl' src={`//logo.clearbit.com/${review.domain}`} />
            </Box>
            {/* tag container */}
            <Flex w='100%' h='32px' wrap='wrap'>
              <Flex
                as='h2'
                w='100%'
                align='center'
                wrap='wrap'
                overflow='hidden'
                isTruncated
              >
                {review.company_name} interview review
              </Flex>
              <Flex width='100%'>
                <Flex as='h4' align='center' wrap='nowrap'>
                  {review.overall_rating}.0
                </Flex>
                <Flex align='center' wrap='nowrap'>
                  {Array(5)
                    .fill('')
                    .map((_, i) => (
                      <Icon
                        name='star'
                        key={i}
                        color={
                          i < review.overall_rating ? '#344CD0' : 'gray.300'
                        }
                        ml='8%'
                      />
                    ))}
                </Flex>
              </Flex>
              {/* <Flex align='center' w='40%' wrap='nowrap'> */}
              <Flex as='p' w='100%' fontWeight='light'>
                Position: {review.job_title}
              </Flex>
            </Flex>
            {/* </Flex> */}
          </Flex>

          {/* Company name & location container */}
          <Flex
            justify='flex-start'
            w='100%'
            font-size='18'
            fontWeight='light'
            justify='space-evenly'
            align='center'
            wrap='nowrap'
            mb='1%'
            mt=''
          >
            <Flex align='center' wrap='nowrap'>
              <Box as={TiArchive} mr='10px'></Box>
              <Flex as='p' overflow='hidden'>
                ${review.salary}
              </Flex>
            </Flex>
            <Flex align='center' wrap='nowrap'>
              <Box as={TiLocationOutline} mr='10px'></Box>
              <Flex as='p'>
                {review.city}, {review.abbreviation}
              </Flex>
            </Flex>
            <Flex align='center' wrap='nowrap'>
              {review.offer_status ? (
                <>
                  <Box as={TiThumbsUp} mr='10px'></Box>
                  <Flex as='p'>Received Offer</Flex>{' '}
                </>
              ) : (
                <>
                  {' '}
                  <Box as={TiThumbsDown} mr='10px'></Box>
                  <Flex as='p' mr='10px'>
                    No Offer
                  </Flex>{' '}
                </>
              )}
            </Flex>
          </Flex>
          {/* headline line container  */}
          <Flex w='100%' align='center' wrap='nowrap' pl='1%' mt='1%'>
            <h2>{review.tagline}</h2>
          </Flex>
          {/* summary container */}
          <Flex
            w='100%'
            h='50%'
            wrap='nowrap'
            overflow='hidden'
            pl='1%'
            mt='0.5%'
          >
            <p>{review.job_review}</p>
          </Flex>
        </Flex>
      </PseudoBox>
    </>
  );
};

const mapStateToProps = state => {
  return {
    reviewDeleted: state.review.reviewDeleted
  };
};
export default connect(mapStateToProps, (getReview, deleteReview))(ReviewCard);
