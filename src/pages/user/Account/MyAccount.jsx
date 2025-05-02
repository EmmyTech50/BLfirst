
import { useRef, useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Box,
  Flex,
  Heading,
  Avatar,
  Text,
  Button,
  Stack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  // useColorModeValue,
  Image,
  Spacer,
  Input,
  VStack,
  IconButton,
  Divider,
} from "@chakra-ui/react";
import {
  FaUserEdit,
  FaBoxOpen,
  FaMapMarkerAlt,
  FaSignOutAlt,
  FaCog,
} from "react-icons/fa";
import { FiCamera } from "react-icons/fi";
import Logo from "../../../assets/tulip-logo.png";

export default function MyAccount({ onLogout }) {
  // const bg = useColorModeValue("gray.50", "gray.800");
  const accent = "pink.300";
  const navigate = useNavigate();

  // Avatar upload
  const [avatarUrl, setAvatarUrl] = useState("");
  const fileInputRef = useRef();
  const handleAvatarClick = () => fileInputRef.current.click();
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatarUrl(reader.result);
    reader.readAsDataURL(file);
  };

  // Load last order address
  const [lastAddress, setLastAddress] = useState(null);
  useEffect(() => {
    const json = localStorage.getItem("lastOrderAddress");
    if (json) setLastAddress(JSON.parse(json));
  }, []);


  return (
    <Box minH="100vh" bgGradient="linear(to-r, rgba(145,106,136,0.8), rgba(0,0,0,0.3))">
      {/* Header */}
      <RouterLink to="/">
        <Flex as="header" bg="white" boxShadow="sm" align="center" px={6} py={4}>
            <Image src={Logo} alt="Logo" h="40px" objectFit="contain" />
          <Spacer />
        </Flex>
      </RouterLink>

      <Flex direction="column" align="center" gap={6} maxW="600px" mx="auto" mt={8} px={4}>
        {/* Avatar with camera overlay */}
        <Box position="relative">
          <Avatar
            size="2xl"
            name="User"
            src={avatarUrl}
            cursor="pointer"
            onClick={handleAvatarClick}
            borderColor={accent}
            borderWidth={2}
          />
          <IconButton
            icon={<FiCamera />}
            size="sm"
            colorScheme="pink"
            position="absolute"
            bottom={0}
            right={0}
            onClick={handleAvatarClick}
            aria-label="Upload avatar"
          />
          <Input type="file" accept="image/*" ref={fileInputRef} onChange={handleAvatarChange} display="none" />
        </Box>

        <Heading size="lg">Jane Doe</Heading>
        <Text color="gray.500">janedoe@example.com</Text>

        <Stack direction="row" spacing={4}>
          <Button leftIcon={<FaUserEdit />} colorScheme="pink" variant="outline" as={RouterLink} to="/editprofile">
            Edit Profile
          </Button>
          <Button leftIcon={<FaSignOutAlt />} colorScheme="pink" onClick={onLogout}>
            Logout
          </Button>
        </Stack>

        <Tabs isFitted variant="enclosed-colored" colorScheme="pink" w="100%" mt={10}>
          <TabList mb="1em">
            <Tab><FaBoxOpen mr={2} />Orders</Tab>
            <Tab><FaMapMarkerAlt mr={2} />Addresses</Tab>
            <Tab><FaCog mr={2} />Settings</Tab>
          </TabList>

          <TabPanels>
            {/* — Orders Panel */}
            <TabPanel>
                <Button colorScheme="pink" onClick={() => navigate("/myorders")}>
                  View Orders
                </Button>
            </TabPanel>

            {/* — Addresses Panel */}
            <TabPanel>
              <VStack align="start" spacing={3}>
                {lastAddress && (
                  <Box pt={2} borderTop="1px " borderWidth="2px" w="100%">
                    <Text fontWeight="semibold" m={2}>{lastAddress.street}, {lastAddress.city}, {lastAddress.postal}, {lastAddress.location}</Text>
                  </Box>
                )}
              </VStack>
            </TabPanel>

            {/* — Settings Panel */}
            <TabPanel>
              <VStack align="start" spacing={4}>
                <Text fontWeight="bold" mb={1}>Manage your password and preferences.</Text>
                <Button colorScheme="pink" as={RouterLink} to="/changepassword">
                  Change Password
                </Button>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>

      <Divider mt={20}/>
        {/* Footer */}
        <Box as="footer" p={4} textAlign="center" color="gray.500" fontSize="sm">
          © 2025 The Tulip Body Care. All rights reserved.
        </Box>
    </Box>
  );
}

MyAccount.propTypes = {
  onLogout: PropTypes.func,
};
