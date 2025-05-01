import { useState, useRef } from 'react'
import {
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Button,
  Stack,
  useColorMode,
  useToast,
  SimpleGrid,
  Image,
  VStack,
  Checkbox,
  Flex,
  Text,
  IconButton,
} from '@chakra-ui/react'
import { FiTrash2 } from 'react-icons/fi'

export default function SettingsPage() {
  const toast = useToast()
  const { colorMode, toggleColorMode } = useColorMode()

  // --- Notifications ---
  const [emailOrders, setEmailOrders] = useState(true)
  const [emailPromos, setEmailPromos] = useState(false)
  const [smsAlerts, setSmsAlerts] = useState(false)

  // --- Slides: load from localStorage or defaults ---
  const defaultSlides = [
    { id: 1, title: 'Summer Sale', subtitle: '', image: '/images/slide1.jpg' },
    { id: 2, title: 'New Arrivals', subtitle: '', image: '/images/slide2.jpg' },
    { id: 3, title: 'Best Sellers', subtitle: '', image: '/images/slide3.jpg' },
    { id: 4, title: 'Limited Time Offer', subtitle: '', image: '/images/slide4.jpg' },
    { id: 5, title: 'Back to School', subtitle: '', image: '/images/slide5.jpg' },
  ]
  const [slideOptions, setSlideOptions] = useState(() => {
    const json = localStorage.getItem('slideOptions')
    return json ? JSON.parse(json) : defaultSlides
  })
  const [activeSlides, setActiveSlides] = useState(() => {
    const json = localStorage.getItem('activeSlides')
    return json ? JSON.parse(json) : [1, 2, 3]
  })

  // Upload form state
  const [newTitle, setNewTitle] = useState('')
  const [newSubtitle, setNewSubtitle] = useState('')
  const fileInputRef = useRef()

  // Toggle which slides are “active” (max 3)
  const handleSlideToggle = (id) => {
    setActiveSlides(prev => {
      if (prev.includes(id)) {
        return prev.filter(s => s !== id)
      }
      if (prev.length >= 3) {
        toast({
          title: 'You can only select up to 3 slides.',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        })
        return prev
      }
      return [...prev, id]
    })
  }

  // Delete a slide
  const handleDeleteSlide = (id) => {
    setSlideOptions(prev => prev.filter(s => s.id !== id))
    setActiveSlides(prev => prev.filter(s => s !== id))
  }

  // Upload new slide
  const handleUpload = () => {
    const file = fileInputRef.current.files[0]
    if (!newTitle || !file) {
      toast({
        title: 'Please provide a title and select an image file.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }
    const url = URL.createObjectURL(file)
    setSlideOptions(prev => [
      ...prev,
      {
        id: prev.length ? Math.max(...prev.map(s => s.id)) + 1 : 1,
        title: newTitle,
        subtitle: newSubtitle,
        image: url,
      }
    ])
    setNewTitle('')
    setNewSubtitle('')
    fileInputRef.current.value = null
    toast({
      title: 'Slide uploaded.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  // Save notification settings
  const handleSaveNotifications = () => {
    toast({
      title: 'Notification settings saved.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
    // TODO: persist emailOrders, emailPromos, smsAlerts
  }

  // Save slides & persist to localStorage
  const handleSaveSlides = () => {
    toast({
      title: 'Slide selection saved.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
    // TODO: also send to your API if needed
  }

  return (
    <Box p={6}>
      <Heading color="primary.50" mb={6}>Settings</Heading>

      <Tabs variant="enclosed">
        <TabList mb="1em">
          <Tab>Appearance</Tab>
          <Tab>Notifications</Tab>
          <Tab>Slides</Tab>
        </TabList>

        <TabPanels>

          {/* Appearance */}
          <TabPanel>
            <Stack spacing={4} maxW="md">
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Dark Mode</FormLabel>
                <Switch isChecked={colorMode === 'dark'} onChange={toggleColorMode} />
              </FormControl>
              <Button
                bg="primary.50" _hover={{ bg:"rgba(255,255,255,0.2)", color: "primary.50" }} color="primary.100"
                onClick={() =>
                  toast({
                    title: `Theme set to ${colorMode === 'dark' ? 'Dark' : 'Light'}.`,
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                  })
                }
              >
                Save Appearance
              </Button>
            </Stack>
          </TabPanel>

          {/* Notifications */}
          <TabPanel>
            <Stack spacing={4} maxW="md">
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Email on New Orders</FormLabel>
                <Switch isChecked={emailOrders} onChange={e => setEmailOrders(e.target.checked)} />
              </FormControl>
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Email on Promotions</FormLabel>
                <Switch isChecked={emailPromos} onChange={e => setEmailPromos(e.target.checked)} />
              </FormControl>
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">SMS Alerts</FormLabel>
                <Switch isChecked={smsAlerts} onChange={e => setSmsAlerts(e.target.checked)} />
              </FormControl>
              <Button
                bg="primary.50" _hover={{ bg:"rgba(255,255,255,0.2)", color: "primary.50" }} color="primary.100"
                onClick={handleSaveNotifications}
              >
                Save Notification Settings
              </Button>
            </Stack>
          </TabPanel>

          {/* Slides */}
          <TabPanel>
            {/* Upload Section */}
            <Box borderWidth="1px" borderRadius="md" p={4} mb={6} maxW="md">
              <Heading size="sm" mb={4}>Upload New Hero Image</Heading>
              <FormControl mb={3}>
                <FormLabel>Slide Title</FormLabel>
                <Input
                  placeholder="E.g. ‘Summer Sale’"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                />
              </FormControl>
              <FormControl mb={3}>
                <FormLabel>Slide Subtitle</FormLabel>
                <Input
                  placeholder="E.g. ‘Up to 50% off’"
                  value={newSubtitle}
                  onChange={e => setNewSubtitle(e.target.value)}
                />
              </FormControl>
              <FormControl mb={3}>
                <FormLabel>Image File</FormLabel>
                <Input type="file" accept="image/*" ref={fileInputRef} />
              </FormControl>
              <Button
                bg="primary.50" _hover={{ bg:"rgba(255,255,255,0.2)", color: "primary.50" }} color="primary.100"
                onClick={handleUpload}
              >
                Upload
              </Button>
            </Box>

            {/* Grid of Slides */}
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={4}>
              {slideOptions.map(slide => (
                <Box
                  key={slide.id}
                  borderWidth="1px"
                  borderRadius="md"
                  overflow="hidden"
                  p={2}
                  position="relative"
                >
                  <IconButton
                    icon={<FiTrash2 />}
                    size="sm"
                    aria-label="Delete slide"
                    position="absolute"
                    top="2px"
                    right="2px"
                    onClick={() => handleDeleteSlide(slide.id)}
                  />
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    objectFit="cover"
                    w="100%"
                    h="120px"
                  />
                  <VStack align="start" mt={2} spacing={1}>
                    <Text fontWeight="bold">{slide.title}</Text>
                    <Text fontSize="sm" color="gray.600">{slide.subtitle}</Text>
                    <Checkbox
                      isChecked={activeSlides.includes(slide.id)}
                      onChange={() => handleSlideToggle(slide.id)}
                      isDisabled={
                        !activeSlides.includes(slide.id) && activeSlides.length >= 3
                      }
                    >
                      Show in Hero
                    </Checkbox>
                  </VStack>
                </Box>
              ))}
            </SimpleGrid>

            <Flex justify="flex-end">
              <Button
                w={32}
                bg="primary.50" _hover={{ bg:"rgba(255,255,255,0.2)", color: "primary.50" }} color="primary.100"
                onClick={handleSaveSlides}
              >
                Save Slides
              </Button>
            </Flex>
          </TabPanel>

        </TabPanels>
      </Tabs>
    </Box>
  )
}
