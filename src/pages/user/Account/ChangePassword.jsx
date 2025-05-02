import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
  Container,
  Flex,
  Spacer,
  Image,
  useColorModeValue,
  Divider
} from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Logo from "../../../assets/tulip-logo.png";
import { TB_ALERT } from "../../../api/utils";

export default function ChangePassword() {
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();
  const bg = useColorModeValue("gray.50", "gray.800");

  const handleChange = () => {
    if (newPass !== confirm) {
      toast( TB_ALERT.error( "Passwords do not match.") );
      return;
    }
    // TODO: call API... 
    toast( TB_ALERT.success( "Password changed.") );
    navigate("/account");
  };

  return (
    <Box minH="100vh" bg={bg} bgGradient="linear(to-r, rgba(145,106,136,0.8), rgba(0,0,0,0.3))">
      {/* Header */}
      <RouterLink to="/">
        <Flex as="header" bg="white" boxShadow="sm" align="center" px={6} py={4} position="sticky" top={0} zIndex={1}>
            <Image src={Logo} alt="Logo" h="40px" objectFit="contain" />
          <Spacer />
        </Flex>
      </RouterLink>

      <Container maxW="md" py={8}>
        <Heading mb={6} color="primary.50">Change Password</Heading>
        <Box bg="white" p={6} borderRadius="md" boxShadow="sm">

          <FormControl mb={4}>
            <FormLabel>Current Password</FormLabel>
            <InputGroup>
              <Input
                type={showCurrent ? "text" : "password"}
                value={current}
                onChange={e => setCurrent(e.target.value)}
                focusBorderColor="pink.300"
              />
              <InputRightElement>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowCurrent(sc => !sc)}
                  aria-label={showCurrent ? "Hide password" : "Show password"}
                >
                  {showCurrent ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>New Password</FormLabel>
            <InputGroup>
              <Input
                type={showNew ? "text" : "password"}
                value={newPass}
                onChange={e => setNewPass(e.target.value)}
                focusBorderColor="pink.300"
              />
              <InputRightElement>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowNew(sn => !sn)}
                  aria-label={showNew ? "Hide password" : "Show password"}
                >
                  {showNew ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl mb={6}>
            <FormLabel>Confirm New Password</FormLabel>
            <InputGroup>
              <Input
                type={showConfirm ? "text" : "password"}
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                focusBorderColor="pink.300"
              />
              <InputRightElement>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowConfirm(sc => !sc)}
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  {showConfirm ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button colorScheme="pink" width="full" onClick={handleChange}>
            Update Password
          </Button>

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
