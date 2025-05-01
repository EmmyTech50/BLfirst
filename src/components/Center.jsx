
import { Flex } from '@chakra-ui/react'
import PropTypes from 'prop-types'

export default function Center({ children, ...props }) {
  return (
    <Flex align="center" justify="center" {...props}>
      {children}
    </Flex>
  )
}

Center.propTypes = {
  children: PropTypes.node.isRequired,
}
