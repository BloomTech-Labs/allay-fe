import React from "react";
import { Flex, Image, SimpleGrid, Box, Avatar } from "@chakra-ui/core";
const ProfilePage = () => {
  const _midSectionStyles = {
    width: "45%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0% 8%",
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
              size="60px"
              style={{ opacity: "0.6" }}
              src={require("../../../icons/user.svg")}
            />
          </Flex>
        </Flex>
      </Flex>

      {/* Top two columns */}
      <Flex Flex w="100%" pt="3%" justify="center">
        {/* Top two columns */}
        <SimpleGrid width="1048px" columns={1} spacingY="4px">
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
              display: "inline-flex",
              letterSpacing: "1px"
            }}
            bg="#F7F9FF"
            height="220px"
          >
            <Flex
              w="20%"
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <Avatar
                size="2xl"
                name="user"
                src={require("../../../icons/lisa.jpg")}
              />
            </Flex>
            <Flex w="80%">
              <SimpleGrid width="100%" row={2}>
                <Flex
                  height="113px"
                  style={{
                    display: "flex"
                  }}
                >
                  <Box
                    height="27px"
                    style={{ alignSelf: "flex-end", letterSpacing: "2px " }}
                    width="20%"
                  >
                    <h3>Lisa Smith</h3>
                  </Box>
                  <Box
                    width="33%"
                    height="60px"
                    pl="3%"
                    style={{
                      display: "flex",
                      alignSelf: "flex-end",
                      justifyContent: "space-evenly"
                    }}
                  >
                    <span
                      style={{
                        alignSelf: " flex-end",
                        fontWeight: "600",
                        borderRadius: "10px ",
                        width: "45px",
                        height: "25px",
                        paddingTop: "3px",
                        backgroundColor: "#3b98f1",
                        color: "white",
                        fontSize: "small",
                        textAlign: "center"
                      }}
                    >
                      Web
                    </span>

                    <h6 style={{ opacity: "0.5" }}>|</h6>
                    <h6>Alumni</h6>
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
                    <h6>
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
                    <Flex width="45%" justify="space-between">
                      <h6 style={{ color: "blue" }}>Portfolio</h6>
                      <h6 style={{ color: "blue" }}>Resume</h6>
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
                        style={{ borderRadius: "40%" }}
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
                        style={{ borderRadius: "40%" }}
                        src={require("../../../icons/dribble.png")}
                      />
                    </Flex>
                  </SimpleGrid>
                </Box>
              </SimpleGrid>
            </Flex>
          </Box>
          <Box bg="#F7F9FF" height="107px">
            <h4
              style={{
                padding: " 2% 0% 1% 3%",
                fontSize: "medium"
              }}
            >
              Lambda Information
            </h4>
            <Flex>
              <Box style={_midSectionStyles}>
                <span style={{ opacity: ".5" }}>Cohort:</span>
                <h6>Web FT 20</h6>
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
                <h6>August 2019</h6>
              </Box>
            </Flex>
          </Box>
        </SimpleGrid>
      </Flex>
      {/* Bottom two row */}
      <Flex Flex w="100%" justify="center">
        <SimpleGrid width="1048px" columns={2}>
          <Box
            bg="#F7F9FF"
            height="260px"
            style={{ borderRadius: "0 0 0 20px" }}
          >
            <h4
              style={{
                padding: " 6% 2% 5% 9%",
                fontSize: "medium"
              }}
            >
              Background
            </h4>
            <SimpleGrid columns={2} spacing={5} style={{ paddingLeft: "15%" }}>
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
                fontSize: "medium"
              }}
            >
              Current employment
            </h4>
            <SimpleGrid
              columns={2}
              spacing={5}
              style={{ padding: "0 10% 0 5%" }}
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
    </>
  );
};

export default ProfilePage;
