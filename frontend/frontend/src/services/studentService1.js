import API from './api';

export const studentService = {
    // Target: POST /api/users/register/student
    register: async (studentData) => {
        const response = await API.post('/users/register/student', studentData);
        return response.data;
    }
};