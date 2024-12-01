import axios from "axios";

const API_URL = "http://10.0.108.214:8080/api";
//const API_URL = "http://192.168.1.4:8080/api";

let user_id;

// Authentication

export const login = async (form) => {
  const response = await axios.post(`${API_URL}/auth/login`, form);
  if (response.data.code == 1000) {
    user_id = response.data.result.id;
    console.log("respone" + response.data);
  }
  // firstCallMap();
  return response.data;
};

export const signUp = async (form) => {
  try {
    const response = await axios.post(`${API_URL}/users`, form);
    return response.data;
  } catch (error) {
    console.log(error);
  }
  return "Loi";
};

// Product

export const fetchAllProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

// Address

export const addAddress = async (diachi) => {
  try {
    const res = await axios.post(`${API_URL}/address/${user_id}/add`, diachi);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
  return "ok";
};

export const deleteAddress = async (id) => {
  try {
    await axios.delete(`${API_URL}/address/${id}/delete`);
  } catch (error) {
    console.log(error);
  }
  return "ok";
};

export const getAddress = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/${user_id}/address`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
  return "Loi lay dia chi";
};

// Cai nay goi de load map ngay tu luc dang nhap trong android
export const firstCallMap = async () => {
  await axios.get(
    "https://rsapi.goong.io/direction?origin=10.882245102818498,106.78249876263239&destination=10.7364299,106.7389477&vehicle=car&api_key=GKkG446Pg4YiEAnnW6z15pGzLALuh1WSBShBZBOW"
  );

  console.log("Tested ok");
};

export const getUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/${user_id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
  return "Loi lay user";
};