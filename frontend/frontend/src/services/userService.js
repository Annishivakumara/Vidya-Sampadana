import API from './api';

export const userService = {
    signup: async (username, email, password) => {
        try {
            const response = await API.post('/auth/signup', { username, email, password });
            if (!response.data?.accessToken || !response.data?.user) {
                throw new Error('The registration service returned an invalid session.');
            }
            return response.data;
        } catch (error) {
            if (error.message === 'The registration service returned an invalid session.') {
                throw error;
            }
            const message = error.response?.data?.detail || error.response?.data?.message || error.response?.data;
            throw new Error(typeof message === 'string' ? message : 'Unable to create your account.');
        }
    },

    login: async (username, password) => {
        try {
            const response = await API.post('/auth/login', { username, password });
            if (!response.data?.accessToken || !response.data?.user) {
                throw new Error('The login service returned an invalid session.');
            }
            return response.data;
        } catch (error) {
            if (error.message === 'The login service returned an invalid session.') {
                throw error;
            }
            const message = error.response?.data;
            throw new Error(typeof message === 'string' ? message : 'Invalid username or password.');
        }
    },

    logout: async () => API.post('/auth/logout'),

    getUserById: async (id) => {
        const response = await API.get(`/users/${id}`);
        return response.data;
    },
    
    getAllUsers: async () => {
        const response = await API.get('/users');
        return response.data;
    }
};
