import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import GridLoader from "react-spinners/GridLoader";
import {
  Flex,
  Image,
  SimpleGrid,
  Box,
  Avatar,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Link
} from "@chakra-ui/core";
import { getUser } from "../../../state/actions/userActions";
import { set } from "react-ga";

const ProfilePage = ({ match }) => {
  const id = match.params.id;
  ///
  // TODO:format the time and Date
  // / TODO: add portfolio field
  // TODO:resume and profile image needs to be a link not a google drive view
  // TODO:ask about the portfolio column and city or location object
  ///

  //Some randome styling//
  const _midSectionStyles = {
    width: "40%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0% 6% 0 3%",
    height: "40px"
  };
  const _emp = {
    padding: "0 0 0 22%",
    opacity: 0.5
  };
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.user.isLoading);
  const userData = useSelector(state => state.user.userData);
  // TODO:update the slack link for Mandi only
  const slackID = "W012JHX6LD8";
  const slackLink = `https://lambda-students.slack.com/app_redirect?channel=${slackID}`;

  //helper func to get the correct track name
  const track = ["arrayStartsWithZero :D", "android", "ds", "web", "ios", "ux"][
    userData.track_id
  ];

  return (
    <>
      {/* //Top Section */}
      <Flex Flex w="100%" height="84px" justify="center">
        <Flex
          maxW="1440px"
          w="100%"
          pt="1%"
          pr="3%"
          pl="3%"
          justify="space-between"
        >
          <Flex>
            <h1> Allay </h1>
          </Flex>
          <Flex>
            <Image
              size="50px"
              style={{ opacity: "0.6" }}
              src={require("../../../icons/user.svg")}
            />
          </Flex>
        </Flex>
      </Flex>

      {!isLoading ? (
        <>
          <Flex Flex w="100%" pt="3%" justify="center">
            <SimpleGrid width="1048px" columns={1}>
              <Box style={{ textAlign: "end", paddingRight: "1%" }}>
                <i
                  style={{ opacity: 0.3, paddingRight: "10px" }}
                  class="far fa-edit"
                ></i>
                Edit profile
              </Box>
              <Box
                style={{
                  borderRadius: "20px 20px 0 0",
                  display: "inline-flex"
                }}
                bg="#F7F9FF"
                height="220px"
              >
                <Flex w="20%" style={{ padding: "55px 0 0 90px" }}>
                  <Avatar
                    size="2xl"
                    name="user"
                    src={
                      "https://drive.google.com/file/d/0B6M_KioiSkDpSGkwZ25CN19ZYUE/view"
                    }
                  />
                </Flex>
                <Flex w="80%" pl="6%">
                  <SimpleGrid width="100%" row={2} pr="70px">
                    <Flex
                      height="113px"
                      style={{
                        display: "flex"
                      }}
                    >
                      <Box
                        height="27px"
                        style={{
                          alignSelf: "flex-end",
                          marginLeft: "42px"
                        }}
                      >
                        <h3
                          style={{
                            fontSize: "32px",
                            fontFamily: "Poppins",
                            color: " #131C4D"
                          }}
                        >
                          {userData.first_name} {userData.last_name}
                        </h3>
                      </Box>
                      <Box
                        width="43%"
                        height="53px"
                        style={{
                          display: "flex",
                          alignSelf: "flex-end",
                          alignItems: "baseline",
                          justifyContent: "space-between"
                        }}
                      >
                        <span
                          style={{
                            borderRadius: "20px",
                            width: "75px",
                            height: "36px",
                            backgroundColor: "#259BF8",
                            color: "#17171b",
                            fontSize: "16px",
                            textTransform: "uppercase",
                            textAlign: "center",
                            marginLeft: "15%",
                            paddingTop: "6px"
                          }}
                        >
                          {track}
                        </span>

                        <h6
                          style={{
                            fontFamily: "Muli",
                            fontWeight: 300
                          }}
                        >
                          Alumni
                        </h6>
                      </Box>

                      <Box
                        width="120px"
                        style={{
                          alignSelf: "flex-end",
                          textAlign: "end"
                        }}
                        height="60px"
                      >
                        <h6
                          style={{
                            fontFamily: "Muli",
                            fontWeight: 300,
                            paddingTop: "6px"
                          }}
                        >
                          <i
                            style={{ opacity: 0.2, paddingRight: "5px" }}
                            class="fas fa-map-marker-alt"
                          ></i>
                          Austin, TX
                        </h6>
                      </Box>
                    </Flex>
                    <Box>
                      <SimpleGrid width="100%" columns={2}>
                        <Flex
                          width="55%"
                          justify="space-between"
                          pl="42px"
                          style={{ fontWeight: "bold" }}
                        >
                          <a
                            style={{
                              textDecoration: "none",
                              color: "#344CD0"
                            }}
                            target="blank"
                            href="#"
                          >
                            Portfolio
                          </a>

                          <a
                            style={{
                              textDecoration: "none",
                              color: "#344CD0"
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
                                style={{ borderRadius: "60%" }}
                                src={require("../../../icons/linkedIn.png")}
                              />
                            </a>
                          ) : (
                            <Image
                              size="20px"
                              opacity=".3"
                              style={{ borderRadius: "60%" }}
                              src={require("../../../icons/linkedIn.png")}
                            />
                          )}
                          {userData.slack ? (
                            <a target="blank" href={slackLink}>
                              <Image
                                size="20px"
                                src={require("../../../icons/slack.svg")}
                              />
                            </a>
                          ) : (
                            <Image
                              opacity="0.3"
                              size="20px"
                              src={require("../../../icons/slack.svg")}
                            />
                          )}
                          {userData.github ? (
                            <a
                              style={{ height: "20px" }}
                              target="blank"
                              href={userData.github}
                            >
                              <i
                                style={{ fontSize: "larger" }}
                                class="fab fa-github"
                              />
                            </a>
                          ) : (
                            <i
                              style={{ fontSize: "larger", opacity: "0.3" }}
                              class="fab fa-github"
                            ></i>
                          )}

                          {userData.dribble ? (
                            <a target="blank" href={userData.dribble}>
                              <Image
                                size="20px"
                                style={{ borderRadius: "60%" }}
                                src={require("../../../icons/dribble.png")}
                              />
                            </a>
                          ) : (
                            <Image
                              size="20px"
                              opacity="0.3"
                              style={{ borderRadius: "60%" }}
                              src={require("../../../icons/dribble.png")}
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
                style={{ fontSize: "16px" }}
              >
                <h4
                  style={{
                    padding: " 2% 0% 1% 3%",
                    fontSize: "14px",
                    color: " #131C4D"
                  }}
                >
                  Lambda Information
                </h4>
                <Flex>
                  <Box style={_midSectionStyles}>
                    <span style={{ opacity: ".5" }}>Cohort:</span>
                    {userData.cohort}
                  </Box>
                  <Box
                    style={{
                      width: "38.5%",
                      display: " flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0% 0% 1% 11%",
                      height: "40px"
                    }}
                  >
                    <span style={{ opacity: ".5" }}>Graduated:</span>
                    August 2019
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
            style={{ fontSize: "16px" }}
          >
            <SimpleGrid width="1048px" columns={2}>
              <Box
                bg="#F7F9FF"
                height="260px"
                pl="70px"
                style={{ borderRadius: "0 0 0 20px" }}
              >
                <h4
                  style={{
                    padding: " 6% 2% 5% 6%",
                    fontSize: "14px",
                    color: " #131C4D"
                  }}
                >
                  Background
                </h4>
                <SimpleGrid
                  columns={2}
                  spacing={5}
                  style={{ paddingLeft: "6%" }}
                >
                  <Box height="20px" style={{ opacity: 0.5 }}>
                    Degree:
                  </Box>
                  <Box height="20px">{userData.highest_ed}</Box>
                  <Box height="20px" style={{ opacity: 0.5 }}>
                    Field of Study:
                  </Box>
                  <Box height="20px">{userData.field_of_study}</Box>
                  <Box height="20px" style={{ opacity: 0.5 }}>
                    Prior web experience:
                  </Box>
                  <Box height="20px">
                    {userData.prior_experience ? "Yes" : "None"}
                  </Box>
                  <Box height="20px" style={{ opacity: 0.5 }}>
                    Lambda TL/SL position:
                  </Box>
                  <Box height="20px">
                    {userData.tlsl_experience ? "Yes" : "None"}
                  </Box>
                </SimpleGrid>
              </Box>
              <Box
                bg="#F7F9FF"
                height="260px"
                style={{ borderRadius: "0 0 20px 0" }}
              >
                <h4
                  style={{
                    padding: " 6% 0% 4% 8%",
                    fontSize: "14px",
                    color: " #131C4D"
                  }}
                >
                  Current employment
                </h4>
                <SimpleGrid
                  columns={2}
                  spacing={5}
                  style={{ padding: "0 20% 0 0%" }}
                >
                  <Box height="20px" style={_emp}>
                    Company:
                  </Box>
                  <Box height="20px">{userData.employed_company}</Box>
                  <Box height="20px" style={_emp}>
                    Job tittle:
                  </Box>
                  <Box height="20px">{userData.employed_title}</Box>
                  <Box height="20px" style={_emp}>
                    Start date:
                  </Box>
                  <Box height="20px">January 1st, 2020</Box>
                  <Box height="20px" style={_emp}>
                    Remote
                  </Box>
                  <Box height="20px">
                    {userData.employed_remote ? "Yes" : "No"}
                  </Box>
                </SimpleGrid>
              </Box>
            </SimpleGrid>
          </Flex>

          <Flex justify="center">
            <Box width="1048px">Reviews written by Lisa Smith</Box>
          </Flex>
          <Flex justify="center" mt=".5%">
            <Box
              width="1048px"
              style={{ border: "1px solid #e6e5e5", padding: "3%" }}
            >
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </AccordionPanel>
              </AccordionItem>
            </Box>
          </Flex>
        </>
      ) : (
        <Flex justify="center" pt="15%">
          <GridLoader size={50} color={"#259bf8"} />
        </Flex>
      )}
    </>
  );
};

export default ProfilePage;
