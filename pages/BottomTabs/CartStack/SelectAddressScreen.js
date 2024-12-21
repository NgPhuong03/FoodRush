import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Cpn_Location from "../../../components/Menu/Cpn_Location";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import IconAnt from "react-native-vector-icons/AntDesign";
import { getAddress } from "../../../services/api";
import Cpn_SelectLocation from "../../../components/Cart/Cpn_SelectLocation";

export default function SelectedAddressScreen({route}) {
  const navigation = useNavigation();
  const [isFocus, setFocus] = useState(false);
  const [diachi, setDiachi] = useState([]);
  const [change, setChange] = useState(false);

  const callApi = async () => {
    const res = await getAddress();
    setDiachi(res);
    setFocus(true);
  };

  useFocusEffect(
    React.useCallback(() => {
      // Màn hình được focus
      callApi();
      
      // console.log("Screen is focused");

      return () => {
        // Màn hình bị unfocus
        setFocus(false);
        // console.log("Screen is unfocused");
      };
    }, [])
  );

  if (isFocus) {
    return (
      <ImageBackground
        source={require("../../../assets/background_location.png")}
        style={styles.backgroundImg}
      >
        <View style={styles.container}>
          {diachi.map((item, index) => (
            <Cpn_SelectLocation key={index} item={item} navigation={navigation}/>
          ))}
        </View>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => {
            navigation.navigate("AddLocation");
          }}
        >
          <IconAnt name="plus" size={60} color={"#fff"} />
        </TouchableOpacity>
      </ImageBackground>
    );
  }
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
