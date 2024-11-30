import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import IconEntypo from "react-native-vector-icons/Entypo";
import { deleteAddress } from "../services/api";
import { useState } from "react";

export default function Cpn_Location({ item, reload }) {
  const { width, height } = Dimensions.get("window");

  return (
    <View
      style={[{ width: width * 0.98, height: height * 0.1 }, styles.container]}
    >
      <View style={{ width: "100%", height: "100%", flexDirection: "row" }}>
        <View style={styles.s1}>
          {item.type === "home" && (
            <Icon name="home" size={32} color={"#FA4A0C"} />
          )}
          {item.type === "default" && (
            <IconEntypo name="location" size={32} color={"#FA4A0C"} />
          )}
        </View>

        <View style={styles.s2}>
          <Text style={{ fontWeight: "bold", fontSize: 18, padding: 4 }}>
            {item.title}
          </Text>
          <Text style={{ fontSize: 16, paddingLeft: 4 }} numberOfLines={2}>
            {item.address}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.s3}
          onPress={() => {
            deleteAddress(item.id);
            reload(item);
          }}
        >
          <Icon name="trash-o" size={30} color={"#FA4A0C"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
  },
  s1: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  s2: {
    flex: 3,
    justifyContent: "center",
  },
  s3: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  deleted: {
    opacity: 0,
  },
});
