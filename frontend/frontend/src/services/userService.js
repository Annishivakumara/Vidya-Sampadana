import API from './api';

export const userService = {
    login: async (username, password) => {
        try {
            await API.post('/auth/login', { username, password });
        } catch (error) {
            const message = error.response?.data;
            throw new Error(typeof message === 'string' ? message : 'Invalid username or password.');
        }

        return {
            username,
            name: username,
            email: username,
            role: 'member',
        };
    },

    getUserById: async (id) => {
        const response = await API.get(`/users/${id}`);
        return response.data;
    },
    
    getAllUsers: async () => {
        const response = await API.get('/users');
        return response.data;
    }
};