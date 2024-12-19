import axios from "axios";



// const API_URL = "http://10.0.108.214:8080/api";
const API_URL = "http://10.0.127.93:8080/api";

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

//user 
export const getUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/${user_id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
  return "Loi lay user";
};

// Food

export const fetchAllTop = async () => {
  console.log("Load all product")
  const response = await axios.get(`${API_URL}/foods/alltop`);
  return response.data;
};

export const fetchByCategory = async (category) => {
  const respone = await axios.get(`${API_URL}/foods/category?category=${category}`);
  return respone.data;
}

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


export const addToCart = async (cartItem) => {
  try {
    // Gọi API thêm vào giỏ hàng
    const response = await axios.post(`${API_URL}/cart/${user_id}`, cartItem);

    // Kiểm tra phản hồi
    if (response.data.code === 1000) {
      console.log("Thêm vào giỏ hàng thành công:", response.data);
      return response.data;
    } else {
      console.log("Thêm vào giỏ hàng thất bại:", response.data);
      return response.data;
    }
  } catch (error) {
    console.error("Lỗi khi thêm vào giỏ hàng:", error);
    return {
      code: 9999, // Mã lỗi tùy chọn
      message: "Lỗi không xác định khi thêm vào giỏ hàng.",
    };
  }
};

// Favorite

// export const addFavorite = async (foodId) => {
//   try {
//     const userId = 6; // Thay bằng ID người dùng của bạn
//     const response = await axios.post(
//       `/api/users/${userId}/favorites`,
//       { foodId }, // payload nếu API yêu cầu
//       {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     if (response.status === 200) {
//       return response.data; // Thành công
//     }
//   } catch (error) {
//     console.error("Lỗi khi thêm vào yêu thích:", error.response?.data || error.message);
//     return "Lỗi khi thêm vào yêu thích";
//   }
// };

// export const removeFavorite = async (foodId) => {
//   try {
//     await axios.delete(`${API_URL}/users/${user_id}/favorites/${foodId}`);
//     return "Xóa khỏi yêu thích thành công";
//   } catch (error) {
//     console.log(error);
//     return "Lỗi khi xóa khỏi yêu thích";
//   }
// };

export const getFavorites = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/${user_id}/favorites`);
    return response.data;
  } catch (error) {
    console.log(error);
    return "Lỗi khi lấy danh sách yêu thích";
  }
};


//order
export const getOrderByUserId = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/${user_id}/orders`);
    return response.data;
  } catch (error) {
    console.log(error);
    return "Lỗi khi lấy danh sách đơn hàng";
  }
}