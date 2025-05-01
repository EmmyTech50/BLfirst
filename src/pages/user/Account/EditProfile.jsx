import { useState } from "react";
import { useNavigate,  Link as RouterLink } from "react-router-dom";
import {
  Box, Heading, FormControl, FormLabel, Input, Button, useToast, Container,
  Flex,
  Image,
  Spacer,
  useColorModeValue
} from "@chakra-ui/react";
import Logo from "../../../assets/tulip-logo.png";

export default function EditProfile() {
  const [name, setName] = useState("Jane Doe");
  const [email, setEmail] = useState("janedoe@example.com");
  const toast = useToast();
  const navigate = useNavigate();
  const bg = useColorModeValue("gray.50", "gray.800");

  const handleSave = () => {
    // TODO: call API...
    toast({ title: "Profile updated.", status: "success", duration: 2000, isClosable: true });
    navigate("/account");
  };

  return (
     <Box minH="100vh" bg={bg}>
              {/* Header */}
              <RouterLink to="/">
                <Flex as="header" bg="white" boxShadow="sm" align="center" px={6} py={4} position="sticky" top={0} zIndex={1}>
                    <Image src={Logo} alt="Logo" h="40px" objectFit="contain" />
                  <Spacer />
                </Flex>
              </RouterLink>
      <Container maxW="md" py={8}>
        <Heading mb={6} color="primary.50">Edit Profile</Heading>
        <Box bg="white" p={6} borderRadius="md" boxShadow="sm">
          <FormControl mb={4}>
            <FormLabel>Name</FormLabel>
            <Input value={name} onChange={e => setName(e.target.value)} focusBorderColor="pink.300" />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} focusBorderColor="pink.300" />
          </FormControl>
          <Button colorScheme="pink" onClick={handleSave}>Save Changes</Button>
        </Box>
    
      </Container>
    </Box>
  );
}
