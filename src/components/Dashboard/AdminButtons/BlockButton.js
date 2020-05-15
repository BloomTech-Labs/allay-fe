import React from 'react'
import '../../../App.css'

import { useDispatch, useSelector } from 'react-redux'
import { blockUser } from '../../../state/actions/userActions'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/core'

export default function BlockButton({ user_id }) {
  const [isOpen, setIsOpen] = React.useState()
  const onClose = () => setIsOpen(false)
  const cancelRef = React.useRef()
  const dispatch = useDispatch()

  // get admin status and user status
  const admin = useSelector((state) => state.auth.isAdmin)
  const blocked = useSelector((state) => state.user.isUserBlocked)
  // func to block/unblock user
  const block = (id) => {
    dispatch(blockUser(id))
    setIsOpen(false)
  }
  return (
    <>
      {admin && (
        <>
          {blocked ? (
            <Button
              data-cy="unblockUserButton"
              variantColor="green"
              onClick={() => setIsOpen(true)}
            >
              Unblock User
            </Button>
          ) : (
            <Button
              data-cy="blockUserButton"
              variantColor="red"
              onClick={() => setIsOpen(true)}
            >
              Block User
            </Button>
          )}
        </>
      )}

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          {blocked ? (
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              You are about to unblock this user.
            </AlertDialogHeader>
          ) : (
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              You are about to block this user.
            </AlertDialogHeader>
          )}

          <AlertDialogBody>Are you sure?</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            {blocked ? (
              <Button
                data-cy="unblockUserButtonConfirm"
                variantColor="green"
                onClick={() => block(user_id)}
                ml={3}
              >
                Unblock
              </Button>
            ) : (
              <Button
                data-cy="blockUserButtonConfirm"
                variantColor="red"
                onClick={() => block(user_id)}
                ml={3}
              >
                Block
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
