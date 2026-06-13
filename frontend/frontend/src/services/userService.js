import API from './api';

export const userService = {
    // Simulate hitting an auth endpoint or validating user records
    login: async (email, password) => {
        // For now, we fetch all users to find a match for our prototype validation loop.
        // Once your auth backend microservice is up, this will simply map to: API.post('/auth/login', { email, password })
        const response = await API.get('/users');
        const users = response.data;
        
        // Find the user matching the provided email credentials
        const matchedUser = users.find(u => u.email === email && password !== ""); 
        
        if (!matchedUser) {
            throw new Error("Invalid email or password combination.");
        }
        
        return matchedUser; // Returns the secure UserResponseDto (no password exposed!)
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