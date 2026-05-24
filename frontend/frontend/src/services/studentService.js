import axios from "axios";
const API_URL="http://localhost:8082/students";

export const getStudents=()=>{
    return axios.get(API_URL);
}

export const createStudent=(student)=>
    axios.post(API_URL, student);

export const deleteStudent=(id)=>
    axios.delete(`${API_URL}/${id}`);