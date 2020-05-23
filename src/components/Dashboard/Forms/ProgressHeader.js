import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import ProgressBar from '../../Reusable/ProgressBar'
import { Flex, Button } from '@chakra-ui/core'

const ProgressHeader = ({ progress }) => {
  //progress bar

  const history = useHistory()
  console.log('progress', progress)
  return (
    <Flex
      justify="center"
      // pt="1%"
      px="2%"
      w="100%"
      h="20%"
      background="#F2F6FE"
      top="0"
      position="fixed"
      overflow="hidden"
      zIndex="999"
      direction="column"
    >
      <Flex w="100%">
        <h2 fontSize="24px" color="#131C4D" fontFamily="poppins">
          Write a review
        </h2>
      </Flex>

      <Flex w="100%" justify="space-between" mb="1%">
        {progress && progress.prec === 100 ? (
          <>
            <Flex as="h4" size="22px">
              {progress && progress.prec}% Completed!
            </Flex>{' '}
          </>
        ) : (
          <>
            <Flex as="h4" fontFamily="muli" color="#131C4D" width="3em">
              {progress && 100 - progress.prec}% completed
            </Flex>

            <Button
              border="none"
              backgroundColor="#F2F6FE"
              color="#344CD0"
              fontSize="1.3em"
              rounded="50px"
              _hover={{ backgroundColor: '#FFF', cursor: 'pointer' }}
              onClick={() => {
                history.push('/dashboard')
              }}
            >
              Cancel
            </Button>
          </>
        )}
      </Flex>
      <ProgressBar value={progress && progress.prog} />
    </Flex>
  )
}

export default ProgressHeader
