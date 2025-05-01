import { useState } from 'react';
import PropTypes from 'prop-types';
import {  Link as RouterLink } from "react-router-dom";
import {
  Box, Heading, VStack, HStack, Text, Image, Badge, Button,
  SimpleGrid, Link, useToast, Icon, Divider, Table, Thead, Tbody, Tr, Th, Td,
  Flex,
  Spacer
} from '@chakra-ui/react';
import Logo from "../../../assets/tulip-logo.png";
import { FiStar, FiChevronDown } from 'react-icons/fi';

// ... sampleOrders and ratingLabels as before ...
const sampleOrders = [
    {
      orderId: 'ORD-1001',
      date: '2025-04-20',
      status: 'Delivered',
      items: [
        {
        id: 101,
        name: 'Hydrating Facial Serum',
        image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b',
        price: 29.99,
        quantity: 2,
      },
        {
        id: 102,
        name: 'Hydrating Facial Serum',
        image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b',
        price: 29.99,
        quantity: 2,
      },
        {
        id: 103,
        name: 'Hydrating Facial Serum',
        image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b',
        price: 29.99,
        quantity: 2,
      },
    ],
      delivery: {
        method: 'Delivery',
        location: 'Lagos',
        address: { street: '12 Ajose St.', city: 'Ikeja', postal: '100213' },
        fee: 1500,
      },
      payment: {
        method: 'Visa **** 4242',
        transactionId: 'TXN-78345',
        total: 2 * 29.99 * 10 + 1500,
      },
    },
    {
      orderId: 'ORD-1002',
      date: '2025-04-20',
      status: 'Delivered',
      items: Array(5).fill({
        id: 101,
        name: 'Hydrating Facial Serum',
        image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b',
        price: 29.99,
        quantity: 2,
      }),
      delivery: {
        method: 'Delivery',
        location: 'Lagos',
        address: { street: '12 Ajose St.', city: 'Ikeja', postal: '100213' },
        fee: 1500,
      },
      payment: {
        method: 'Visa **** 4242',
        transactionId: 'TXN-78345',
        total: 2 * 29.99 * 10 + 1500,
      },
    },
    {
      orderId: 'ORD-1003',
      date: '2025-04-20',
      status: 'Delivered',
      items: Array(5).fill({
        id: 101,
        name: 'Hydrating Facial Serum',
        image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b',
        price: 29.99,
        quantity: 2,
      }),
      delivery: {
        method: 'Delivery',
        location: 'Lagos',
        address: { street: '12 Ajose St.', city: 'Ikeja', postal: '100213' },
        fee: 1500,
      },
      payment: {
        method: 'Visa **** 4242',
        transactionId: 'TXN-78345',
        total: 2 * 29.99 * 10 + 1500,
      },
    },
    // … more orders
  ];

// Star rating labels
const ratingLabels = {
    1: 'Very Bad',
    2: 'Bad',
    3: 'Okay',
    4: 'Good',
    5: 'Love It',
  };

export default function MyOrders({ orders = sampleOrders }) {
  const toast = useToast();
  const [ratings, setRatings] = useState({});
 

  const handleRate = (orderId, itemId, rating) => {
    setRatings(prev => ({ ...prev, [`${orderId}_${itemId}`]: rating }));
    toast({
      title: 'Thank you for your feedback!',
      description: ratingLabels[rating],
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box minH="100vh">

          {/* Header */}
          <RouterLink to="/">
                <Flex as="header" bg="white" boxShadow="sm" align="center" px={6} py={4} position="sticky" top={0} zIndex={1}>
                    <Image src={Logo} alt="Logo" h="40px" objectFit="contain" />
                  <Spacer />
                </Flex>
              </RouterLink>
      <Heading mt={10} mb={4} m={5} color="primary.50">Your Order History</Heading>
      <VStack spacing={8} align="stretch" m={5}>
        {orders.map(order => (
          <Box
            key={order.orderId}
            p={4}
            borderWidth="1px"
            borderRadius="md"
          >
            {/* Order header */}
            <HStack justify="space-between" mb={2}>
              <Text fontWeight="bold">Order ID: {order.orderId}</Text>
              <Badge colorScheme={order.status === 'Delivered' ? 'green' : 'red'}>
                {order.status}
              </Badge>
            </HStack>
            <Text fontSize="sm" color="gray.500">Date: {order.date}</Text>
            <Divider my={3} />

            {/* Scrollable items table */}
            <Box
              maxH="200px"          
              overflowY="auto"      
              mb={3}
              borderWidth="1px"
              borderRadius="md"
            >
              <Table borderWidth="1px" size="sm"  >
                <Thead position="sticky" top={0} bg="gray.50" zIndex={1} >
                  <Tr>
                    <Th>Image</Th>
                    <Th>Name</Th>
                    <Th>Qty</Th>
                    <Th>Price</Th>
                    <Th>Rate</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {order.items.map(item => {
                    const key = `${order.orderId}_${item.id}`;
                    return (
                      <Tr key={key}>
                        <Td>
                          <Image
                            src={item.image}
                            alt={item.name}
                            boxSize="50px"
                            objectFit="cover"
                            borderRadius="md"
                          />
                        </Td>
                        <Td>{item.name}</Td>
                        <Td>{item.quantity}</Td>
                        <Td>₦{(item.price * item.quantity).toFixed(2)}</Td>
                        <Td>
                          <HStack spacing={1}>
                            {[1, 2, 3, 4, 5].map(star => (
                              <Icon
                                key={star}
                                as={FiStar}
                                boxSize={4}
                                cursor="pointer"
                                color={ratings[key] >= star ? "primary.50" : 'gray.500'}
                                onClick={() => handleRate(order.orderId, item.id, star)}
                                title={ratingLabels[star]}
                              />
                            ))}
                          </HStack>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </Box>

            {/* Return notice */}
            <Text fontSize="sm" color="gray.600">
              Return window ends in 3 days.{' '}
              <Link color="primary.50" href="/shippingandreturn">View Return Policy</Link>
            </Text>
            <Divider my={3} />

            {/* Delivery & Payment (collapsed by default) */}
            <Box>
              <Button
                size="sm"
                variant="none"
                outlineColor="primary.50"
                color="primary.50"
                rightIcon={<FiChevronDown />}
                onClick={e => {
                  const details = e.currentTarget.nextSibling;
                  details.style.display = details.style.display === 'none' ? 'block' : 'none';
                }}
              >
                View Delivery & Payment Details
              </Button>
              <Box display="none" mt={3} pl={4}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <Box>
                    <Heading size="sm" mb={2}>Delivery</Heading>
                    <Text>Method: {order.delivery.method}</Text>
                    <Text>Location: {order.delivery.location}</Text>
                    <Text>Street: {order.delivery.address.street}</Text>
                    <Text>City: {order.delivery.address.city}</Text>
                    <Text>Postal: {order.delivery.address.postal}</Text>
                    <Text>Fee: ₦{order.delivery.fee}</Text>
                  </Box>
                  <Box>
                    <Heading size="sm" mb={2}>Payment</Heading>
                    <Text>Method: {order.payment.method}</Text>
                    <Text>Txn ID: {order.payment.transactionId}</Text>
                    <Text>Total Paid: ₦{order.payment.total.toFixed(2)}</Text>
                  </Box>
                </SimpleGrid>
              </Box>
            </Box>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}

MyOrders.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape({
    orderId: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })).isRequired,
    delivery: PropTypes.shape({
      method: PropTypes.string,
      location: PropTypes.string,
      address: PropTypes.shape({
        street: PropTypes.string,
        city: PropTypes.string,
        postal: PropTypes.string,
      }),
      fee: PropTypes.number,
    }).isRequired,
    payment: PropTypes.shape({
      method: PropTypes.string,
      transactionId: PropTypes.string,
      total: PropTypes.number,
    }).isRequired,
  })).isRequired,
};
