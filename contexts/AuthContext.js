import React, { createContext, useEffect, useState } from "react";
import { Alert, ActivityIndicator, StyleSheet, View } from "react-native";

// Tạo Context
const AuthContext = createContext();

// Tạo Provider
const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const LogIn =() => {
    setAuthenticated(true);
  }

  const LogOut =() => {
    setAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, LogIn, LogOut}}>
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
