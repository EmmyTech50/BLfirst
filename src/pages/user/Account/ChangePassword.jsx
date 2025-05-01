import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Heading, FormControl, FormLabel, Input, Button, useToast, Container
} from "@chakra-ui/react";

export default function ChangePassword() {
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = () => {
    if (newPass !== confirm) {
      toast({ title: "Passwords do not match.", status: "error", duration: 3000, isClosable: true });
      return;
    }
    // TODO: call API...
    toast({ title: "Password changed.", status: "success", duration: 2000, isClosable: true });
    navigate("/account");
  };

  return (
    <Container maxW="md" py={8}>
      <Heading mb={6}>Change Password</Heading>
      <Box bg="white" p={6} borderRadius="md" boxShadow="sm">
        <FormControl mb={4}>
          <FormLabel>Current Password</FormLabel>
          <Input type="password" value={current} onChange={e => setCurrent(e.target.value)} focusBorderColor="pink.300" />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>New Password</FormLabel>
          <Input type="password" value={newPass} onChange={e => setNewPass(e.target.value)} focusBorderColor="pink.300" />
        </FormControl>
        <FormControl mb={6}>
          <FormLabel>Confirm New Password</FormLabel>
          <Input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} focusBorderColor="pink.300" />
        </FormControl>
        <Button colorScheme="pink" onClick={handleChange}>Update Password</Button>
      </Box>
    </Container>
  );
}
