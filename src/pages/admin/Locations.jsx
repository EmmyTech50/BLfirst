import { useState } from 'react';
import {
  Box,
  Heading,
  HStack,
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  useDisclosure,
  useToast,
  Flex,
  Text
} from '@chakra-ui/react';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

export default function LocationManagement() {
  // — state
  const [locations, setLocations] = useState([
    { id: 1, name: 'Lagos', fee: 2000 },
    { id: 2, name: 'Abuja', fee: 2500 },
    { id: 3, name: 'Port Harcourt', fee: 3000 },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ name: '', fee: '' });
  const [editingLocation, setEditingLocation] = useState(null);
  const [locationToDelete, setLocationToDelete] = useState(null);

  const { isOpen: isFormOpen, onOpen: onFormOpen, onClose: onFormClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const toast = useToast();

  // — pagination
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = locations.filter(loc =>
    loc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // — handlers
  const handleSearchChange = e => setSearchTerm(e.target.value);
  const handleOpenModal = () => {
    setEditingLocation(null);
    setFormData({ name: '', fee: '' });
    onFormOpen();
  };
  const handleEdit = loc => {
    setEditingLocation(loc);
    setFormData({ name: loc.name, fee: loc.fee.toString() });
    onFormOpen();
  };
  const confirmDelete = loc => {
    setLocationToDelete(loc);
    onDeleteOpen();
  };
  const handleDelete = () => {
    setLocations(prev => prev.filter(l => l.id !== locationToDelete.id));
    toast({ title: 'Location deleted', status: 'info', duration: 3000, isClosable: true });
    onDeleteClose();
  };
  const handleSave = () => {
    if (!formData.name || !formData.fee) {
      toast({ title: 'Please fill all fields', status: 'warning', duration: 3000, isClosable: true });
      return;
    }
    if (editingLocation) {
      setLocations(prev =>
        prev.map(l => l.id === editingLocation.id ? { ...l, name: formData.name, fee: +formData.fee } : l)
      );
      toast({ title: 'Location updated', status: 'success', duration: 3000, isClosable: true });
    } else {
      setLocations(prev => [
        ...prev,
        { id: Date.now(), name: formData.name, fee: +formData.fee }
      ]);
      toast({ title: 'Location added', status: 'success', duration: 3000, isClosable: true });
    }
    onFormClose();
  };

  return (
    <Box p={6}>
      <Heading color="primary.50" mb={5}>Manage Pickup Locations</Heading>

      <HStack justify="space-between" mb={4}>
        <Button
          leftIcon={<FiPlus />}
          bg="primary.50"
          _hover={{ bg: "rgba(255,255,255,0.2)", color: "primary.50" }}
          color="primary.100"
          onClick={handleOpenModal}
        >
          Add Location
        </Button>
        <Input
          width="300px"
          placeholder="Search location..."
          value={searchTerm}
          onChange={handleSearchChange}
          borderColor="primary.50"
          borderRadius="lg"
        />
      </HStack>

      <Table borderWidth="5px">
        <Thead bg="gray.100">
          <Tr>
            <Th>SN</Th>
            <Th>Name/Location</Th>
            <Th>Fee (₦)</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginated.map((loc, idx) => (
            <Tr key={loc.id}>
              <Td>{startIndex + idx + 1}</Td>
              <Td>{loc.name}</Td>
              <Td>{loc.fee}</Td>
              <Td>
                <HStack spacing={2}>
                  <IconButton
                    icon={<FiEdit />}
                    size="sm"
                    aria-label="Edit"
                    onClick={() => handleEdit(loc)}
                  />
                  <IconButton
                    icon={<FiTrash2 />}
                    size="sm"
                    variant="ghost"
                    color="pink.300"
                    aria-label="Delete"
                    onClick={() => confirmDelete(loc)}
                  />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* ── Pagination Controls ───────────────────────────────────────── */}
      <Flex justify="space-between" align="center" mt={4}>
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
      </Flex>

      {/* ── Add/Edit Modal ─────────────────────────────────────────────── */}
      <Modal isOpen={isFormOpen} onClose={onFormClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor="primary.50" color="white">
            {editingLocation ? 'Edit Location' : 'Add New Location'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Location Name</FormLabel>
              <Input
                placeholder="Enter location name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Delivery Fee (₦)</FormLabel>
              <Input
                type="number"
                placeholder="Enter fee amount"
                value={formData.fee}
                onChange={e => setFormData({ ...formData, fee: e.target.value })}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              _hover={{ bg: "primary.50", color: "primary.100" }}
              color="primary.50"
              mr={3}
              onClick={onFormClose}
            >
              Cancel
            </Button>
            <Button
              bg="primary.50"
              _hover={{ bg:"rgba(255,255,255,0.2)", color: "primary.50" }}
              color="primary.100"
              onClick={handleSave}
            >
              {editingLocation ? 'Update' : 'Save'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* ── Delete Confirmation Modal ──────────────────────────────────── */}
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor="primary.50" color="white">Confirm Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete “<strong>{locationToDelete?.name}</strong>”?
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              _hover={{ bg: "primary.50", color: "primary.100" }}
              color="primary.50"
              mr={3}
              onClick={onDeleteClose}
            >
              Cancel
            </Button>
            <Button
              bg="primary.50"
              _hover={{ bg:"rgba(255,255,255,0.2)", color: "primary.50" }}
              color="primary.100"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
