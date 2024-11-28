import { Dimensions, StyleSheet, View, Text, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext, AuthContextProvider } from "./contexts/AuthContext";
import { useContext } from "react";
import AuthenticationStack from "./components/AuthenticationStack";
import { StatusBar } from "expo-status-bar";
import BottomTabNavigatior from "./components/BottomTabNavigator";
import { SafeAreaView } from "react-native-safe-area-context";

function ScreenStack() {
  const { isAuthenticated } = useContext(AuthContext);
  const { width, height } = Dimensions.get("window");
  return (
    <NavigationContainer>
      <View style={{ marginTop: height * 0.05}}>
        <StatusBar style="auto" backgroundColor="transparent" />
      </View>
      {!isAuthenticated && (
        <SafeAreaView style={styles.container}>
          <Image 
            source={require('./assets/logo.png')}
            style={styles.logo}
          />
        </SafeAreaView>
      )}



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
    height: "30%",
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 150,
    height: 150,
    backgroundColor: "red",
  },
});
