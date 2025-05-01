import api from '../axios';

const userService = { 


  getMyOrders: async () => {
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

  getMyProfile: async () => {
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
  

};

export { api, userService };