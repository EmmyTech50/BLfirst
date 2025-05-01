# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh




import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Grid,
  GridItem,
  Stack,
  Avatar,
  Input,
  InputGroup,
  InputLeftElement,
  Badge,
  Divider,
  HStack,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Select,
  Button,
  Icon,
  useColorModeValue,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Progress,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Switch,
  Tag,
  TagLabel,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useToast
} from '@chakra-ui/react';

import {
  FiMenu,
  FiSearch,
  FiBell,
  FiSettings,
  FiPieChart,
  FiShoppingBag,
  FiUsers,
  FiDollarSign,
  FiTruck,
  FiTag,
  FiGrid,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiChevronDown,
  FiChevronRight,
  FiBarChart2,
  FiTrendingUp,
  FiTrendingDown,
  FiAlertCircle,
  FiCheckCircle,
  FiX,
  FiUpload
} from 'react-icons/fi';

// Sample data
const recentOrders = [
  {
    id: '#ORD-001',
    customer: 'Sarah Johnson',
    date: '2023-05-15',
    status: 'completed',
    amount: 129.99
  },
  {
    id: '#ORD-002',
    customer: 'Michael Chen',
    date: '2023-05-14',
    status: 'processing',
    amount: 89.50
  },
  {
    id: '#ORD-003',
    customer: 'Emma Williams',
    date: '2023-05-14',
    status: 'shipped',
    amount: 45.00
  },
  {
    id: '#ORD-004',
    customer: 'David Kim',
    date: '2023-05-13',
    status: 'pending',
    amount: 75.25
  },
  {
    id: '#ORD-005',
    customer: 'Lisa Rodriguez',
    date: '2023-05-12',
    status: 'completed',
    amount: 210.00
  }
];

const products = [
  {
    id: 101,
    name: 'Hydrating Facial Serum',
    stock: 42,
    price: 39.99,
    category: 'Skincare',
    status: 'active'
  },
  {
    id: 102,
    name: 'Matte Foundation',
    stock: 18,
    price: 45.00,
    category: 'Makeup',
    status: 'active'
  },
  {
    id: 103,
    name: 'Repairing Hair Mask',
    stock: 0,
    price: 28.50,
    category: 'Hair Care',
    status: 'out of stock'
  },
  {
    id: 104,
    name: 'Exfoliating Body Scrub',
    stock: 25,
    price: 32.00,
    category: 'Body Care',
    status: 'active'
  }
];

const customers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    orders: 5,
    joined: '2022-03-15'
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael@example.com',
    orders: 3,
    joined: '2022-05-22'
  },
  {
    id: 3,
    name: 'Emma Williams',
    email: 'emma@example.com',
    orders: 7,
    joined: '2022-01-10'
  }
];

const AdminDashboard = () => {
  const { isOpen: isSidebarOpen, onOpen: onSidebarOpen, onClose: onSidebarClose } = useDisclosure();
  const { isOpen: isProductModalOpen, onOpen: onProductModalOpen, onClose: onProductModalClose } = useDisclosure();
  const [activeTab, setActiveTab] = useState('dashboard');
  const toast = useToast();

  // Stats data
  const stats = [
    {
      title: 'Total Revenue',
      value: '$12,345',
      change: 12.5,
      icon: FiDollarSign,
      color: 'green'
    },
    {
      title: 'Total Orders',
      value: '156',
      change: 8.2,
      icon: FiShoppingBag,
      color: 'blue'
    },
    {
      title: 'New Customers',
      value: '24',
      change: -3.1,
      icon: FiUsers,
      color: 'purple'
    },
    {
      title: 'Products Sold',
      value: '423',
      change: 15.7,
      icon: FiTag,
      color: 'orange'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'green';
      case 'processing':
        return 'blue';
      case 'shipped':
        return 'purple';
      case 'pending':
        return 'yellow';
      case 'out of stock':
        return 'red';
      default:
        return 'gray';
    }
  };

  const handleSaveProduct = () => {
    onProductModalClose();
    toast({
      title: 'Product saved',
      description: 'The product has been successfully saved.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      {/* Sidebar */} 
    <Box
      width={{ base: 0, md: 60 }}
      position="fixed"
      left={0}
      top={0}
      h="100vh"
      bg={useColorModeValue('white', 'gray.800')}
      borderRightWidth="1px"
      borderColor={useColorModeValue('gray.100', 'gray.700')}
      display={{ base: 'none', md: 'block' }}
    >
      <Box p={4} borderBottomWidth="1px" color="#6E741E">
        <Heading size="md">Bright & Lustre Admin</Heading>
      </Box>
      <Box p={0} overflowY="auto">
        <VStack align="stretch" spacing={0}>
          <NavItem 
            icon={FiPieChart} 
            active={activeTab === 'dashboard'}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </NavItem>
          <NavItem 
            icon={FiShoppingBag} 
            active={activeTab === 'products'}
            onClick={() => setActiveTab('products')}
          >
            Products
          </NavItem>
          <NavItem 
            icon={FiUsers} 
            active={activeTab === 'customers'}
            onClick={() => setActiveTab('customers')}
          >
            Customers
          </NavItem>
          <NavItem 
            icon={FiDollarSign} 
            active={activeTab === 'orders'}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </NavItem>
          <NavItem 
            icon={FiTruck} 
            active={activeTab === 'shipping'}
            onClick={() => setActiveTab('shipping')}
          >
            Shipping
          </NavItem>
          <NavItem 
            icon={FiTag} 
            active={activeTab === 'promotions'}
            onClick={() => setActiveTab('promotions')}
          >
            Promotions
          </NavItem>
          <NavItem 
            icon={FiGrid} 
            active={activeTab === 'categories'}
            onClick={() => setActiveTab('categories')}
          >
            Categories
          </NavItem>
          <NavItem 
            icon={FiSettings} 
            active={activeTab === 'settings'}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </NavItem>
        </VStack>
      </Box>
    </Box>


      <Drawer isOpen={isSidebarOpen} placement="left" onClose={onSidebarClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" color="#6E741E">
            Bright & Lustre Admin
          </DrawerHeader>
          <DrawerBody p={0}>
            <VStack align="stretch" spacing={0}>
              <NavItem 
                icon={FiPieChart} 
                active={activeTab === 'dashboard'}
                onClick={() => {
                  setActiveTab('dashboard');
                  onSidebarClose();
                }}
              >
                Dashboard
              </NavItem>
              <NavItem 
            icon={FiShoppingBag} 
            active={activeTab === 'products'}
            onClick={() => setActiveTab('products')}
          >
            Products
          </NavItem>
          <NavItem 
            icon={FiUsers} 
            active={activeTab === 'customers'}
            onClick={() => setActiveTab('customers')}
          >
            Customers
          </NavItem>
          <NavItem 
            icon={FiDollarSign} 
            active={activeTab === 'orders'}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </NavItem>
          <NavItem 
            icon={FiTruck} 
            active={activeTab === 'shipping'}
            onClick={() => setActiveTab('shipping')}
          >
            Shipping
          </NavItem>
          <NavItem 
            icon={FiTag} 
            active={activeTab === 'promotions'}
            onClick={() => setActiveTab('promotions')}
          >
            Promotions
          </NavItem>
          <NavItem 
            icon={FiGrid} 
            active={activeTab === 'categories'}
            onClick={() => setActiveTab('categories')}
          >
            Categories
          </NavItem>
          <NavItem 
            icon={FiSettings} 
            active={activeTab === 'settings'}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </NavItem>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>



      {/* Main Content */}
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">

        {/* Header */}
        <Flex
          as="header"
          align="center"
          justify="space-between"
          w="full"
          px="4"
          bg={useColorModeValue('white', 'gray.800')}
          borderBottomWidth="1px"
          borderColor={useColorModeValue('gray.100', 'gray.700')}
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{ base: 'inline-flex', md: 'none' }}
            onClick={onSidebarOpen}
            icon={<FiMenu />}
            size="sm"
          />
          
          <InputGroup w="96" display={{ base: 'none', md: 'flex' }}>
            <InputLeftElement pointerEvents="none">
              <FiSearch color="gray.300" />
            </InputLeftElement>
            <Input type="text" placeholder="Search..." />
          </InputGroup>

          <Flex align="center">
            <IconButton
              aria-label="Notifications"
              icon={<FiBell />}
              variant="ghost"
              mr="2"
            />
            <Menu>
              <MenuButton as={Button} rightIcon={<FiChevronDown />} variant="ghost">
                <HStack spacing={2}>
                  <Avatar size="sm" name="Admin User" />
                  <Text fontSize="sm" display={{ base: 'none', md: 'flex' }}>Admin</Text>
                </HStack>
              </MenuButton>
              <MenuList>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuDivider />
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
              {/* Low Stock Alert */}
              <Box p={4}>
                <Alert status="warning" borderRadius="md" mb={6}>
                  <AlertIcon />
                  <Box>
                    <AlertTitle>Low Stock Alert!</AlertTitle>
                    <AlertDescription>
                      3 products are running low on stock. <Button variant="link" colorScheme="yellow">View products</Button>
                    </AlertDescription>
                  </Box>
                </Alert>
              </Box>
        {/* Dashboard Content */}
        <Box p={4}>
          {activeTab === 'dashboard' && (
            <>
              <Flex justify="space-between" mb={6}>
                <Heading size="lg" color="#6E741E">Dashboard Overview</Heading>
                <Select placeholder="Last 30 days" width="200px">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                  <option>This year</option>
                </Select>
              </Flex>

              {/* Stats Cards */}
              <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={6} mb={6}>
                {stats.map((stat, index) => (
                  <StatCard 
                    key={index}
                    title={stat.title}
                    value={stat.value}
                    change={stat.change}
                    icon={stat.icon}
                    color={stat.color}
                  />
                ))}
              </SimpleGrid>

              {/* Charts and Recent Orders */}
              <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6} mb={6}>
                <GridItem>
                  <Card>
                    <CardHeader>
                      <Heading size="md">Sales Overview</Heading>
                    </CardHeader>
                    <CardBody>
                      <Box h="300px" bg="gray.100" borderRadius="md" p={4}>
                        {/* Chart would go here */}
                        <Center h="full">
                          <Text color="gray.500">Sales chart visualization</Text>
                        </Center>
                      </Box>
                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem>
                  <Card>
                    <CardHeader>
                      <Heading size="md">Recent Orders</Heading>
                    </CardHeader>
                    <CardBody>
                      <VStack spacing={4} align="stretch">
                        {recentOrders.slice(0, 4).map((order) => (
                          <Flex key={order.id} justify="space-between" align="center">
                            <Box>
                              <Text fontWeight="medium">{order.id}</Text>
                              <Text fontSize="sm" color="gray.500">{order.customer}</Text>
                            </Box>
                            <Badge colorScheme={getStatusColor(order.status)}>{order.status}</Badge>
                            <Text fontWeight="bold">${order.amount.toFixed(2)}</Text>
                          </Flex>
                        ))}
                        <Button 
                          rightIcon={<FiChevronRight />} 
                          variant="ghost" 
                          size="sm" 
                          color="#6E741E"
                        >
                          View all orders
                        </Button>
                      </VStack>
                    </CardBody>
                  </Card>
                </GridItem>
              </Grid>


              {/* Recent Customers */}
              <Card mb={6}>
                <CardHeader>
                  <Heading size="md">Recent Customers</Heading>
                </CardHeader>
                <CardBody>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Customer</Th>
                        <Th>Email</Th>
                        <Th>Orders</Th>
                        <Th>Joined</Th>
                        <Th>Action</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {customers.map((customer) => (
                        <Tr key={customer.id}>
                          <Td>{customer.name}</Td>
                          <Td>{customer.email}</Td>
                          <Td>{customer.orders}</Td>
                          <Td>{customer.joined}</Td>
                          <Td>
                            <Button size="sm" variant="ghost" colorScheme="blue">
                              View
                            </Button>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </CardBody>
              </Card>
            </>
          )}

          {activeTab === 'products' && (
            <>
              <Flex justify="space-between" mb={6}>
                <Heading size="lg" color="#6E741E">Product Management</Heading>
                <Button 
                  leftIcon={<FiPlus />} 
                  colorScheme="green"
                  onClick={onProductModalOpen}
                >
                  Add Product
                </Button>
              </Flex>

              <Card>
                <CardHeader>
                  <Flex justify="space-between" align="center">
                    <Heading size="md">All Products</Heading>
                    <InputGroup width="300px">
                      <InputLeftElement pointerEvents="none">
                        <FiSearch color="gray.300" />
                      </InputLeftElement>
                      <Input type="text" placeholder="Search products..." />
                    </InputGroup>
                  </Flex>
                </CardHeader>
                <CardBody>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Product</Th>
                        <Th>Category</Th>
                        <Th>Stock</Th>
                        <Th>Price</Th>
                        <Th>Status</Th>
                        <Th>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {products.map((product) => (
                        <Tr key={product.id}>
                          <Td fontWeight="medium">{product.name}</Td>
                          <Td>{product.category}</Td>
                          <Td>
                            <Progress 
                              value={(product.stock / 50) * 100} 
                              size="sm" 
                              colorScheme={product.stock < 10 ? 'red' : 'green'}
                            />
                            <Text fontSize="sm">{product.stock} in stock</Text>
                          </Td>
                          <Td>${product.price.toFixed(2)}</Td>
                          <Td>
                            <Badge colorScheme={getStatusColor(product.status)}>
                              {product.status}
                            </Badge>
                          </Td>
                          <Td>
                            <HStack spacing={2}>
                              <IconButton
                                aria-label="Edit product"
                                icon={<FiEdit />}
                                size="sm"
                                variant="ghost"
                                colorScheme="blue"
                              />
                              <IconButton
                                aria-label="Delete product"
                                icon={<FiTrash2 />}
                                size="sm"
                                variant="ghost"
                                colorScheme="red"
                              />
                            </HStack>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </CardBody>
                <CardFooter>
                  <Flex justify="space-between" width="full">
                    <Text color="gray.500">Showing 1 to 4 of 24 products</Text>
                    <HStack spacing={2}>
                      <Button size="sm" variant="outline">
                        Previous
                      </Button>
                      <Button size="sm" variant="solid" colorScheme="green">
                        1
                      </Button>
                      <Button size="sm" variant="outline">
                        2
                      </Button>
                      <Button size="sm" variant="outline">
                        Next
                      </Button>
                    </HStack>
                  </Flex>
                </CardFooter>
              </Card>
            </>
          )}

          {/* Other tabs would be implemented similarly */}
          {activeTab !== 'dashboard' && activeTab !== 'products' && (
            <Center h="200px">
              <Text fontSize="xl">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} section coming soon</Text>
            </Center>
          )}
        </Box>
      </Box>

      {/* Add Product Modal */}
      <Modal isOpen={isProductModalOpen} onClose={onProductModalClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Product Name</FormLabel>
                <Input placeholder="Enter product name" />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea placeholder="Enter product description" rows={4} />
              </FormControl>

              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <FormControl isRequired>
                  <FormLabel>Price</FormLabel>
                  <NumberInput precision={2} min={0}>
                    <NumberInputField placeholder="0.00" />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>

                <FormControl>
                  <FormLabel>Discount Price</FormLabel>
                  <NumberInput precision={2} min={0}>
                    <NumberInputField placeholder="Optional" />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Stock Quantity</FormLabel>
                  <NumberInput min={0}>
                    <NumberInputField placeholder="0" />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Category</FormLabel>
                  <Select placeholder="Select category">
                    <option>Skincare</option>
                    <option>Makeup</option>
                    <option>Hair Care</option>
                    <option>Body Care</option>
                    <option>Fragrances</option>
                    <option>Tools & Accessories</option>
                  </Select>
                </FormControl>
              </Grid>

              <FormControl>
                <FormLabel>Product Images</FormLabel>
                <Box borderWidth="1px" borderRadius="md" p={4} borderStyle="dashed">
                  <VStack spacing={2}>
                    <Icon as={FiUpload} boxSize={8} color="gray.400" />
                    <Text fontSize="sm">Drag and drop images here, or click to browse</Text>
                    <Button size="sm" variant="outline">
                      Select Files
                    </Button>
                  </VStack>
                </Box>
              </FormControl>

              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Active Product?</FormLabel>
                <Switch colorScheme="green" defaultChecked />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onProductModalClose}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={handleSaveProduct}>
              Save Product
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

// Reusable components
const NavItem = ({ icon, children, active, onClick }) => {
  return (
    <Box
      as="button"
      w="full"
      px={4}
      py={3}
      textAlign="left"
      bg={active ? useColorModeValue('gray.100', 'gray.700') : 'transparent'}
      color={active ? '#6E741E' : useColorModeValue('gray.600', 'gray.400')}
      _hover={{
        bg: useColorModeValue('gray.100', 'gray.700'),
        color: '#6E741E'
      }}
      onClick={onClick}
    >
      <HStack>
      <Icon as={icon} />
        <Text>{children}</Text>
      </HStack>
    </Box>
  );
};

const StatCard = ({ title, value, change, icon, color }) => {
  const isPositive = change >= 0;
  
  return (
    <Card>
      <CardBody>
        <Stack spacing={3}>
          <Flex justify="space-between" align="center">
            <Text fontSize="sm" color="gray.500">{title}</Text>
            <Icon as={icon} color={`${color}.400`} />
          </Flex>
          <Stat>
            <StatNumber>{value}</StatNumber>
            <StatHelpText>
              <StatArrow type={isPositive ? 'increase' : 'decrease'} />
              {Math.abs(change)}%
              <Text as="span" color="gray.500" ml={1}>
                {isPositive ? 'up' : 'down'} from last month
              </Text>
            </StatHelpText>
          </Stat>
        </Stack>
      </CardBody>
    </Card>
  );
};

const Center = ({ children, ...props }) => (
  <Flex align="center" justify="center" {...props}>
    {children}
  </Flex>
);

dexport default AdminDashboard;