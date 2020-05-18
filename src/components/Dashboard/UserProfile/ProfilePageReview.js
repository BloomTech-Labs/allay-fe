import React from 'react'
import { useSelector } from 'react-redux'
import {
  Flex,
  Box,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/core'

const dateConvert = (date) => {
  date = new Date(date).toUTCString()
  date = date.split(' ').slice(0, 4).join(' ')
  return date
}

export const ProfilePageReview = ({ userReviews }) => {
  const isLoading = useSelector((state) => state.user.isLoading)
  const under = { textDecoration: 'underline' }

  return (
    <Flex justify="center" mt=".5%" mb="2%">
      {!isLoading ? (
        <Box
          width="1048px"
          style={{ border: '1px solid #e6e5e5', padding: '3%' }}
        >
          {userReviews && userReviews.length > 0 ? (
            userReviews.map((review) => {
              const postedOn = dateConvert(review.created_at)
              return (
                <AccordionItem
                  key={review.review_id}
                  width="816px"
                  style={{ margin: '0 auto' }}
                >
                  <AccordionHeader
                    style={{ borderRadius: '10px ' }}
                    _expanded={{ bg: '#007F00', color: 'white' }}
                  >
                    <Box flex="1" textAlign="left">
                      <span
                        style={{
                          borderRadius: '35%',
                          backgroundColor: '#a5a5a5',
                          padding: '.5%',
                        }}
                      >
                        Interview
                      </span>{' '}
                      posted at {postedOn}
                    </Box>
                    <AccordionIcon />
                  </AccordionHeader>
                  <AccordionPanel>
                    <h6>
                      <i style={under}>{review.work_status}</i> at{' '}
                      <i style={under}>{review.company_name}</i> in{' '}
                      <i style={under}>{review.city}</i>
                    </h6>
                  </AccordionPanel>
                  <AccordionPanel>
                    <h5>Review:</h5> <span>{review.comment}</span>
                  </AccordionPanel>
                </AccordionItem>
              )
            })
          ) : (
            <span>no reviews</span>
          )}
        </Box>
      ) : null}
    </Flex>
  )
}
