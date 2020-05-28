import React from 'react'
import { useHistory } from 'react-router-dom'
import ProgressBar from '../../Reusable/ProgressBar'

import { Flex, Button, Image } from '@chakra-ui/core'

const ProgressHeader = ({ progress }) => {
  //progress bar
  const history = useHistory()

  return (
    <Flex
      justify="center"
      px="10%"
      w="100%"
      h="198px"
      background="#F2F6FE"
      top="0"
      position="fixed"
      overflow="hidden"
      zIndex="999"
      direction="column"
    >
      <Flex w="100%" justify="space-between" pb="3%">
        <h2 fontSize="24px" color="#131C4D" fontFamily="poppins">
          Write a review
        </h2>
        <Button
          border="none"
          backgroundColor="#F2F6FE"
          color="#344CD0"
          fontSize="1.3em"
          rounded="50px"
          _hover={{ color: '#3B4DA6', cursor: 'pointer' }}
          onClick={() => {
            history.push('/dashboard')
          }}
        >
          Cancel
        </Button>
      </Flex>

      <Flex w="100%" justify="space-between" mb="1%">
        {progress && progress.prec === 100 ? (
          <>
            <Flex as="h4" fontFamily="muli" color="#131C4D" w="50%">
              {progress && progress.prec}% Completed!
            </Flex>
          </>
        ) : (
          <>
            <Flex as="h4" fontFamily="muli" color="#131C4D" w="50%">
              {progress && 100 - progress.prec}% completed
            </Flex>
          </>
        )}

        <Flex width="100px" justify="space-evenly" align="flex-end">
          <Image src={require('../../../icons/clock.png')} /> {progress.time}{' '}
          min
        </Flex>
      </Flex>
      <ProgressBar value={progress && progress.prog} />
    </Flex>
  )
}

export default ProgressHeader
