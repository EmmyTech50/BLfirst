import  { useState } from "react";
import Logo from '../../assets/tulip-logo.png';
import {  Link as RouterLink } from "react-router-dom";
import {
  Box,
  Flex,
  Input,
  Button,
  Text,
  Link,
  Container,
  VStack,
  FormControl,
  FormLabel,
  useToast,
  Alert,
  AlertIcon,
  AlertDescription,
  Image,
} from "@chakra-ui/react";
import { TB_ALERT } from "../../api/utils";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const toast = useToast();

  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Forgot password logic would go here
    if (!email) {
      toast( TB_ALERT.error("Error", "Please enter your email address.") );
      return;
    }
    
     
    // Simulate password reset email being sent 
    setIsSubmitted(true);
    toast( TB_ALERT.success("Email Sent", "Check your inbox for password reset instructions.") );
  };


  return (
    <Box minH="100vh" bgGradient="linear(to-r, rgba(123, 106, 119, 0.8), rgba(0,0,0,0.3))">
      {/* Header */}
      <Flex 
        as="header" 
        width="100%" 
        py={4} 
        px={6} 
        align="center" 
        justify="space-between"
        borderBottom="1px solid" 
        borderColor="gray.100"
        bg="primary.100"
      >
        <RouterLink to="/">
          <Image src={Logo} alt="Logo" h="40px" objectFit="contain" />
          </RouterLink>
        <Text fontSize="sm" color="gray.600">
          Remember your password? <Link color="primary.50" fontWeight="medium" href="#">Log In</Link>
        </Text>
      </Flex>

      {/* Main Content */}
      <Container maxW="container.xl" py={8}>
        <Flex 
          direction={{ base: "column", lg: "row" }} 
          gap={8} 
          justify="center" 
          align="stretch"
        >
          {/* Forgot Password Form */}
          <Box 
            flex="1" 
            p={8} 
            bg="primary.100" 
            borderRadius="md" 
            boxShadow="sm"
            maxW={{ base: "100%", lg: "500px" }}
            height="auto"
            mx="auto"
          >
            <VStack spacing={6} align="stretch">
              <Text fontSize="2xl" fontWeight="bold" color="primary.50" textAlign="center">
                Forgot Your Password?
              </Text>
              
              <Text color="gray.600" textAlign="center">
                Enter your email address and we'll send you instructions to reset your password.
              </Text>
              
              {isSubmitted ? (
                <Alert
                  status="success"
                  variant="subtle"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                  borderRadius="md"
                  py={4}
                >
                  <AlertIcon boxSize="6" mr={0} />
                  <AlertDescription maxWidth="sm" mt={3}>
                    Password reset instructions have been sent to {email}.
                    <Text mt={2}>
                      Please check your email inbox and follow the instructions.
                    </Text>
                  </AlertDescription>
                  <Button 
                    mt={4} 
                    color="primary.50" 
                    variant="link"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Didn't receive the email? Try again
                  </Button>
                </Alert>
              ) : (
                <form onSubmit={handleForgotPassword}>
                  <VStack spacing={4}>
                    <FormControl id="email" isRequired>
                      <FormLabel fontSize="sm" color="gray.700">Email Address</FormLabel>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        size="lg"
                        focusBorderColor="primary.50"
                      />
                    </FormControl>
                    
                    <Button
                      width="100%"
                      type="submit"
                      bg="primary.50"
                      _hover={{ bg: "#e88e0d" }}
                      color="primary.100"
                      size="md"
                      mt={2}
                    >
                      Send Reset Instructions
                    </Button>
                  </VStack>
                </form>
              )}
              
              <Flex width="100%" justify="center" pt={4}>
                <Text fontSize="sm" color="gray.600">
                  Need an account? <Link color="primary.50" fontWeight="medium" href="/register">Register Now</Link>
                </Text>
              </Flex>
            </VStack>
          </Box>
        </Flex>
      </Container>
      
      {/* Footer */}
      <Box as="footer" p={4} textAlign="center" color="gray.500" fontSize="sm">
        <Text>© 2025 Bright & Lustre. All rights reserved.</Text>
      </Box>
    </Box>
  );
};

export default ForgotPassword;