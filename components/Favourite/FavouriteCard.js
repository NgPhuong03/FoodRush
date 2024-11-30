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

export default function FavouriteCart({item, onAddToCart, onUnLike}){

    return(
        <View style={styles.CartContainer}>
            {/* Thẻ giảm giá */}
            {item.discount > 0 
                ?
                <View style={styles.discountContainer}>
                    <Text style={styles.txtDiscount}>{item.discount}% off</Text>
                </View>
                : null
            }

            <View style={styles.ChildContainer}>
                {/* Hình ảnh sản phẩm  */}
                <Image
                    source={{ uri: item.image }} // Hiển thị ảnh từ URL
                    style={styles.productImage}
                />

                {/* Tên, đánh giá, giá sản phẩm  */}
                <View style={{
                    width: "55%",
                    paddingHorizontal: 10
                }}
                >
                    <Text style={styles.txtName} numberOfLines={2} ellipsizeMode="tail">{item.name}</Text>
                
                    <View style={styles.ReviewContainer} >
                        <Text style={styles.txtStar}>{item.star}</Text>
                        <Icon name="star" color="#FA4A0C" size={16} style={styles.iconStar}/>
                        <Text style={styles.txtCount}>({item.count_rv})</Text>
                    </View>

                    <View style={styles.CostContainer} >
                    {item.discount > 0 ? (
                            <>
                            <Text style={styles.txtCostDaGiam}>
                                {(item.cost - (item.cost * item.discount) / 100).toLocaleString("vi-VN")}đ
                            </Text>                           
                            <Text style={[styles.txtCost, {marginStart: 10}]}>
                                {item.cost.toLocaleString("vi-VN")}đ
                            </Text>
                            </>
                        ) : (
                            <Text style={styles.txtCostDaGiam}>
                            {item.cost.toLocaleString("vi-VN")}đ
                            </Text>
                        )}
                    </View>
                </View>

                <View style={{
                    width: "15%",
                    height: "100%",
                }}>
                    <TouchableOpacity 
                        onPress={onAddToCart}
                        style={{
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: 5
                            }}
                    >
                        <Icon name="cart-plus" size={20} color={'#FA4A0C'}
                            style={{
                                backgroundColor: "rgba(255, 189, 115, 0.5)",
                                padding: 10,
                                borderRadius: 500
                            }}
                        />
                    </TouchableOpacity>                   
                    
                    <TouchableOpacity 
                        onPress={onUnLike}
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 15,
                        }}>
                        <Icon name="heart" size={20} color={'#FA4A0C'}/>
                    </TouchableOpacity>

                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    CartContainer: {
        backgroundColor: "white",
        height: 100,
        width: "100%",
        borderRadius: 10,
        borderWidth: 1,
        marginVertical: 5,
        borderColor: "#ACABAB"
    },
    ChildContainer: {
        alignItems: "center",
        padding: 5,
        flexDirection: "row",
        height: "100%"
    },
    productImage: {
        width: "30%",
        height: "100%",
        resizeMode: "cover", // Cắt ảnh nếu cần
        borderRadius: 10
    },
    txtName: {
        width: "98%",
        height: 45,
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
        flexDirection: "row",
        alignItems: "flex-end", // Căn đáy cho cả hai
        width: "100%",
        height: 30,
        paddingHorizontal: 2,
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