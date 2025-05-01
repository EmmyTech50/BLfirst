import {
    FiShoppingBag,
    FiUsers,
    FiDollarSign,
    FiTag,
} from 'react-icons/fi';

// All Data 
export const salesData = [
    { date: '2025-04-01', sales: 2400 },
    { date: '2025-04-02', sales: 1398 },
    { date: '2025-04-03', sales: 9800 },
    { date: '2025-04-04', sales: 3908 },
    { date: '2025-04-05', sales: 4800 },
    { date: '2025-04-06', sales: 3800 },
    { date: '2025-04-07', sales: 4300 },
   ]
   
export const recentOrders = [   {
    id: '#ORD-001',
    customer: 'Sarah Johnson',
    date: '2023-05-15',
    status: 'completed',
    amount: 129.99
  },
  {
    id: '#ORD-002',
    customer: 'Michael Chen',
    date: '2023-05-14',
    status: 'processing',
    amount: 89.50
  },
  {
    id: '#ORD-003',
    customer: 'Emma Williams',
    date: '2023-05-14',
    status: 'shipped',
    amount: 45.00
  },
  {
    id: '#ORD-004',
    customer: 'David Kim',
    date: '2023-05-13',
    status: 'pending',
    amount: 75.25
  },
  {
    id: '#ORD-005',
    customer: 'Lisa Rodriguez',
    date: '2023-05-12',
    status: 'completed',
    amount: 210.00
  }];

export const products     = [  {
    id: 101,
    name: 'Hydrating Facial Serum',
    stock: 42,
    price: 39.99,
    category: 'Skincare',
    status: 'active'
  },
  {
    id: 102,
    name: 'Matte Foundation',
    stock: 18,
    price: 45.00,
    category: 'Makeup',
    status: 'active'
  },
  {
    id: 103,
    name: 'Repairing Hair Mask',
    stock: 0,
    price: 28.50,
    category: 'Hair Care',
    status: 'out of stock'
  },
  {
    id: 104,
    name: 'Exfoliating Body Scrub',
    stock: 25,
    price: 32.00,
    category: 'Body Care',
    status: 'active'
  }];


const customers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '555-1234',
    joined: '2024-09-15',
    orders: 3,
    totalSpent: 150.0,
    walletBalance: 200.0,
    status: 'Active',
    transactions: [
      { type: 'Deposit', amount: 100, date: '2025-03-20' },
      { type: 'Purchase', amount: 50, date: '2025-03-22' },
    ],
    orderHistory: [
      {
        id: 'ORD-001',
        total: 50,
        deliveryStatus: 'Delivered',
        paymentStatus: 'Paid',
        numItems: 2,
        items: ['Product A', 'Product B'],
      },
    ],
  },
  {
    id: 2,
    name: 'David Miller',
    email: 'david@example.com',
    phone: '555-5678',
    joined: '2024-12-02',
    orders: 5,
    totalSpent: 250.0,
    walletBalance: 120.0,
    status: 'Inactive',
    transactions: [
      { type: 'Deposit', amount: 200, date: '2025-03-10' },
      { type: 'Purchase', amount: 80, date: '2025-03-15' },
    ],
    orderHistory: [
      {
        id: 'ORD-002',
        total: 80,
        deliveryStatus: 'Pending',
        paymentStatus: 'Unpaid',
        numItems: 3,
        items: ['Product C', 'Product D', 'Product E'],
      },
    ],
  },
  {
    id: 3,
    name: 'Amina Bashir',
    email: 'amina@example.com',
    phone: '555-9876',
    joined: '2025-01-10',
    orders: 1,
    totalSpent: 40.0,
    walletBalance: 60.0,
    status: 'Active',
    transactions: [
      { type: 'Deposit', amount: 100, date: '2025-04-10' },
      { type: 'Purchase', amount: 40, date: '2025-04-13' },
    ],
    orderHistory: [
      {
        id: 'ORD-003',
        total: 40,
        deliveryStatus: 'Delivered',
        paymentStatus: 'Paid',
        numItems: 1,
        items: ['Product F'],
      },
    ],
  },
];

export default customers

export const stats        = [    {
      title: 'Total Revenue',
      value: '$12,345',
      change: 12.5,
      icon: FiDollarSign,
      color: 'green'
    },
    {
      title: 'Total Orders',
      value: '156',
      change: 8.2,
      icon: FiShoppingBag,
      color: 'blue'
    },
    {
      title: 'New Customers',
      value: '24',
      change: -3.1,
      icon: FiUsers,
      color: 'purple'
    },
    {
      title: 'Products Sold',
      value: '423',
      change: 15.7,
      icon: FiTag,
      color: 'orange'
    }];

export function getStatusColor(status) {
  switch (status) {
    case 'completed':    return 'green';
    case 'processing':   return 'blue';
    case 'shipped':      return 'purple';
    case 'pending':      return 'yellow';
    case 'out of stock': return 'red';
    default:             return 'gray';
  }
}
