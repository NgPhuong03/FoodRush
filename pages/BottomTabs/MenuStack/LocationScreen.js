import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Cpn_Location from "../../../components/Cpn_Location";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";

export default function LocationScreen() {
  const navigation = useNavigation();
  const [isFocus, setFocus] = useState(false);
  useEffect(() => {
   
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Màn hình được focus
      AsyncStorage.getItem('DIACHI', (err, result) => {
        console.log(result);
      })
      setFocus(true);
      // console.log("Screen is focused");

      return () => {
        // Màn hình bị unfocus
        setFocus(false);
        // console.log("Screen is unfocused");
      };
    }, [])
  );

  return (
    <ImageBackground
      source={require("../../../assets/background_location.png")}
      style={styles.backgroundImg}
    >
      <View style={styles.container}>
        <Cpn_Location />
        <Cpn_Location />
      </View>
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => {
          navigation.navigate("AddLocation");
        }}
      ></TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 8,
  },
  backgroundImg: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  addBtn: {
    position: "absolute",
    width: 72,
    height: 72,
    borderRadius: 72,
    backgroundColor: "#FA4A0C",
    bottom: 24,
    right: 24,
  },
});
