import { View, StyleSheet, Text } from "react-native"
import { Image } from "expo-image"
import Icon from 'react-native-vector-icons/FontAwesome'
import RatingComponent from "./RatingComponent"


export default function FoodCardInReview({item, onRatingChange, initialRating }) {
    return (
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
                    width: "40%",
                    height: "100%",
                    paddingStart: 5,
                    flexDirection: "column",
                    gap: 5
                }}
                >
                    <Text style={styles.txtName} numberOfLines={2} ellipsizeMode="tail">{item.food.name}</Text>
                
                    <View style={styles.ReviewContainer} >
                        <Text style={styles.txtStar}>{item.food.star}</Text>
                        <Icon name="star" color="#FA4A0C" size={18} style={styles.iconStar}/>
                        <Text style={styles.txtCount}>({item.food.count_rv})</Text>
                    </View>
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
            </View>

            <View style={{borderWidth: 0.5, borderColor: "black", marginHorizontal: 10}}></View>

            {/* Thêm phần đánh giá */}
            <View style={styles.DanhGiaContainer}>
                <Text style={styles.txtDanhGia}>Chất lượng đồ ăn</Text>
                <RatingComponent
                    initialRating={initialRating} // Giá trị sao mặc định
                    onRatingChange={(rating) => onRatingChange(item.food.id, rating)}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    CartContainer: {
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
        backgroundColor: "white",
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
        fontSize: 20,
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
        fontSize: 15,
        textAlign: "left",
        display: "flex",
        alignItems: "center"
    },
    txtCount: {
        marginLeft: 5,
        color: "#ACABAB",
        fontSize: 15,
        textAlign: "left",
        display: "flex",
        alignItems: "center",
    },
    CostContainer: {
        alignItems: "flex-start", // Căn đáy cho cả hai
        width: "30%",
        height: "auto",
        paddingHorizontal: 2,
    },
    txtCost: {
        fontSize: 13,
        fontWeight: "400",
        textAlign: "left",
        display: "flex",
        alignSelf: "flex-start",
        textAlignVertical: "bottom", // Nội dung nằm sát dưới
        textDecorationLine: "line-through",
        marginTop: 2
    },
    txtCostDaGiam: {
        fontSize: 22,
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
    },
    DanhGiaContainer: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    txtDanhGia: {
        fontSize: 18,
        fontWeight: "600"
    }
})