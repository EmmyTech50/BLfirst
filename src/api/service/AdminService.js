import api from '../api/axios';

const adminService = {
  
  getDasBoardMtetrics: async () => {
    try {
      const response = await api.get('admin/metrics');
      return response.data;
    } catch (error) {
      if (error.response) { 
        throw error.response.data;
      } else if (error.request) { 
        throw { error: 'No response from server. Please check your connection.' };
      } else { 
        throw { error: 'Failed to send request. Please try again.' };
      }
    }
  },
  getAllOrders: async () => {
    try {
      const response = await api.get('admin/metrics');
      return response.data;
    } catch (error) {
      if (error.response) { 
        throw error.response.data;
      } else if (error.request) { 
        throw { error: 'No response from server. Please check your connection.' };
      } else { 
        throw { error: 'Failed to send request. Please try again.' };
      }
    }
  },
  getOrderDetails: async ( payload ) => {
    try {
      const response = await api.get('admin/metrics', payload);
      return response.data;
    } catch (error) {
      if (error.response) { 
        throw error.response.data;
      } else if (error.request) { 
        throw { error: 'No response from server. Please check your connection.' };
      } else { 
        throw { error: 'Failed to send request. Please try again.' };
      }
    }
  },
  createOrder: async ( payload ) => {
    try {
      const response = await api.post('admin/metrics', payload);
      return response.data;
    } catch (error) {
      if (error.response) { 
        throw error.response.data;
      } else if (error.request) { 
        throw { error: 'No response from server. Please check your connection.' };
      } else { 
        throw { error: 'Failed to send request. Please try again.' };
      }
    }
  },

  completeOrder: async ( payload ) => {
    try {
      const response = await api.post('admin/metrics', payload);
      return response.data;
    } catch (error) {
      if (error.response) { 
        throw error.response.data;
      } else if (error.request) { 
        throw { error: 'No response from server. Please check your connection.' };
      } else { 
        throw { error: 'Failed to send request. Please try again.' };
      }
    }
  },
  createProduct: async ( payload ) => {
    try {
      const response = await api.post('admin/product/create', payload);
      return response.data;
    } catch (error) {
      if (error.response) { 
        throw error.response.data;
      } else if (error.request) { 
        throw { error: 'No response from server. Please check your connection.' };
      } else { 
        throw { error: 'Failed to send request. Please try again.' };
      }
    }
  },
  
  getProducts: async () => {
    try {
      const response = await api.get('admin/products');
      return response.data;
    } catch (error) {
      if (error.response) { 
        throw error.response.data;
      } else if (error.request) { 
        throw { error: 'No response from server. Please check your connection.' };
      } else { 
        throw { error: 'Failed to send request. Please try again.' };
      }
    }
  },

  editProduct: async (payload) => {
    try {
      const response = await api.post('admin/products', payload);
      return response.data;
    } catch (error) {
      if (error.response) { 
        throw error.response.data;
      } else if (error.request) { 
        throw { error: 'No response from server. Please check your connection.' };
      } else { 
        throw { error: 'Failed to send request. Please try again.' };
      }
    }
  },

  deleteProduct: async (payload) => {
    try {
      const response = await api.delete('admin/products', payload);
      return response.data;
    } catch (error) {
      if (error.response) { 
        throw error.response.data;
      } else if (error.request) { 
        throw { error: 'No response from server. Please check your connection.' };
      } else { 
        throw { error: 'Failed to send request. Please try again.' };
      }
    }
  },
  

// Locationn
createLocation: async ( payload ) => {
  try {
    const response = await api.post('admin/product/create', payload);
    return response.data;
  } catch (error) {
    if (error.response) { 
      throw error.response.data;
    } else if (error.request) { 
      throw { error: 'No response from server. Please check your connection.' };
    } else { 
      throw { error: 'Failed to send request. Please try again.' };
    }
  }
},

getLocations: async () => {
  try {
    const response = await api.get('admin/products');
    return response.data;
  } catch (error) {
    if (error.response) { 
      throw error.response.data;
    } else if (error.request) { 
      throw { error: 'No response from server. Please check your connection.' };
    } else { 
      throw { error: 'Failed to send request. Please try again.' };
    }
  }
},

editLocation: async (payload) => {
  try {
    const response = await api.post('admin/products', payload);
    return response.data;
  } catch (error) {
    if (error.response) { 
      throw error.response.data;
    } else if (error.request) { 
      throw { error: 'No response from server. Please check your connection.' };
    } else { 
      throw { error: 'Failed to send request. Please try again.' };
    }
  }
},

deleteLocation: async (payload) => {
  try {
    const response = await api.delete('admin/products', payload);
    return response.data;
  } catch (error) {
    if (error.response) { 
      throw error.response.data;
    } else if (error.request) { 
      throw { error: 'No response from server. Please check your connection.' };
    } else { 
      throw { error: 'Failed to send request. Please try again.' };
    }
  }
},







  getAllUsers: async () => {
    try {
      const response = await api.get('admin/users');
      return response.data;
    } catch (error) {
      if (error.response) { 
        throw error.response.data;
      } else if (error.request) { 
        throw { error: 'No response from server. Please check your connection.' };
      } else { 
        throw { error: 'Failed to send request. Please try again.' };
      }
    }
  },

  getUserDetails: async () => {
    try {
      const response = await api.get('admin/users');
      return response.data;
    } catch (error) {
      if (error.response) { 
        throw error.response.data;
      } else if (error.request) { 
        throw { error: 'No response from server. Please check your connection.' };
      } else { 
        throw { error: 'Failed to send request. Please try again.' };
      }
    }
  },
  getAllAdmins: async () => {
    try {
      const response = await api.get('admin/users');
      return response.data;
    } catch (error) {
      if (error.response) { 
        throw error.response.data;
      } else if (error.request) { 
        throw { error: 'No response from server. Please check your connection.' };
      } else { 
        throw { error: 'Failed to send request. Please try again.' };
      }
    }
  },
  addAdmin: async (payload) => {
    try {
      const response = await api.post('admin/create', payload);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else if (error.request) {
        throw { error: 'No response from server. Please check your connection.' };
      } else {
        throw { error: 'Failed to send request. Please try again.' };
      }
    }
  },
  editAdmin: async (payload) => {
    try {
      const response = await api.post('admin/create', payload);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else if (error.request) {
        throw { error: 'No response from server. Please check your connection.' };
      } else {
        throw { error: 'Failed to send request. Please try again.' };
      }
    }
  },
  deleteAdmin: async (payload) => {
    try {
      const response = await api.delete('admin/create', payload);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else if (error.request) {
        throw { error: 'No response from server. Please check your connection.' };
      } else {
        throw { error: 'Failed to send request. Please try again.' };
      }
    }
  },




  //  Hero Imnages
  getHeroImages: async () => {
    try {
      const response = await api.get('admin/users');
      return response.data;
    } catch (error) {
      if (error.response) { 
        throw error.response.data;
      } else if (error.request) { 
        throw { error: 'No response from server. Please check your connection.' };
      } else { 
        throw { error: 'Failed to send request. Please try again.' };
      }
    }
  },
  addHeroImage: async (payload) => {
    try {
      const response = await api.post('admin/create', payload);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else if (error.request) {
        throw { error: 'No response from server. Please check your connection.' };
      } else {
        throw { error: 'Failed to send request. Please try again.' };
      }
    }
  },
  setActiveHeroImages: async (payload) => {
    try {
      const response = await api.post('admin/create', payload);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else if (error.request) {
        throw { error: 'No response from server. Please check your connection.' };
      } else {
        throw { error: 'Failed to send request. Please try again.' };
      }
    }
  },
  deleteHeroImage: async (payload) => {
    try {
      const response = await api.delete('admin/create', payload);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else if (error.request) {
        throw { error: 'No response from server. Please check your connection.' };
      } else {
        throw { error: 'Failed to send request. Please try again.' };
      }
    }
  },

  login: async (credentials) => {
    try {
      const response = await api.post('admin/login', credentials);
      
      // If login is successful, store the token
      if (response.data.token) {
         localStorage.setItem('auth_token', response.data.token);
        
        // Optionally store user data
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
      }
      
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else if (error.request) {
        throw { error: 'No response from server. Please check your connection.' };
      } else {
        throw { error: 'Failed to send request. Please try again.' };
      }
    }
  },

  changePassword: async (payload) => {
    try {
      const response = await api.post('auth/changePassword.php', payload);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else if (error.request) {
        throw { error: 'No response from server. Please check your connection.' };
      } else {
        throw { error: 'Failed to send request. Please try again.' };
      }
    }
  },
  updateProfile: async (payload) => {
    try {
      const response = await api.post('auth/updateProfile.php', payload);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else if (error.request) {
        throw { error: 'No response from server. Please check your connection.' };
      } else {
        throw { error: 'Failed to send request. Please try again.' };
      }
    }
  },

  
  logout: () => {
    localStorage.removeItem('admin_auth_token');
    localStorage.removeItem('user');
  },

  // Check if user is logged in
  isAuthenticated: () => {
    return localStorage.getItem('admin_auth_token') !== null;
  },

  // Get current user data
  getCurrentUser: () => {
    const user = localStorage.getItem('admin_user');
    return user ? JSON.parse(user) : null;
  }
};

export { api, adminService };