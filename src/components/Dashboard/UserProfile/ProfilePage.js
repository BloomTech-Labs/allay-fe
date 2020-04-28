import React from "react";
import { Flex, Image, SimpleGrid, Box } from "@chakra-ui/core";
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
            style={{ borderRadius: "20px 20px 0 0" }}
            bg="#F7F9FF"
            height="220px"
          >
            svsvsheight="220px"
          </Box>
          <Box bg="#F7F9FF" height="107px">
            vsvsv
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
