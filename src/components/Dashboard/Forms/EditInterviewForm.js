import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import getReviewById from '../../../state/actions/index.js'
import { editReview } from '../../../state/actions/reviewActions.js'
import ReactGA from 'react-ga'
import { states } from '../../Reusable/statesData'
import EditReviewInput from '../../Reusable/InputFields/EditReviewInput'
import { useForm } from 'react-hook-form'

//imported styles
import CustomSpinner from '../../CustomSpinner'
import {
  Flex,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
  Select,
  Textarea,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogOverlay,
  AlertDialogFooter,
  CheckboxGroup,
  Checkbox,
} from '@chakra-ui/core'
const EditInterviewForm = ({
  review,
  getReviewById,
  editReview,
  match,
  history,
  isLoading,
}) => {
  const { register, handleSubmit, errors, formState } = useForm()
  const id = match.params.id
  const [editValue, setEditValue] = useState({
    id: id,
  })

  // specifically for the cancel button functionality
  const [isOpen, setIsOpen] = useState()
  const onClose = () => setIsOpen(false)
  const cancelRef = useRef()

  // validating salary
  function validateSalary(value) {
    let error
    if (value < 0) {
      error = 'Salary cannot be less than zero.'
    }
    return error || true
  }

  useEffect(() => {
    getReviewById(id)
  }, [id, getReviewById])

  if (isLoading) {
    return (
      <Flex justify="center" align="center" w="100vh" h="100vh">
        <CustomSpinner />
      </Flex>
    )
  }

  const submitEdits = () => {
    editReview(review.user_id, review.review_id, editValue).then(() => {
      history.push('/dashboard')
    })
    ReactGA.event({
      category: 'Interview Review Edit',
      action: `Submit edit`,
    })
  }

  return (
    <Flex justify="center" w="100%" minH="100vh" bg="#F2F6FE">
      <Flex w="45%" my="10%" px="4%" justify="center" flexDir="column">
        <form onSubmit={handleSubmit(submitEdits)}>
          <FormControl>
            <h2 color="#525252" align="center">
              Edit interview review
            </h2>
            <FormLabel color="#525252" mt="3">
              Job title
            </FormLabel>
            <EditReviewInput
              name="job_title"
              placeholder={review.job_title}
              value={editValue.job_title}
              onChange={(e) =>
                setEditValue({
                  ...editValue,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel fontSize="15px" color="#525252">
              Job location
            </FormLabel>
            <Flex justify="space-between" wrap="nowrap">
              <EditReviewInput
                w="60%"
                h="58px"
                py="32px"
                borderColor="#ECF1FE"
                rounded="3px"
                name="city"
                placeholder={review.city}
                value={editValue.city}
                onChange={(e) =>
                  setEditValue({
                    ...editValue,
                    [e.target.name]: e.target.value,
                  })
                }
              />

              <Select
                w="35%"
                mb="4"
                h="65px"
                rounded="3px"
                border="1px solid black"
                name="state_id"
                ref={register}
                onChange={(e) =>
                  setEditValue({
                    ...editValue,
                    [e.target.name]: e.target.value,
                  })
                }
              >
                <option value={0}>{review.state_name}</option>
                {states.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.state_name}
                  </option>
                ))}
              </Select>
            </Flex>
          </FormControl>

          <FormControl isInvalid={errors.salary}>
            <FormLabel fontSize="15px" color="#525252">
              Salary
            </FormLabel>
            <InputGroup>
              <InputLeftElement
                mb="4"
                h="58px"
                py="32px"
                borderColor="#ECF1FE"
                color="gray.300"
                fontSize="1.2em"
                children="$"
              />
              <EditReviewInput
                pl="6%"
                borderColor="#ECF1FE"
                rounded="3px"
                name="salary"
                type="number"
                placeholder={review.salary}
                ref={register({ validate: validateSalary })}
                value={editValue.salary}
                onChange={(e) =>
                  setEditValue({
                    ...editValue,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </InputGroup>
            <FormErrorMessage>
              {errors.salary && errors.salary.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel fontSize="15px" color="#525252">
              Job offer
            </FormLabel>
            <Select
              mb="4"
              h="65px"
              rounded="3px"
              border="1px solid black"
              color="#494B5B"
              name="offer_status_id"
              ref={register}
              onChange={(e) =>
                setEditValue({
                  ...editValue,
                  [e.target.name]: e.target.value,
                })
              }
            >
              <option value={0}>{review.offer_status}</option>
              <option value={1}>No offer</option>
              <option value={2}>Offer accepted</option>
              <option value={3}>Offer declined</option>
              )}
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel fontSize="15px" color="#525252">
              Interview difficulty
            </FormLabel>
            <Select
              mb="4"
              h="65px"
              rounded="3px"
              border="1px solid black"
              color="#494B5B"
              name="difficulty_rating"
              ref={register}
              onChange={(e) =>
                setEditValue({
                  ...editValue,
                  [e.target.name]: e.target.value,
                })
              }
            >
              <option value={0}>{review.difficulty_rating}</option>
              <option value={5}>5 - Very hard</option>
              <option value={4}>4 - Somewhat hard</option>
              <option value={3}>3 - Somewhat easy</option>
              <option value={2}>2 - Easy</option>
              <option value={1}>1 - Very easy</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel fontSize="15px" color="#525252">
              Interview rounds
            </FormLabel>
            <EditReviewInput
              name="interview_rounds"
              type="number"
              color="#494B5B"
              placeholder={review.interview_rounds}
              value={editValue.interview_rounds}
              onChange={(e) =>
                setEditValue({
                  ...editValue,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </FormControl>

          <FormLabel mb="2">Interview types </FormLabel>
          <Flex mb="4">
            <Flex w="50%">
              <CheckboxGroup defaultValue={[true]}>
                <Checkbox
                  size="md"
                  border="rgba(72, 72, 72, 0.1)"
                  name="phone_interview"
                  value={review.phone_interview}
                  onClick={() =>
                    review.phone_interview
                      ? setEditValue({ ...editValue, phone_interview: false })
                      : setEditValue({ ...editValue, phone_interview: true })
                  }
                >
                  Phone Screening
                </Checkbox>
                <Checkbox
                  size="md"
                  border="rgba(72, 72, 72, 0.1)"
                  name="resume_review"
                  value={review.resume_review}
                  onClick={() =>
                    review.resume_review
                      ? setEditValue({ ...editValue, resume_review: false })
                      : setEditValue({ ...editValue, resume_review: true })
                  }
                >
                  Resume Review
                </Checkbox>
                <Checkbox
                  size="md"
                  border="rgba(72, 72, 72, 0.1)"
                  name="take_home_assignments"
                  value={review.take_home_assignments}
                  onClick={() =>
                    review.take_home_assignments
                      ? setEditValue({
                          ...editValue,
                          take_home_assignments: false,
                        })
                      : setEditValue({
                          ...editValue,
                          take_home_assignments: true,
                        })
                  }
                >
                  Take Home Assignments
                </Checkbox>
                <Checkbox
                  size="md"
                  border="rgba(72, 72, 72, 0.1)"
                  name="online_coding_assignments"
                  value={review.online_coding_assignments}
                  onClick={() =>
                    review.online_coding_assignments
                      ? setEditValue({
                          ...editValue,
                          online_coding_assignments: false,
                        })
                      : setEditValue({
                          ...editValue,
                          online_coding_assignments: true,
                        })
                  }
                >
                  Online Coding Assignments
                </Checkbox>
              </CheckboxGroup>
            </Flex>
            <Flex>
              <CheckboxGroup defaultValue={[true]}>
                <Checkbox
                  size="md"
                  border="rgba(72, 72, 72, 0.1)"
                  name="portfolio_review"
                  value={review.portfolio_review}
                  onClick={() =>
                    review.portfolio_review
                      ? setEditValue({ ...editValue, portfolio_review: false })
                      : setEditValue({ ...editValue, portfolio_review: true })
                  }
                >
                  Portfoilio Review
                </Checkbox>
                <Checkbox
                  size="md"
                  border="rgba(72, 72, 72, 0.1)"
                  name="screen_share"
                  value={review.screen_share}
                  onClick={() =>
                    review.screen_share
                      ? setEditValue({ ...editValue, screen_share: false })
                      : setEditValue({ ...editValue, screen_share: true })
                  }
                >
                  Screen Share
                </Checkbox>
                <Checkbox
                  size="md"
                  border="rgba(72, 72, 72, 0.1)"
                  name="open_source_contribution"
                  value={review.open_source_contribution}
                  onClick={() =>
                    review.open_source_contribution
                      ? setEditValue({
                          ...editValue,
                          open_source_contribution: false,
                        })
                      : setEditValue({
                          ...editValue,
                          open_source_contribution: true,
                        })
                  }
                >
                  Open Source Contribution
                </Checkbox>
                <Checkbox
                  size="md"
                  border="rgba(72, 72, 72, 0.1)"
                  name="side_projects"
                  value={review.side_projects}
                  onClick={() =>
                    review.side_projects
                      ? setEditValue({ ...editValue, side_projects: false })
                      : setEditValue({ ...editValue, side_projects: true })
                  }
                >
                  Side Projects
                </Checkbox>
              </CheckboxGroup>
            </Flex>
          </Flex>

          <FormControl>
            <FormLabel fontSize="15px" color="#525252">
              Job review
            </FormLabel>
            <Textarea
              mb="4"
              h="144px"
              rounded="3px"
              border="1px solid black"
              color="#494B5B"
              rowsMax={6}
              resize="none"
              type="text"
              name="comment"
              placeholder={review.comment}
              ref={register}
              value={editValue.comment}
              onChange={(e) =>
                setEditValue({
                  ...editValue,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel fontSize="15px" color="#525252">
              Job rating
            </FormLabel>
            <Select
              mb="4"
              h="65px"
              rounded="3px"
              border="1px solid black"
              color="#494B5B"
              name="overall_rating"
              ref={register}
              onChange={(e) =>
                setEditValue({
                  ...editValue,
                  [e.target.name]: e.target.value,
                })
              }
            >
              <option value={0}>{review.overall_rating}</option>
              <option value={5}>5 - Great</option>
              <option value={4}>4 - Good</option>
              <option value={3}>3 - OK </option>
              <option value={2}>2 - Poor </option>
              <option value={1}>1 - Very poor </option>
            </Select>
          </FormControl>

          <Flex mt="40px">
            <Button
              bg="#344CD0"
              color="white"
              isLoading={formState.isSubmitting}
              type="submit"
              w="65%"
              h="72px"
              fontSize="18px"
              data-cy="companyEditInterviewSubmit"
            >
              Save changes
            </Button>
            <Flex
              align="center"
              justify="center"
              isloading
              height="72px"
              width="30%"
              color="#344CD0"
              fontSize="18px"
              fontWeight="bold"
              cursor="pointer"
              onClick={() => setIsOpen(true)}
            >
              Cancel
            </Flex>
            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay />
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Cancel form?
                </AlertDialogHeader>
                <AlertDialogBody>
                  Are you sure? You can't undo this action.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Flex>
                    <Flex
                      align="center"
                      justify="center"
                      isloading
                      height="56px"
                      width="30%"
                      mr="5%"
                      color="#344CD0"
                      fontSize="18px"
                      fontWeight="bold"
                      cursor="pointer"
                      ref={cancelRef}
                      onClick={onClose}
                    >
                      Cancel
                    </Flex>
                    <Button
                      h="56px"
                      rounded="10px"
                      bg="#344CD0"
                      border="none"
                      color="white"
                      onClick={() => history.push('/dashboard')}
                      ml={3}
                    >
                      Yes I'm sure
                    </Button>
                  </Flex>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Flex>
        </form>
      </Flex>
    </Flex>
  )
}

const mapStateToProps = (state) => {
  return {
    review: state.review.dataById,
  }
}

export default connect(
  mapStateToProps,
  (getReviewById, editReview)
)(EditInterviewForm)
