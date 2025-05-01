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
  Checkbox,
  Link,
  useToast,
} from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Logo from '../../assets/tulip-logo.png';

export default function Login() {
  const navigate = useNavigate();
  const toast    = useToast();

  const [email, setEmail]             = useState("");
  const [password, setPassword]       = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe]     = useState(false);

  const handleLogin = e => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in both fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    toast({
      title: "Login successful",
      description: `Welcome back!`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });

    navigate("/", { replace: true });
  };

  return (
    <Box minH="100vh" bg="#FDF9F3" display="flex" flexDirection="column">
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
        <Text fontSize="sm" color="gray.600">
          New here?{" "}
          <Link as={RouterLink} to="/register" color="primary.50" fontWeight="medium">
            Register Now
          </Link>
        </Text>
      </Flex>

      {/* Form */}
      <Container maxW="md" flex="1" py={12}>
        <Box p={8} bg="white" borderRadius="md" boxShadow="sm">
          <VStack spacing={6} align="stretch">
            <Text fontSize="2xl" fontWeight="bold" textAlign="center" color="primary.50">
              Welcome Back!
            </Text>
            <form onSubmit={handleLogin}>
              <VStack spacing={4}>
                <FormControl id="email" isRequired>
                  <FormLabel>Email Address</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
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
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      focusBorderColor="primary.50"
                    />
                    <InputRightElement>
                      <Button
                        variant="ghost"
                        onClick={() => setShowPassword(!showPassword)}
                        size="sm"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Flex width="100%" justify="space-between" align="center">
                  <Checkbox
                    colorScheme="orange"
                    isChecked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                  >
                    Remember me
                  </Checkbox>
                  <Link as={RouterLink} to="/forgot-password" fontSize="sm" color="primary.50">
                    Forgot Password?
                  </Link>
                </Flex>
                <Button
                  type="submit"
                  width="full"
                  bg="primary.50"
                  color="white"
                  size="lg"
                  _hover={{ bg: "primary.150" }}
                >
                  Log In
                </Button>
              </VStack>
            </form>
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
