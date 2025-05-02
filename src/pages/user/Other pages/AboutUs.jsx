import { Box, Flex, Container, Heading, Text, SimpleGrid, VStack, Image, Button, Stack, Icon, Divider } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { GiChemicalDrop, GiSeedling } from "react-icons/gi";
import Logo from '../../../assets/tulip-logo.png';

export default function AboutUs() {
  return (
    <Box minH="100vh" display="flex" flexDirection="column" bg="gray.50">
      
      {/* Sticky Header */}
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

      {/* Hero with full-width background */}
      <Box
        bgImage={`url("src/assets/TulipAboutUsBg.jpg")`}
        bgRepeat="no-repeat"
        bgSize="cover"
        bgPosition="center"
        w="98.4vw"            
        h="150vh" 
        color="white"
        py={{ base: 24, md: 40 }}
        textAlign="center"
      >
        <Container maxW="container.lg">
          <Heading size="3xl" mb={4} textShadow="0 2px 8px rgba(0,0,0,0.6)" textAlign="center" color="primary.50">
            About The Tulip Body Care
          </Heading>
          <Text textAlign="center" fontSize={{ base: "lg", md: "xl" }} maxW="3xl" mx="auto" textShadow="0 1px 4px rgba(0,0,0,0.4)" color="rgba(13, 5, 5, 0.3)">
            Natural, cruelty-free skincare crafted to illuminate your inner radiance.
          </Text>
        </Container>
      </Box>


      {/* Our Story & Mission */}
      <Container maxW="container.lg" py={{ base: 12, md: 16 }}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12}>
          <Stack spacing={4} align="center" textAlign="center">
            <Icon as={GiSeedling} boxSize={12} color="primary.50" />
            <Heading size="lg" color="primary.50">Our Story</Heading>
            <Text px={{ base: 4, md: 0 }}>
              In 2023 we began in a small kitchen-lab, blending botanical extracts by hand. Today, our products are celebrated across Nigeria for their purity, performance, and commitment to sustainability.
            </Text>
          </Stack>
          <Stack spacing={4} align="center" textAlign="center">
            <Icon as={GiChemicalDrop} boxSize={12} color="primary.50" />
            <Heading size="lg" color="primary.50">Our Mission</Heading>
            <Text px={{ base: 4, md: 0 }}>
              To empower every individual to embrace their natural beauty with safe, eco-friendly, and effective skincare solutions.
            </Text>
          </Stack>
        </SimpleGrid>
      </Container>

      {/* Meet the Team */}
      <Box bg="white" py={{ base: 12, md: 16 }}bgGradient="linear(to-r, rgba(145,106,136,0.8), rgba(0,0,0,0.3))" >
        <Container maxW="container.lg" textAlign="center">
          <Heading size="lg" mb={8} color="primary.100">Meet the Team</Heading>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
            {[
              { name: "Adaobi Okafor", role: "Founder & CEO", img: "https://randomuser.me/api/portraits/women/68.jpg" },
              { name: "Chinedu Eze", role: "Head Chemist", img: "https://randomuser.me/api/portraits/men/32.jpg" },
              { name: "Funke Adebayo", role: "Marketing Lead", img: "https://randomuser.me/api/portraits/women/44.jpg" },
            ].map((m) => (
              <VStack
                key={m.name}
                spacing={4}
                bg="gray.500"
                p={6}
                borderRadius="lg"
                boxShadow="sm"
                transition="transform 0.2s"
                _hover={{ transform: "translateY(-4px)", boxShadow: "md" }}
              >
                <Image src={m.img} alt={m.name} borderRadius="full" boxSize="150px" objectFit="cover" />
                <Heading size="md">{m.name}</Heading>
                <Text color="gray.600">{m.role}</Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box py={{ base: 8, md: 12 }} textAlign="center" bgGradient="linear(to-r, rgba(145,106,136,0.8), rgba(0,0,0,0.3))" >
        <Button
          as={RouterLink}
          to="/shop"
          size="lg"
          bg="primary.50"
          color="white"
          _hover={{ bg: "primary.150" }}
        >
          Shop Our Products
        </Button>
      </Box>

      <Divider/>
      {/* Footer */}
      <Box as="footer" p={4} textAlign="center" color="gray.500" fontSize="sm" bgGradient="linear(to-r, rgba(145,106,136,0.8), rgba(0,0,0,0.3))">
        © 2025 The Tulip Body Care. All rights reserved.
      </Box>
    </Box>
  );
}
