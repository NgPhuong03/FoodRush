import { Dimensions, StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext, AuthContextProvider } from "./contexts/AuthContext";
import { useContext } from "react";
import AuthenticationStack from "./components/AuthenticationStack";
import { StatusBar } from "expo-status-bar";
import BottomTabNavigatior from "./components/BottomTabNavigator";

function ScreenStack() {
  const { isAuthenticated } = useContext(AuthContext);
  const { width, height } = Dimensions.get("window");
  return (
    <NavigationContainer>
      {!isAuthenticated && (
        <View style={styles.container}>
          <Text>Ve logo o day</Text>
        </View>
      )}

      <View style={{ marginTop: height * 0.05 }}>
        <StatusBar backgroundColor="transparent" />
      </View>

      {isAuthenticated ? <BottomTabNavigatior /> : <AuthenticationStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthContextProvider>
      <ScreenStack />
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "20%",
    backgroundColor: "#666",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 200,
    backgroundColor: "red",
  },
});
