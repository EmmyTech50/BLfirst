import {
  Box,
  Flex,
  Container,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Divider,
  Image,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import Logo from '../../../assets/tulip-logo.png';

export default function ShippingReturns() {
  return (
    <Box minH="100vh" display="flex" flexDirection="column" bg="gray.50" bgGradient="linear(to-r, rgba(145,106,136,0.8), rgba(0,0,0,0.3))" >
      
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

      {/* ── Hero Banner ───────────────────────────────────────────────────── */}
      <Box
        bgImage={`url("https://images.unsplash.com/photo-1585386959984-a415522b40d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80")`}
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
            color="primary.50"
          >
            Shipping &amp; Return Policy
          </Heading>
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            textShadow="0 1px 4px rgba(0,0,0,0.4)"
          >
            Last updated: April 24, 2025
          </Text>
        </Container>
      </Box>

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <Box flex="1" py={12}>
        <Container maxW="container.md" bg="white" p={8} boxShadow="sm" borderRadius="md">
          
          <Heading as="h2" size="lg" mt={4} mb={2} color="primary.100">
            Shipping Policy
          </Heading>
          <UnorderedList mb={4} pl={4} color="gray.700">
            <ListItem>
              <strong>Order Processing:</strong> Orders are processed within 1–2 business days (excluding weekends and holidays).
            </ListItem>
            <ListItem>
              <strong>Shipping Methods:</strong>
              <UnorderedList pl={4} styleType="disc" mb={2}>
                <ListItem>Pickup at Office: Ready for pickup within 24 hours. ₦500 handling fee applies.</ListItem>
                <ListItem>Home Delivery: 3–5 business days. Free on orders over ₦10,000; ₦1,000 otherwise.</ListItem>
              </UnorderedList>
            </ListItem>
            <ListItem>
              <strong>Tracking:</strong> Once shipped, you’ll receive an email with tracking details. You can also view your orders in the “Orders” drawer.
            </ListItem>
          </UnorderedList>

          <Divider my={6} />

          <Heading as="h2" size="lg" mt={6} mb={2} color="primary.100">
            Return &amp; Exchange Policy
          </Heading>
          <UnorderedList mb={4} pl={4} color="gray.700">
            <ListItem>
              <strong>Return Window:</strong> You may return unused items within 3 days of delivery.
            </ListItem>
            <ListItem>
              <strong>Condition:</strong> Items must be in original packaging, unworn, unwashed, with all tags attached.
            </ListItem>
            <ListItem>
              <strong>How to Initiate:</strong> Go to your Orders drawer, select the order, and click “Request Return.” You’ll receive instructions by email.
            </ListItem>
            <ListItem>
              <strong>Refund Method:</strong> Refunds are processed to the original payment method within 5–7 business days after we receive the return.
            </ListItem>
            <ListItem>
              <strong>Exchanges:</strong> If you’d like a different size or color, request a return and place a new order. Stock permitting, we’ll process the exchange free of charge.
            </ListItem>
          </UnorderedList>

          <Divider my={6} />

          <Heading as="h2" size="lg" mt={6} mb={2} color="primary.100">
            Exceptions &amp; Non-Returnable Items
          </Heading>
          <Text mb={4} color="gray.700">
            For hygiene reasons, certain items (e.g. skincare products once opened) cannot be returned. Sale or clearance items are final sale.
          </Text>

          <Text fontSize="sm" color="gray.600" mt={8}>
            If you have any questions about our shipping or return policy, please contact us at{' '}
            <Text as="span" color="primary.50">privacy@TheTulipBodyCare.com</Text>.
          </Text>
        </Container>
      </Box>

      <Divider/>
      {/* Footer */}
      <Box as="footer" p={4} textAlign="center" color="gray.500" fontSize="sm">
        © 2025 The Tulip Body Care. All rights reserved.
      </Box>
    </Box>
  );
}
