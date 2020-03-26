import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import ReactGA from 'react-ga';
// actions
import deleteReview from '../../state/actions/index';

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
  useDisclosure
} from '@chakra-ui/core';

const ReviewCard = ({ review, history, deleteReview }) => {
  // NEW post tag logic
  const [newTag, setNewTag] = useState(false);
  // get server time and set to readable
  var serverDay = new Date(review.created_at).getDay();
  //get local time and set to readable
  var localTime = Date.now();
  let today = new Date(localTime).getDay();
  //logic to set view state
  useEffect(() => {
    if (serverDay === today) {
      setNewTag(true);
    } else {
      setNewTag(false);
    }
  }, [newTag, serverDay, today]);

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
    });
    ReactGA.event({
      category: 'Review Delete',
      action: `Submit delete`
    });
  };

  return (
    <>
      {/* ------------------------------------------------------------------------------------------------ */}
      {/* ---------------------------------------Modal Cards (for edit)----------------------------------- */}
      {/* ------------------------------------------------------------------------------------------------ */}
      <Modal isOpen={isOpen} onClose={onClose} size='80%'>
        <ModalOverlay />
        <ModalContent w='100%' wrap='nowrap'>
          <ModalCloseButton background='none' border='none' />

          {/* Basic info container */}
          <Flex
            flexDir={{ lg: 'row', sm: 'column' }}
            align='center'
            mx='8%'
            mt='56px'
          >
            <Flex flexDir='column' width='100%'>
              <Flex
                as='h2'
                maxW='100%'
                align='center'
                justify={{ lg: 'flex-start', sm: 'center' }}
                wrap='nowrap'
                isTruncated='true'
              >
                {review.company_name}
              </Flex>
              <Flex justify='space-between'>
                <Flex flexDir='column'>
                  <Flex fontSize='small' fontWeight='light' color='#9194A8'>
                    Location
                  </Flex>
                  <Flex>
                    {review.city}, {review.state_name}
                  </Flex>
                </Flex>
                <Flex flexDir='column'>
                  <Flex fontSize='small' fontWeight='light' color='#9194A8'>
                    Job title
                  </Flex>
                  <Flex>{review.job_title}</Flex>
                </Flex>

                {review.review_type === 'Company' ? (
                  <Flex flexDir='column'>
                    <Flex fontSize='small' fontWeight='light' color='#9194A8'>
                      Company rating
                    </Flex>
                    <Flex>
                      {Array(5)
                        .fill('')
                        .map((_, i) => (
                          <Icon
                            name='star'
                            key={i}
                            color={
                              i < review.overall_rating ? '#344CD0' : 'gray.300'
                            }
                            ml='4px'
                          />
                        ))}
                    </Flex>
                  </Flex>
                ) : review.review_type === 'Interview' ? (
                  <Flex flexDir='column'>
                    <Flex fontSize='small' fontWeight='light' color='#9194A8'>
                      Overall experience
                    </Flex>
                    <Flex>
                      {Array(5)
                        .fill('')
                        .map((_, i) => (
                          <Icon
                            name='star'
                            key={i}
                            color={
                              i < review.overall_rating ? '#344CD0' : 'gray.300'
                            }
                            ml='4px'
                          />
                        ))}
                    </Flex>
                  </Flex>
                ) : null}
              </Flex>
            </Flex>
            <Flex align='center' ml='8%' mr='20%'>
              <Avatar size='lrg' src={`//logo.clearbit.com/${review.logo}`} />
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
                  <Image
                    src={require('../../icons/clock-blue.png')}
                    background='#F2F6FE'
                    borderRadius='100%'
                    p='6px'
                    size='2.5em'
                    mr='15px'
                  />
                  <Flex flexDir='column'>
                    <Flex as='h3' fontWeight='light' fontSize='md' isTruncated>
                      {review.typical_hours} hrs week
                    </Flex>
                    <Flex as='h3' fontWeight='light' fontSize='sm' isTruncated>
                      Working hours
                    </Flex>
                  </Flex>
                </Flex>
                <Flex align='center' wrap='nowrap'>
                  <Image
                    src={require('../../icons/dollar-sign-blue.png')}
                    background='#F2F6FE'
                    borderRadius='100%'
                    p='6px'
                    size='2.5em'
                    mr='15px'
                  />
                  <Flex flexDir='column'>
                    <Flex as='h3' fontWeight='light' fontSize='md' isTruncated>
                      ${review.salary}.00
                    </Flex>
                    <Flex as='h3' fontWeight='light' fontSize='sm' isTruncated>
                      Salary
                    </Flex>
                  </Flex>
                </Flex>
                <Flex align='center' wrap='nowrap'>
                  <Image
                    src={require('../../icons/user-check-blue.png')}
                    background='#F2F6FE'
                    borderRadius='100%'
                    p='6px'
                    size='2.5em'
                    mr='15px'
                  />
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
                  <Image
                    src={require('../../icons/calendar-blue.png')}
                    background='#F2F6FE'
                    borderRadius='100%'
                    p='6px'
                    size='2.5em'
                    mr='15px'
                  />
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
                  <Image
                    src={require('../../icons/difficulty-blue.png')}
                    background='#F2F6FE'
                    borderRadius='100%'
                    p='6px'
                    size='2.5em'
                    mr='15px'
                  />
                  <Flex flexDir='column'>
                    {review.difficulty_rating === 5 ? (
                      <Flex
                        as='h3'
                        fontWeight='light'
                        fontSize='md'
                        isTruncated
                      >
                        Very hard
                      </Flex>
                    ) : review.difficulty_rating === 4 ? (
                      <Flex
                        as='h3'
                        fontWeight='light'
                        fontSize='md'
                        isTruncated
                      >
                        Somewhat hard
                      </Flex>
                    ) : review.difficulty_rating === 3 ? (
                      <Flex
                        as='h3'
                        fontWeight='light'
                        fontSize='md'
                        isTruncated
                      >
                        Somewhat easy
                      </Flex>
                    ) : review.difficulty_rating === 2 ? (
                      <Flex
                        as='h3'
                        fontWeight='light'
                        fontSize='md'
                        isTruncated
                      >
                        Easy
                      </Flex>
                    ) : review.difficulty_rating === 1 ? (
                      <Flex
                        as='h3'
                        fontWeight='light'
                        fontSize='md'
                        isTruncated
                      >
                        Very easy
                      </Flex>
                    ) : null}
                    <Flex as='h3' fontWeight='light' fontSize='sm' isTruncated>
                      Interview difficulty
                    </Flex>
                  </Flex>
                </Flex>
                <Flex align='center' wrap='nowrap'>
                  <Image
                    src={require('../../icons/dollar-sign-blue.png')}
                    background='#F2F6FE'
                    borderRadius='100%'
                    p='6px'
                    size='2.5em'
                    mr='15px'
                  />
                  <Flex flexDir='column'>
                    <Flex as='h3' fontWeight='light' fontSize='md' isTruncated>
                      ${review.salary}.00
                    </Flex>
                    <Flex as='h3' fontWeight='light' fontSize='sm' isTruncated>
                      Salary
                    </Flex>
                  </Flex>
                </Flex>
                <Flex align='center' wrap='nowrap'>
                  {review.offer_status === 'Offer Accepted' ? (
                    <Image
                      src={require('../../icons/thumbs-up-blue.png')}
                      background='#F2F6FE'
                      borderRadius='100%'
                      p='6px'
                      size='2.5em'
                      mr='15px'
                    />
                  ) : review.offer_status === 'Offer Declined' || 'No Offer' ? (
                    <Image
                      src={require('../../icons/thumbs-down-blue.png')}
                      background='#F2F6FE'
                      borderRadius='100%'
                      p='6px'
                      size='2.5em'
                      mr='15px'
                    />
                  ) : null}
                  <Flex flexDir='column'>
                    <Flex as='h3' fontWeight='light' fontSize='md' isTruncated>
                      {review.offer_status}
                    </Flex>
                    <Flex as='h3' fontWeight='light' fontSize='sm' isTruncated>
                      Job offer
                    </Flex>
                  </Flex>
                </Flex>
                <Flex align='center' wrap='nowrap'>
                  <Image
                    src={require('../../icons/rounds-blue.png')}
                    background='#F2F6FE'
                    borderRadius='100%'
                    p='6px'
                    size='2.5em'
                    mr='15px'
                  />
                  <Flex flexDir='column'>
                    <Flex as='h3' fontWeight='light' fontSize='md' isTruncated>
                      {review.interview_rounds} Rounds
                    </Flex>
                    <Flex as='h3' fontWeight='light' fontSize='sm' isTruncated>
                      Interview rounds
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
            <Flex justify='flex-start' wrap='wrap' whiteSpace='nowrap' px='8%'>
              {review.phone_interview ? (
                <Flex as='p' bg='#F2F6FE' px='1%' mt='1.5%' mr='3%'>
                  Phone screening
                </Flex>
              ) : null}
              {review.resume_review ? (
                <Flex as='p' bg='#F2F6FE' px='1%' mt='1.5%' mr='3%'>
                  Resume review
                </Flex>
              ) : null}
              {review.take_home_assignments ? (
                <Flex as='p' bg='#F2F6FE' px='1%' mt='1.5%' mr='3%'>
                  Take home assignments
                </Flex>
              ) : null}
              {review.online_coding_assignments ? (
                <Flex as='p' bg='#F2F6FE' px='1%' mt='1.5%' mr='3%'>
                  Online coding assignments
                </Flex>
              ) : null}
              {review.portfolio_review ? (
                <Flex as='p' bg='#F2F6FE' px='1%' mt='1.5%' mr='3%'>
                  Portfolio review
                </Flex>
              ) : null}
              {review.screen_share ? (
                <Flex as='p' bg='#F2F6FE' px='1%' mt='1.5%' mr='3%'>
                  Screen share
                </Flex>
              ) : null}
              {review.open_source_contribution ? (
                <Flex as='p' bg='#F2F6FE' px='1%' mt='1.5%' mr='3%'>
                  Open source contribution
                </Flex>
              ) : null}
              {review.side_projects ? (
                <Flex as='p' bg='#F2F6FE' px='1%' mt='1.5%' mr='3%'>
                  Side projects
                </Flex>
              ) : null}
            </Flex>
          ) : null}

          {/* Edit/Delete container */}
          <Flex justify='flex-end' mt='2%' px='8%'>
            {Number(loginId) === Number(review.user_id) ? (
              <Image
                src={require('../../icons/edit.png')}
                onClick={navToEditRoute}
                cursor='pointer'
                size='1.5em'
                mr='12px'
                data-cy='editModalReview'
              />
            ) : null}
            {Number(loginId) === Number(review.user_id) ? (
              <Image
                src={require('../../icons/trash.png')}
                onClick={() => setIsOpen2(true)}
                cursor='pointer'
                size='1.5em'
                data-cy='deleteModalReview'
              />
            ) : null}
            <AlertDialog
              isOpen={isOpen2}
              leastDestructiveRef={cancelRef}
              onClose={onClose2}
            >
              <AlertDialogOverlay />
              <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                  Delete review
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure? You can't undo this action afterwards.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Flex
                    align='center'
                    justify='center'
                    height='56px'
                    width='30%'
                    color='#344CD0'
                    fontSize='16px'
                    fontWeight='bold'
                    ref={cancelRef}
                    onClick={onClose2}
                  >
                    Cancel
                  </Flex>
                  <Button
                    h='56px'
                    rounded='10px'
                    border='none'
                    color='white'
                    variantColor='red'
                    ml={3}
                    onClick={submitDelete}
                    data-cy='confirmDeleteModalReview'
                  >
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Flex>

          {/* Review container */}
          <Flex
            as='p'
            w='100%'
            wrap='nowrap'
            name='comment'
            overflow='hidden'
            pt='2%'
            px='8%'
            align='center'
          >
            {review.comment}
          </Flex>

          <ModalFooter></ModalFooter>
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
        mb='3%'
        mx='2.5%'
        px='4%'
        py='2%'
        background='#F2F6FE'
        borderRadius='12px'
        display='flex'
        flexDir='column'
        justifyContent='center'
        alignItems='center'
        _hover={{ bg: '#E9F0FF' }}
        onClick={onOpen}
        data-cy='modalCard'
      >
        {/* Review content container */}
        <Flex width='100%' justifyContent='flex-end' mb='2%'>
          {newTag ? (
            <>
              <Badge
                rounded='full'
                color='#494B5B'
                fontSize='1em'
                fontWeight='light'
                px='15px'
                overflow='hidden'
                variantColor='teal'
              >
                New
              </Badge>
            </>
          ) : null}
          <Badge
            backgroundColor='#95C8D8'
            color='white'
            fontSize='1em'
            fontWeight='light'
            rounded='full'
            px='15px'
            ml='10px'
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
          {/* headline container  */}
          <Flex maxW='530px' h='100px'>
            {/* avatar box */}
            <Box justify='center' align='center' h='88px' mr='40px'>
              <Avatar size='xl' src={`//logo.clearbit.com/${review.logo}`} />
            </Box>
            {/* tag container */}
            <Flex maxW='391px' h='32px' wrap='wrap'>
              <Flex
                as='h2'
                maxW='400px'
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
                        color={
                          i < review.overall_rating ? '#344CD0' : 'gray.300'
                        }
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
            my='4%'
          >
            <Flex align='center'>
              <Image
                src={require('../../icons/dollar-sign.png')}
                size='1.5em'
              />
              <Flex as='p' overflow='hidden'>
                {review.salary}.00
              </Flex>
            </Flex>

            <Flex align='center'>
              <Image
                src={require('../../icons/map-pin.png')}
                size='1.5em'
                mr='5px'
              />
              <Flex as='p'>
                {review.city}, {review.state_name}
              </Flex>
            </Flex>

            {review.review_type === 'Company' ? (
              <Flex align='center'>
                <Image
                  src={require('../../icons/clock.png')}
                  size='1.5em'
                  mr='5px'
                />
                <Flex as='p'>
                  {review.start_date}-{review.end_date}
                </Flex>
              </Flex>
            ) : review.review_type === 'Interview' ? (
              <Flex align='center'>
                {review.offer_status === 'Offer Accepted' ? (
                  <Image
                    src={require('../../icons/thumbs-up.png')}
                    size='1.5em'
                    mr='5px'
                  />
                ) : review.offer_status === 'Offer Declined' || 'No Offer' ? (
                  <Image
                    src={require('../../icons/thumbs-down.png')}
                    size='1.5em'
                    mr='5px'
                  />
                ) : null}
                <Flex as='p'>{review.offer_status}</Flex>
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
