import React from "react";
import {
  Flex,
  Button,
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
const ProfilePage = () => {
  const _midSectionStyles = {
    width: "40%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0% 5%",
    height: "40px"
  };
  const _emp = {
    padding: "0 0 0 22%",
    opacity: 0.5
  };
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

      {/* Top two columns */}
      <Flex Flex w="100%" pt="3%" justify="center">
        {/* Top two columns */}
        <SimpleGrid width="1048px" columns={1} spacingY="2px">
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
            <Flex
              w="20%"
              style={{ padding: "55px 0 0 70px" }}
            >
              <Avatar
                size="2xl"
                name="user"
                src={require("../../../icons/lisa.jpg")}
              />
            </Flex>
            <Flex w="80%">
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
                      marginLeft:"42px"
                    }}
                    width="20%"
                  >
                    <h3 style={{fontFamily: "Poppins", color:" #131C4D"}}>Lisa Smith</h3>
                  </Box>
                  <Box
                    width="33%"
                    height="60px"
                    
                    style={{
                      display: "flex",
                      alignSelf: "flex-end",
                      alignItems:"baseline",
                      justifyContent: "space-evenly",
                     
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
                        textTransform:"uppercase",
                        textAlign:"center",
                        paddingTop:"5px"
                      }}
                    >
                      Web
                    </span>

                    <h6 style={{ opacity: "0.5" }}>|</h6>
                    <h6 style={{ fontFamily: "Muli", fontWeight: 300 }}>
                      Alumni
                    </h6>
                  </Box>

                  <Box
                    style={{
                      alignSelf: "flex-end",
                      paddingRight: "67px",
                      textAlign: "end"
                    }}
                    width="47%"
                    height="60px"
                  >
                    <h6 style={{ fontFamily: "Muli", fontWeight: 300 }}>
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
                    <Flex width="55%" justify="space-between" pl="42px" style={{  fontWeight:"bold" }}>
                      <Link color="#344CD0" isExternal="true" href="#" >
                        Portfolio
                      </Link>
                      <Link color="#344CD0" isExternal="true" href="#" >
                        Resume
                      </Link>
                    </Flex>
                    <Flex
                      width="59%"
                      justify="space-around"
                      justifySelf="flex-end"
                      alignItems="center"
                      pr="56px"
                    >
                      <Image
                        size="20px"
                        style={{ borderRadius: "60%" }}
                        src={require("../../../icons/linkedIn.png")}
                      />
                      <Image
                        size="20px"
                        src={require("../../../icons/slack.svg")}
                      />
                      <i
                        style={{ fontSize: "larger" }}
                        class="fab fa-github"
                      ></i>
                      <Image
                        size="20px"
                        style={{ borderRadius: "60%" }}
                        src={require("../../../icons/dribble.png")}
                      />
                    </Flex>
                  </SimpleGrid>
                </Box>
              </SimpleGrid>
            </Flex>
          </Box>
          <Box bg="#F7F9FF" pl="70px" height="107px" style={{fontSize:"16px"}}>
            <h4
              style={{
                padding: " 2% 0% 1% 3%",
                fontSize: "14px",
                color:" #131C4D"
              }}
            >
              Lambda Information
            </h4>
            <Flex>
              <Box style={_midSectionStyles}>
                <span style={{ opacity: ".5" }}>Cohort:</span>
                Web FT 20
              </Box>
              <Box
                style={{
                  width: "39%",
                  display: " flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0% 0% 1% 12%",
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
      {/* Bottom two row */}
      <Flex Flex w="100%"  justify="center" mb="3%" style={{fontSize:"16px"}}>
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
                color:" #131C4D"
              }}
            >
              Background
            </h4>
            <SimpleGrid columns={2} spacing={5} style={{ paddingLeft: "11%" }}>
              <Box height="20px" style={{ opacity: 0.5 }}>
                Degree:
              </Box>
              <Box height="20px">Bachelor of Art</Box>
              <Box height="20px" style={{ opacity: 0.5 }}>
                Field of Study:
              </Box>
              <Box height="20px">English</Box>
              <Box height="20px" style={{ opacity: 0.5 }}>
                Prior web experience:
              </Box>
              <Box height="20px">None</Box>
              <Box height="20px" style={{ opacity: 0.5 }}>
                Lambda TL/SL position:
              </Box>
              <Box height="20px">Yes</Box>
            </SimpleGrid>
          </Box>
          <Box
            bg="#F7F9FF"
            height="260px"
            style={{ borderRadius: "0 0 20px 0" }}
          >
            <h4
              style={{
                padding: " 6% 2% 5% 7%",
                fontSize: "14px",
                color:" #131C4D"
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
              <Box height="20px">Indeed</Box>
              <Box height="20px" style={_emp}>
                Job tittle:
              </Box>
              <Box height="20px">Junior Front End Developer</Box>
              <Box height="20px" style={_emp}>
                Start date:
              </Box>
              <Box height="20px">January 1st, 2020</Box>
              <Box height="20px" style={_emp}>
                Remote:
              </Box>
              <Box height="20px">No</Box>
            </SimpleGrid>
          </Box>
        </SimpleGrid>
      </Flex>
      {/* Review section of profile page */}
      <Flex justify="center">
        <Box width="1048px">Reviews written by Lisa Smith</Box>
      </Flex>
      <Flex justify="center" mt=".5%">
        <Box
          width="1048px"
          style={{ border: "1px solid #e6e5e5", padding: "3%" }}
        >
          {/* TODO:Map over reviews and return this accordion */}
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
          {/* review 2 == TODO: delete later */}
          <AccordionItem width="816px" style={{ margin: "0 auto" }}>
            <AccordionHeader
              style={{ borderRadius: "10px " }}
              _expanded={{ bg: "#0000CC", color: "white" }}
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
          {/* review 3  TODO: delete later */}
          <AccordionItem width="816px" style={{ margin: "0 auto" }}>
            <AccordionHeader
              style={{ borderRadius: "10px " }}
              _expanded={{ bg: "#FF0000", color: "white" }}
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
        </Box>
      </Flex>
    </>
  );
};

export default ProfilePage;
