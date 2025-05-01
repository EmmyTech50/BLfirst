
import PropTypes from "prop-types";
import { Box, Container, Flex, Button } from "@chakra-ui/react";

export default function CategoryTabs({ categories, selected, onSelect }) {
  return (
    <Box bg="primary.50" py={2} display={{ base: "none", md: "block" }}>
      <Container maxW="container.xl">
        <Flex justify="center">
          {categories.map(cat => (
            <Button
              key={cat.id}
              variant="ghost"
              mx={1}
              color="white" 
              fontWeight={selected === cat.id.toString() ? "bold" : "normal"}
              onClick={() => onSelect(cat.id.toString())}
              _hover={{ bg: "rgba(255,255,255,0.2)" }}
            >
              {cat.name}
            </Button>
          ))}
          <Button
            variant="ghost"
            mx={1}
            color="white" 
            fontWeight={selected === "all" ? "bold" : "normal"}
            onClick={() => onSelect("all")}
            _hover={{ bg: "rgba(255,255,255,0.2)" }}
          >
            All Products
          </Button>
        </Flex>
      </Container>
    </Box>
  );
}

CategoryTabs.propTypes = {
  categories: PropTypes.array.isRequired,
  selected:   PropTypes.string.isRequired,
  onSelect:   PropTypes.func.isRequired,
};

CategoryTabs.defaultProps = {
  categories: [],
  selected:   "all",
  onSelect:   () => {},
};
