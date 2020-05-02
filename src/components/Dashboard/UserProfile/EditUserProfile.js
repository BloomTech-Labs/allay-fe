import React from "react";
import { Link } from "react-router-dom";
import { Flex, Image } from "@chakra-ui/core";

const EditUserProfile = ({ match }) => {
  const id = match.params.id;
  return (
    <>
      <Flex Flex w="100%" height="84px" justify="center">
        <Flex
          maxW="1440px"
          w="100%"
          pt="1%"
          pr="3%"
          pl="3%"
          justify="space-between"
        >
          <Link
            style={{
              textDecoration: "none",
              color: "black"
            }}
            to="/dashboard"
          >
            {" "}
            <Flex>
              <h1> Allay </h1>
            </Flex>
          </Link>
          <Flex>
            <Link
              style={{
                textDecoration: "none",
                color: "black"
              }}
              to={`/profile/${id}`}
            >
              {" "}
              <Image
                size="50px"
                style={{ opacity: "0.6" }}
                src={require("../../../icons/user.svg")}
              />
            </Link>
          </Flex>
        </Flex>
      </Flex>
      <h6>HI FROM EDIT PROFILE</h6>
    </>
  );
};

export default EditUserProfile;
