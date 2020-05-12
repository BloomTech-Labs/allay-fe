import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";

import BlockButton from "./AdminButtons/BlockButton";
import ContentButton from "./AdminButtons/ContentButton";
import ReactGA from "react-ga";
// actions
import deleteReview from "../../state/actions/index";

// styles
import {
  Box,
  SlideIn,
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
} from "@chakra-ui/core";
import { GoLocation } from "react-icons/go";
import { FaRegBuilding } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";

const ReviewCard = ({ review, history, deleteReview, isAdmin }) => {
  //deletes the review in question
  const submitDelete = (user_id, review_id) => {
    if (review.user_id && review.review_id) {
      deleteReview(review.user_id, review.review_id).then(() => {
        // window.location.reload();
        history.push("/dashboard");
      });
    } else {
      deleteReview(user_id, review_id).then(() => {
        // window.location.reload();
        history.push("/dashboard");
      });
    }

    ReactGA.event({
      category: "Review Delete",
      action: `Submit delete`,
    });
  };
  useEffect(() => {}, [submitDelete]);
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
  const loginId = localStorage.getItem("userId");

  // specifically for the cancel review delete button functionality
  const [isOpen2, setIsOpen2] = useState();
  const onClose2 = () => setIsOpen2(false);
  const cancelRef = useRef();

  //routes to single review
  const navToEditRoute = () => {
    if (review.review_type === "Company") {
      history.push(`/dashboard/review/${review.review_id}`);
    } else {
      history.push(`/dashboard/interview/${review.review_id}`);
    }
  };

  //routes to user's profile page
  const navToProfile = (e) => {
    e.preventDefault();
    history.push(`/profile/${review.user_id}`);
  };

  // adjust logo for api call
  const adjustedName = review.company_name.replace(" ", "+");

  // adjust date of posting
  let tempDate = new Date(review.created_at).toUTCString();
  const tempDay = tempDate.split(" ").slice(1, 2);
  const tempMonth = tempDate.split(" ").slice(2, 3);
  const tempYear = tempDate.split(" ").slice(3, 4);
  const adjustedDate = `${tempMonth} ${tempDay}, ${tempYear}`;

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
              style={{ cursor: "pointer" }}
            >
              {review.user_profile_image === "h" ? (
                <Image
                  size="40px"
                  mr="7px"
                  style={{ opacity: "0.6" }}
                  src={require("../../icons/user.svg")}
                />
              ) : (
                <Image
                  size="40px"
                  mr="7px"
                  style={{ opacity: "0.6", borderRadius: "50%" }}
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
                src={`//logo.clearbit.com/${review.logo}?size=150`}
                fallbackSrc={require("../../icons/placeholder-logo-2.png")}
              />
              <Flex mt="13px">
                {Array(5)
                  .fill("")
                  .map((_, i) => (
                    <Icon
                      name="star"
                      key={i}
                      color={i < review.overall_rating ? "#F9DC76" : "#DADADD"}
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
                {review.review_type === "Company" ? (
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
                  {review.review_type === "Company"
                    ? "Status"
                    : "Interview difficulty"}
                </Text>
              </Flex>
              <Flex
                direction="column"
                justify="flex-start"
                align="flex-start"
                mb="20px"
              >
                {review.review_type === "Company" ? (
                  <Text
                    color="#131C4C"
                    fontSize="18px"
                    fontFamily="Muli"
                    fontWeight="bold"
                  >
                    {review.start_date} -{" "}
                    {review.end_date ? review.end_date : "Present"}
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
                  {review.review_type === "Company" ? "Dates" : "Job offer?"}
                </Text>
              </Flex>
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
                  {review.review_type === "Company"
                    ? "Company Review"
                    : "Interview Review"}
                </Text>
                <Badge
                  backgroundColor={
                    review.track_name === "WEB"
                      ? "#DBEBFD"
                      : review.track_name === "iOS"
                      ? "#F4E6BE"
                      : review.track_name === "UX"
                      ? "#F9E3DE"
                      : review.track_name === "DS"
                      ? "#D3F2CD"
                      : review.track_name === "Android"
                      ? "#E9D9FF"
                      : "#DBEBFD"
                  }
                  color={
                    review.track_name === "WEB"
                      ? "#474EA7"
                      : review.track_name === "iOS"
                      ? "#8E3D19"
                      : review.track_name === "UX"
                      ? "#9F3A5A "
                      : review.track_name === "DS"
                      ? "#35694F"
                      : review.track_name === "Android"
                      ? "#4B3569"
                      : "#474EA7"
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
            {review.review_type === "Interview" ? (
              <Flex color="#9194A8" fontSize="14px" fontFamily="Muli">
                Interviews
              </Flex>
            ) : null}
            {review.review_type === "Interview" ? (
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
        width={[
          "100%", // base
          "100%", // 480px upwards
          "100%", // 768px upwards
          "45%", // 992px upwards
        ]}
        mb="3%"
        mx="2.5%"
        px="4%"
        py="2%"
        background="#F2F6FE"
        borderRadius="12px"
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        _hover={{ bg: "#E9F0FF" }}
        onClick={onOpen}
        data-cy="modalCard"
      >
        {/* Review content container */}
        <Flex width="100%" justifyContent="flex-end" mb="2%">
          {newTag ? (
            <>
              <Badge
                rounded="full"
                color="#494B5B"
                fontSize="1em"
                fontWeight="light"
                px="15px"
                overflow="hidden"
                variantColor="teal"
              >
                New
              </Badge>
            </>
          ) : null}
          <Badge
            backgroundColor="#95C8D8"
            color="white"
            fontSize="1em"
            fontWeight="light"
            rounded="full"
            px="15px"
            ml="10px"
            overflow="hidden"
          >
            {review.review_type}
          </Badge>
          <Badge
            backgroundColor="#344CD0"
            color="white"
            fontSize="1em"
            fontWeight="light"
            rounded="full"
            px="15px"
            overflow="hidden"
            ml="10px"
          >
            {review.track_name}
          </Badge>
        </Flex>

        {/* Review content container */}
        <Flex flexDir="column">
          {/* headline container  */}
          <Flex maxW="530px" h="100px">
            {/* avatar box */}
            <Box justify="center" align="center" h="88px" mr="40px">
              <Avatar size="xl" src={`//logo.clearbit.com/${review.logo}`} />
            </Box>
            {/* tag container */}
            <Flex maxW="391px" h="32px" wrap="wrap">
              <Flex
                as="h2"
                maxW="400px"
                align="center"
                overflow="hidden"
                isTruncated
              >
                {review.company_name}
              </Flex>
              <Flex width="100%">
                <Flex as="h4" align="center">
                  {review.overall_rating}.0
                </Flex>
                <Flex align="center">
                  {Array(5)
                    .fill("")
                    .map((_, i) => (
                      <Icon
                        name="star"
                        key={i}
                        color={
                          i < review.overall_rating ? "#344CD0" : "gray.300"
                        }
                        ml="8%"
                      />
                    ))}
                </Flex>
              </Flex>
              <Flex as="p" w="100%" fontWeight="light">
                Position: {review.job_title}
              </Flex>
            </Flex>
          </Flex>

          {/* Second main container */}
          <Flex
            w="100%"
            font-size="18"
            fontWeight="light"
            justify="space-evenly"
            align="center"
            my="4%"
          >
            <Flex align="center">
              <Image
                src={require("../../icons/dollar-sign.png")}
                size="1.5em"
              />
              <Flex as="p" overflow="hidden">
                {review.salary}.00
              </Flex>
            </Flex>

            <Flex align="center">
              <Image
                src={require("../../icons/map-pin.png")}
                size="1.5em"
                mr="5px"
              />
              <Flex as="p">
                {review.city}, {review.state_name}
              </Flex>
            </Flex>

            {review.review_type === "Company" ? (
              <Flex align="center">
                <Image
                  src={require("../../icons/clock.png")}
                  size="1.5em"
                  mr="5px"
                />
                <Flex as="p">
                  {review.start_date}-{review.end_date}
                </Flex>
              </Flex>
            ) : review.review_type === "Interview" ? (
              <Flex align="center">
                {review.offer_status === "Offer Accepted" ? (
                  <Image
                    src={require("../../icons/thumbs-up.png")}
                    size="1.5em"
                    mr="5px"
                  />
                ) : review.offer_status === "Offer Declined" || "No Offer" ? (
                  <Image
                    src={require("../../icons/thumbs-down.png")}
                    size="1.5em"
                    mr="5px"
                  />
                ) : null}
                <Flex as="p">{review.offer_status}</Flex>
              </Flex>
            ) : null}
          </Flex>
        </Flex>

        {/* summary container */}
        <Flex w="100%" h="95px" overflow="hidden">
          <p>{review.comment}</p>
        </Flex>
        {/* {admin action buttons} */}
      </PseudoBox>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    reviewDeleted: state.review.reviewDeleted,
    isAdmin: state.auth.isAdmin,
  };
};
export default connect(mapStateToProps, deleteReview)(ReviewCard);
