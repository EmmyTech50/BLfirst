import { useState, useRef } from 'react'
import {
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Avatar,
  IconButton,
  Input,
  FormControl,
  FormLabel,
  Button,
  Stack,
  VStack,
  useToast,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import { FiCamera, FiEye, FiEyeOff } from 'react-icons/fi'

export default function AdminProfilePage() {
  const toast = useToast()

  // --- Avatar upload ---
  const [avatarUrl, setAvatarUrl] = useState('/images/default-avatar.png')
  const fileInputRef = useRef()

  const handleAvatarChange = () => {
    const file = fileInputRef.current.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setAvatarUrl(url)
    // TODO: upload file to server here
    toast({ title: 'Avatar updated.', status: 'success', duration: 2000, isClosable: true })
  }

  // --- Profile info ---
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@example.com',
    phone: '+234 800 000 0000',
  })

  const handleSaveProfile = () => {
    // TODO: send profile to API
    toast({ title: 'Profile saved.', status: 'success', duration: 2000, isClosable: true })
  }

  // --- Security (password) ---
  const [security, setSecurity] = useState({
    current: '',
    new: '',
    confirm: '',
  })
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleSavePassword = () => {
    if (security.new !== security.confirm) {
      toast({ title: 'New passwords must match.', status: 'error', duration: 3000, isClosable: true })
      return
    }
    // TODO: call change-password API
    setSecurity({ current: '', new: '', confirm: '' })
    toast({ title: 'Password changed.', status: 'success', duration: 2000, isClosable: true })
  }

  return (
    <Box p={6}>
      <Heading color="primary.50" mb={6}>My Profile</Heading>
      <Flex mb={8} align="center" direction={{ base: 'column', md: 'row' }} gap={6}>
        <Box position="relative">
          <Avatar src={avatarUrl} size="2xl" />
          <IconButton
            aria-label="Change avatar"
            icon={<FiCamera />}
            size="sm"
            position="absolute" bottom="0" right="0"
            bg="primary.50" _hover={{bg:"rgba(255,255,255,0.2)", color: "primary.50"}} color="primary.100"
            onClick={() => fileInputRef.current.click()}
          />
          <Input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            display="none"
            onChange={handleAvatarChange}
          />
        </Box>
        <VStack align="start" spacing={1}>
          <Heading size="lg">{profile.name}</Heading>
          <Box color="gray.500">{profile.email}</Box>
          <Box color="gray.500">{profile.phone}</Box>
        </VStack>
      </Flex>

      <Tabs variant="enclosed">
        <TabList>
          <Tab>Profile</Tab>
          <Tab>Security</Tab>
        </TabList>

        <TabPanels mt={4}>
          {/* Profile Tab */}
          <TabPanel>
            <Stack spacing={4} maxW="md">
              <FormControl>
                <FormLabel>Full Name</FormLabel>
                <Input
                  value={profile.name}
                  onChange={e => setProfile({ ...profile, name: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email Address</FormLabel>
                <Input
                  type="email"
                  value={profile.email}
                  onChange={e => setProfile({ ...profile, email: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  value={profile.phone}
                  onChange={e => setProfile({ ...profile, phone: e.target.value })}
                />
              </FormControl>
              <Button
                bg="primary.50" _hover={{bg:"rgba(255,255,255,0.2)", color: "primary.50"}} color="primary.100"
                onClick={handleSaveProfile}
              >
                Save Profile
              </Button>
            </Stack>
          </TabPanel>

          {/* Security Tab */}
          <TabPanel>
            <Stack spacing={4} maxW="md">
              <FormControl>
                <FormLabel>Current Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showCurrent ? 'text' : 'password'}
                    value={security.current}
                    onChange={e => setSecurity({ ...security, current: e.target.value })}
                  />
                  <InputRightElement>
                    <IconButton
                      variant="ghost" size="sm"
                      aria-label={showCurrent ? 'Hide' : 'Show'}
                      icon={showCurrent ? <FiEyeOff /> : <FiEye />}
                      onClick={() => setShowCurrent(v => !v)}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <FormControl>
                <FormLabel>New Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showNew ? 'text' : 'password'}
                    value={security.new}
                    onChange={e => setSecurity({ ...security, new: e.target.value })}
                  />
                  <InputRightElement>
                    <IconButton
                      variant="ghost" size="sm"
                      aria-label={showNew ? 'Hide' : 'Show'}
                      icon={showNew ? <FiEyeOff /> : <FiEye />}
                      onClick={() => setShowNew(v => !v)}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <FormControl>
                <FormLabel>Confirm New Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showConfirm ? 'text' : 'password'}
                    value={security.confirm}
                    onChange={e => setSecurity({ ...security, confirm: e.target.value })}
                  />
                  <InputRightElement>
                    <IconButton
                      variant="ghost" size="sm"
                      aria-label={showConfirm ? 'Hide' : 'Show'}
                      icon={showConfirm ? <FiEyeOff /> : <FiEye />}
                      onClick={() => setShowConfirm(v => !v)}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Button
                bg="primary.50" _hover={{bg:"rgba(255,255,255,0.2)", color: "primary.50"}} color="primary.100"
                onClick={handleSavePassword}
              >
                Change Password
              </Button>
            </Stack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}
