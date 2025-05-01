
import {
  Box,
  useColorModeValue,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from '@chakra-ui/react'
import SideBar from './LeftSide/SideBar'
import TopBar  from './LeftSide/TopBar'
import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
  const sidebarWidth = '15rem'
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50','gray.900')}>
      {/* ── Desktop fixed sidebar ── */}
      <Box
        as="aside"
        display={{ base: 'none', md: 'block' }}
        pos="fixed" top="0" left="0"
        w={sidebarWidth} h="100vh"
        bg={useColorModeValue('primary.100','gray.800')}
        boxShadow="md" zIndex="1000"
      >
        <SideBar />
      </Box>

      {/* ── Mobile drawer (always mounted) ── */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="full">
        <DrawerOverlay />
        <DrawerContent bg={useColorModeValue('primary.50','primary.50')} color="primary.100">
          <DrawerCloseButton color="primary.100" />
          <DrawerHeader borderBottomWidth="1px" borderColor="primary.100">
            Bright &amp; Lustre Admin
          </DrawerHeader>
          <DrawerBody p={0}>
            {/* pass isMobile + onClose so clicking a link closes it */}
            <SideBar isMobile onClose={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* ── Main content ── */}
      <Box
        ml={{ base: 0, md: sidebarWidth }}
        transition="margin 0.3s ease"
      >
        {/* sticky only within main content */}
        <Box position="sticky" top="0" zIndex="1001">
          <TopBar onOpen={onOpen} />
        </Box>

        {/* give room for the TopBar height */}
        <Box pt="3.5rem" p={6}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
