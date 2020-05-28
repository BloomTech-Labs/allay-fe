import React from 'react'
import { Progress } from '@chakra-ui/core'

const ProgressBar = React.forwardRef(({ ...props }) => {
  return (
    <Progress
      h="10%"
      color="blue"
      background="#F2F6FE"
      isAnimated
      hasStripe

      style={{ borderRadius: '10px' }}

      border="1px solid #131C4D"
      value={props.value}
    />
  )
})

export default ProgressBar
