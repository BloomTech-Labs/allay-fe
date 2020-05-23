import React, { useState } from 'react'
import ProgressBar from '../../Reusable/ProgressBar'
import { Flex, Button } from '@chakra-ui/core'

const ProgressHeader = (history, props) => {
  //progress bar
  const [progress] = useState({
    prec: 99,
    mins: 10,
    prog: 2,
  })
  const newProgress = props.setProgress
  console.log('my progress', props.setProgress)
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
        {progress.prec === 100 ? (
          <>
            <Flex as="h4" size="22px">
              {progress.prec}% Completed!
            </Flex>{' '}
          </>
        ) : (
          <>
            <Flex as="h4" fontFamily="muli" color="#131C4D" width="3em">
              {100 - progress.prec}% completed
            </Flex>

            {/* <Flex color="#FFFFFF"> {progress.mins} mins</Flex> */}
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
      <ProgressBar value={progress.prog} />
    </Flex>
  )
}

export default ProgressHeader
