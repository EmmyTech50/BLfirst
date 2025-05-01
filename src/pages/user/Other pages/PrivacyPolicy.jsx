import {
  Box,
  Flex,
  Container,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Image,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import Logo from '../../../assets/tulip-logo.png';

export default function PrivacyPolicy() {
  return (
    <Box minH="100vh" display="flex" flexDirection="column" bg="gray.50">
      
      {/* ── Sticky Header ─────────────────────────────────────────────────── */}
      <Flex
        as="header"
        position="sticky"
        top="0"
        zIndex="banner"
        bg="white"
        borderBottom="1px solid"
        borderColor="gray.100"
        align="center"
        py={3}
        px={6}
      >
        <RouterLink to="/">
          <Image src={Logo} alt="Logo" h="40px" objectFit="contain" />
        </RouterLink>
      </Flex>

      {/* ── Hero Banner ───────────────────────────────────────────────────── */}
      <Box
        bgImage={`url("https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80")`}
        bgRepeat="no-repeat"
        bgSize="cover"
        bgPosition="center"
        color="white"
        py={{ base: 16, md: 24 }}
        textAlign="center"
      >
        <Container maxW="container.md">
          <Heading
            as="h1"
            size="2xl"
            mb={4}
            textShadow="0 2px 8px rgba(0,0,0,0.6)"
          >
            Privacy Policy
          </Heading>
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            maxW="2xl"
            mx="auto"
            textShadow="0 1px 4px rgba(0,0,0,0.4)"
          >
            Last updated: April 24, 2025
          </Text>
        </Container>
      </Box>

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <Box flex="1" py={12}>
        <Container maxW="container.md" bg="white" p={8} boxShadow="sm" borderRadius="md">
          <Text mb={6} color="gray.700">
            The Tulip Body Care (“we”, “our”, “us”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or purchase our products.
          </Text>

          <Heading as="h2" size="lg" mt={8} mb={4} color="primary.100">
            1. Information We Collect
          </Heading>
          <UnorderedList mb={4} pl={4} color="gray.700">
            <ListItem><strong>Personal Data:</strong> Name, email address, phone number, shipping address, payment information.</ListItem>
            <ListItem><strong>Usage Data:</strong> Pages visited, time spent on pages, click-stream data.</ListItem>
            <ListItem><strong>Device Data:</strong> IP address, browser type, operating system.</ListItem>
          </UnorderedList>

          <Heading as="h2" size="lg" mt={8} mb={4} color="primary.100">
            2. How We Use Your Information
          </Heading>
          <UnorderedList mb={4} pl={4} color="gray.700">
            <ListItem>To process and fulfill your orders, including shipping and billing.</ListItem>
            <ListItem>To communicate with you about your account and orders.</ListItem>
            <ListItem>To improve our website, products, and services.</ListItem>
            <ListItem>To send you marketing and promotional materials (with your consent).</ListItem>
          </UnorderedList>

          <Heading as="h2" size="lg" mt={8} mb={4} color="primary.100">
            3. Sharing Your Information
          </Heading>
          <UnorderedList mb={4} pl={4} color="gray.700">
            <ListItem>We may share your information with service providers who perform services on our behalf (e.g., payment processors, shipping partners).</ListItem>
            <ListItem>We may disclose your information if required by law or to protect our rights.</ListItem>
            <ListItem>We do not sell your personal information to third parties.</ListItem>
          </UnorderedList>

          <Heading as="h2" size="lg" mt={8} mb={4} color="primary.100">
            4. Cookies and Tracking Technologies
          </Heading>
          <Text mb={6} color="gray.700">
            We use cookies and similar tracking technologies to track activity on our site and hold certain information. You can instruct your browser to refuse cookies or alert you when cookies are being sent.
          </Text>

          <Heading as="h2" size="lg" mt={8} mb={4} color="primary.100">
            5. Your Rights
          </Heading>
          <UnorderedList mb={4} pl={4} color="gray.700">
            <ListItem>You can access, update, or delete your personal information by logging into your account.</ListItem>
            <ListItem>You can object to our processing of your personal data, ask us to restrict processing, or request portability of your data.</ListItem>
            <ListItem>To exercise these rights, please contact us at <Text as="span" color="primary.50">privacy@TheTulipBodyCare.com</Text>.</ListItem>
          </UnorderedList>

          <Heading as="h2" size="lg" mt={8} mb={4} color="primary.100">
            6. Security
          </Heading>
          <Text mb={6} color="gray.700">
            We implement reasonable security measures to protect your information. However, no internet transmission is completely secure.
          </Text>

          <Heading as="h2" size="lg" mt={8} mb={4} color="primary.100">
            7. Changes to This Policy
          </Heading>
          <Text mb={6} color="gray.700">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page with a new “Last updated” date.
          </Text>

          <Text color="gray.700">
            If you have any questions about this Privacy Policy, please contact us at <Text as="span" color="primary.50">privacy@TheTulipBodyCare.com</Text>.
          </Text>
        </Container>
      </Box>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <Box as="footer" p={4} textAlign="center" color="gray.500" fontSize="sm" bg="white">
        <Text>© 2025 The Tulip Body Care. All rights reserved.</Text>
      </Box>
    </Box>
  );
}
