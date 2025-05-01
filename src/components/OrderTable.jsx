import {
  Box, Table, Thead, Tbody, Tr, Th, Td, Badge, HStack, Input,
  Button, Tabs, TabList, Tab, IconButton, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, FormControl,
  FormLabel, Select, useBreakpointValue, VStack, Text, Drawer, DrawerOverlay,
  DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter
} from '@chakra-ui/react';
import { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FiDownload, FiEye } from 'react-icons/fi';

// Naira Format
const formatNaira = amount => {
  const num = typeof amount === 'string'
    ? parseFloat(amount.replace(/[₦#,]/g, ''))
    : amount;
  return '₦' + num.toLocaleString('en-NG', { minimumFractionDigits: 2 });
};

const initialOrders = [
  {
    id: '1',
    name: 'McBook Air (M1)',
    customer: 'Darrell Steward',
    email: 'darrell@example.com',
    phone: '234-800-000-0001',
    location: 'Lagos, Nigeria',
    date: 'Apr 19, 08:01 AM',
    total: 1099.00,
    status: 'Pending',
    items: '2 Items',
    fulfilledBy: '',
    orderHistory: []  // assume exists
  },
  {
    id: '2',
    name: 'McBook Pro 13',
    customer: 'Courtney Henry',
    email: 'courtney@example.com',
    phone: '234-800-000-0002',
    location: 'Abuja, Nigeria',
    date: 'Apr 19, 09:15 AM',
    total: 2199.00,
    status: 'Completed',
    items: '2 Items',
    fulfilledBy: 'AdminUser',
    orderHistory: []  // assume exists
  },
];

const statusColor = {
  Pending: 'yellow',
  Completed: 'green',
  Cancelled: 'red',
};

const ITEMS_PER_PAGE = 5;

export default function OrderTable() {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();
  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure();
  const [newOrder, setNewOrder] = useState({
    name: '',
    customer: '',
    total: '',
    status: 'Pending',
    items: '',
    fulfilledBy: ''
  });

  const isMobile = useBreakpointValue({ base: true, md: false });

  // PDF export without delivery column
  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text('Orders Report', 14, 16);
    autoTable(doc, {
      startY: 20,
      head: [['Order ID','Customer','Date','Total','Status','Items','Fulfilled By']],
      headStyles: { fillColor: [255,192,203] },
      body: orders.map(o => [
        o.id, o.customer, o.date, formatNaira(o.total),
        o.status, o.items, o.fulfilledBy || '—'
      ])
    });
    doc.save('orders.pdf');
  };

  // filtering & pagination
  const filterOrders = () => {
    let f = orders;
    if (tabIndex === 1) f = f.filter(o => o.status === 'Unpaid');
    if (tabIndex === 2) f = f.filter(o => o.status === 'Pending');
    if (tabIndex === 3) f = f.filter(o => o.status === 'Completed');
    if (tabIndex === 4) f = f.filter(o => o.status === 'Cancelled');
    if (searchTerm) {
      const t = searchTerm.toLowerCase();
      f = f.filter(o =>
        o.id.includes(t) ||
        o.customer.toLowerCase().includes(t) ||
        o.status.toLowerCase().includes(t)
      );
    }
    return f;
  };
  const paginated = () => {
    const f = filterOrders();
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return f.slice(start, start + ITEMS_PER_PAGE);
  };
  const totalPages = Math.ceil(filterOrders().length / ITEMS_PER_PAGE);

  // complete order action (no delivery update)
  const handleComplete = () => {
    setOrders(curr =>
      curr.map(o =>
        o.id === selectedOrder.id
          ? { ...o, status: 'Completed', fulfilledBy: 'AdminUser' }
          : o
      )
    );
    onDrawerClose();
  };

  // Create new order
  const handleCreate = () => {
    const created = {
      ...newOrder,
      id: (orders.length + 1).toString(),
      date: new Date().toLocaleString(),
    };
    setOrders([created, ...orders]);
    onCreateClose();
  };

  return (
    <Box borderRadius="xl" bg="primary.100" p={4}>
      <HStack justify="space-between" wrap="wrap" mb={4}>
        <Tabs
          variant="soft-rounded"
          onChange={i => { setTabIndex(i); setCurrentPage(1); }}
        >
          <TabList>
            <Tab>All</Tab>
            <Tab>Unpaid</Tab>
            <Tab>Need to ship</Tab>
            <Tab>Completed</Tab>
            <Tab>Cancellation</Tab>
            <Tab>Returns</Tab>
          </TabList>
        </Tabs>
        <HStack spacing={2} wrap="wrap">
          <Input
            placeholder="Search order..."
            size="sm"
            borderColor="primary.50"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            width={isMobile ? '100%' : 'auto'}
          />
          <IconButton
            icon={<FiDownload />}
            variant="outline"
            color="primary.50"
            _hover={{ bg: "rgba(255,255,255,0.2)" }}
            size="sm"
            onClick={handleDownload}
          />
          <Button
            bg="primary.50"
            _hover={{ bg: "rgba(255,255,255,0.2)", color: "primary.50" }}
            size="sm"
            color="primary.100"
            onClick={onCreateOpen}
          >
            Create Order
          </Button>
        </HStack>
      </HStack>

      <Box overflowX="auto">
        <Table borderWidth="5px">
          <Thead bg="gray.100">
            <Tr>
              <Th>Order ID</Th>
              <Th>Customer</Th>
              <Th>Date</Th>
              <Th>Total</Th>
              <Th>Status</Th>
              <Th>Items</Th>
              <Th>Fulfilled By</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {paginated().map(o => (
              <Tr key={o.id}>
                <Td>{o.id}</Td>
                <Td>{o.customer}</Td>
                <Td>{o.date}</Td>
                <Td>{formatNaira(o.total)}</Td>
                <Td>
                  <Badge colorScheme={statusColor[o.status] || 'gray'}>
                    {o.status}
                  </Badge>
                </Td>
                <Td>{o.items}</Td>
                <Td>{o.fulfilledBy || '—'}</Td>
                <Td>
                  <IconButton
                    icon={<FiEye />}
                    size="sm"
                    color="primary.50"
                    _hover={{ bg: "rgba(255,255,255,0.2)", color: "primary.50" }}
                    onClick={() => { setSelectedOrder(o); onDrawerOpen(); }}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <HStack justify="space-between" mt={4}>
        <Button
          size="sm"
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          isDisabled={currentPage === 1}
        >
          Previous
        </Button>
        <Text fontSize="sm">Page {currentPage} of {totalPages}</Text>
        <Button
          size="sm"
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          isDisabled={currentPage === totalPages}
        >
          Next
        </Button>
      </HStack>

      {/* Create Order Modal */}
      <Modal isOpen={isCreateOpen} onClose={onCreateClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={3}>
              <FormControl>
                <FormLabel>Product Name</FormLabel>
                <Input
                  value={newOrder.name}
                  onChange={e => setNewOrder({ ...newOrder, name: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Customer</FormLabel>
                <Input
                  value={newOrder.customer}
                  onChange={e => setNewOrder({ ...newOrder, customer: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Total</FormLabel>
                <Input
                  type="number"
                  value={newOrder.total}
                  onChange={e => setNewOrder({ ...newOrder, total: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Items</FormLabel>
                <Input
                  type="number"
                  value={newOrder.items}
                  onChange={e => setNewOrder({ ...newOrder, items: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Status</FormLabel>
                <Select
                  value={newOrder.status}
                  onChange={e => setNewOrder({ ...newOrder, status: e.target.value })}
                >
                  <option value="Pending">Pending</option>
                  <option value="Unpaid">Unpaid</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </Select>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              bg="primary.50"
              color="white"
              _hover={{ bg: "rgba(255,255,255,0.2)", color: "primary.50" }}
              mr={3}
              onClick={handleCreate}
            >
              Create
            </Button>
            <Button
              variant="outline"
              _hover={{ bg: "primary.50", color: "primary.100" }}
              color="primary.50"
              onClick={onCreateClose}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Order Details Drawer */}
      <Drawer isOpen={isDrawerOpen} placement="right" onClose={onDrawerClose} size="lg">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader bg="primary.50" color="primary.100">Order Details</DrawerHeader>
          <DrawerBody>
            {selectedOrder && (
              <>
                <HStack spacing={8} mb={4}>
                  <VStack align="start">
                    <Text><strong>Name:</strong> {selectedOrder.customer}</Text>
                    <Text><strong>Email:</strong> {selectedOrder.email}</Text>
                  </VStack>
                  <VStack align="start">
                    <Text><strong>Phone:</strong> {selectedOrder.phone}</Text>
                    <Text><strong>Location:</strong> {selectedOrder.location}</Text>
                  </VStack>
                  <VStack align="start">
                    <Text><strong>Order ID:</strong> {selectedOrder.id}</Text>
                    <Text><strong>Date:</strong> {selectedOrder.date}</Text>
                  </VStack>
                </HStack>
                <Box w="full" overflowX="auto" mt={10}>
                  <Table borderWidth="5px">
                    <Thead bg="gray.100">
                      <Tr>
                        <Th>Item</Th>
                        <Th>Qty</Th>
                        <Th>Unit Price</Th>
                        <Th>Total</Th>
                        <Th>Status</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {(() => {
                        const qty = parseInt(selectedOrder.items, 10) || 1;
                        const unit = selectedOrder.total / qty;
                        return (
                          <Tr>
                            <Td>{selectedOrder.name}</Td>
                            <Td>{qty}</Td>
                            <Td>{formatNaira(unit)}</Td>
                            <Td>{formatNaira(selectedOrder.total)}</Td>
                            <Td>
                              <Badge colorScheme={statusColor[selectedOrder.status] || 'gray'}>
                                {selectedOrder.status}
                              </Badge>
                            </Td>
                          </Tr>
                        );
                      })()}
                    </Tbody>
                  </Table>
                </Box>
              </>
            )}
          </DrawerBody>
          <DrawerFooter>
            {selectedOrder?.status !== 'Completed' && (
              <Button
                bg="primary.50"
                color="white"
                _hover={{ bg: "rgba(255,255,255,0.2)", color: "primary.50" }}
                mr={3}
                onClick={handleComplete}
              >
                Complete Order
              </Button>
            )}
            <Button
              variant="outline"
              _hover={{ bg: "primary.50", color: "primary.100" }}
              color="primary.50"
              onClick={onDrawerClose}
            >
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
