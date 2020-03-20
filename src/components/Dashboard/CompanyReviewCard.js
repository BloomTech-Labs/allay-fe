// previously ReviewList
import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import ReactGA from 'react-ga';
// actions
import getCompanyReview from '../../state/actions/index';
import deleteCompanyReview from '../../state/actions/index';

// icons
import {
  TiCalendar
} from 'react-icons/ti';
import {
  FiThumbsUp
} from 'react-icons/fi';
import {
  MdPerson
} from 'react-icons/md';
import {
  FaDollarSign,
  FaRegClock,
  FaRegMoneyBillAlt
} from 'react-icons/fa';
import {
  GoLocation
} from 'react-icons/go';

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

const ReviewCard = ({ review, reviewDeleted, history, deleteCompanyReview }) => {
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
    history.push(`/dashboard/${review.company_review_id}`);
  };

  //deletes the review in question
  const submitDelete = () => {
    deleteCompanyReview(review.user_id, review.company_review_id).then(() => {
      window.location.reload()
      // history.push('/dashboard')
      toast({
        title: 'Review Deleted',
        description: `We've successfully deleted your review for you`,
        status: 'success',
        duration: 5000,
        isClosable: true
      })
    })

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
  }

  return (
    <>
      {/* ------------------------------------------------------------------------------------------------ */}
      {/* ---------------------------------------Modal Cards---------------------------------------------- */}
      {/* ------------------------------------------------------------------------------------------------ */}
      <Modal isOpen={isOpen} onClose={onClose} size='80%'>
        <ModalOverlay />
        <ModalContent w='100%' py='3%' wrap='nowrap'>
          <ModalCloseButton background='none' border='none' />

          {/* Basic info container */}
          <Flex flexDir={{ lg: 'row', sm: 'column' }} align='center' mx='8%'>
            <Flex align='center'>
              <Avatar size='2xl' src={`//logo.clearbit.com/${review.domain}`} />
            </Flex>
            <Flex flexDir='column' pl={{ lg: '8%', sm: '0%' }} width='100%'>
              <Flex as='h2' w='100%' align='center' justify={{ lg: 'flex-start', sm: 'center' }} wrap='nowrap'>
                {review.company_name}
              </Flex>
              <Flex justify='space-between'>
                <Flex flexDir='column'>
                  <Flex fontSize='small' fontWeight='light' color='#9194A8'>
                    Location
                  </Flex>
                  <Flex>
                    Mountain View, CA
                  </Flex>
                </Flex>
                <Flex flexDir='column'>
                  <Flex fontSize='small' fontWeight='light' color='#9194A8'>
                    Job Title
                  </Flex>
                  <Flex>
                    {review.job_title}
                  </Flex>
                </Flex>
                <Flex flexDir='column'>
                  <Flex fontSize='small' fontWeight='light' color='#9194A8'>
                    Rating
                  </Flex>
                  <Flex>
                    Company Rating
                    <Flex>
                      {Array(5)
                        .fill('')
                        .map((_, i) => (
                          <Icon
                            name='star'
                            key={i}
                            color={i < review.job_rating ? 'black' : 'gray.300'}
                            ml='5px'
                          />
                        ))}
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>

          {/* Secondary info container */}
          <Flex w='100%' backgroundColor='#344CD0' color='white' mt='4%'>
            <Flex w='100%' overflow='hidden' justify='space-evenly' align='center' py='1%'>
              <Flex align='center' wrap='nowrap'>
                <Box as={FaDollarSign} size='2em' mr='5px'></Box>
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
                <Box as={FiThumbsUp} size='2em' mr='5px'></Box>
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
                <Box as={MdPerson} size='2em' mr='5px'></Box>
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
                <Box as={TiCalendar} size='2em' mr='5px'></Box>
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

          {/* Topics container */}
          <Flex
            as='h2'
            fontWeight='medium'
            fontSize='xl'
            w='100%'
            mt='2%'
            mb='1.5%'
            px='8%'
            overflow='hidden'
          >
            Topics
					</Flex>
          <Flex justify='space-between' wrap='wrap' whiteSpace='nowrap' mb='2%' px='8%'>
            <Flex as='p' bg='#F2F6FE' px='1%' mb='1.5%'>
              Career Growth
						</Flex>
            <Flex as='p' bg='#F2F6FE' px='1%' mb='1.5%'>
              Benefits
						</Flex>
            <Flex as='p' bg='#F2F6FE' px='1%' mb='1.5%'>
              Salary
						</Flex>
            <Flex as='p' bg='#F2F6FE' px='1%' mb='1.5%'>
              Company Culture
						</Flex>
            <Flex as='p' bg='#F2F6FE' px='1%' mb='1.5%'>
              Another Cool Thing
						</Flex>
          </Flex>

          {/* Review container */}
          <Flex as='p' w='100%' wrap='nowrap' overflow='hidden' px='8%' align='center'>
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
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Delete Review
								</AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure? You can't undo this action afterwards.
								</AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose2}>
                    Cancel
									</Button>
                  <Button
                    variantColor="red"
                    ml={3}
                    onClick={submitDelete}
                  >
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
          "100%", // base
          "100%", // 480px upwards
          "100%", // 768px upwards
          "45%" // 992px upwards
        ]}
        mt='3%'
        mx='2.5%'
        px='4%'
        py='2%'
        background='#FBFCFF'
        borderRadius='12px'
        display='flex'
        flexDir='column'
        justifyContent='center'
        alignItems='center'
        _hover={{ bg: '#4EADF9', color: 'white' }}
        onClick={onOpen}
      >
        {/* Review content container */}
        <Flex
          width='100%'
          justifyContent='flex-end'
        >
          <Badge
            backgroundColor='#344CD0'
            color='white'
            fontSize='1em'
            fontWeight='light'
            rounded="full"
            px='15px'
            overflow='hidden'
          >
            Web
          </Badge>
        </Flex>

        {/* Review content container */}
        <Flex flexDir='column' >
          {/* headline line container  */}
          <Flex w='100%' h='100px' >
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
                overflow='hidden'
                isTruncated
              >
                {review.company_name} company review
							</Flex>
              <Flex width='100%'>
                <Flex as='h4' align='center'>
                  {review.job_rating}.0
								</Flex>
                <Flex align='center'>
                  {Array(5)
                    .fill('')
                    .map((_, i) => (
                      <Icon
                        name='star'
                        key={i}
                        color={i < review.job_rating ? '#344CD0' : 'gray.300'}
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
                MISSING LOCATION
              </Flex>
            </Flex>
            <Flex align='center'>
              <Box as={FaRegClock} mr='10px'></Box>
              <Flex as='p'>
                {review.start_date}-{review.end_date}
              </Flex>
            </Flex>
          </Flex>

          {/* summary container */}
          <Flex w='100%' h='95px' overflow='hidden'>
            <p>{review.comment}</p>
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
export default connect(mapStateToProps, deleteCompanyReview)(ReviewCard);