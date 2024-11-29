import axios from "axios";

let user_id
const API_URL = "http://192.168.1.8:8080/api";
// const API_URL = 'http://fakestoreapi.com';

export const login = async (form) => {
  const response = await axios.post(`${API_URL}/auth/login`, form);
  user_id = response.data.id;
  return response.data;
};

export const fetchAllProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const addMap = async (diachi) => {
    console.log(user_id);
    
  try {
    const res = await axios.post(`${API_URL}/address/${user_id}/add`, diachi);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
  return 'ok';
};
