import React from 'react';
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	Button,
} from '@chakra-ui/core';

export default function ContentButton({ isAdmin, submitDelete }) {
	const [isOpen, setIsOpen] = React.useState();
	const onClose = () => setIsOpen(false);
	const cancelRef = React.useRef();

	return (
		<>
			{isAdmin && (
				<Button
					variantColor='red'
					data-cy='adminDeleteReview'
					onClick={() => setIsOpen(true)}
				>
					Delete Content
				</Button>
			)}

			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}
			>
				<AlertDialogOverlay />
				<AlertDialogContent>
					<AlertDialogHeader fontSize='lg' fontWeight='bold'>
						You are about to delete this content.
					</AlertDialogHeader>

					<AlertDialogBody>Are you sure?</AlertDialogBody>

					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={onClose}>
							Cancel
						</Button>
						<Button
							variantColor='red'
							onClick={submitDelete}
							ml={3}
							data-cy='adminDeleteReviewConfirm'
						>
							Delete
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
