import { 
    StyleSheet,
    Text, 
    TouchableOpacity, 
    View, 
    TextInput,
    FlatList,
    Image
  } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function FoodCardInOrder({item}){

    return(
        <View style={styles.CartContainer}>
            {/* Thẻ giảm giá */}
            <View style={styles.ChildContainer}>
                {/* Hình ảnh sản phẩm  */}
                <View style={{alignSelf: "stretch", width: "30%" }}>
                    <Image
                        source={{ uri: item.food.image }} // Hiển thị ảnh từ URL
                        style={styles.productImage}
                    />
                </View>


                {/* Tên, đánh giá, giá sản phẩm  */}
                <View style={{
                    width: "55%",
                    paddingStart: 10,
                }}
                >
                    <Text style={styles.txtName} numberOfLines={1} ellipsizeMode="tail">{item.food.name}</Text>
                
                    <View style={styles.ReviewContainer} >
                        <Text style={styles.txtStar}>{item.food.star}</Text>
                        <Icon name="star" color="#FA4A0C" size={16} style={styles.iconStar}/>
                        <Text style={styles.txtCount}>({item.food.count_rv})</Text>
                    </View>

                    <View style={styles.CostContainer} >
                    {item.food.sale > 0 ? (
                            <>
                            <Text style={styles.txtCost}>
                                {item.food.cost.toLocaleString("vi-VN")}đ
                            </Text>
                            <Text style={styles.txtCostDaGiam}>
                                {(item.food.cost - (item.food.cost * item.food.sale) / 100).toLocaleString("vi-VN")}đ
                            </Text>                           
                            </>
                        ) : (
                            <Text style={styles.txtCostDaGiam}>
                            {item.food.cost.toLocaleString("vi-VN")}đ
                            </Text>
                        )}
                    </View>
                    {/* Kèm theo  */}
                    {item.addon_list && item.addon_list.some(addon => addon.quantity > 0) ? (
                        <View style={{ flexDirection: "row", alignItems: "baseline", height: "auto", width: "auto" }}>
                            <Text style={{ fontSize: 18, fontWeight: "600" }}>
                                Kèm theo:{" "}
                                {item.addon_list.map((addon, index) => 
                                    addon.quantity > 0 ? (
                                        <Text key={index} style={{ fontSize: 16, fontWeight: "450" }}>
                                            {index > 0 && item.addon_list[index - 1].quantity > 0 ? ", " : ""}
                                            {addon?.name.charAt(0).toUpperCase() + addon?.name.slice(1)} ({addon.quantity})
                                        </Text>
                                    ) : null
                                )}
                            </Text>
                        </View>
                    ) : null}

                </View>


                <Text style={{
                    marginLeft: -50,
                    height: "100%",
                    paddingTop: 30,
                    fontSize: 15,
                    fontWeight: "500"
                }}>Số lượng: {item.food_quantity}</Text>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    CartContainer: {
        backgroundColor: "white",
        height: "auto",
        width: "100%",
        borderRadius: 10,
        marginVertical: 5,
        borderWidth: 0.5 ,
        borderColor: "#ACABAB",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2.27,
        elevation: 10, // Dành cho Android
    },
    ChildContainer: {
        alignItems: "center",
        padding: 5,
        flexDirection: "row",
        height: "auto",
    },
    productImage: {
        width: "90%",
        height: 80,
        resizeMode: "cover", // Cắt ảnh nếu cần
        borderRadius: 10
    },
    txtName: {
        width: "98%",
        height: 25,
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
        alignItems: "center"
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
        alignItems: "flex-start", // Căn đáy cho cả hai
        width: "100%",
        height: "auto",
        paddingHorizontal: 2,
    },
    txtCost: {
        fontSize: 12,
        fontWeight: "400",
        textAlign: "left",
        display: "flex",
        alignSelf: "flex-start",
        textAlignVertical: "bottom", // Nội dung nằm sát dưới
        textDecorationLine: "line-through",
        marginTop: 2
    },
    txtCostDaGiam: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fa4a0c",
        textAlign: "left",
        display: "flex",
        alignSelf: "flex-start",
        textAlignVertical: "bottom", // Nội dung nằm sát dưới
    },
    discountContainer: {
        backgroundColor: "#fa4a0c",
        width: "auto",
        position: "absolute",
        zIndex: 1, 
        top: 15,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        flex: 1,
        height: 20,
        justifyContent: "center"
    },
    txtDiscount: {
        color: "white",
        fontSize: 13,
        width: "auto",
        paddingLeft: 10,
        paddingRight: 5,
        fontWeight: "500"
    }
})

