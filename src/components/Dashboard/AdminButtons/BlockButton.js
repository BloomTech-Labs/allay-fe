import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button
} from "@chakra-ui/core";

export default function BlockButton() {
  const [isOpen, setIsOpen] = React.useState();
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  return (
    <>
      <Button variantColor="red" onClick={() => setIsOpen(true)}>
        Block User
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            You are about to block this user.
          </AlertDialogHeader>

          <AlertDialogBody>Are you sure?</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button variantColor="red" onClick={onClose} ml={3}>
              Block
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
