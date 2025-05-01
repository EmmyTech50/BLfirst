import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Heading, FormControl, FormLabel, Input, Button, useToast, Container
} from "@chakra-ui/react";

export default function EditProfile() {
  const [name, setName] = useState("Jane Doe");
  const [email, setEmail] = useState("janedoe@example.com");
  const toast = useToast();
  const navigate = useNavigate();

  const handleSave = () => {
    // TODO: call API...
    toast({ title: "Profile updated.", status: "success", duration: 2000, isClosable: true });
    navigate("/account");
  };

  return (
    <Container maxW="md" py={8}>
      <Heading mb={6}>Edit Profile</Heading>
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
  );
}
