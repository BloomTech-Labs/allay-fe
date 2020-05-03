import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Flex,
  Box,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionPanel
} from "@chakra-ui/core";

export const ProfilePageReview = ({ userReviews }) => {
  const isLoading = useSelector(state => state.user.isLoading);
  return (
    <Flex justify="center" mt=".5%">
      {!isLoading ? (
        <Box
          width="1048px"
          style={{ border: "1px solid #e6e5e5", padding: "3%" }}
        >
          {userReviews && userReviews.length > 0 ? (
            <AccordionItem width="816px" style={{ margin: "0 auto" }}>
              <AccordionHeader
                style={{ borderRadius: "10px " }}
                _expanded={{ bg: "#007F00", color: "white" }}
              >
                <Box flex="1" textAlign="left">
                  <span
                    style={{
                      borderRadius: "35%",
                      backgroundColor: "#a5a5a5",
                      padding: ".5%"
                    }}
                  >
                    Interview
                  </span>{" "}
                  posted 01/01/2020
                </Box>
                <AccordionIcon />
              </AccordionHeader>
              <AccordionPanel>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </AccordionPanel>
            </AccordionItem>
          ) : (
            <span>no reviews</span>
          )}
        </Box>
      ) : (
        <h1>still loading</h1>
      )}
    </Flex>
  );
};
