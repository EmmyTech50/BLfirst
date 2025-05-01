
import { useState, useEffect } from "react";
import { Box, Container, Flex, Heading, Text, HStack, IconButton, Button } from "@chakra-ui/react";
import { FiChevronLeft, FiChevronRight, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// Hero slider images with real URLs
const heroImages = [
  {
    src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=400&q=80",
    alt: "Natural Beauty Products",
    heading: "Discover Your Natural Beauty",
    subtext: "Premium skincare and beauty products crafted with natural ingredients for a radiant you."
  },
  {
    src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=400&q=80",
    alt: "Organic Skincare Collection",
    heading: "Pure & Organic Skincare",
    subtext: "Experience the power of nature with our organic skincare collection."
  },
  {
    src: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=400&q=80",
    alt: "Seasonal Beauty Essentials",
    heading: "Spring Beauty Essentials",
    subtext: "Revitalize your routine with our new season collection of essential beauty products."
  }
];

export default function HeroSection() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(iv);
  }, []);

  const next = () => setCurrentSlide(s => (s + 1) % heroImages.length);
  const prev = () => setCurrentSlide(s => (s - 1 + heroImages.length) % heroImages.length);

  return (
    <Box position="relative" overflow="hidden" mb={10} height={{ base: "400px", md: "500px" }}>
      <Box
        position="absolute"
        width="300%"
        height="100%"
        display="flex"
        transition="transform 0.5s ease-in-out"
        transform={`translateX(-${currentSlide * 33.333}%)`}
      >
        {heroImages.map((image, idx) => (
          <Box key={idx} width="33.333%" height="100%" position="relative"
               bgImage={`url(${image.src})`} bgSize="cover" bgPosition="center">
            <Box position="absolute" top="0" left="0" w="100%" h="100%"
                 bgGradient="linear(to-r, rgba(145,106,136,0.8), rgba(0,0,0,0.3))" />
            <Container maxW="container.xl" h="100%">
              <Flex direction="column" justify="center" h="100%" maxW={{ base: "100%", md: "50%" }}
                    color="white" position="relative" zIndex="1" pl={{ base: 4, md: 0 }}>
                <Heading as="h1" size="2xl" lineHeight="shorter" mb={4}>
                  {image.heading}
                </Heading>
                <Text fontSize="xl" mb={8}>{image.subtext}</Text>
                <HStack spacing={4}>
                  <Button bg="primary.50" color="primary.100" size="lg" rightIcon={<FiArrowRight />}
                          _hover={{ bg: "rgba(255,255,255,0.2)" }}
                          onClick={() => navigate("#")}
                          >
                    Shop Now
                  </Button>
                  <Button 
                    variant="outline" 
                    color="primary.100" 
                    borderColor="primary.100" 
                    size="lg" 
                    _hover={{ bg: "rgba(255,255,255,0.2)" }}
                    onClick={() => navigate("/aboutus")}
                  >
                    Learn More
                  </Button>
                </HStack>
              </Flex>
            </Container>
          </Box>
        ))}
      </Box>

      <IconButton icon={<FiChevronLeft size={24} />} position="absolute" left={4} top="50%"
                  transform="translateY(-50%)" zIndex={2} aria-label="Prev" onClick={prev}
                  rounded="full" bg="whiteAlpha.700" color="primary.50" _hover={{ bg: "whiteAlpha.900" }} />

      <IconButton icon={<FiChevronRight size={24} />} position="absolute" right={4} top="50%"
                  transform="translateY(-50%)" zIndex={2} aria-label="Next" onClick={next}
                  rounded="full" bg="whiteAlpha.700" color="primary.50" _hover={{ bg: "whiteAlpha.900" }} />

      <HStack spacing={2} position="absolute" bottom={4} left="50%" transform="translateX(-50%)" zIndex={2}>
        {heroImages.map((_, i) => (
          <Box key={i} w={3} h={3} borderRadius="full"
               bg={currentSlide === i ? "primary.50" : "whiteAlpha.700"}
               cursor="pointer" onClick={() => setCurrentSlide(i)} />
        ))}
      </HStack>
    </Box>
  );
}
