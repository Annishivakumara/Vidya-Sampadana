import API from "./api";

const API_URL = "/student";

export const getStudents = () => API.get(API_URL);

export const createStudent = (student) => API.post(API_URL, student);

export const updateStudent = (id, student) => API.put(`${API_URL}/${id}`, student);

export const deleteStudent = (id) => API.delete(`${API_URL}/${id}`);

export const getStudentById = (id) => {
  return API.get(`${API_URL}/${id}`);
};