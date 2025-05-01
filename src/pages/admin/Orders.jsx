
import { Box, Heading } from '@chakra-ui/react';
import OrderTable from '../../components/OrderTable';

export default function Orders() {
  return (
    <Box>
      <Heading mb={4} color='primary.50'>Orders</Heading>
      <OrderTable />
    </Box>
  );
}
