import API from './api';

export const volunteerService = {
    // Target: POST /api/users/register/volunteer
    register: async (volunteerData) => {
        const response = await API.post('/users/register/volunteer', volunteerData);
        return response.data;
    }
};