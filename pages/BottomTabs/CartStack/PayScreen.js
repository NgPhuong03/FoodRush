import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AddressCard from "../../../components/Cart/AddressCard";
import PayMethodCard from "../../../components/Cart/PayMethodCard";
import { useContext, useEffect, useState } from "react";
import { getUserId, createOrder, deleteCart } from "../../../services/api";
import { AuthContext } from "../../../contexts/AuthContext";

export default function PayScreen({ route }) {
  const { lastAddressOrder } = useContext(AuthContext);
  const { cart, TongTien } = route.params;
  const navigation = useNavigation();
  const [note, setNote] = useState(""); // Ghi chú
  const [addressId, setAddressId] = useState(null); // ID địa chỉ
  const [paymentMethod, setPaymentMethod] = useState(false); // Phương thức thanh toán

  const hanldePaymentMethod = (bool) => {
    setPaymentMethod(bool);
  };

  const handleOrder = async () => {
    if (!lastAddressOrder) {
      Alert.alert("LỖI", "Bạn chưa chọn địa chỉ nhận hàng!");
      return;
    }
    
    const formattedOrder = {
      user_id: getUserId(),
      address_id: lastAddressOrder.id,
      note: note,
      paymethod: paymentMethod,
      cost: TongTien + calculateShipFee(), // Phí vận chuyển đã bao gồm
      list: cart.map((item) => ({
        food_id: item.food.id,
        food_quantity: item.food_quantity,
        addon: item.addonList.map((addon) => ({
          addon_id: addon.name === "pepsi" ? 1 : 2,
          addon_quantity: addon.quantity,
        })),
      })),
    };

    const response = await createOrder(formattedOrder);

    if (response.code === 1000) {
      Alert.alert("Thông báo", "Đặt hàng thành công!");
      await deleteCart();
      navigation.goBack();
    } else {
      Alert.alert("Thông báo", "Đặt hàng thất bại: " + response.message);
    }
  };

  const calculateShipFee = () => {
    let fee = 0;
    if (lastAddressOrder?.distance > 4000) {
      fee += lastAddressOrder?.distance * 10;
    }
    return fee;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{
          width: "100%",
          flex: 1,
          margin: 5,
          paddingHorizontal: 10,
          gap: 5,
        }}
      >
        <AddressCard
          isPay={true}
          setAddressId={setAddressId}
          navigation={navigation}
        />
        <PayMethodCard setPaymentMethod={hanldePaymentMethod} />

        {/* Ghi chú  */}
        <View style={styles.noteContainer}>
          <Text style={styles.label}>Ghi chú:</Text>
          <TextInput
            value={note}
            onChangeText={(value) => setNote(value)}
            multiline={true} // Cho phép nhập nhiều dòng
            style={styles.input} // Giới hạn chiều cao tối thiểu là 40
            placeholder="Để lại ghi chú (nếu có)..."
            blurOnSubmit={true} // Ẩn bàn phím khi nhấn "Done"
            returnKeyType="done" // Thay đổi nút "Enter" thành "Done"
            onSubmitEditing={() => Keyboard.dismiss()} // Tắt bàn phím
          />
        </View>

        {/* CHi tiết  */}
        <View style={styles.noteContainer}>
          <Text style={styles.label}>Chi tiết đơn hàng:</Text>
          <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: "black",
              paddingHorizontal: 20,
            }}
          ></View>

          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
          >
            <Text style={{ width: "50%", fontSize: 16, textAlign: "left" }}>
              Tổng cộng
            </Text>
            <Text style={{ width: "50%", fontSize: 16, textAlign: "right" }}>
              {TongTien.toLocaleString("vi-VN")}đ
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
              paddingBottom: 10,
            }}
          >
            <Text style={{ width: "50%", fontSize: 16, textAlign: "left" }}>
              Phí vận chuyển:
            </Text>
            {lastAddressOrder?.distance > 4000 && (
              <Text style={{ width: "25%", fontSize: 16, textAlign: "center" }}>
                {lastAddressOrder?.distance / 1000}km
              </Text>
            )}
            {lastAddressOrder?.distance > 4000 ? (
              <Text style={{ width: "25%", fontSize: 16, textAlign: "right" }}>
                {calculateShipFee().toLocaleString("vi-VN")}đ
              </Text>
            ) : (
              <Text style={{ width: "50%", fontSize: 16, textAlign: "right" }}>
                {calculateShipFee().toLocaleString("vi-VN")}đ
              </Text>
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footerContainer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Tổng cộng:</Text>
          <Text style={styles.totalAmount}>
            {(TongTien + calculateShipFee()).toLocaleString("vi-VN")}đ
          </Text>
        </View>
        <TouchableOpacity
          style={styles.paymentButton}
          onPress={() => handleOrder()}
        >
          <Text style={styles.paymentText}>Đặt hàng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
  },
  footerContainer: {
    height: "20%",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    shadowColor: "black",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  totalLabel: {
    fontSize: 18,
    color: "#000",
    fontWeight: "500",
  },
  totalAmount: {
    fontSize: 18,
    color: "#FA4A0C",
    fontWeight: "700",
  },
  paymentButton: {
    backgroundColor: "#FA4A0C",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  paymentText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "700",
  },
  bodyText: {
    height: 100,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    paddingLeft: 10,
    paddingTop: 10,
  },
  input: {
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    textAlignVertical: "top", // Căn trên cho TextInput
    height: 120,
  },
  noteContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 5,
    elevation: 5,
    shadowOpacity: 0.3,
    marginVertical: 10,
  },
});
