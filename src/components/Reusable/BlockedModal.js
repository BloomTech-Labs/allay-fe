import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure
} from "@chakra-ui/core";

export default function Blocked() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Add Review</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {" "}
            <span style={{ fontSize: "30px" }}>{`\u2639`}</span>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>You've gone and got yourself blocked !</ModalBody>

          <ModalFooter>
            <Button variantColor="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Contact Admin</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
