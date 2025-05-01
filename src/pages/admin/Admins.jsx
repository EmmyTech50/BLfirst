import { useState, useRef } from 'react'
import {
  Box, Heading, HStack, Button, Input, Table, Thead, Tbody, Tr, Th, Td,
  IconButton, useDisclosure, useToast, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel,
  ModalFooter, Select, AlertDialog, AlertDialogOverlay, AlertDialogContent,
  AlertDialogHeader, AlertDialogBody, AlertDialogFooter, InputGroup,
  InputRightElement
} from '@chakra-ui/react'
import { FiPlus, FiTrash2, FiEdit } from 'react-icons/fi'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

export default function AdminPage() {
  const [admins, setAdmins] = useState([
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Super Admin' },
    { id: 2, name: 'Bob Smith',     email: 'bob@example.com',   role: 'Admin' },
    { id: 3, name: 'Carol Lee',     email: 'carol@example.com', role: 'Moderator' },
  ])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 3

  const filtered = admins.filter(a =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.email.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginatedAdmins = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  // Add/Edit modal
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure()
  const initialRef = useRef()
  const toast = useToast()
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', password: '', role: '' })
  const [editId, setEditId] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

  function handleAddOrEdit() {
    const { name, email, password, role } = newAdmin
    if (!name || !email || !password || !role) {
      toast({ title: 'All fields are required.', status: 'error', duration: 3000, isClosable: true })
      return
    }

    if (editId !== null) {
      setAdmins(prev =>
        prev.map(a => a.id === editId ? { ...a, name, email, role } : a)
      )
      toast({ title: 'Admin updated.', status: 'success', duration: 2000, isClosable: true })
    } else {
      const id = Math.max(0, ...admins.map(a => a.id)) + 1
      setAdmins([...admins, { id, name, email, role }])
      toast({ title: 'Admin added.', status: 'success', duration: 2000, isClosable: true })
    }

    setNewAdmin({ name: '', email: '', password: '', role: '' })
    setEditId(null)
    setShowPassword(false)
    onAddClose()
  }

  // Delete alert
  const { isOpen: isDelOpen, onOpen: onDelOpen, onClose: onDelClose } = useDisclosure()
  const [toDelete, setToDelete] = useState(null)
  const cancelRef = useRef()
  function confirmDelete() {
    setAdmins(admins.filter(a => a.id !== toDelete))
    onDelClose()
    toast({ title: 'Admin deleted.', status: 'warning', duration: 2000, isClosable: true })
  }

  return (
    <Box p={6} bg='primary.100'>
      <HStack justify="space-between" mb={4}>
        <Heading size="lg" color='primary.50'>Admin Management</Heading>
        <Button
          leftIcon={<FiPlus />}
          bg="primary.50"
          _hover={{ bg: "rgba(255,255,255,0.2)", color: "primary.50" }}
          color="primary.100"
          onClick={() => {
            setEditId(null)
            setNewAdmin({ name: '', email: '', password: '', role: '' })
            onAddOpen()
          }}
        >
          Add Admin
        </Button>
      </HStack>

      <Input
        placeholder="Search by name or email…"
        mb={4}
        w="250px"
        value={searchTerm}
        onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1) }}
        borderColor='primary.50'
      />

      <Table borderWidth='5px' mb={4}>
        <Thead bg='gray.100'>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th textAlign="center">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedAdmins.map(admin => (
            <Tr key={admin.id}>
              <Td>{admin.name}</Td>
              <Td>{admin.email}</Td>
              <Td>{admin.role}</Td>
              <Td textAlign="center">
                <HStack justify="center">
                  <IconButton
                    aria-label="Edit admin"
                    icon={<FiEdit />}
                    size="sm"
                    colorScheme="blue"
                    variant="ghost"
                    onClick={() => {
                      setEditId(admin.id)
                      setNewAdmin({ ...admin, password: '' })
                      setShowPassword(false)
                      onAddOpen()
                    }}
                  />
                  <IconButton
                    aria-label="Delete admin"
                    icon={<FiTrash2 />}
                    size="sm"
                    colorScheme="red"
                    variant="ghost"
                    onClick={() => { setToDelete(admin.id); onDelOpen() }}
                  />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <HStack justify="space-between" mb={8}>
        <Button size="sm" onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} isDisabled={currentPage === 1}>
          Previous
        </Button>
        <Box>Page {currentPage} of {totalPages}</Box>
        <Button size="sm" onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} isDisabled={currentPage === totalPages}>
          Next
        </Button>
      </HStack>

      {/* Add/Edit Admin Modal */}
      <Modal
        initialFocusRef={initialRef}
        isOpen={isAddOpen}
        onClose={() => { onAddClose(); setEditId(null); setShowPassword(false) }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor="primary.50" color="white">
            {editId !== null ? 'Edit Admin' : 'Add New Admin'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mb={3}>
              <FormLabel>Name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Full name"
                value={newAdmin.name}
                onChange={e => setNewAdmin({ ...newAdmin, name: e.target.value })}
              />
            </FormControl>

            <FormControl mb={3}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Email"
                value={newAdmin.email}
                onChange={e => setNewAdmin({ ...newAdmin, email: e.target.value })}
              />
            </FormControl>

            <FormControl mb={3}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={newAdmin.password}
                  onChange={e => setNewAdmin({ ...newAdmin, password: e.target.value })}
                />
                <InputRightElement>
                  <IconButton
                    variant="ghost"
                    size="sm"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    icon={showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    onClick={() => setShowPassword(v => !v)}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel>Role</FormLabel>
              <Select
                placeholder="Select role"
                value={newAdmin.role}
                onChange={e => setNewAdmin({ ...newAdmin, role: e.target.value })}
              >
                <option>Super Admin</option>
                <option>Admin</option>
                <option>Moderator</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => { onAddClose(); setEditId(null); setShowPassword(false) }}
              mr={3}
              variant="outline"
              _hover={{ bg: "primary.50", color: "primary.100" }}
              color="primary.50"
            >
              Cancel
            </Button>
            <Button
              bg="primary.50"
              _hover={{ bg:"rgba(255,255,255,0.2)", color: "primary.50" }}
              color="primary.100"
              onClick={handleAddOrEdit}
            >
              {editId !== null ? 'Update' : 'Save'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation */}
      <AlertDialog isOpen={isDelOpen} leastDestructiveRef={cancelRef} onClose={onDelClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader bgColor="primary.50" color="white">
              Delete Admin?
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure? This cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                variant="outline"
                _hover={{ bg: "primary.50", color: "primary.100" }}
                color="primary.50"
                ref={cancelRef}
                onClick={onDelClose}
              >
                Cancel
              </Button>
              <Button
                bg="primary.50"
                _hover={{ bg:"rgba(255,255,255,0.2)", color: "primary.50" }}
                color="primary.100"
                onClick={confirmDelete}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  )
}
