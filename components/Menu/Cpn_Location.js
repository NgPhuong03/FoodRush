import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import IconEntypo from "react-native-vector-icons/Entypo";
import { deleteAddress } from "../../services/api";
import React, { useState } from "react";
import Modal_EditAddress from "./Modal_EditAddress";

export default function Cpn_Location({ item, reload }) {
  const { width, height } = Dimensions.get("window");
  const [isModalVisible, setModalVisible] = useState(false);
  const [data , setData] = useState(item);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View
      style={[{ width: width * 0.98, height: height * 0.1 }, styles.container]}
    >
      {/* Pop up */}
      <Modal_EditAddress 
        item={data} 
        toggleModal={toggleModal} 
        isVisible={isModalVisible} 
        setData={setData}
      />

      <View style={{ width: "100%", height: "100%", flexDirection: "row" }}>
        <TouchableOpacity style={styles.s1} onPress={toggleModal}>
          {data.type === "home" && (
            <Icon name="home" size={32} color={"#FA4A0C"} />
          )}
          {data.type === "default" && (
            <IconEntypo name="location" size={32} color={"#FA4A0C"} />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.s2} onPress={toggleModal}>
          <Text style={{ fontWeight: "bold", fontSize: 18, padding: 4 }}>
            {data.title}
          </Text>
          <Text style={{ fontSize: 16, paddingLeft: 4 }} numberOfLines={2}>
            {data.address}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.s3}
          onPress={() => {
            deleteAddress(data.id);
            reload(data);
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
  modalContent: {
    width: "100%",
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  input: {
    width: "100%",
    height: 32,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#bbb",
    padding: 8
  },
  title: {
    marginVertical: 4,
    fontSize: 16,
    fontWeight: "bold",
  },
});
