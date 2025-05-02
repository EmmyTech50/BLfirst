
import PropTypes from "prop-types";
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
  HStack,
  IconButton,
  VStack,
  Button,
  InputGroup,
  Input,
  InputRightElement,
  Divider
} from "@chakra-ui/react";
import { FiArrowRight, FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";
import { Link } from "react-router-dom";

const productCategories = [
  { id: 1, name: "Skincare" },
  { id: 2, name: "Makeup" },
  { id: 3, name: "Hair Care" },
  { id: 4, name: "Body Care" }
];

function Footer({ onCategorySelect }) {
  return (
    <Box bg="primary.50" color="primary.100" py={10}>
      <Container maxW="container.xl">
        <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={8}>
          
          {/* Brand & Social */}
          <GridItem>
            <Heading size="md" mb={4}>The Tulip Body Care</Heading>
            <Text mb={4}>Premium beauty products for your natural glow.</Text>
            <HStack spacing={4}>
              <IconButton
                as="a"
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                icon={<FiFacebook />}
                variant="ghost"
                color="primary.100"
              />
              <IconButton
                as="a"
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                icon={<FiInstagram />}
                variant="ghost"
                color="primary.100"
              />
              <IconButton
                as="a"
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                icon={<FiTwitter />}
                variant="ghost"
                color="primary.100"
              />
            </HStack>
          </GridItem>

          {/* Shop Links */}
          <GridItem>
            <Heading size="md" mb={4}>Shop</Heading>
            <VStack align="start" spacing={2}>
              {productCategories.map(cat => (
                <Button
                  key={cat.id}
                  variant="link"
                  color="primary.100"
                  fontWeight="normal"
                  onClick={() => {
                    onCategorySelect(cat.id.toString());
                    window.scrollTo(0, 0);
                  }}
                >
                  {cat.name}
                </Button>
              ))}
            </VStack>
          </GridItem>

          {/* Customer Service */}
          <GridItem>
            <Heading size="md" mb={4}>Customer Service</Heading>
            <VStack align="start" spacing={2}>
              <Button variant="link" color="primary.100" fontWeight="normal" as={Link} to="/aboutus">
                About Us
              </Button>
              <Button variant="link" color="primary.100" fontWeight="normal" as={Link} to="/contact-us">
                Contact Us
              </Button>
              <Button variant="link" color="primary.100" fontWeight="normal" as={Link} to="/faqs">
                FAQs
              </Button>
              <Button variant="link" color="primary.100" fontWeight="normal" as={Link} to="/shippingandreturn">
                Shipping & Returns
              </Button>
              <Button variant="link" color="primary.100" fontWeight="normal" as={Link} to="/privacypolicy">
                Privacy Policy
              </Button>
            </VStack>
          </GridItem>

          {/* Newsletter */}
          <GridItem>
            <Heading size="md" mb={4}>Newsletter</Heading>
            <Text mb={4}>Subscribe to get updates on new arrivals and special offers.</Text>
            <InputGroup>
              <Input
                placeholder="Your email address"
                bg="primary.100"
                color="gray.800"
                _placeholder={{ color: "gray.500" }}
              />
              <InputRightElement>
                <IconButton
                  aria-label="Subscribe"
                  icon={<FiArrowRight />}
                  bg="primary.50"
                  color="primary.100"
                  _hover={{ bg: "primary.150" }}
                />
              </InputRightElement>
            </InputGroup>
          </GridItem>
        </Grid>

        <Divider my={6} borderColor="gray.500" />

        <Text textAlign="center" fontSize="sm">
          © {new Date().getFullYear()} The Tulip Body Care. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
}

Footer.propTypes = {
  onCategorySelect: PropTypes.func.isRequired
};

export default Footer;
