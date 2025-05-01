import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Flex,
  Container,
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Text,
  Image,
  Link,
  useToast,
} from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Logo from '../../assets/tulip-logo.png';

export default function RegisterPage() {
  const navigate = useNavigate();
  const toast = useToast();

  const [name, setName]                 = useState("");
  const [email, setEmail]               = useState("");
  const [password, setPassword]         = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm]   = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Simulate successful registration
    toast({
      title: "Registration Successful",
      description: `Welcome, ${name}! Please log in.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    navigate("/login");
  };

  return (
    <Box minH="100vh" bg="gray.50" display="flex" flexDirection="column">
      {/* Header */}
      <Flex
        as="header"
        position="sticky"
        top="0"
        bg="white"
        borderBottom="1px solid"
        borderColor="gray.200"
        py={4}
        px={6}
        align="center"
      >
        <RouterLink to="/">
          <Image src={Logo} alt="The Tulip Logo" h="40px" objectFit="contain" />
        </RouterLink>
      </Flex>

      {/* Registration Form */}
      <Container maxW="md" flex="1" py={12}>
        <Box p={8} bg="white" borderRadius="md" boxShadow="sm">
          <VStack spacing={6} align="stretch">
            <Text fontSize="2xl" fontWeight="bold" textAlign="center" color="primary.50">
              Create Your Account
            </Text>

            <form onSubmit={handleRegister}>
              <VStack spacing={4}>
                <FormControl id="name" isRequired>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    size="lg"
                    focusBorderColor="primary.50"
                  />
                </FormControl>

                <FormControl id="email" isRequired>
                  <FormLabel>Email Address</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    size="lg"
                    focusBorderColor="primary.50"
                  />
                </FormControl>

                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup size="lg">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      focusBorderColor="primary.50"
                    />
                    <InputRightElement>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <FormControl id="confirmPassword" isRequired>
                  <FormLabel>Confirm Password</FormLabel>
                  <InputGroup size="lg">
                    <Input
                      type={showConfirm ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      focusBorderColor="primary.50"
                    />
                    <InputRightElement>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowConfirm((v) => !v)}
                        aria-label={showConfirm ? "Hide password" : "Show password"}
                      >
                        {showConfirm ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <Button
                  type="submit"
                  width="full"
                  bg="primary.50" _hover={{bg:"rgba(255,255,255,0.2)", color: "primary.50"}} color="primary.100"
                  size="lg"
                >
                  Create Account
                </Button>
              </VStack>
            </form>

            <Text textAlign="center" fontSize="sm" color="gray.600">
              Already have an account?{" "}
              <Link as={RouterLink} to="/login" color="primary.50" fontWeight="medium">
                Log in
              </Link>
            </Text>
          </VStack>
        </Box>
      </Container>

      {/* Footer */}
      <Box as="footer" p={4} textAlign="center" color="gray.500" fontSize="sm">
        © 2025 The Tulip Body Care. All rights reserved.
      </Box>
    </Box>
  );
}
