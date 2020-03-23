// previously ReviewList
import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import ReactGA from 'react-ga';
// actions
import deleteReview from '../../state/actions/index';

// icons
import { TiCalendar, TiGlobeOutline } from 'react-icons/ti';
import { MdPerson } from 'react-icons/md';
import { FaDollarSign, FaRegClock, FaRegMoneyBillAlt, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { GiWeightLiftingUp } from 'react-icons/gi';
import { GoLocation } from 'react-icons/go';

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
  Image,
  Badge,
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

const ReviewCard = ({
  review,
  reviewDeleted,
  history,
  deleteReview
}) => {
  //allows the use of toasts
  const toast = useToast();

  // basic usage for the SingleReview modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const loginId = localStorage.getItem('userId');

  // specifically for the cancel review delete button functionality
  const [isOpen2, setIsOpen2] = useState();
  const onClose2 = () => setIsOpen2(false);
  const cancelRef = useRef();

  //routes to single review
  const navToEditRoute = () => {
    if (review.review_type === 'Company') {
      history.push(`/dashboard/review/${review.review_id}`);
    } else {
      history.push(`/dashboard/interview/${review.review_id}`);
    }
  };

  //deletes the review in question
  const submitDelete = () => {
    deleteReview(review.user_id, review.review_id).then(() => {
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
        <ModalContent w='100%' wrap='nowrap'>
          <ModalCloseButton background='none' border='none' />

          {/* Basic info container */}
          <Flex flexDir={{ lg: 'row', sm: 'column' }} align='center' mx='8%' mt='56px'>
            <Flex flexDir='column' width='100%'>
              <Flex
                as='h2'
                w='100%'
                align='center'
                justify={{ lg: 'flex-start', sm: 'center' }}
                wrap='nowrap'
              >
                {review.company_name}
              </Flex>
              <Flex justify='space-between'>
                <Flex flexDir='column'>
                  <Flex fontSize='small' fontWeight='light' color='#9194A8'>
                    Location
                  </Flex>
                  <Flex>{review.city}, {review.state_name}</Flex>
                </Flex>
                <Flex flexDir='column'>
                  <Flex fontSize='small' fontWeight='light' color='#9194A8'>
                    Job Title
                  </Flex>
                  <Flex>{review.job_title}</Flex>
                </Flex>

                {review.review_type === 'Company' ? (
                  <Flex flexDir='column'>
                    <Flex fontSize='small' fontWeight='light' color='#9194A8'>
                      Company Rating
                    </Flex>
                    <Flex>
                      {Array(5)
                        .fill('')
                        .map((_, i) => (
                          <Icon
                            name='star'
                            key={i}
                            color={i < review.overall_rating ? '#344CD0' : 'gray.300'}
                            ml='4px'
                          />
                        ))}
                    </Flex>
                  </Flex>
                ) : review.review_type === 'Interview' ? (
                  <Flex flexDir='column'>
                    <Flex fontSize='small' fontWeight='light' color='#9194A8'>
                      Overall Experience
                    </Flex>
                    <Flex>
                      {Array(5)
                        .fill('')
                        .map((_, i) => (
                          <Icon
                            name='star'
                            key={i}
                            color={i < review.overall_rating ? '#344CD0' : 'gray.300'}
                            ml='4px'
                          />
                        ))}
                    </Flex>
                  </Flex>
                ) : null}
              </Flex>
            </Flex>
            <Flex align='center' ml='8%' mr='20%'>
              <Avatar size='md' src={`//logo.clearbit.com/${review.logo}`} />
            </Flex>
          </Flex>

          {/* Secondary info container */}
          {review.review_type === 'Company' ? (
            <Flex w='100%' backgroundColor='#344CD0' color='white' mt='56px'>
              <Flex
                w='100%'
                overflow='hidden'
                justify='space-evenly'
                align='center'
                py='1%'
              >
                <Flex align='center' wrap='nowrap'>
                  <Image src={require('../../icons/clock.png')} background='#F2F6FE' borderRadius='100%' p='6px' size='2.5em' mr='15px' />
                  <Flex flexDir='column'>
                    <Flex as='h3' fontWeight='light' fontSize='md' isTruncated>
                      {review.typical_hours} hrs week
                  </Flex>
                    <Flex as='h3' fontWeight='light' fontSize='sm' isTruncated>
                      Working Hours
                    </Flex>
                  </Flex>
                </Flex>
                <Flex align='center' wrap='nowrap'>
                  <Image src={require('../../icons/dollar-sign.png')} background='#F2F6FE' borderRadius='100%' p='6px' size='2.5em' mr='15px' />
                  <Flex flexDir='column'>
                    <Flex as='h3' fontWeight='light' fontSize='md' isTruncated>
                      ${review.salary}
                    </Flex>
                    <Flex as='h3' fontWeight='light' fontSize='sm' isTruncated>
                      Salary
                    </Flex>
                  </Flex>
                </Flex>
                <Flex align='center' wrap='nowrap'>
                  <Image src={require('../../icons/user-check.png')} background='#F2F6FE' borderRadius='100%' p='6px' size='2.5em' mr='15px' />
                  <Flex flexDir='column'>
                    <Flex as='h3' fontWeight='light' fontSize='md' isTruncated>
                      {review.work_status}
                    </Flex>
                    <Flex as='h3' fontWeight='light' fontSize='sm' isTruncated>
                      Status
                    </Flex>
                  </Flex>
                </Flex>
                <Flex align='center' wrap='nowrap'>
                  <Image src={require('../../icons/calendar.png')} background='#F2F6FE' borderRadius='100%' p='6px' size='2.5em' mr='15px' />
                  <Flex flexDir='column'>
                    <Flex as='h3' fontWeight='light' fontSize='md' isTruncated>
                      {review.start_date} - {review.end_date}
                    </Flex>
                    <Flex as='h3' fontWeight='light' fontSize='sm' isTruncated>
                      Date
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          ) : review.review_type === 'Interview' ? (
            <Flex w='100%' backgroundColor='#344CD0' color='white' mt='4%'>
              <Flex
                w='100%'
                overflow='hidden'
                justify='space-evenly'
                align='center'
                py='1%'
              >
                <Flex align='center' wrap='nowrap'>
                  <Image src={require('../../icons/difficulty.png')} background='#F2F6FE' borderRadius='100%' p='6px' size='2.5em' mr='15px' />
                  <Flex flexDir='column'>
                    {review.difficulty_rating === 5 ? (
                      <Flex as='h3' fontWeight='light' fontSize='md' isTruncated>
                        Very Hard
                      </Flex>
                    ) : review.difficulty_rating === 4 ? (
                      <Flex as='h3' fontWeight='light' fontSize='md' isTruncated>
                        Somewhat Hard
                      </Flex>
                    ) : review.difficulty_rating === 3 ? (
                      <Flex as='h3' fontWeight='light' fontSize='md' isTruncated>
                        Somewhat Easy
                      </Flex>
                    ) : review.difficulty_rating === 2 ? (
                      <Flex as='h3' fontWeight='light' fontSize='md' isTruncated>
                        Easy
                      </Flex>
                    ) : review.difficulty_rating === 1 ? (
                      <Flex as='h3' fontWeight='light' fontSize='md' isTruncated>
                        Very Easy
                      </Flex>
                    ) : null}
                    <Flex as='h3' fontWeight='light' fontSize='sm' isTruncated>
                      Interview Hardness
                  </Flex>
                  </Flex>
                </Flex>
                <Flex align='center' wrap='nowrap'>
                  <Image src={require('../../icons/dollar-sign.png')} background='#F2F6FE' borderRadius='100%' p='6px' size='2.5em' mr='15px' />
                  <Flex flexDir='column'>
                    <Flex as='h3' fontWeight='light' fontSize='md' isTruncated>
                      ${review.salary}
                    </Flex>
                    <Flex as='h3' fontWeight='light' fontSize='sm' isTruncated>
                      Salary
                  </Flex>
                  </Flex>
                </Flex>
                <Flex align='center' wrap='nowrap'>
                  {review.offer_status === 'Offer Accepted' ? (
                    <Image src={require('../../icons/thumbs-up.png')} background='#F2F6FE' borderRadius='100%' p='6px' size='2.5em' mr='15px' />
                  ) : review.offer_status === 'Offer Declined' || 'No Offer' ? (
                    <Image src={require('../../icons/thumbs-down.png')} background='#F2F6FE' borderRadius='100%' p='6px' size='2.5em' mr='15px' />
                  ) : null}
                  <Flex flexDir='column'>
                    <Flex as='h3' fontWeight='light' fontSize='md' isTruncated>
                      {review.offer_status}
                    </Flex>
                    <Flex as='h3' fontWeight='light' fontSize='sm' isTruncated>
                      Job Offer
                  </Flex>
                  </Flex>
                </Flex>
                <Flex align='center' wrap='nowrap'>
                  <Image src={require('../../icons/rounds.png')} background='#F2F6FE' borderRadius='100%' p='6px' size='2.5em' mr='15px' />
                  <Flex flexDir='column'>
                    <Flex as='h3' fontWeight='light' fontSize='md' isTruncated>
                      {review.interview_rounds} Rounds
                    </Flex>
                    <Flex as='h3' fontWeight='light' fontSize='sm' isTruncated>
                      Interview Rounds
                  </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          ) : null}

          {/* Middle container */}
          {review.review_type === 'Interview' ? (
            <Flex
              as='h2'
              fontWeight='medium'
              fontSize='xl'
              w='100%'
              mt='2%'
              px='8%'
              overflow='hidden'
            >
              Interviews
            </Flex>
          ) : null}
          {review.review_type === 'Interview' ? (
            <Flex
              justify='space-between'
              wrap='wrap'
              whiteSpace='nowrap'
              px='8%'
            >
              {review.phone_interview ? (
                <Flex as='p' bg='#F2F6FE' px='1%' mt='1.5%'>
                  Phone Screening
                </Flex>
              ) : null}
              {review.resume_review ? (
                <Flex as='p' bg='#F2F6FE' px='1%' mt='1.5%'>
                  Resume Review
                </Flex>
              ) : null}
              {review.take_home_assignments ? (
                <Flex as='p' bg='#F2F6FE' px='1%' mt='1.5%'>
                  Take Home Assignments
                </Flex>
              ) : null}
              {review.online_coding_assignments ? (
                <Flex as='p' bg='#F2F6FE' px='1%' mt='1.5%'>
                  Online Coding Assignments
                </Flex>
              ) : null}
              {review.portfolio_review ? (
                <Flex as='p' bg='#F2F6FE' px='1%' mt='1.5%'>
                  Portfolio Review
                </Flex>
              ) : null}
              {review.screen_share ? (
                <Flex as='p' bg='#F2F6FE' px='1%' mt='1.5%'>
                  Screen Share
                </Flex>
              ) : null}
              {review.open_source_contribution ? (
                <Flex as='p' bg='#F2F6FE' px='1%' mt='1.5%'>
                  Open Source Contribution
                </Flex>
              ) : null}
              {review.side_projects ? (
                <Flex as='p' bg='#F2F6FE' px='1%' mt='1.5%'>
                  Side Projects
                </Flex>
              ) : null}
            </Flex>
          ) : null}

          {/* Review container */}
          <Flex
            as='p'
            w='100%'
            wrap='nowrap'
            overflow='hidden'
            pt='2%'
            px='8%'
            align='center'
          >
            {review.comment}
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
        width={[
          '100%', // base
          '100%', // 480px upwards
          '100%', // 768px upwards
          '45%' // 992px upwards
        ]}
        mt='3%'
        mx='2.5%'
        px='4%'
        py='2%'
        background='#F2F6FE'
        borderRadius='12px'
        display='flex'
        flexDir='column'
        justifyContent='center'
        alignItems='center'
        _hover={{ bg: '#4EADF9', color: 'white' }}
        onClick={onOpen}
      >
        {/* Review content container */}
        <Flex width='100%' justifyContent='flex-end' mb='2%'>
          <Badge
            backgroundColor='#95C8D8'
            color='white'
            fontSize='1em'
            fontWeight='light'
            rounded='full'
            px='15px'
            overflow='hidden'
          >
            {review.review_type}
          </Badge>
          <Badge
            backgroundColor='#344CD0'
            color='white'
            fontSize='1em'
            fontWeight='light'
            rounded='full'
            px='15px'
            overflow='hidden'
            ml='10px'
          >
            {review.track_name}
          </Badge>
        </Flex>

        {/* Review content container */}
        <Flex flexDir='column'>
          {/* headline line container  */}
          <Flex w='100%' h='100px'>
            {/* avatar box */}
            <Box justify='center' align='center' h='88px' mr='36px'>
              <Avatar size='xl' src={`//logo.clearbit.com/${review.logo}`} />
            </Box>
            {/* tag container */}
            <Flex w='100%' h='32px' wrap='wrap'>
              <Flex
                as='h2'
                w='100%'
                align='center'
                overflow='hidden'
                isTruncated
              >
                {review.company_name}
              </Flex>
              <Flex width='100%'>
                <Flex as='h4' align='center'>
                  {review.overall_rating}.0
                </Flex>
                <Flex align='center'>
                  {Array(5)
                    .fill('')
                    .map((_, i) => (
                      <Icon
                        name='star'
                        key={i}
                        color={i < review.overall_rating ? '#344CD0' : 'gray.300'}
                        ml='8%'
                      />
                    ))}
                </Flex>
              </Flex>
              <Flex as='p' w='100%' fontWeight='light'>
                Position: {review.job_title}
              </Flex>
            </Flex>
          </Flex>

          {/* Second main container */}
          <Flex
            w='100%'
            font-size='18'
            fontWeight='light'
            justify='space-evenly'
            align='center'
            mb='1%'
          >
            <Flex align='center'>
              <Box as={FaRegMoneyBillAlt} mr='10px'></Box>
              <Flex as='p' overflow='hidden'>
                ${review.salary}
              </Flex>
            </Flex>
            <Flex align='center'>
              <Box as={GoLocation} mr='10px'></Box>
              <Flex as='p'>
                {review.city}, {review.state_name}
              </Flex>
            </Flex>

            {review.review_type === 'Company' ? (
              <Flex align='center'>
                <Box as={FaRegClock} mr='10px'></Box>
                <Flex as='p'>
                  {review.start_date}-{review.end_date}
                </Flex>
              </Flex>
            ) : review.review_type === 'Interview' ? (
              <Flex align='center'>
                {review.offer_status === 'Offer Accepted' ? (
                  <Box as={FaThumbsUp} mr='10px'></Box>
                ) : review.offer_status === 'Offer Declined' || 'No Offer' ? (
                  <Box as={FaThumbsDown} mr='10px'></Box>
                ) : null}
                <Flex as='p'>
                  {review.offer_status}
                </Flex>
              </Flex>
            ) : null}
          </Flex>
        </Flex>

        {/* summary container */}
        <Flex w='100%' h='95px' overflow='hidden'>
          <p>{review.comment}</p>
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
export default connect(mapStateToProps, deleteReview)(ReviewCard);
