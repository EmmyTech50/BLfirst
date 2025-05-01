import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ChakraProvider } from "@chakra-ui/react"
import theme from "./theme"

// public pages
import Home                     from './pages/user/Home'
import MyAccount                     from './pages/user/Account/MyAccount'
import Login                    from './pages/user/Login'
import Register                 from './pages/user/Register'
import ForgotPassword           from './pages/user/ForgotPassword'
import ContactUs                from './pages/user/Other pages/ContactUs'
import AboutUs                  from './pages/user/Other pages/AboutUs'
import FAQs                     from './pages/user/Other pages/FAQs'
import PrivacyPolicy            from './pages/user/Other pages/PrivacyPolicy'
import ShippingAndReturnPolicy  from './pages/user/Other pages/shippingAndReturnPolicy'
import EditProfile  from './pages/user/Account/EditProfile'
import ChangePassword  from './pages/user/Account/ChangePassword'

// admin pages & layout (all public now)
import LoginPage   from './pages/admin/LoginPage'
import AdminLayout from './pages/admin/AdminLayout'
import Dashboard    from './pages/admin/Dashboard'
import Orders       from './pages/admin/Orders'
import Products     from './pages/admin/Products'
import Users        from './pages/admin/Users'
import Locations    from './pages/admin/Locations'
import Admins       from './pages/admin/Admins'
import NewsLetter   from './pages/admin/NewsLetter'
import Profile   from './pages/admin/Profile'
import Settings     from './pages/admin/Settings'

import NotFound from './pages/NotFound'

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <AnimatePresence mode="wait">
          <Routes>

            {/* Public / user routes */}
            <Route path="/"                     element={<Home />} />
            <Route path="/myaccount"                     element={<MyAccount />} />
            <Route path="/faqs"                 element={<FAQs />} />
            <Route path="/contact-us"           element={<ContactUs />} />
            <Route path="/aboutus"              element={<AboutUs />} />
            <Route path="/privacypolicy"        element={<PrivacyPolicy />} />
            <Route path="/shippingandreturn"    element={<ShippingAndReturnPolicy />} />
            <Route path="/editprofile"    element={<EditProfile  />} />
            <Route path="/changepassword"    element={<ChangePassword />} />
            <Route path="/login"                element={<Login />} />
            <Route path="/register"             element={<Register />} />
            <Route path="/forgot-password"      element={<ForgotPassword />} />

            {/* Admin login */}
            <Route path="/admin/login"          element={<LoginPage />} />

            {/* Admin area (no auth) */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index      element={<Dashboard />} />
              <Route path="orders"        element={<Orders />} />
              <Route path="products"      element={<Products />} />
              <Route path="customers"     element={<Users />} />
              <Route path="locations"     element={<Locations />} />
              <Route path="admins"        element={<Admins />} />
              <Route path="newsletter"    element={<NewsLetter />} />
              <Route path="profile"    element={<Profile />} />
              <Route path="settings"      element={<Settings />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<NotFound />} />

          </Routes>
        </AnimatePresence>
      </Router>
    </ChakraProvider>
  )
}
