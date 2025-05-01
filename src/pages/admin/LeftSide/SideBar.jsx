
import PropTypes from 'prop-types'
import {
  Box,
  VStack,
  Divider,
  useColorModeValue,
  Image,
} from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import NavItem from '../../../components/NavItem'
import Logo from '../../../assets/tulip-logo.png'
import {
  FiHome,
  FiShoppingCart,
  FiBox,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiRadio,
  FiUser,
} from 'react-icons/fi'

const menuItems = [
  { label: 'Home',      to: '/admin',          icon: FiHome        },
  { label: 'Orders',    to: '/admin/orders',   icon: FiShoppingCart },
  { label: 'Products',  to: '/admin/products', icon: FiBox         },
  { label: 'Customers', to: '/admin/customers',icon: FiUsers       },
  { label: 'Locations', to: '/admin/locations',icon: FiRadio       },
  { label: 'Admins',    to: '/admin/admins',   icon: FiBarChart2   },
  { label: 'Profile',    to: '/admin/profile',   icon: FiUser },
  { label: 'Settings',  to: '/admin/settings', icon: FiSettings    },
]

export default function SideBar({
  isMobile = false,
  onClose  = () => {},
}) {

  const location  = useLocation()
  const navigate  = useNavigate()

  // Colors
  const bg        = useColorModeValue('primary.50', 'primary.50')
  const color     = useColorModeValue('primary.100',    'primary.100')

  return (
    <Box
      as="nav"
      w="100%"
      h="100%"
      bg={bg}
      color={color}
      py={8}
      px={isMobile ? 0 : 6}
    >
      <VStack align="start" spacing={6}>
      {/* logo + divider only in desktop sidebar */}
        {!isMobile && (
          <>
            {/* make the whole logo‐area white */}
           <Box 
            w="200px" 
            bg="white" 
            
            display="flex"
            justifyContent='center' 
            alignItems='center'>
             <Image
               src={Logo}
               alt="Bright & Lustre Logo"
               boxSize="70px"
               objectFit="contain"
             />
           </Box>
           {/* white divider line */}
          <Divider borderColor="Primary.150" />
          </>
        )}

        {/* menu links */}
        {menuItems.map(({ label, to, icon }) =>{
          const isActive = location.pathname === to;
          return (
          <NavItem
            key={label}
            icon={icon}
            active={isActive}
            onClick={() => {
              navigate(to)
              onClose()
            }}
            bg={isActive ? '#373435' : undefined}
            color={isActive ? 'white' : color}
            _hover={{ bg: '#373435', color: 'white' }}
          >
            {label}
          </NavItem>
        )
        })}
      </VStack>
    </Box>
  )
}

SideBar.propTypes = {
  /** Render mobile styling (inside the Drawer) */
  isMobile: PropTypes.bool,
  /** Called when a link is clicked to close the Drawer */
  onClose:  PropTypes.func,
}
