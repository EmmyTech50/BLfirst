import PropTypes from 'prop-types'
import {
  Flex,
  IconButton,
  InputGroup,
  InputLeftElement,
  Input,
  useColorModeValue,
  Avatar,
  Text,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react'
import { FiMenu, FiSearch, FiBell, FiChevronDown } from 'react-icons/fi'
import { Link as RouterLink } from 'react-router-dom'

export default function TopBar({ onOpen }) {
  const bg     = useColorModeValue('primary.100', 'gray.800')
  const border = useColorModeValue('gray.100', 'gray.700')
  const accent = 'primary.50'

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      w="full"
      px="4"
      h="3.5rem"
      bg={bg}
      borderBottomWidth="1px"
      borderColor={border}
    >
      {/* Mobile: burger + title */}
      <HStack spacing="2" display={{ base: 'flex', md: 'none' }}>
        <IconButton
          aria-label="Open menu"
          onClick={onOpen}
          icon={<FiMenu />}
          variant="ghost"
          color={accent}
        />
        <Text fontSize="lg" fontWeight="bold" color={accent}>
          The Tulip Admin
        </Text>
      </HStack>

      {/* Desktop: search bar */}
      <InputGroup
        w="96"
        display={{ base: 'none', md: 'flex' }}
        borderRadius="full"
        borderColor={accent}
        _focus={{
          borderColor: accent,
          boxShadow: `0 0 0 1px ${accent}`,
        }}
      >
        <InputLeftElement pointerEvents="none">
          <FiSearch color={accent} />
        </InputLeftElement>
        <Input type="text" placeholder="Search…" />
      </InputGroup>

      {/* Notifications + user menu */}
      <Flex align="center" gap="4">
        <IconButton
          aria-label="Notifications"
          icon={<FiBell />}
          variant="ghost"
          size="sm"
          color={accent}
        />

        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<FiChevronDown />}
            variant="outline"
            borderColor={accent}
            color={accent}
            size="sm"
          >
            <HStack spacing="2">
              <Avatar size="sm" />
              <Text fontSize="sm" display={{ base: 'none', md: 'flex' }}>
                Admin
              </Text>
            </HStack>
          </MenuButton>
          <MenuList>
            <MenuItem as={RouterLink} to="/admin/profile">
              Profile
            </MenuItem>
            <MenuItem as={RouterLink} to="/admin/settings">
              Settings
            </MenuItem>
            <MenuItem as={RouterLink} to="/admin/login">
              Logout
            </MenuItem>
            <MenuDivider />
            <MenuItem as={RouterLink} to="/">
              Home
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  )
}

TopBar.propTypes = {
  onOpen: PropTypes.func.isRequired,
}
