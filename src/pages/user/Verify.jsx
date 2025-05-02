import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Flex,
  Container,
  VStack,
  FormControl,
  FormLabel,
  Button,
  Text,
  Image, 
  useToast,
  HStack,
  PinInput,
  PinInputField,
  Divider,
} from "@chakra-ui/react";
import Logo from '../../assets/tulip-logo.png';
import { TB_ALERT } from '../../api/utils';

export default function Login() {
  const navigate = useNavigate();
  const toast = useToast();

  const [pinCode, setPinCode] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (pinCode.length !== 6) {
      toast(TB_ALERT.error("Error", "Please enter a 6-digit PIN code"));
      return;
    }

    toast(TB_ALERT.success("Success", "PIN verification successful!"));
    navigate("/login", { replace: true });
  };

  return (
    <Box minH="100vh" bg="#FDF9F3" display="flex" flexDirection="column" bgGradient="linear(to-r, rgba(164, 141, 159, 0.8), rgba(0,0,0,0.3))">
      {/* Sticky Header */}
      <Flex
        as="header"
        position="sticky"
        top="0"
        zIndex="banner"
        bg="primary.100"
        borderBottom="1px solid"
        borderColor="gray.200"
        py={4}
        px={6}
        align="center"
        justify="space-between"
      >
        <RouterLink to="/">
          <Image src={Logo} alt="Logo" h="40px" objectFit="contain" />
        </RouterLink> 
      </Flex>

      {/* Form */}
      <Container maxW="md" flex="1" py={12}>
        <Box p={8} bg="white" borderRadius="md" boxShadow="sm">
          <VStack spacing={6} align="stretch">
            <Text fontSize="2xl" fontWeight="bold" textAlign="center" color="primary.50">
              Enter Your 6-Digit PIN
            </Text>
            <form onSubmit={handleLogin}>
              <VStack spacing={6}>
                <FormControl id="pin" isRequired>
                  <FormLabel>PIN Code</FormLabel>
                  <HStack justify="center">
                    <PinInput
                      otp
                      value={pinCode}
                      onChange={setPinCode}
                      type="number"
                      size="lg"
                    >
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                    </PinInput>
                  </HStack>
                </FormControl>
                <Button
                  type="submit"
                  width="full"
                  bg="primary.50"
                  color="white"
                  size="lg"
                  _hover={{ bg: "primary.150" }}
                >
                  Verify
                </Button>
              </VStack>
            </form>
          </VStack>
        </Box>
      </Container>

      <Divider/>
      {/* Footer */}
      <Box as="footer" p={4} textAlign="center" color="gray.500" fontSize="sm">
        © 2025 The Tulip Body Care. All rights reserved.
      </Box>
    </Box>
  );
}
