import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Cpn_Location from "../../../components/Cpn_Location";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import IconAnt from 'react-native-vector-icons/AntDesign';

export default function LocationScreen() {
  const navigation = useNavigation();
  const [isFocus, setFocus] = useState(false);
  const [diachi, setDiachi] = useState([]);
  const getDiachi = () => {
    
  }
  useEffect(() => {
  
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Màn hình được focus
     
      setFocus(true);
      // console.log("Screen is focused");
      
      return () => {
        // Màn hình bị unfocus
        setFocus(false);
        // console.log("Screen is unfocused");
      };
    }, [])
  );

  const data = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
];

  return (
    <ImageBackground
      source={require("../../../assets/background_location.png")}
      style={styles.backgroundImg}
    >
      <View style={styles.container}>
        { data.map(({ item, index }) => (
            <Cpn_Location key={index}/>
          ))}
      </View>
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => {
          navigation.navigate("AddLocation");
        }}
      >
        <IconAnt name="plus" size={60} color={'#fff'}/>
      </TouchableOpacity>
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
    alignItems: "center",
    justifyContent: "center",
  },
});
