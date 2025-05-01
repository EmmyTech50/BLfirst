import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from '../../assets/tulip-logo.png';
import Footer from "../../components/Footer";
import CategoryTabs from "../../components/Home/CategoryTabs";
import HeroSection from "../../components/Home/HeroSection";

import {
  Box,
  Flex,
  Text,
  Image,
  Button,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Container,
  SimpleGrid,
  Badge,
  HStack,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Center,
  Divider,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  RadioGroup,
  Radio,
  useToast,
  Icon,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select
} from "@chakra-ui/react";

import {
  FiShoppingCart,
  FiHeart,
  FiUser,
  FiStar,
  FiChevronRight,
  FiPlus,
  FiArrowRight,
  FiShoppingBag,
  FiTrash2,
  FiMinus,
  FiMenu,
  FiChevronDown,
} from "react-icons/fi";

import { motion } from "framer-motion";
// Use motion.create to wrap Chakra Box
const MotionBox = motion.create(Box);

// Sample product categories
const productCategories = [
  {
    id: 1,
    name: "Skincare",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400&q=80",
    featured: true
  },
  {
    id: 2,
    name: "Makeup",
    image:
      "https://images.unsplash.com/photo-1526758097130-bab247274f58?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400&q=80",
    featured: true
  },
  {
    id: 3,
    name: "Hair Care",
    image:
      "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400&q=80",
    featured: false
  },
  {
    id: 4,
    name: "Body Care",
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400&q=80",
    featured: true
  },
  {
    id: 5,
    name: "Fragrances",
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400&q=80",
    featured: false
  },
  {
    id: 6,
    name: "Tools & Accessories",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400&q=80",
    featured: false
  }
];

// Sample products
const products = [
  {
    id: 101,
    name: "Hydrating Facial Serum",
    price: 39.99,
    discountPrice: 29.99,
    rating: 4.8,
    reviewCount: 124,
    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400&q=80",
    categoryId: 1,
    isNew: true,
    isBestseller: true,
    description:
      "Advanced hydrating serum with hyaluronic acid and vitamin C for a radiant complexion.",
    tags: ["Hydrating", "Anti-aging"]
  },
  {
    id: 102,
    name: "Matte Foundation",
    price: 45.0,
    discountPrice: null,
    rating: 4.6,
    reviewCount: 98,
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400&q=80",
    categoryId: 2,
    isNew: false,
    isBestseller: true,
    description: "Long-lasting matte foundation for all-day flawless coverage.",
    tags: ["Oil-free", "Long-lasting"]
  },
  {
    id: 103,
    name: "Repairing Hair Mask",
    price: 28.5,
    discountPrice: 22.99,
    rating: 4.7,
    reviewCount: 85,
    image:
      "https://images.unsplash.com/photo-1608248543803-ba9f8a322e3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400&q=80",
    categoryId: 3,
    isNew: false,
    isBestseller: false,
    description:
      "Deep conditioning treatment that repairs damaged hair and adds shine.",
    tags: ["Repair", "Deep conditioning"]
  },
  {
    id: 104,
    name: "Exfoliating Body Scrub",
    price: 32.0,
    discountPrice: null,
    rating: 4.5,
    reviewCount: 67,
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400&q=80",
    categoryId: 4,
    isNew: true,
    isBestseller: false,
    description: "Gentle exfoliating scrub for smooth, soft skin.",
    tags: ["Exfoliating", "Moisturizing"]
  },
  {
    id: 105,
    name: "Floral Eau de Parfum",
    price: 75.0,
    discountPrice: 59.99,
    rating: 4.9,
    reviewCount: 153,
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400&q=80",
    categoryId: 5,
    isNew: false,
    isBestseller: true,
    description: "Elegant floral fragrance with notes of jasmine and rose.",
    tags: ["Floral", "Long-lasting"]
  },
  {
    id: 106,
    name: "Makeup Brush Set",
    price: 49.99,
    discountPrice: null,
    rating: 4.7,
    reviewCount: 112,
    image:
      "https://images.unsplash.com/photo-1610998342124-c4fcba4cf4bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400&q=80",
    categoryId: 6,
    isNew: false,
    isBestseller: false,
    description: "Professional makeup brush set with 12 essential brushes.",
    tags: ["Professional", "Cruelty-free"]
  },
  {
    id: 107,
    name: "Retinol Night Cream",
    price: 58.0,
    discountPrice: 49.99,
    rating: 4.8,
    reviewCount: 89,
    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400&q=80",
    categoryId: 1,
    isNew: true,
    isBestseller: false,
    description:
      "Anti-aging night cream with retinol to reduce fine lines and wrinkles.",
    tags: ["Anti-aging", "Regenerating"]
  },
  {
    id: 108,
    name: "Volumizing Mascara",
    price: 24.99,
    discountPrice: null,
    rating: 4.5,
    reviewCount: 76,
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400&q=80",
    categoryId: 2,
    isNew: false,
    isBestseller: true,
    description: "Volumizing mascara for dramatic lashes.",
    tags: ["Volumizing", "Waterproof"]
  }
];

// Locations + fees
const deliveryFees = {
  Lagos: 1500,
  Abuja: 2500,
  PortHarcourt: 2000,
  Kaduna: 1800,
  Kano: 2200,
};

export default function Home() {
  const toast = useToast();
  // const navigate = useNavigate();

  // Search & category
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const handleSearch = (e) => setSearchQuery(e.target.value);

  // Cart & wishlist
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  // Drawers & modals
  const { isOpen: isCartOpen, onOpen: onCartOpen, onClose: onCartClose } = useDisclosure();
  const {
    isOpen: isWishlistOpen,
    onOpen: onWishlistOpen,
    onClose: onWishlistClose
  } = useDisclosure();
  const {
    isOpen: isMobileMenuOpen,
    onOpen: onMobileMenuOpen,
    onClose: onMobileMenuClose
  } = useDisclosure();
  const { isOpen: isOrdersOpen,  onClose: onOrdersClose } = useDisclosure();
  const {
    isOpen: isCheckoutOpen,
    onOpen: onCheckoutOpen,
    onClose: onCheckoutClose
  } = useDisclosure();

  // Sorting & price filter
  const [sortOption, setSortOption] = useState(null);
  const { isOpen: isPriceModalOpen, onOpen: onPriceModalOpen, onClose: onPriceModalClose } = useDisclosure();
  const [priceFilter, setPriceFilter] = useState(null);

  // NEW: custom range state
  const [customRange, setCustomRange] = useState([0, 100]);

  // Product detail
  const [selectedProduct, setSelectedProduct] = useState(null);
  const {
    isOpen: isProductDetailOpen,
    onOpen: onProductDetailOpen,
    onClose: onProductDetailClose
  } = useDisclosure();

  // Filter products by category & search
  const filteredProducts = products.filter((p) => {
    const inCat = selectedCategory === "all" || p.categoryId.toString() === selectedCategory;
    const inSearch =
      searchQuery === "" ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return inCat && inSearch;
  });

  // Apply sortOption
  let sortedProducts = [...filteredProducts];
  if (sortOption === "latest") {
    sortedProducts = sortedProducts.filter((p) => p.isNew);
  } else if (sortOption === "bestseller") {
    sortedProducts = sortedProducts
      .filter((p) => p.isBestseller)
      .sort((a, b) => b.reviewCount - a.reviewCount);
  }

    // Apply priceFilter, including custom
    if (priceFilter === "under30") {
      sortedProducts = sortedProducts.filter((p) => (p.discountPrice ?? p.price) <= 30);
    } else if (priceFilter === "30to50") {
      sortedProducts = sortedProducts.filter((p) => {
        const pr = p.discountPrice ?? p.price;
        return pr >= 30 && pr <= 50;
      });
    } else if (priceFilter === "above50") {
      sortedProducts = sortedProducts.filter((p) => (p.discountPrice ?? p.price) > 50);
    } else if (priceFilter?.type === "custom") {
      // the optional‐chaining (?!) guards against null
      const [min, max] = priceFilter.range;
      sortedProducts = sortedProducts.filter((p) => {
        const pr = p.discountPrice ?? p.price;
        return pr >= min && pr <= max;
      });
    }
  

  // Cart/wishlist handlers
  const addToCart = (product) => {
    const existing = cartItems.find((i) => i.id === product.id);
    if (existing) {
      setCartItems(
        cartItems.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
      status: "success",
      duration: 2000,
      isClosable: true
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((i) => i.id !== productId));
    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart",
      status: "info",
      duration: 2000,
      isClosable: true
    });
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems(
      cartItems.map((i) =>
        i.id === productId ? { ...i, quantity: newQuantity } : i
      )
    );
  };

  const addToWishlist = (product) => {
    if (!wishlistItems.some((i) => i.id === product.id)) {
      setWishlistItems([...wishlistItems, product]);
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist`,
        status: "success",
        duration: 2000,
        isClosable: true
      });
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(wishlistItems.filter((i) => i.id !== productId));
    toast({
      title: "Removed from wishlist",
      description: "Item has been removed from your wishlist",
      status: "info",
      duration: 2000,
      isClosable: true
    });
  };

  const moveFromWishlistToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
    toast({
      title: "Moved to cart",
      description: `${product.name} has been moved from wishlist to cart`,
      status: "success",
      duration: 2000,
      isClosable: true
    });
  };

  // Totals
  const calculateCartTotal = () =>
    cartItems
      .reduce((sum, i) => sum + (i.discountPrice ?? i.price) * i.quantity, 0)
      .toFixed(2);
  const cartItemCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);


// Delivery & checkout state
const [deliveryOption, setDeliveryOption] = useState("pickup");
const [location, setLocation]         = useState("");
const [deliveryFee, setDeliveryFee]   = useState(0);
const [cartTotal, setCartTotal]       = useState(0);

// Clear Location and reset the fee
useEffect(() => {
  if (deliveryOption === "pickup") {
    setLocation("");
    setDeliveryFee(0);
  }
}, [deliveryOption]);


// NEW: address lines
const [street, setStreet] = useState("");
const [city, setCity]     = useState("");
const [postal, setPostal] = useState("");


// Recompute cartTotal whenever items change
useEffect(() => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  setCartTotal(total);
}, [cartItems]);

// Handler for location dropdown
const handleLocationChange = (e) => {
  const selected = e.target.value;
  setLocation(selected);
  setDeliveryFee(deliveryFees[selected] || 0);
};

// Derived totals
const goodsTotal = cartTotal;
const grandTotal = goodsTotal + deliveryFee;


  return (
    <Box>
      {/* Header */}
      <Box bg="primary.100" as="header" boxShadow="sm" position="sticky" top="0" zIndex="100">
        <Container maxW="container.xl" py={3}>
          <Flex justify="space-between" align="center">
            <Flex align="center">
              <IconButton
                display={{ base: "flex", md: "none" }}
                icon={<FiMenu />}
                variant="ghost"
                onClick={onMobileMenuOpen}
                aria-label="Open menu"
                mr={2}
              />
              <Image src={Logo} alt="Logo" h="40px" objectFit="contain" />
            </Flex>
            <InputGroup
              maxW={{ base: "60%", md: "md" }}
              mx={{ base: 2, md: 4 }}
              display={{ base: "none", md: "block" }}
            >
              <Input
                placeholder="Search for products..."
                borderRadius="full"
                value={searchQuery}
                onChange={handleSearch}
                borderColor="primary.50"
                _focus={{ borderColor: "primary.50", boxShadow: "0 0 0 1px primary.50" }}
              />
              <InputRightElement>
                <FiChevronRight color="primary.50" />
              </InputRightElement>
            </InputGroup>
            <HStack spacing={4}>
              {/* Wishlist */}
              <Box position="relative" display={{ base: "none", sm: "block" }}>
                <IconButton
                  aria-label="Wishlist"
                  icon={<FiHeart />}
                  variant="ghost"
                  onClick={onWishlistOpen}
                  color="primary.50"
                />
                {wishlistItems.length > 0 && (
                  <Badge
                    position="absolute"
                    top="-6px"
                    right="-6px"
                    borderRadius="full"
                    bg="primary.50"
                    color="white"
                    fontSize="xs"
                    w="18px"
                    h="18px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {wishlistItems.length}
                  </Badge>
                )}
              </Box>
              {/* Cart */}
              <Box position="relative">
                <IconButton
                  aria-label="Shopping cart"
                  icon={<FiShoppingCart />}
                  variant="ghost"
                  onClick={onCartOpen}
                  color="primary.50"
                />
                {cartItemCount > 0 && (
                  <Badge
                    position="absolute"
                    top="-6px"
                    right="-6px"
                    borderRadius="full"
                    bg="primary.50"
                    color="white"
                    fontSize="xs"
                    w="18px"
                    h="18px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Box>
              {/* User Menu */}
              <Menu>
                <MenuButton
                  as={Button}
                  variant="ghost"
                  color="primary.50"
                  rightIcon={<FiChevronDown />}
                >
                  <Icon as={FiUser} boxSize={6} />
                  <Text ml={2} display={{ base: "none", md: "inline" }}>
                    Sign In
                  </Text>
                </MenuButton>
                <MenuList>
                  <MenuItem as={Link} to="/login">Sign In</MenuItem>
                  <MenuItem as={Link} to="/myaccount">My Account</MenuItem>
                  <MenuItem as={Link} to="#">Orders</MenuItem>
                  <MenuItem as={Link} to="/login">Logout</MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </Flex>
        </Container>
        <CategoryTabs
          categories={productCategories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </Box>

      {/* Mobile Menu */}
      <Drawer isOpen={isMobileMenuOpen} placement="left" onClose={onMobileMenuClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader color="primary.50">Menu</DrawerHeader>
          <DrawerBody>
            <VStack align="stretch" spacing={3}>
              <InputGroup>
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearch}
                  borderColor="primary.50"
                  _focus={{ borderColor: "primary.50", boxShadow: "0 0 0 1px primary.50" }}
                />
                <InputRightElement>
                  <FiChevronRight color="primary.50" />
                </InputRightElement>
              </InputGroup>
              <Divider />
              <Text fontWeight="bold" mb={2}>Categories</Text>
              {productCategories.map((cat) => (
                <Button
                  key={cat.id}
                  variant="ghost"
                  justifyContent="flex-start"
                  onClick={() => {
                    setSelectedCategory(cat.id.toString());
                    onMobileMenuClose();
                  }}
                  color="primary.50"
                  _hover={{ bg: "rgba(255,255,255,0.2)" }}
                >
                  {cat.name}
                </Button>
              ))}
              <Button
                variant="ghost"
                justifyContent="flex-start"
                onClick={() => {
                  setSelectedCategory("all");
                  onMobileMenuClose();
                }}
                color="primary.50"
                _hover={{ bg: "rgba(255,255,255,0.2)" }}
              >
                All Products
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Hero */}
      <HeroSection />

      {/* Products Section */}
      <Container maxW="container.xl" mb={16}>
        <Flex justify="space-between" align="center" mb={6}>
          <Heading size="lg" color="primary.50">
            {selectedCategory === "all"
              ? "All Products"
              : productCategories.find((c) => c.id.toString() === selectedCategory)?.name}
          </Heading>
          <HStack spacing={2}>
            <Button
              color="primary.50"
              size="sm"
              variant={sortOption === "latest" ? "solid" : "ghost"}
              onClick={() => {
                setSortOption("latest");
                setPriceFilter(null);
              }}
            >
              Latest
            </Button>
            <Button
              color="primary.50"
              size="sm"
              variant={sortOption === "bestseller" ? "solid" : "ghost"}
              onClick={() => {
                setSortOption("bestseller");
                setPriceFilter(null);
              }}
            >
              Best Sellers
            </Button>
            <Button color="primary.50" size="sm" variant={priceFilter ? "solid" : "ghost"} onClick={onPriceModalOpen}>
              Price
            </Button>
          </HStack>
        </Flex>

        {sortedProducts.length > 0 ? (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
            {sortedProducts.map((product) => (
              <MotionBox
                key={product.id}
                bg="primary.100"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="sm"
                position="relative"
                borderWidth="1px"
                cursor="pointer"
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  setSelectedProduct(product);
                  onProductDetailOpen();
                }}
              >
                {product.isNew && (
                  <Badge
                    position="absolute"
                    top={3}
                    left={3}
                    bg="primary.50"
                    color="white"
                    borderRadius="full"
                    px={2}
                  >
                    New
                  </Badge>
                )}
                {product.isBestseller && (
                  <Badge
                    position="absolute"
                    top={3}
                    right={3}
                    bg="primary.50"
                    color="primary.100"
                    borderRadius="full"
                    px={2}
                  >
                    Best Seller
                  </Badge>
                )}
                <Box position="relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    h="200px"
                    w="100%"
                    objectFit="cover"
                  />
                  <IconButton
                    aria-label="Add to wishlist"
                    icon={<FiHeart />}
                    position="absolute"
                    bottom={3}
                    right={3}
                    colorScheme="white"
                    bg="primary.100"
                    color="primary.50"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToWishlist(product);
                    }}
                  />
                </Box>
                <Box p={4}>
                  <Text color="gray.500" fontSize="sm" mb={1}>
                    {
                      productCategories.find((c) => c.id === product.categoryId)
                        ?.name
                    }
                  </Text>
                  <Text fontWeight="semibold" fontSize="md" mb={2}>
                    {product.name}
                  </Text>
                  <HStack spacing={1} mb={2}>
                    <Flex align="center">
                      <FiStar fill="primary.50" stroke="primary.50" />
                      <Text ml={1} fontSize="sm">
                        {product.rating}
                      </Text>
                    </Flex>
                    <Text fontSize="sm" color="gray.500">
                      ({product.reviewCount} reviews)
                    </Text>
                  </HStack>
                  <Flex align="center" justify="space-between" mt={2}>
                    <Box>
                      {product.discountPrice ? (
                        <Flex align="center">
                          <Text
                            fontWeight="bold"
                            fontSize="md"
                            color="primary.50"
                          >
                            ₦{product.discountPrice.toFixed(2)}
                          </Text>
                          <Text
                            ml={2}
                            fontSize="sm"
                            textDecoration="line-through"
                            color="gray.500"
                          >
                            ₦{product.price.toFixed(2)}
                          </Text>
                        </Flex>
                      ) : (
                        <Text fontWeight="bold" fontSize="md" color="primary.50">
                          ₦{product.price.toFixed(2)}
                        </Text>
                      )}
                    </Box>
                    <Button
                      size="sm"
                      bg="primary.50"
                      color="primary.100"
                      leftIcon={<FiShoppingBag size={14} />}
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      _hover={{ bg: "rgba(255,255,255,0.2)", color: "primary.150" }}
                    >
                      Add
                    </Button>
                  </Flex>
                </Box>
              </MotionBox>
            ))}
          </SimpleGrid>
        ) : (
          <Center p={10} bg="gray.50" borderRadius="lg">
            <VStack>
              <Text>No products found matching your criteria.</Text>
              <Button
                bg="primary.50"
                color="primary.100"
                onClick={() => {
                  setSelectedCategory("all");
                  setSortOption(null);
                  setPriceFilter(null);
                }}
                _hover={{ bg: "#585D18" }}
              >
                View All Products
              </Button>
            </VStack>
          </Center>
        )}
      </Container>

      {/* Price Filter Drawer */}
      <Drawer isOpen={isPriceModalOpen} placement="right" onClose={onPriceModalClose} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader bg="primary.50" color="white">Filter by Price</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              <Text>₦{customRange[0]} – ₦{customRange[1]}</Text>
              <RangeSlider
                colorScheme="pink"
                defaultValue={customRange}
                min={0}
                max={1000}
                onChangeEnd={(val) => setCustomRange(val)}
              >
                <RangeSliderTrack bg="pink.100">
                  <RangeSliderFilledTrack bg="pink.300" />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
              </RangeSlider>
              <HStack>
                <NumberInput
                  flex="1"
                  min={0}
                  value={customRange[0]}
                  onChange={(val) => setCustomRange([Number(val), customRange[1]])}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <NumberInput
                  flex="1"
                  min={0}
                  value={customRange[1]}
                  onChange={(val) => setCustomRange([customRange[0], Number(val)])}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </HStack>
              <Button
                colorScheme="pink"
                onClick={() => {
                  setPriceFilter({ type: "custom", range: customRange });
                  setSortOption(null);
                  onPriceModalClose();
                }}
              >
                Apply
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Product Detail Drawer */}
      <Drawer
        isOpen={isProductDetailOpen}
        placement="right"
        onClose={onProductDetailClose}
        size="lg"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader bg="primary.50" color="white">
            {selectedProduct?.name}
          </DrawerHeader>
          <DrawerBody>
            <VStack align="start" spacing={4}>
              {/* Image */}
              <Image
                src={selectedProduct?.image}
                alt={selectedProduct?.name}
                borderRadius="md"
                w="100%"
                objectFit="cover"
              />

              {/* Name */}
              <Heading size="md">{selectedProduct?.name}</Heading>

              {/* Price & Discount */}
              <HStack spacing={3}>
                <Text fontSize="xl" fontWeight="bold" color="primary.50">
                  ₦{((selectedProduct?.discountPrice ?? selectedProduct?.price) || 0).toFixed(2)}
                </Text>
                {selectedProduct?.discountPrice && (
                  <Text fontSize="md" color="gray.500" textDecoration="line-through">
                    ₦{selectedProduct.price.toFixed(2)}
                 </Text>
                )}
              </HStack>

              {/* Rating & Reviews */}
              <HStack spacing={2}>
                <Icon as={FiStar} color="primary.50" />
                <Text>{selectedProduct?.rating}</Text>
                <Text color="gray.500">({selectedProduct?.reviewCount} reviews)</Text>
              </HStack>

              {/* Full Description */}
              <Box>
                <Text fontWeight="bold" mb={1}>Description</Text>
                <Text>{selectedProduct?.description}</Text>
              </Box>

              {/* Importance & Uses */}
              <Box>
                <Text fontWeight="bold" mb={1}>Importance & Uses</Text>
                <Text>
                  {selectedProduct?.tags.map((tag, i) => (
                    <Text as="span" key={i}>
                      • {tag.charAt(0).toUpperCase() + tag.slice(1)}
                      {i < selectedProduct.tags.length - 1 && ', '}
                    </Text>
                  ))}
                </Text>
              </Box>

              {/* Add to Cart */}
              <Button
                color="white"
                bg="primary.50"
                width="full"
                leftIcon={<FiShoppingBag />}
                onClick={() => {
                  addToCart(selectedProduct);
                  onProductDetailClose();
                }}
                _hover={{ bg: "primary.150" }}
              >
                Add to Cart
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Cart Drawer */}
      <Drawer isOpen={isCartOpen} placement="right" onClose={onCartClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader bg="primary.50" color="white">Your Shopping Cart ({cartItemCount} items)</DrawerHeader>
          <DrawerBody>
            {cartItems.length === 0 ? (
              <Center h="200px" flexDirection="column">
                <FiShoppingCart size={50} color="primary.50" />
                <Text mt={4} color="gray.500">
                  Your cart is empty
                </Text>
                <Button
                  mt={4}
                  bg="primary.50"
                  color="primary.100"
                  onClick={onCartClose}
                  _hover={{ bg: "#585D18" }}
                >
                  Continue Shopping
                </Button>
              </Center>
            ) : (
              <VStack spacing={4} align="stretch">
                {cartItems.map((item) => (
                  <Box key={item.id} borderBottomWidth="1px" pb={4}>
                    <Flex justify="space-between" align="center">
                      <Flex>
                        <Image
                          src={item.image}
                          alt={item.name}
                          w="80px"
                          h="80px"
                          objectFit="cover"
                          borderRadius="md"
                          mr={3}
                        />
                        <Box>
                          <Text fontWeight="medium">{item.name}</Text>
                          <Text color="gray.500" fontSize="sm">
                            {
                              productCategories.find(
                                (c) => c.id === item.categoryId
                              )?.name
                            }
                          </Text>
                          <Text fontWeight="bold" color="primary.50">
                            ₦{((item.discountPrice ?? item.price) || 0).toFixed(2)}
                          </Text>
                        </Box>
                      </Flex>
                      <IconButton
                        icon={<FiTrash2 />}
                        variant="ghost"
                        colorScheme="red"
                        aria-label="Remove item"
                        onClick={() => removeFromCart(item.id)}
                      />
                    </Flex>
                    <Flex justify="space-between" align="center" mt={2}>
                      <HStack spacing={2}>
                        <IconButton
                          icon={<FiMinus />}
                          size="sm"
                          aria-label="Decrease quantity"
                          onClick={() =>
                            updateCartQuantity(item.id, item.quantity - 1)
                          }
                        />
                        <Text>{item.quantity}</Text>
                        <IconButton
                          icon={<FiPlus />}
                          size="sm"
                          aria-label="Increase quantity"
                          onClick={() =>
                            updateCartQuantity(item.id, item.quantity + 1)
                          }
                        />
                      </HStack>
                      <Text fontWeight="bold">
                        ₦
                        {(
                          (item.discountPrice ?? item.price) *
                          item.quantity
                        ).toFixed(2)}
                      </Text>
                    </Flex>
                  </Box>
                ))}
                <Divider />
                <Flex justify="space-between" fontWeight="bold" fontSize="lg">
                  <Text>Total:</Text>
                  <Text>₦{calculateCartTotal()}</Text>
                </Flex>
                <Button
                  bg="primary.50"
                  color="white"
                  size="lg"
                  mt={4}
                  rightIcon={<FiArrowRight />}
                  onClick={() => {
                    onCartClose();
                    onCheckoutOpen();
                  }}
                  _hover={{ bg: "primary.150" }}
                >
                  Proceed to Checkout
                </Button>
                <Button
                  variant="outline"
                  color="primary.50"
                  borderColor="primary.50"
                  size="lg"
                  onClick={onCartClose}
                >
                  Continue Shopping
                </Button>
              </VStack>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Orders Drawer */}
      <Drawer isOpen={isOrdersOpen} placement="right" onClose={onOrdersClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader bg="primary.50" color="white">Your Orders</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              <Text>No past orders found.</Text>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Checkout Drawer */}
      <Drawer isOpen={isCheckoutOpen} placement="right" onClose={onCheckoutClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader bg="primary.50" color="white">Checkout</DrawerHeader>
          <DrawerBody>
            <VStack spacing={6} align="stretch">

              {/* Delivery Options */}
              <Box mt={4}>
                <Text fontWeight="bold">Delivery Option</Text>
                <RadioGroup onChange={setDeliveryOption} value={deliveryOption}>
                  <HStack spacing={5}>
                    <Radio value="pickup" fontWeight="bold">Pickup from Office</Radio>
                    <Radio value="delivery" fontWeight="bold">Deliver to my location</Radio>
                  </HStack>
                </RadioGroup>

                {deliveryOption === "delivery" && (
                  <Box>
                    <Text fontWeight="bold" mb={2}>Select Delivery Location</Text>
                    <Select
                      placeholder="Choose location"
                      value={location}
                      onChange={handleLocationChange}
                    >
                      {Object.entries(deliveryFees).map(([loc, fee]) => (
                        <option key={loc} value={loc}>
                          {loc} — ₦{fee.toLocaleString()}
                        </option>
                      ))}
                    </Select>
                  </Box>
                )}

                <Box mt={4}>
                  <Text fontWeight="bold">Cart Total: ₦{cartTotal.toLocaleString()}</Text>
                  <Text fontWeight="bold">Delivery Fee ({location || "None"}): ₦{deliveryFee.toLocaleString()}</Text>
                  <Text fontWeight="bold" mt={2}>
                    Total: ₦{(cartTotal + deliveryFee).toLocaleString()}
                  </Text>
                </Box>

              </Box>

              {/* Delivery Address */}
              <Box>
                <Text fontWeight="bold" mb={2}>Delivery Address</Text>
                <Input 
                  placeholder="Street address" 
                  mb={2}
                  value={street} 
                  onChange={e => setStreet(e.target.value)} 
                />
                <Input 
                  placeholder="City" 
                  mb={2}
                  value={city} 
                  onChange={e => setCity(e.target.value)} 
                />
                <Input 
                  placeholder="Postal code" 
                  value={postal} 
                  onChange={e => setPostal(e.target.value)} 
                />
              </Box>

              {/* Order Summary */}
              <Box>
                <Flex justify="space-between">
                  <Text fontWeight="bold">Goods Total:</Text>
                  <Text>₦{goodsTotal.toFixed(2)}</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text fontWeight="bold">Delivery Fee:</Text>
                  <Text>₦{deliveryFee.toFixed(2)}</Text>
                </Flex>
                <Divider my={2} />
                <Flex justify="space-between" fontWeight="bold">
                  <Text fontWeight="bold">Grand Total:</Text>
                  <Text>₦{grandTotal.toFixed(2)}</Text>
                </Flex>
              </Box>

              {/* COMPLETE PAYMENT */}
              <Button
                bg="primary.50"
                color="primary.100"
                size="lg"
                rightIcon={<FiArrowRight />}
                onClick={() => {
                  onCheckoutClose();

                  // persist last-used address for MyAccount page
                  const addr = { location, street, city, postal };
                  localStorage.setItem("lastOrderAddress", JSON.stringify(addr));
                  
                  toast({
                    title: "Payment completed!",
                    description: `You paid ₦${grandTotal.toFixed(2)} successfully.`,
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                  });
                }}
              >
                Complete Payment
              </Button>

              {/* CANCEL ORDER */}
              <Button
                variant="outline"
                color="primary.50"
                borderColor="primary.50"
                size="lg"
                rightIcon={<FiTrash2 />}
                onClick={() => {
                  onCheckoutClose();
                  toast({
                    title: "Order canceled",
                    description: "Your order has been canceled.",
                    status: "info",
                    duration: 2000,
                    isClosable: true,
                  });
                }}
              >
                Cancel Order
              </Button>

            </VStack>
          </DrawerBody>

        </DrawerContent>
      </Drawer>

      {/* Wishlist Drawer */}
      <Drawer isOpen={isWishlistOpen} placement="right" onClose={onWishlistClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader bg="primary.50" color="white">Your Wishlist ({wishlistItems.length} items)</DrawerHeader>
          <DrawerBody>
            {wishlistItems.length === 0 ? (
              <Center h="200px" flexDirection="column">
                <FiHeart size={50} color="primary.50" />
                <Text mt={4} color="gray.500">
                  Your wishlist is empty
                </Text>
                <Button
                  mt={4}
                  bg="primary.50"
                  color="primary.100"
                  onClick={onWishlistClose}
                  _hover={{ bg: "#585D18" }}
                >
                  Browse Products
                </Button>
              </Center>
            ) : (
              <VStack spacing={4} align="stretch">
                {wishlistItems.map((item) => (
                  <Box key={item.id} borderBottomWidth="1px" pb={4}>
                    <Flex justify="space-between" align="center">
                      <Flex>
                        <Image
                          src={item.image}
                          alt={item.name}
                          w="80px"
                          h="80px"
                          objectFit="cover"
                          borderRadius="md"
                          mr={3}
                        />
                        <Box>
                          <Text fontWeight="medium">{item.name}</Text>
                          <Text color="gray.500" fontSize="sm">
                            {
                              productCategories.find(
                                (c) => c.id === item.categoryId
                              )?.name
                            }
                          </Text>
                          <Text fontWeight="bold" color="primary.50">
                            ₦{((item.discountPrice ?? item.price) || 0).toFixed(2)}
                          </Text>
                        </Box>
                      </Flex>
                      <IconButton
                        icon={<FiTrash2 />}
                        variant="ghost"
                        colorScheme="red"
                        aria-label="Remove item"
                        onClick={() => removeFromWishlist(item.id)}
                      />
                    </Flex>
                    <Flex justify="flex-end" mt={2}>
                      <Button
                        size="sm"
                        bg="primary.50"
                        color="primary.100"
                        leftIcon={<FiShoppingBag size={14} />}
                        onClick={() => moveFromWishlistToCart(item)}
                        _hover={{ bg: "primary.150" }}
                      >
                        Add to Cart
                      </Button>
                    </Flex>
                  </Box>
                ))}
                <Divider />
                <Button
                  bg="primary.50"
                  color="primary.100"
                  size="lg"
                  mt={4}
                  rightIcon={<FiArrowRight />}
                  onClick={() => {
                    onWishlistClose();
                    onCartOpen();
                  }}
                  _hover={{ bg: "primary.150" }}
                >
                  View Cart
                </Button>
                <Button
                  variant="outline"
                  color="primary.50"
                  borderColor="primary.50"
                  size="lg"
                  onClick={onWishlistClose}
                >
                  Continue Shopping
                </Button>
              </VStack>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Footer */}
      <Footer onCategorySelect={setSelectedCategory} />
    </Box>
  );
}
