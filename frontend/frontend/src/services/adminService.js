import API from './api';

export const adminService = {
    // Target: POST /api/users/register/admin
    register: async (adminData) => {
        const response = await API.post('/users/register/admin', adminData);
        return response.data;
    }
};