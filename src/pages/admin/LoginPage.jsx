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
import { TB_ALERT } from "../../api/utils";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const toast = useToast();

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe]     = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in both email and password.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    
    toast( TB_ALERT.success("Login Successful",  `Welcome back, Admin!`) );

    // navigate into admin area
    navigate("/admin");
  };

  return (
    <Box minH="100vh" bg="gray.50" display="flex" flexDirection="column">
      {/* Sticky Header */}
      <Flex
        as="header"
        position="sticky"
        top="0"
        zIndex="banner"
        bg="white"
        borderBottom="1px solid"
        borderColor="gray.200"
        py={4}
        px={6}
        align="center"
        justify="space-between"
      >
        <RouterLink to="/">
          <Image src={Logo} alt="The Tulip Logo" h="40px" objectFit="contain" />
        </RouterLink>
        <Text fontSize="lg" fontWeight="bold" color="primary.50">
          Admin Panel
        </Text>
      </Flex>

      {/* Login Form */}
      <Container maxW="md" flex="1" py={12}>
        <Box p={8} bg="white" borderRadius="md" boxShadow="sm">
          <VStack spacing={6} align="stretch">
            <Text fontSize="2xl" fontWeight="bold" textAlign="center" color="gray.700">
              Admin Sign In
            </Text>

            <form onSubmit={handleLogin}>
              <VStack spacing={4}>
                <FormControl id="email" isRequired>
                  <FormLabel>Email Address</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    size="lg"
                    focusBorderColor="primary.50"
                  />
                </FormControl>

                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      size="lg"
                      focusBorderColor="primary.50"
                    />
                    <InputRightElement>
                      <Button
                        variant="ghost"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        size="sm"
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
                    onChange={(e) => setRememberMe(e.target.checked)}
                  >
                    Remember me
                  </Checkbox>
                  <Link as={RouterLink} to="/admin/forgot-password" color="primary.50" fontSize="sm">
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
        © 2025 The Tulip Body Care. Admin Dashboard.
      </Box>
    </Box>
  );
}
