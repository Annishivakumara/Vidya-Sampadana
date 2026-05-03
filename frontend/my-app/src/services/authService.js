import api from "../utils/axiosConfig";

export const loginUser = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data; // expects { token, user }
};

export const registerUser = async (name, email, password) => {
  const response = await api.post("/auth/register", { name, email, password });
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};