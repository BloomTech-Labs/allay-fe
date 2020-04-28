import React from "react";
import {
  Flex,
  Image,
  SimpleGrid,
  Box,
  Avatar,
  AvatarBadge
} from "@chakra-ui/core";
const ProfilePage = () => {
  return (
    <>
      <Flex Flex w="100%" height="84px" justify="center">
        <Flex maxW="1440px" w="100%" pt="1%" justify="space-between">
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
      <Flex Flex w="100%" pt="3%" justify="center">
        <SimpleGrid width="1048px" columns={1} spacingY="4px">
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
                src={require("../../../icons/user.svg")}
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
                      <span>#</span>Austin, TX
                    </h6>
                  </Box>
                </Flex>
                <Box>
                  <SimpleGrid width="100%" columns={2}>
                    <Flex width="45%" justify="space-between">
                      <h6>Portfolio</h6>
                      <h6>Resume</h6>
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
                        src={require("../../../icons/slack.svg")}
                      />
                      <Image
                        size="20px"
                        src={require("../../../icons/linkedIn.png")}
                      />
                      <Image
                        size="20px"
                        src={require("../../../icons/dribble.png")}
                      />
                      <i class="fab fa-github"></i>
                    </Flex>
                  </SimpleGrid>
                </Box>
              </SimpleGrid>
            </Flex>
          </Box>
          <Box bg="#F7F9FF" height="107px">
            height="107px"
          </Box>
        </SimpleGrid>
      </Flex>
      <Flex Flex w="100%" pt="0.3%" justify="center">
        <SimpleGrid width="1048px" columns={2} spacingX="4px" spacingY="4px">
          <Box bg="#F7F9FF" height="239px">
            sdvsvd
          </Box>
          <Box bg="#F7F9FF" height="239px">
            svsv
          </Box>
        </SimpleGrid>
      </Flex>
    </>
  );
};

export default ProfilePage;
