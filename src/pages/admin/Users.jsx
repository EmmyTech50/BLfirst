import { useState } from 'react';
import {
  Box, Heading, SimpleGrid, Stat, StatLabel, StatNumber,
  Input, InputGroup, InputLeftElement, Table, Thead, Tbody, Tr, Th, Td,
  Button, useDisclosure, Drawer, DrawerOverlay, DrawerContent,
  DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Text, Divider,
  useColorModeValue, HStack, VStack, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalBody, ModalFooter
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import CustomersMock from '../../Data/MockData';

export default function CustomerPage() {
  // customer data & pagination
  const [customers, setCustomers] = useState(CustomersMock);
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState(null);
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // UI controls
  const { isOpen, onOpen, onClose } = useDisclosure();                             // customer details drawer
  const { isOpen: isOrderOpen, onOpen: onOrderOpen, onClose: onOrderClose } = useDisclosure(); // order items modal
  const { isOpen: isDepositOpen, onOpen: onDepositOpen, onClose: onDepositClose } = useDisclosure(); // deposit modal

  // modal state
  const [orderItems, setOrderItems] = useState([]);
  const [depositAmount, setDepositAmount] = useState('');

  // derived values
  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(searchTerm) ||
    c.email.toLowerCase().includes(searchTerm)
  );
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === 'Active').length;
  const avgOrders = (
    customers.reduce((sum, c) => sum + (c.orders || 0), 0) /
    (totalCustomers || 1)
  ).toFixed(1);
  const totalSpentValue = customers.reduce((sum, c) => sum + (c.totalSpent || 0), 0);
  const totalSpent = totalSpentValue.toLocaleString('en-NG', {
    style: 'currency', currency: 'NGN', minimumFractionDigits: 2
  });

  // pagination handlers
  const goToPrevious = () => setCurrentPage(p => Math.max(p - 1, 1));
  const goToNext     = () => setCurrentPage(p => Math.min(p + 1, totalPages));

  // drawer & modal openers
  const openDetails  = cust => { setSelected(cust); onOpen(); };
  const showItems    = itemsList => { setOrderItems(itemsList); onOrderOpen(); };

  // transaction update for deposit only
  const handleConfirmDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0 || !selected) {
      return;
    }

    const updatedCustomers = customers.map(c => {
      if (c.id === selected.id) {
        const newBalance = c.walletBalance + amount;
        const newTransaction = {
          type: 'Deposit',
          amount,
          date: new Date().toISOString().split('T')[0]
        };
        return {
          ...c,
          walletBalance: newBalance,
          transactions: [newTransaction, ...c.transactions],
        };
      }
      return c;
    });

    const updatedCustomer = updatedCustomers.find(c => c.id === selected.id);
    setCustomers(updatedCustomers);
    if (updatedCustomer) {
      setSelected(updatedCustomer);
    }

    setDepositAmount('');
    onDepositClose();
  };

  // styling
  const cardBg = useColorModeValue('gray.100', 'gray.700');

  return (
    <Box p={6} bg="primary.100">
      <Heading mb={6} color="primary.50">Customer Management</Heading>

      {/* Stats */}
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4} mb={8}>
        {[
          ['Total Customers', totalCustomers],
          ['Active Customers', activeCustomers],
          ['Avg. Orders per Cust.', avgOrders],
          ['Total Spend', totalSpent]
        ].map(([label, value]) => (
          <Stat key={label} bg={cardBg} p={4} borderRadius="lg" shadow="sm">
            <StatLabel>{label}</StatLabel>
            <StatNumber>{value}</StatNumber>
          </Stat>
        ))}
      </SimpleGrid>

      {/* Search */}
      <InputGroup mb={4} maxW="400px" borderColor="primary.50">
        <InputLeftElement pointerEvents="none">
          <FiSearch color="gray.300" />
        </InputLeftElement>
        <Input
          placeholder="Search customers…"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value.toLowerCase())}
        />
      </InputGroup>

      {/* Customer table */}
      <Box overflowX="auto" bg="primary.100">
        <Table borderWidth="5px">
          <Thead bg="gray.100">
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Phone</Th>
              <Th isNumeric>Total Orders</Th>
              <Th isNumeric>Total Spend</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {paginated.map(c => (
              <Tr key={c.id}>
                <Td>{c.name}</Td>
                <Td>{c.email}</Td>
                <Td>{c.phone || '—'}</Td>
                <Td isNumeric>{c.orders ?? '—'}</Td>
                <Td isNumeric>
                  {c.totalSpent != null
                    ? c.totalSpent.toLocaleString('en-NG', {
                        style: 'currency',
                        currency: 'NGN',
                        minimumFractionDigits: 2
                      })
                    : '—'}
                </Td>
                <Td>{c.status || '—'}</Td>
                <Td>
                  <Button
                    size="xs"
                    variant="outline"
                    _hover={{ bg: "primary.50", color: "primary.100" }}
                    color="primary.50"
                    onClick={() => openDetails(c)}
                  >
                    View
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Pagination */}
      <Box mt={4} display="flex" justifyContent="space-between" alignItems="center">
        <Button size="sm" onClick={goToPrevious} isDisabled={currentPage === 1}>
          Previous
        </Button>
        <Text fontSize="sm">Page {currentPage} of {totalPages}</Text>
        <Button size="sm" onClick={goToNext} isDisabled={currentPage === totalPages}>
          Next
        </Button>
      </Box>

      {/* Customer Details Drawer */}
      {selected && (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="lg">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader bgColor="primary.50" color="white">
              Customer Details
            </DrawerHeader>
            <DrawerBody>
              <HStack spacing={8} mb={4}>
                <VStack align="start">
                  <Text><b>Name:</b> {selected.name}</Text>
                  <Text><b>Email:</b> {selected.email}</Text>
                </VStack>
                <VStack align="start">
                  <Text><b>Phone:</b> {selected.phone || '—'}</Text>
                  <Text><b>Status:</b> {selected.status}</Text>
                </VStack>
                <VStack align="start">
                  <Text><b>Joined:</b> {selected.joined}</Text>
                  <Text><b>Wallet:</b> ₦{(selected.walletBalance || 0).toFixed(2)}</Text>
                </VStack>
              </HStack>

              {/* Deposit only */}
              <HStack mb={4}>
                <Button
                  size="sm"
                  colorScheme="green"
                  onClick={onDepositOpen}
                >
                  Deposit
                </Button>
              </HStack>

              <Divider my={4} />

              {/* Transaction history - show only Deposits */}
              <Text fontWeight="bold" mb={2}>Transaction History</Text>
              <Box overflowX="auto" mb={6}>
                <Table size="sm" borderWidth="5px">
                  <Thead bg="gray.100">
                    <Tr>
                      <Th>Date</Th>
                      <Th>Type</Th>
                      <Th isNumeric>Amount</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {selected.transactions
                      .filter(tx => tx.type === 'Deposit')
                      .map((tx, i) => (
                        <Tr key={i}>
                          <Td>{tx.date}</Td>
                          <Td>{tx.type}</Td>
                          <Td isNumeric>₦{tx.amount.toFixed(2)}</Td>
                        </Tr>
                      ))
                    }
                  </Tbody>
                </Table>
              </Box>

              {/* Order history */}
              <Text fontWeight="bold" mb={2}>Order History</Text>
              <Box overflowX="auto" mb={4}>
                <Table size="sm" borderWidth="5px">
                  <Thead bg="gray.100">
                    <Tr>
                      <Th>Order ID</Th>
                      <Th isNumeric>Total Amount</Th>
                      <Th>Delivery Status</Th>
                      <Th>Payment Status</Th>
                      <Th isNumeric>No. of Items</Th>
                      <Th>Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {selected.orderHistory?.map(o => (
                      <Tr key={o.id}>
                        <Td>{o.id}</Td>
                        <Td isNumeric>₦{o.total.toFixed(2)}</Td>
                        <Td>{o.deliveryStatus}</Td>
                        <Td>{o.paymentStatus}</Td>
                        <Td isNumeric>{o.numItems}</Td>
                        <Td>
                          <Button
                            size="xs"
                            variant="outline"
                            _hover={{ bg: "primary.50", color: "primary.100" }}
                            color="primary.50"
                            onClick={() => showItems(o.items)}
                          >
                            View Items
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </DrawerBody>
            <DrawerFooter>
              <Button
                variant="outline"
                _hover={{ bg: "primary.50", color: "primary.100" }}
                color="primary.50"
                onClick={onClose}
              >
                Close
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}

      {/* Deposit Amount Modal */}
      <Modal isOpen={isDepositOpen} onClose={() => { setDepositAmount(''); onDepositClose(); }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor="primary.50" color="white">Deposit Funds</ModalHeader>
          <ModalBody>
            <InputGroup>
              <InputLeftElement pointerEvents="none">₦</InputLeftElement>
              <Input
                type="number"
                value={depositAmount}
                onChange={e => setDepositAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              _hover={{ bg: "primary.50", color: "primary.100" }}
              color="primary.50"
              mr={3}
              onClick={() => { setDepositAmount(''); onDepositClose(); }}
            >
              Cancel
            </Button>
            <Button bg="primary.50"
                _hover={{ bg: "rgba(255,255,255,0.2)", color: "primary.50" }}
                color="primary.100" onClick={handleConfirmDeposit}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Order Items Modal */}
      <Modal isOpen={isOrderOpen} onClose={onOrderClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor="primary.50" color="white">Order Items</ModalHeader>
          <ModalBody>
            <VStack align="start" spacing={2}>
              {orderItems.map((it, i) => (
                <Text key={i}>• {it}</Text>
              ))}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              _hover={{ bg: "primary.50", color: "primary.100" }}
              color="primary.50"
              onClick={onOrderClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
