import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { Alert, ActivityIndicator, StyleSheet, View } from "react-native";
import { login } from "../services/api";

// Tạo Context
const AuthContext = createContext();

// Tạo Provider
const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  const LogIn = async (form) => {
    const res = await login(form);
    if (res) {
      setUser({
        email: form.email,
        password: form.password,
        role: res.role,
        id: res.id
      });
      setAuthenticated(true);
    }
  };

  const LogOut = () => {
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, LogIn, LogOut, user }}>
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
