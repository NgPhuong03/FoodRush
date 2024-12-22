import { Dimensions, StyleSheet, View, Text, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext, AuthContextProvider } from "./contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import AuthenticationStack from "./components/AuthenticationStack";
import { StatusBar } from "expo-status-bar";
import BottomTabNavigatior from "./components/BottomTabNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { initializeAPIUrl } from "./services/api";
import ShipperTopTab from "./components/Shipper/ShipperTopTap";
import IntroSlider from "./components/IntroSlider";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ScreenStack() {
  const { isAuthenticated , isShipper} = useContext(AuthContext);
  const { width, height } = Dimensions.get("window");
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const checkIntroViewed = async () => {
      const viewed = await AsyncStorage.getItem("introViewed");  //Bỏ cmt dòng này để chỉ hiện khi lần đầu vào app
      if (viewed) {
        setShowIntro(false);
      }

      // setShowIntro(true)
    };
    checkIntroViewed();
  }, []);

  const handleIntroDone = async () => {
    
    await AsyncStorage.setItem("introViewed", "true"); //Bỏ cmt dòng này để chỉ hiện khi lần đầu vào app
    setShowIntro(false);
  };

  if (showIntro) {
    return <IntroSlider onDone={handleIntroDone} />;
  }

  return (
  
    <NavigationContainer>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
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
          {isAuthenticated ? (isShipper ? <ShipperTopTab/> : <BottomTabNavigatior />) : <AuthenticationStack />}
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
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
