import { Box, HStack, Icon, Text, useColorModeValue } from '@chakra-ui/react'
import PropTypes from 'prop-types'

export default function NavItem({ icon, children, active, onClick }) {
  const bgHover = useColorModeValue('gray.100', 'gray.700')
  const bgActive = useColorModeValue('gray.100', 'gray.700')
  // default text white; black when active
  const textColor = active ? 'black' : 'white'
  // keep the same text color on hover
  const hoverColor = textColor

  return (
    <Box
      as="button"
      w="full"
      px={4}
      py={3}
      textAlign="left"
      bg={active ? bgActive : 'transparent'}
      color={textColor}
      _hover={{
        bg: bgHover,
        color: hoverColor,
      }}
      onClick={onClick}
    >
      <HStack>
        <Icon as={icon} />
        <Text>{children}</Text>
      </HStack>
    </Box>
  )
}

NavItem.propTypes = {
  icon:     PropTypes.elementType.isRequired,
  children: PropTypes.node.isRequired,
  active:   PropTypes.bool,
  onClick:  PropTypes.func,
}
