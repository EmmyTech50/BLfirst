import {
  Box,
  Heading,
  Button,
  Card,
  CardHeader,
  CardBody,
  Modal,
  ModalFooter,
  FormControl,
  FormLabel,
  Stack,
  Input,
  Textarea,
  Grid,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  ModalCloseButton,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useToast,
  useDisclosure,
  Switch,
  HStack,
  Image,
  IconButton
} from '@chakra-ui/react';
import { FiPlus,  FiX } from 'react-icons/fi';
import { useState } from 'react';
import ProductTable from '../../components/ProductTable';
import { products as initialProducts } from '../../Data/MockData';
import { TB_ALERT } from '../../api/utils';

export default function Products() {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const toast = useToast();

  const {
    isOpen: isProductModalOpen,
    onOpen: onProductModalOpen,
    onClose: onProductModalClose
  } = useDisclosure();

  const {
    isOpen: isCategoryModalOpen,
    onOpen: onCategoryModalOpen,
    onClose: onCategoryModalClose
  } = useDisclosure();

  const {
    isOpen: isDeleteCategoryModalOpen,
    onOpen: onDeleteCategoryModalOpen,
    onClose: onDeleteCategoryModalClose
  } = useDisclosure();

  // Form fields
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    discount: '',
    stock: '',
    category: '',
    active: true,
    image: null
  });

   // handle file selection
  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData(fd => ({ ...fd, image: url }));
    }
  };

  const handleRemoveImage = () => {
    setFormData(fd => ({ ...fd, image: null }));
  };

  const handleOpenAddModal = () => {
    setSelectedProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      discount: '',
      stock: '',
      category: '',
      active: true
    });
    onProductModalOpen();
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price,
      discount: product.discount || '',
      stock: product.stock,
      category: product.category || '',
      active: product.status === 'Active'
    });
    onProductModalOpen();
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast( TB_ALERT.info('Product deleted') );
  };
  
  const handleSaveProduct = () => {
    if (selectedProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === selectedProduct.id
            ? { 
                ...selectedProduct,
                ...formData,
                price: +formData.price,
                stock: +formData.stock,
                status: formData.active ? 'Active' : 'Inactive'
              }
            : p
        )
      );
    } else {
      const newProduct = {
        id: Date.now(),
        ...formData,
        price: +formData.price,
        stock: +formData.stock,
        status: formData.active ? 'Active' : 'Inactive'
      };
      setProducts((prev) => [...prev, newProduct]);
    }

    onProductModalClose();
    toast({
      title: selectedProduct ? 'Product updated' : 'Product added',
      status: 'success',
      duration: 3000,
      isClosable: true
    });
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  return (
    <Box>
      {/* Header */}
      <Heading color="primary.50" mb={5}>Product Management</Heading>

      <HStack justify="space-between" mb={2}> 
        <Button mb={4} bg="primary.50" _hover={{bg:"rgba(255,255,255,0.2)", color: "primary.50"}} color="primary.100" onClick={handleOpenAddModal}>
          Add Product
        </Button>
        <Input
          width="250px"
          placeholder="Search product..."
          size="lg"
          borderColor="primary.50"
          borderRadius='lg'
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </HStack>

      <Card>
        <CardHeader>
          <Heading size="md">All Products</Heading>
        </CardHeader>
        <CardBody>
          <ProductTable
            products={products.filter(p =>
              p.name.toLowerCase().includes(searchTerm.toLowerCase())
            )}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardBody>
      </Card>

      {/* Product Modal */}
      <Modal isOpen={isProductModalOpen} onClose={onProductModalClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor="primary.50" color="white">{selectedProduct ? 'Edit Product' : 'Add New Product'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Product Name</FormLabel>
                <Input
                  placeholder="Enter product name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </FormControl>

            {/* New image picker */}
            <FormControl>
              <FormLabel>Product Image</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {formData.image && (
                <Box position="relative" boxSize="100px" mt={2}>
                  <Image
                  src={formData.image}
                    alt="Preview"
                    boxSize="100%"
                    objectFit="cover"
                    borderRadius="md"
                  />
                  {/* remove button */}
                  <IconButton
                    icon={<FiX />}
                    size="xs"
                    aria-label="Remove image"
                    onClick={handleRemoveImage}
                    position="absolute"
                    top="2px"
                    right="2px"
                  />
                </Box>
              )}
            </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder="Enter product description"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </FormControl>

              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <FormControl isRequired>
                  <FormLabel>Price</FormLabel>
                  <NumberInput
                    min={0}
                    value={formData.price}
                    onChange={(valueString) => setFormData({ ...formData, price: valueString })}
                  >
                    <NumberInputField placeholder="0.00" />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>

                <FormControl>
                  <FormLabel>Discount Price</FormLabel>
                  <NumberInput
                    min={0}
                    value={formData.discount}
                    onChange={(val) => setFormData({ ...formData, discount: val })}
                  >
                    <NumberInputField placeholder="Optional" />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Stock Quantity</FormLabel>
                  <NumberInput
                    min={0}
                    value={formData.stock}
                    onChange={(val) => setFormData({ ...formData, stock: val })}
                  >
                    <NumberInputField placeholder="0" />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel display="flex" justifyContent="space-between" alignItems="center">
                    Category
                    <Button
                    ml={3}
                      leftIcon={<FiPlus />}
                      size="xs"
                      variant="link"
                      color="primary.50"
                      onClick={onCategoryModalOpen}
                    >
                      Add Category
                    </Button>
                    <Button
                    ml={5}
                      size="xs"
                      variant="link"
                      color="primary.50"
                      onClick={onDeleteCategoryModalOpen}
                    >
                      Delete Category
                    </Button>
                  </FormLabel>
                  <Select
                    placeholder="Select category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option>Skincare</option>
                    <option>Makeup</option>
                    <option>Hair Care</option>
                    <option>Body Care</option>
                    <option>Fragrances</option>
                    <option>Tools & Accessories</option>
                  </Select>
                </FormControl>
              </Grid>

              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Active Product?</FormLabel>
                <Switch
                  isChecked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  color="primary.50"
                />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button 
              variant="outline" 
              _hover={{ bg: "primary.50", color: "primary.100", }}
              color="primary.50"
              mr={3} 
              onClick={onProductModalClose}
            >
              Cancel
            </Button>
            <Button bg="primary.50" _hover={{bg:"rgba(255,255,255,0.2)", color: "primary.50"}} color="primary.100" onClick={handleSaveProduct}>
              {selectedProduct ? 'Update Product' : 'Save Product'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Add Category Modal */}
      <Modal isOpen={isCategoryModalOpen} onClose={onCategoryModalClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor="primary.50" color="white">Add New Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Category Name</FormLabel>
              <Input placeholder="Enter category name" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button 
              variant="outline" 
              _hover={{ bg: "primary.50", color: "primary.100", }}
              color="primary.50"
              mr={3} 
              onClick={onCategoryModalClose}
            >
              Cancel
            </Button>
            <Button bg="primary.50" _hover={{bg:"rgba(255,255,255,0.2)", color: "primary.50"}}  color="primary.100" onClick={onCategoryModalClose}>
              Save Category
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Category Modal */}
      <Modal isOpen={isDeleteCategoryModalOpen} onClose={onDeleteCategoryModalClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor="primary.50" color="white">Delete Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Category Name</FormLabel>
              <Input placeholder="Enter category name" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button 
              variant="outline" 
              _hover={{ bg: "primary.50", color: "primary.100", }}
              color="primary.50"
              mr={3} 
              onClick={onDeleteCategoryModalClose}
            >
              Cancel
            </Button>
            <Button bg="primary.50" _hover={{bg:"rgba(255,255,255,0.2)", color: "primary.50"}}  color="primary.100" onClick={onDeleteCategoryModalClose}>
              Delete Category
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
