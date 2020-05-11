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

  return (
    <>
      {/* ------------------------------------------------------------------------------------------------ */}
      {/* ---------------------------------------Modal Cards (for edit)----------------------------------- */}
      {/* ------------------------------------------------------------------------------------------------ */}

      <SlideIn in={isOpen}>
        {(styles) => (
          <Modal
            preserveScrollBarGap
            isOpen={true}
            onClose={onClose}
            size="80%"
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
                justify="space-evenly"
                align="center"
                w="30%"
                height="100%"
                top="0"
                left="0"
                bg="#F2F6FE"
                borderRadius="0px 40px 40px 0px"
              >
                <Flex justify="space-evenly" align="center">
                  <Image
                    size="50px"
                    style={{ opacity: "0.6" }}
                    src={require("../../icons/user.svg")}
                  />
                  <Text>By Caroline Preston</Text>
                </Flex>
                <Flex direction="column">
                  <Image src={`//logo.clearbit.com/${review.logo}`} />
                  <Flex>
                    {Array(5)
                      .fill("")
                      .map((_, i) => (
                        <Icon
                          name="star"
                          key={i}
                          color={
                            i < review.overall_rating ? "#F9DC76" : "#DADADD"
                          }
                          ml="4px"
                        />
                      ))}
                  </Flex>
                </Flex>
              </Flex>
              {/* RIGHT SIDE MODAL */}
              <Flex
                direction="column"
                justify="flex-start"
                align="center"
                ml="30%"
              ></Flex>

              {/* <ModalFooter>
            <BlockButton user_id={review.user_id} isAdmin={isAdmin} />
            <ContentButton
              isAdmin={isAdmin}
              submitDelete={submitDelete}
              user_id={review.user_id}
              review_id={review.review_id}
            />
          </ModalFooter> */}
            </ModalContent>
          </Modal>
        )}
      </SlideIn>

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
