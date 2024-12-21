import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon5 from "react-native-vector-icons/FontAwesome5";
import { Button } from "@rneui/themed";
import { addToCart, addFavorite } from "../services/api";
import { AuthContext } from "../contexts/AuthContext";

const BottomSheetComponent = ({
  bottomSheetRef,
  snapPoints,
  selectedProduct,
}) => {
  const { favorites, addToFavourite , unFavourite} = useContext(AuthContext);
  const [isFavor, setFavor] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [included, setInclude] = useState([
    { id: 1, name: "Pepsi", price: 10000, selected: false, quantity: 1 },
    { id: 2, name: "Sting", price: 12000, selected: false, quantity: 1 },
  ]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setIsExpanded(false);
    setInclude([
      { id: 1, name: "Pepsi", price: 10000, selected: false, quantity: 1 },
      { id: 2, name: "Sting", price: 12000, selected: false, quantity: 1 },
    ]);
    setQuantity(1);

    setFavor(favorites.some((obj) => selectedProduct?.id === obj.id));
  }, [selectedProduct]); // Reset khi product thay đổi

  const incrementMainQuantity = () => setQuantity((prev) => prev + 1);

  const decrementMainQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  const toggleItem = (id) => {
    setInclude((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const incrementQuantity = (id) => {
    setInclude((prev) =>
      prev.map((item) =>
        item.id === id && item.selected
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrementQuantity = (id) => {
    setInclude((prev) =>
      prev.map((item) =>
        item.id === id && item.selected && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const calculateTotalCost = () => {
    const productCost =
      selectedProduct.sale > 0
        ? (selectedProduct.cost -
            (selectedProduct.cost * selectedProduct.sale) / 100) *
          quantity
        : selectedProduct.cost * quantity;
    const includedCost = included.reduce(
      (total, item) =>
        item.selected ? total + item.price * item.quantity : total,
      0
    );
    return productCost + includedCost;
  };

  const handleAddToCart = async () => {
    if (!selectedProduct) {
      alert("Không có sản phẩm nào được chọn!");
      return;
    }

    const cartItem = {
      food_id: selectedProduct.id, // ID của sản phẩm chính
      food_quantity: quantity, // Số lượng sản phẩm chính
      addon: included
        .filter((item) => item.selected) // Chỉ lấy các addon được chọn
        .map((item) => ({
          addon_id: item.id, // ID của addon
          addon_quantity: item.quantity, // Số lượng của addon
        })),
    };

    console.log(JSON.stringify(cartItem, null, 2));

    const response = await addToCart(cartItem);

    if (response.code === 1000) {
      alert("Thêm vào giỏ hàng thành công!");
    } else {
      alert("Thêm vào giỏ hàng thất bại: " + response.message);
    }

    bottomSheetRef.current?.close();
  };

  const handleFavorPress = (item) => {
    isFavor ? unFavourite(item.id) : addToFavourite(selectedProduct);
    setFavor(!isFavor);
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      onChange={(index) => {
        if (index === -1) {
          setIsExpanded(false); // Đặt lại isExpanded khi BottomSheet đóng
          setInclude([
            {
              id: 1,
              name: "Pepsi",
              price: 10000,
              selected: false,
              quantity: 1,
            },
            {
              id: 2,
              name: "Sting",
              price: 12000,
              selected: false,
              quantity: 1,
            },
          ]);
          setQuantity(1);
        }
      }}
    >
      <BottomSheetView style={styles.contentContainer}>
        {selectedProduct ? (
          <View style={{ flex: 1 }}>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              nestedScrollEnabled={true} // Cho phép cuộn bên trong BottomSheet
              showsVerticalScrollIndicator={true}
              style={{ paddingHorizontal: 10, height: "80%" }}
            >
              {/* Thông tin về món ăn  */}
              <View style={{ flexDirection: "row" }}>
                {/* Hình ảnh sản phẩm  */}
                <Image
                  source={{ uri: selectedProduct.image }}
                  style={styles.productImage}
                />

                {/* Thông tin sản phẩm / */}
                <View
                  style={{
                    width: "55%",
                    maxHeight: 100,
                    paddingHorizontal: 10,
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={styles.txtName}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {selectedProduct.name}
                  </Text>

                  <View style={styles.ReviewContainer}>
                    <Text style={styles.txtStar}>{selectedProduct.star}</Text>
                    <Icon
                      name="star"
                      color="#FA4A0C"
                      size={16}
                      style={styles.iconStar}
                    />
                    <Text style={styles.txtCount}>
                      ({selectedProduct.count_rv})
                    </Text>
                  </View>

                  <View style={styles.CostContainer}>
                    {selectedProduct.sale > 0 ? (
                      <>
                        <Text style={styles.txtCostDaGiam}>
                          {(
                            selectedProduct.cost -
                            (selectedProduct.cost * selectedProduct.sale) / 100
                          ).toLocaleString("vi-VN")}
                          đ
                        </Text>
                        <Text style={styles.txtCost}>
                          {selectedProduct.cost.toLocaleString("vi-VN")}đ
                        </Text>
                      </>
                    ) : (
                      <Text style={styles.txtCostDaGiam}>
                        {selectedProduct.cost.toLocaleString("vi-VN")}đ
                      </Text>
                    )}
                  </View>
                </View>

                {/* Thả tim nè hihi  */}
                <View
                  style={{
                    width: "15%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    style={styles.bgIcon}
                    onPress={() => handleFavorPress(selectedProduct)}
                  >
                    {isFavor ? <Icon name="heart" size={20} color={'#FA4A0C'}/> : <Icon name="heart-o" size={24} color="#ACABAB" /> }
                  </TouchableOpacity>
                </View>
              </View>

              {/* Mô tả  */}
              <View style={styles.descriContainer}>
                <Text style={styles.title}>Mô tả</Text>
                <Text
                  style={[
                    styles.description,
                    !isExpanded && { height: 100, overflow: "hidden" }, // Giới hạn chiều cao khi không mở rộng
                  ]}
                  numberOfLines={isExpanded ? undefined : 5} // Hiện số dòng giới hạn nếu không mở rộng
                >
                  {selectedProduct.description}
                </Text>
                <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
                  <Text style={styles.toggleText}>
                    {isExpanded ? "Thu gọn" : "Xem thêm"}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Kèm theo  */}
              <View
                style={[
                  styles.ktheoContainer,
                  {
                    backgroundColor:
                      included[0].selected || included[1].selected
                        ? "rgba(250, 74, 12, 0.1)"
                        : "rgba(242, 242, 242, 0.6)",
                  },
                ]}
              >
                <View style={styles.titleContainer}>
                  <Text style={styles.titleKtheo}>Kèm theo</Text>
                  <Text style={styles.warning}>*Không bắt buộc</Text>
                </View>

                {included.map((item) => (
                  <View key={item.id} style={{ marginVertical: 10 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{ width: "50%", flexDirection: "row", gap: 5 }}
                      >
                        <TouchableOpacity
                          onPress={() => toggleItem(item.id)}
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Icon
                            name={item.selected ? "check-square" : "square-o"}
                            size={24}
                            color={item.selected ? "#FA4A0C" : null}
                          />
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontSize: 20,
                            color: item.selected ? "#fa4a0c" : "#ACABAB",
                            alignItems: "center",
                          }}
                        >
                          {item.name}
                        </Text>
                      </View>

                      <View
                        style={{
                          width: "50%",
                          flexDirection: "row",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            color: item.selected ? "#fa4a0c" : "#ACABAB",
                          }}
                        >
                          + {item.price.toLocaleString("vi-VN")}đ
                        </Text>

                        {item.selected && (
                          <View style={styles.quantityContainer}>
                            <TouchableOpacity
                              style={styles.quantityButton}
                              onPress={() => decrementQuantity(item.id)}
                            >
                              <Icon5
                                name="minus-circle"
                                color={"#fa4a0c"}
                                size={20}
                              />
                            </TouchableOpacity>

                            <Text style={styles.quantityText}>
                              {item.quantity}
                            </Text>

                            <TouchableOpacity
                              style={styles.quantityButton}
                              onPress={() => incrementQuantity(item.id)}
                            >
                              <Icon5
                                name="plus-circle"
                                color={"#fa4a0c"}
                                size={20}
                              />
                            </TouchableOpacity>
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>

            {/* Tổng tiền  */}
            <View style={styles.footerContainer}>
              <View style={styles.footerCost}>
                <Text style={styles.txtTongTien}>Tổng số tiền</Text>

                <Text style={styles.txtTongTien}>
                  {calculateTotalCost().toLocaleString("vi-VN")}đ
                </Text>
              </View>

              <View style={styles.footerBtn}>
                <View style={styles.quantityProductContainer}>
                  <TouchableOpacity onPress={decrementMainQuantity}>
                    <Icon5 name="minus-circle" color={"#fa4a0c"} size={24} />
                  </TouchableOpacity>

                  <Text style={styles.quantityProduct}>{quantity}</Text>

                  <TouchableOpacity onPress={incrementMainQuantity}>
                    <Icon5 name="plus-circle" color={"#fa4a0c"} size={24} />
                  </TouchableOpacity>
                </View>

                <Button
                  title="Thêm vào giỏ hàng"
                  onPress={handleAddToCart}
                  loading={false}
                  buttonStyle={{
                    backgroundColor: "#fa4a0c",
                    borderRadius: 15,
                  }}
                  containerStyle={{
                    width: 230,
                    marginVertical: 5,
                  }}
                  titleStyle={{
                    fontSize: 18,
                    fontWeight: 600,
                  }}
                />
              </View>
            </View>
          </View>
        ) : (
          <View>
            <Image
              source={require("../assets/loading.gif")} // Đường dẫn tới file GIF
              style={{ width: 100, height: 100 }} // Điều chỉnh kích thước GIF
            />
          </View>
        )}
      </BottomSheetView>
    </BottomSheet>
  );
};

export default BottomSheetComponent;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  productImage: {
    width: "30%",
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
  },
  txtName: {
    width: "98%",
    maxHeight: 50,
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    textAlign: "left",
    display: "flex",
    alignItems: "center",
  },
  ReviewContainer: {
    flexDirection: "row",
    width: "100%",
    gap: 2,
    paddingHorizontal: 2,
  },
  txtStar: {
    fontSize: 12,
    textAlign: "left",
    display: "flex",
    alignItems: "center",
  },
  txtCount: {
    marginLeft: 5,
    color: "#ACABAB",
    fontSize: 12,
    textAlign: "left",
    display: "flex",
    alignItems: "center",
  },
  CostContainer: {
    flexDirection: "row",
    justifyContent: "flex-start", // Tạo khoảng cách giữa hai thành phần
    alignItems: "flex-end", // Căn đáy cho cả hai
    width: "100%",
    paddingHorizontal: 2,
    marginTop: 5,
    gap: 2,
  },
  txtCost: {
    fontSize: 12,
    fontWeight: "400",
    textAlign: "center",
    display: "flex",
    alignSelf: "center",
    justifyContent: "center",
    textAlignVertical: "bottom", // Nội dung nằm sát dưới
    textDecorationLine: "line-through",
    paddingLeft: 5,
  },
  txtCostDaGiam: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fa4a0c",
    textAlign: "center",
    display: "flex",
    width: "auto",
    alignSelf: "center",
    textAlignVertical: "bottom", // Nội dung nằm sát dưới
  },
  bgIcon: {
    borderRadius: 5,
    padding: 5,
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  descriContainer: {
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    paddingVertical: 5,
  },
  description: {
    fontSize: 18,
    fontWeight: "300",
    textAlign: "justify", // Căn đều hai bên
  },
  toggleText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#007BFF",
    marginTop: 5,
    textAlign: "center",
  },
  ktheoContainer: {
    width: "100%",
    borderRadius: 5,
    borderStyle: "solid",
    borderColor: "#acabab",
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleKtheo: {
    fontSize: 18,
    fontWeight: "500",
    height: 30,
    color: "#000",
    textAlign: "left",
    textAlignVertical: "bottom",
    paddingTop: 1,
  },
  warning: {
    fontSize: 16,
    fontWeight: "300",
    height: 30,
    color: "#F40303",
    textAlignVertical: "bottom",
    paddingTop: 2,
  },
  quantityContainer: {
    flexDirection: "row",
    width: "50%",
    justifyContent: "center",
    gap: 6,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 500,
    color: "black",
    textAlign: "center",
    width: 20,
  },
  footerContainer: {
    height: "25%",
    backgroundColor: "#EEEEEE",
    bottom: 0,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 4,
      height: 0,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    padding: 10,
    borderTopWidth: 1,
  },
  footerCost: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  txtTongTien: {
    width: "50%",
    fontSize: 20,
    fontWeight: "bold",
    color: "#fa4a0c",
    display: "flex",
    width: "auto",
    textAlignVertical: "bottom", // Nội dung nằm sát dưới
  },
  footerBtn: {
    flexDirection: "row",
    height: "70%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  quantityProductContainer: {
    flexDirection: "row",
    width: "30%",
    justifyContent: "flex-start",
    gap: 6,
  },
  btnAddCart: {
    width: "70%",
    height: "80%",
    backgroundColor: "#fa4a0c",
    alignContent: "center",
    borderRadius: 10,
  },
  txtAddCart: {
    height: "100%",
    width: "100%",
    borderWidth: 1,
    fontSize: 18,
    fontWeight: 700,
    color: "white",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  quantityProduct: {
    fontSize: 18,
    fontWeight: "bold",
    width: 25,
    height: 25,
    textAlign: "center",
  },
});
