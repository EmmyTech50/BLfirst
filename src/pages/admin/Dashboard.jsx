import {
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  Flex,
  Heading,
  Select,
  SimpleGrid,
  Grid,
  GridItem,
  VStack,
  Badge,
  Card,
  CardHeader,
  CardBody,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import StatCard from '../../components/StatCard';
import Center from '../../components/Center';
import { stats, recentOrders, getStatusColor, salesData } from '../../Data/MockData';
import { useState, useMemo } from 'react';

export default function Dashboard() {
  // existing range dropdown state
  const [range, setRange] = useState('Last 30 days');

  // new state: selected year 2025–2050
  const [year, setYear] = useState(2025);

  // compute monthly aggregates whenever `year` or salesData changes
  const monthlyData = useMemo(() => {
    // month names
    const months = [
      'Jan','Feb','Mar','Apr','May','Jun',
      'Jul','Aug','Sep','Oct','Nov','Dec'
    ];
    // initialize totals
    const totals = months.reduce((acc,m) => { acc[m]=0; return acc; }, {});
    // sum salesData entries matching the year
    salesData.forEach(({ date, sales }) => {
      const d = new Date(date);
      if (d.getFullYear() === +year) {
        const m = months[d.getMonth()];
        totals[m] += sales;
      }
    });
    // build array for recharts
    return months.map(m => ({ month: m, sales: totals[m] }));
  }, [year]);

  return (
    <Box>
      {/* Low Stock Alert */}
      <Alert status="warning" borderRadius="md" mb={6}>
        <AlertIcon />
        <Box>
          <AlertTitle>Low Stock Alert!</AlertTitle>
          <AlertDescription>
            3 products are running low on stock.&nbsp;
            <Button variant="link" colorScheme="yellow">
              View products
            </Button>
          </AlertDescription>
        </Box>
      </Alert>

      {/* Dashboard Header */}
      <Flex justify="space-between" mb={6}>
        <Heading size="lg" color="primary.50">
          Dashboard Overview
        </Heading>
        <Select
          w="200px"
          value={range}
          onChange={(e) => setRange(e.target.value)}
          borderColor='primary.50'
        >
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
          <option>This year</option>
        </Select>
      </Flex>

      {/* Stats Cards */}
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={6} mb={6}>
        {stats.map((s, i) => (
          <StatCard key={i} {...s} />
        ))}
      </SimpleGrid>

      {/* Sales Chart + Recent Orders */}
      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6} mb={6}>
        <GridItem>
          <Card>
            <CardHeader>
            <Flex justify="space-between" align="center">
           <Heading size="md">Sales Overview</Heading>
           <Menu>
             <MenuButton
               as={Button}
               rightIcon={<FiChevronDown />}
               size="sm"
               borderColor="primary.50"
              variant="outline"
             >
               {year}
             </MenuButton>
             <MenuList>
               {Array.from({ length: 2050 - 2025 + 1 }, (_, i) => 2025 + i).map(y => (
                 <MenuItem key={y} onClick={() => setYear(y)}>
                   {y}
                 </MenuItem>
               ))}
             </MenuList>
           </Menu>
         </Flex>
            </CardHeader>
            <CardBody>
              <Box h="280px" borderRadius="md">
                <Center h="full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={monthlyData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend verticalAlign="top" height={36} />
                      <Line
                        type="monotone"
                        dataKey="sales"
                        stroke="#3182CE"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
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
                {recentOrders.slice(0, 4).map((o) => (
                  <Flex key={o.id} justify="space-between" align="center">
                    <Box>
                      <Text fontWeight="medium">{o.id}</Text>
                      <Text fontSize="sm" color="gray.500">
                        {o.customer}
                      </Text>
                    </Box>
                    <Badge colorScheme={getStatusColor(o.status)}>
                      {o.status}
                    </Badge>
                    <Text fontWeight="bold">${o.amount.toFixed(2)}</Text>
                  </Flex>
                ))}
                <Button
                  rightIcon={<FiChevronRight />}
                  variant="ghost"
                  size="sm"
                  color="green.700"
                >
                  View all orders
                </Button>
              </VStack>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </Box>
  );
}
