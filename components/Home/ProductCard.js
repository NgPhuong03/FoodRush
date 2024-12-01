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

export default function ProductCart({item}){

    return(
        <View style={styles.CartContainer}>
            {/* Thẻ giảm giá */}
            {item.sale > 0 
                ?
                <View style={styles.discountContainer}>
                    <Text style={styles.txtDiscount}>{item.sale}% off</Text>
                </View>
                : null
            }

            <View style={styles.ChildContainer}>
                <Image
                    source={{ uri: item.image }} // Hiển thị ảnh từ URL
                    style={styles.productImage}
                />
                <Text style={styles.txtName} numberOfLines={2} ellipsizeMode="tail">{item.name}</Text>
               
                <View style={styles.ReviewContainer} >
                    <Text style={styles.txtStar}>{item.star}</Text>
                    <Icon name="star" color="#FA4A0C" size={16} style={styles.iconStar}/>
                    <Text style={styles.txtCount}>({item.count_rv})</Text>
                </View>

                <View style={styles.CostContainer} >
                {item.sale > 0 ? (
                        <>
                        <Text style={styles.txtCost}>
                            {item.cost.toLocaleString("vi-VN")}đ
                        </Text>
                        <Text style={styles.txtCostDaGiam}>
                            {(item.cost - (item.cost * item.sale) / 100).toLocaleString("vi-VN")}đ
                        </Text>
                        </>
                    ) : (
                        <Text style={styles.txtCostDaGiam}>
                        {item.cost.toLocaleString("vi-VN")}đ
                        </Text>
                    )}
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    CartContainer: {
        backgroundColor: "white",
        height: 230,
        width: 190,
        borderRadius: 10
    },
    ChildContainer: {
        alignItems: "center",
        padding: 5
    },
    productImage: {
        width: "100%",
        height: 100,
        marginBottom: 10,
        resizeMode: "cover", // Cắt ảnh nếu cần
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    txtName: {
        width: "98%",
        height: 50,
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
        paddingHorizontal: 2
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
        flexDirection: "row",
        justifyContent: "space-between", // Tạo khoảng cách giữa hai thành phần
        alignItems: "flex-end", // Căn đáy cho cả hai
        width: "100%",
        height: 30,
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
        textDecorationLine: "line-through"
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