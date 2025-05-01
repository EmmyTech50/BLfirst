import { useState } from 'react';
import {
  Box,
  Flex,
  Container,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  useToast,
  Image,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import Logo from '../../../assets/tulip-logo.png';

export default function ContactUs() {
  const toast = useToast();
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: 'Message sent!',
      description: "Thanks for reaching out — we'll get back to you soon.",
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <Box minH="100vh" bg="gray.50" display="flex" flexDirection="column">
      {/* Header with logo */}
      <Flex
        as="header"
        position="sticky"
        top="0"
        zIndex="banner"
        py={4}
        px={6}
        justify="space-between"
        align="center"
        borderBottom="1px solid"
        borderColor="gray.100"
        bg="white"
      >
        <RouterLink to="/">
          <Image src={Logo} alt="Logo" h="40px" objectFit="contain" />
        </RouterLink>
      </Flex>

      {/* Main Content */}
      <Box flex="1" py={16}>
        <Container maxW="container.lg">
          <Heading as="h1" size="2xl" mb={4} color="primary.50" textAlign="center">
            Contact Us
          </Heading>
          <Text mb={8} textAlign="center" color="gray.600">
            Have a question or feedback? Fill out the form and we will be in touch within 1–2 business days.
          </Text>

          {/* Two-column layout: Map on left, Form on right */}
          <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
            {/* Left: Google Map */}
            <Box flex="1" h={{ base: '300px', md: '400px' }} borderRadius="md" overflow="hidden" boxShadow="md">
              <iframe
                title="Our Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.123456789!2d3.375!3d6.524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf7b0a0d20203%3A0x5e3ab2bce7f8dd0!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1610000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </Box>

            {/* Right: Contact form */}
            <Box flex="1" bg="white" p={8} boxShadow="md" borderRadius="md">
              <Box as="form" onSubmit={handleSubmit}>
                <VStack spacing={4}>
                  <FormControl id="name" isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                    />
                  </FormControl>

                  <FormControl id="email" isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                    />
                  </FormControl>

                  <FormControl id="subject" isRequired>
                    <FormLabel>Subject</FormLabel>
                    <Input
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="What’s this about?"
                    />
                  </FormControl>

                  <FormControl id="message" isRequired>
                    <FormLabel>Message</FormLabel>
                    <Textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Type your message here…"
                      rows={6}
                    />
                  </FormControl>

                  <Button
                    type="submit"
                    bg="primary.50"
                    color="white"
                    width="full"
                    size="lg"
                    _hover={{ bg: 'primary.150' }}
                  >
                    Send Message
                  </Button>
                </VStack>
              </Box>
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Footer */}
      <Box as="footer" p={4} textAlign="center" color="gray.500" fontSize="sm" bg="white">
        <Text>© 2025 The Tulip Body Care. All rights reserved.</Text>
      </Box>
    </Box>
  );
}
