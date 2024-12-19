import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import IconEntypo from "react-native-vector-icons/Entypo";
import Modal from "react-native-modal";
import React, { useEffect, useState } from "react";
import { updateAddress } from "../../services/api";

export default Modal_EditAddress = ({
  item,
  isVisible,
  toggleModal,
  setData,
}) => {
  const [title, setTitle] = useState(item.title);
  const [type, setType] = useState(item.type);
  const [isUpdate, setUpdate] = useState(false);
  const handleChangeData = () => {
    setData({ ...item, title: title, type: type });
    setUpdate(true);
    toggleModal();
  };

  useEffect(() => {
    if (isUpdate) {
      updateAddress(item.id,item);
    }
  },[isUpdate]);
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={toggleModal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <View style={styles.modalContent}>
        <Text style={styles.headerTitle}>Chỉnh sửa địa chỉ</Text>

        {/* Tên gợi nhớ */}
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Tên gợi nhớ</Text>
          <TextInput
            style={styles.input}
            defaultValue={item.title}
            onChangeText={(e) => setTitle(e)}
          />
        </View>

        {/* Địa chỉ */}
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Địa chỉ</Text>
          <TextInput
            style={[styles.input, { backgroundColor: "#ccc" }]}
            value={item.address}
            readOnly
            multiline
          />
        </View>

        {/* Biểu tượng */}
        <View style={styles.typeContainer}>
          <Text style={styles.title}>Biểu tượng</Text>
          <View style={styles.typeOptions}>
            <Icon
              name="home"
              size={40}
              color={"#FA4A0C"}
              style={{ backgroundColor: type === "home" ? "#ccc" : null }}
              onPress={() => setType("home")}
            />
            <IconEntypo
              name="location"
              size={40}
              color={"#FA4A0C"}
              style={{ backgroundColor: type === "default" ? "#ccc" : null }}
              onPress={() => setType("default")}
            />
          </View>

          <View style={styles.btnContainer}>
            {/* Xác nhận */}
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: "green" }]}
              onPress={handleChangeData}
            >
                <Text style={{color: '#fff'}}>Xác nhận</Text>
            </TouchableOpacity>

            {/* Huỷ */}
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: "red" }]}
              onPress={toggleModal}
            >
                <Text style={{color: '#fff'}}>Huỷ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    width: "100%",
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  inputContainer: {
    marginTop: 8,
    width: "100%",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    padding: 12,
    color: "#FA4A0C",
  },
  input: {
    width: "100%",
    flexGrow: 1,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#bbb",
    padding: 8,
  },
  title: {
    marginVertical: 4,
    fontSize: 16,
    fontWeight: "bold",
  },
  typeContainer: {
    width: "100%",
    margin: 8,
  },
  typeOptions: {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
  },
  btn: {
    width: 80,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
