import { useState } from 'react'
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Button,
  Flex,
} from '@chakra-ui/react'

// Mock newsletter data
const allSubscribers = Array.from({ length: 42 }, (_, i) => ({
  email: `user${i + 1}@example.com`,
  date: `2025-04-${(i % 30) + 1}`.padStart(10, '0'),
}))

export default function NewsletterPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentSubscribers = allSubscribers.slice(indexOfFirstItem, indexOfLastItem)

  const totalPages = Math.ceil(allSubscribers.length / itemsPerPage)

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1)
  }

  return (
    <Box p={6}>
      <Heading size="lg" mb={6} color="primary.50">
        Newsletter Subscribers
      </Heading>

      <TableContainer border="1px solid" borderColor="gray.100" borderRadius="md">
        <Table borderWidth='5px'>
          <Thead bg='gray.100'>
            <Tr>
              <Th>Email</Th>
              <Th>Date Subscribed</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentSubscribers.map((subscriber, index) => (
              <Tr key={index}>
                <Td>{subscriber.email}</Td>
                <Td>{new Date(subscriber.date).toLocaleDateString()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Flex justify="space-between" align="center" mt={4}>
        <Button onClick={handlePrev} isDisabled={currentPage === 1}>
          Previous
        </Button>
        <Text>
          Page {currentPage} of {totalPages}
        </Text>
        <Button onClick={handleNext} isDisabled={currentPage === totalPages}>
          Next
        </Button>
      </Flex>
    </Box>
  )
}
