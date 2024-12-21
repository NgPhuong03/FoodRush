import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import {
  addFavorite,
  deleteFavorite,
  getFavorites,
  login,
} from "../services/api";

// Tạo Context
const AuthContext = createContext();

// Tạo Provider
const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [favorites, setFavourites] = useState({});
  const [user, setUser] = useState({});

  const LogIn = async (form) => {
    console.log("Đang gọi LogIn");
    const res = await login(form);
    console.log("Đã gọi Login");

    if (res.code == 1000) {
      const favor = await getFavorites();
      const sortedData = favor.result.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setFavourites(sortedData.length > 0 ? sortedData : null);
      setUser({
        email: form.email,
        password: form.password,
        role: res.role,
        id: res.id,
      });
      setAuthenticated(true);
    }
    return res;
  };

  const LogOut = () => {
    setAuthenticated(false);
  };

  const unFavourite = async (id) => {
    try {
      // Gọi API xóa sản phẩm
      await deleteFavorite(id);
      // Cập nhật lại danh sách giỏ hàng trong state

      setFavourites((prevFavourite) =>
        prevFavourite.filter((item) => item.id != id)
      );

      console.log(`Đã unlike sản phẩm có ID: ${id}`);
    } catch (error) {
      console.error(`Lỗi khi unlike sản phẩm có ID: ${id}`, error);
    }
  };

  const addToFavourite = async (item) => {
    try {
      // Gọi API them sản phẩm
      setFavourites([...favorites, item]);
      await addFavorite(item.id);
      
      console.log(`Đã like sản phẩm có ID: ${item.id}`);
    } catch (error) {
      console.error(`Lỗi khi like sản phẩm có ID: ${item.id}`, error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, LogIn, LogOut, user, favorites, unFavourite, addToFavourite }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthContextProvider };

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
