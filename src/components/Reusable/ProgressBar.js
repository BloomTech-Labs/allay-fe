import React from 'react'
import { Progress } from '@chakra-ui/core'

const ProgressBar = React.forwardRef(({ ...props }, ref) => {
  return (
    <Progress
      h="10%"
      color="blue"
      background="#F2F6FE"
      isAnimated
      hasStripe
      border="1px solid #131C4D"
      value={props.value}

      // ref={ref}
    />
  )
})

export default ProgressBar
