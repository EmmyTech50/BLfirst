import {
  Box,
  Flex,
  Container,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  Image,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import Logo from '../../../assets/tulip-logo.png';

export default function FAQs() {
  return (
    <Box minH="100vh" display="flex" flexDirection="column" bg="gray.50">
      {/* ── Sticky Header with Logo ───────────────────────────────────── */}
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

      {/* ── Hero Banner for FAQs ───────────────────────────────────────── */}
      <Box
        bgImage={`url("https://images.unsplash.com/photo-1584466977779-5abdbd0d09a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80")`}
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
            Frequently Asked Questions
          </Heading>
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            maxW="2xl"
            mx="auto"
            textShadow="0 1px 4px rgba(0,0,0,0.4)"
          >
            Everything you need to know about shopping with The Tulip Body Care.
          </Text>
        </Container>
      </Box>

      {/* ── FAQ Accordion ──────────────────────────────────────────────── */}
      <Box flex="1" py={16}>
        <Container maxW="container.md">
          <Accordion allowMultiple>
            {[
              {
                question: 'What are your shipping options and delivery times?',
                answer: (
                  <>
                    <Text mb={2}>
                      • <strong>Pickup at Office</strong>: Ready for pickup within 24 hours. ₦500 handling fee applies.
                    </Text>
                    <Text>
                      • <strong>Home Delivery</strong>: Delivered within 3–5 business days. Free for orders over ₦10,000; ₦1,000 otherwise.
                    </Text>
                  </>
                ),
              },
              {
                question: 'How do I track my order?',
                answer: (
                  <Text>
                    Once your order ships, you’ll receive an email with a tracking number. You can also view all past and current orders via the “Orders” drawer in the header (must be signed in).
                  </Text>
                ),
              },
              {
                question: 'What payment methods do you accept?',
                answer: (
                  <Box as="ul" pl={6} mb={0} styleType="disc">
                    <li>Flutterwave (Bank Card, USSD)</li>
                    <li>Mobile Money</li>
                    <li>Pay on Delivery (card or cash)</li>
                  </Box>
                ),
              },
              {
                question: 'Can I return or exchange an item?',
                answer: (
                  <Text>
                    Yes—we offer a 7-day return window from delivery. Items must be unused and in original packaging. To start a return, go to your Orders drawer, select the order, then click “Request Return.” Our team will email next steps.
                  </Text>
                ),
              },
              {
                question: 'How do I reset my password?',
                answer: (
                  <Text>
                    Click “Sign In” in the header, then “Forgot password?” on the login page. Enter your email and we’ll send a reset link. Check your spam/junk folder if you don’t see it in a few minutes.
                  </Text>
                ),
              },
              {
                question: 'Do you ship internationally?',
                answer: (
                  <Text>
                    At this time we only ship within Nigeria. We plan to add additional countries soon—subscribe to our newsletter for updates.
                  </Text>
                ),
              },
            ].map(({ question, answer }, idx) => (
              <AccordionItem key={idx} borderTop="1px solid" borderColor="gray.200">
                <AccordionButton
                  _expanded={{ bg: 'primary.50', color: 'primary.100' }}
                >
                  <Box flex="1" textAlign="left" fontWeight="semibold">
                    {question}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>{answer}</AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </Box>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <Box as="footer" p={4} textAlign="center" color="gray.500" fontSize="sm" bg="white">
        <Text>© 2025 The Tulip Body Care. All rights reserved.</Text>
      </Box>
    </Box>
  );
}
