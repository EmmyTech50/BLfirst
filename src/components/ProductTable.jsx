import React from 'react'
import PropTypes from 'prop-types'
import {
  Table, Thead, Tbody, Tr, Th, Td, Progress, Text, Badge, IconButton,
  HStack, Button, Flex, AlertDialog, AlertDialogBody, AlertDialogFooter,
  AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, useDisclosure,
  Image, Box
} from '@chakra-ui/react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { getStatusColor } from '../Data/MockData';

const ITEMS_PER_PAGE = 5;

const formatNaira = function(amount) {
  const num = typeof amount === 'string'
    ? parseFloat(amount.replace(/[₦,]/g, ''))
    : amount;
  return '₦' + num.toLocaleString('en-NG', { minimumFractionDigits: 2 });
};

export default function ProductTable({ products, onEdit, onDelete, children }) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [productToDelete, setProductToDelete] = React.useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const handleDeleteClick = (productId) => {
    setProductToDelete(productId);
    onOpen();
  };

  const confirmDelete = () => {
    if (productToDelete !== null) {
      onDelete(productToDelete);
      setProductToDelete(null);
      onClose();
    }
  };

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <>
      <Table borderWidth='5px'>
        <Thead bg="gray.100">
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
          {paginatedProducts.map((product) => (
            <Tr key={product.id}>
              <Td>
                <HStack spacing={3}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    boxSize="50px"
                    objectFit="cover"
                    borderRadius="md"
                  />
                  <Box>
                    <Text fontWeight="semibold" fontSize="md">{product.name}</Text>
                    <Text fontSize="sm" fontWeight="bold" color="gray.700">
                      ID: {product.productId}
                    </Text>
                  </Box>
                </HStack>
              </Td>

              <Td>{product.category}</Td>
              <Td>
                <Progress
                  value={(product.stock / 50) * 100}
                  size="sm"
                  colorScheme={product.stock < 10 ? 'red' : 'green'}
                  mb={1}
                />
                <Text fontSize="sm">{product.stock} in stock</Text>
              </Td>
              <Td>{formatNaira(product.price)}</Td>
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
                    size="m"
                    variant="ghost"
                    colorScheme="blue"
                    onClick={() => onEdit(product)}
                  />
                  <IconButton
                    aria-label="Delete product"
                    icon={<FiTrash2 />}
                    size="m"
                    variant="ghost"
                    color="pink.300"
                    onClick={() => handleDeleteClick(product.id)}
                  />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Flex justify="space-between" mt={4}>
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

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered                   
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader
              fontSize="lg"
              fontWeight="bold"
              bgColor="primary.50"
              color="white"
            >
              Delete Product
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this product? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                variant="outline"
                _hover={{ bg: "primary.50", color: "primary.100" }}
                color="primary.50"
                ref={cancelRef}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                bg="primary.50"
                _hover={{ bg: "rgba(255,255,255,0.2)", color: "primary.50" }}
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

      {children}
    </>
  )
}

ProductTable.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id:         PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    productId:  PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name:       PropTypes.string.isRequired,
    image:      PropTypes.string,
    category:   PropTypes.string,
    stock:      PropTypes.number,
    price:      PropTypes.number,
    status:     PropTypes.string,
  })).isRequired,
  onEdit:   PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  children: PropTypes.node,
}
