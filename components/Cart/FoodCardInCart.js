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

export default function FoodCardInCart({item, onIncrease, onDecrease, onRemove}){

    return(
        <View style={styles.CartContainer}>
            {/* Thẻ giảm giá */}
            {item.food.sale > 0 
                ?
                <View style={styles.discountContainer}>
                    <Text style={styles.txtDiscount}>{item.food.sale}% off</Text>
                </View>
                : null
            }

            <View style={styles.ChildContainer}>
                {/* Hình ảnh sản phẩm  */}
                <View style={{alignSelf: "stretch", width: "25%" }}>
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
                    <Text style={styles.txtName} numberOfLines={2} ellipsizeMode="tail">{item.food.name}</Text>
                
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
                    {item.addonList && item.addonList.some(addon => addon.quantity > 0) ? (
                        <View style={{ flexDirection: "row", alignItems: "baseline", height: "auto", width: "auto" }}>
                            <Text style={{ fontSize: 18, fontWeight: "600" }}>
                                Kèm theo:{" "}
                                {item.addonList.map((addon, index) => 
                                    addon.quantity > 0 ? (
                                        <Text key={index} style={{ fontSize: 16, fontWeight: "450" }}>
                                            {index > 0 && item.addonList[index - 1].quantity > 0 ? ", " : ""}
                                            {addon.name.charAt(0).toUpperCase() + addon.name.slice(1)} ({addon.quantity})
                                        </Text>
                                    ) : null
                                )}
                            </Text>
                        </View>
                    ) : null}
                </View>

                {/* Icon bên phải cùng  */}
                <View style={{
                    width: "20%",
                    height: "70%",
                    
                    marginLeft: -10,
                }}>
                    <View style={{flexDirection: "row"}}>
                        <TouchableOpacity 
                            onPress={onDecrease}
                            style={{
                                    justifyContent: "center",
                                    alignItems: "center",

                                }}
                        >
                            <Icon name="minus-circle" size={24} color={'#FA4A0C'}  />
                        </TouchableOpacity> 

                        <Text style={{
                            marginHorizontal: 10,
                            fontSize: 16,
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            {item.food_quantity}
                        </Text>

                        <TouchableOpacity 
                            onPress={onIncrease}
                            style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                        >
                            <Icon name="plus-circle" size={24} color={'#FA4A0C'}  />
                        </TouchableOpacity> 
                    </View>
                  
                    
                    <TouchableOpacity 
                        onPress={onRemove}
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 20,
                        }}>
                        <Icon name="trash" size={24} color="black"/>
                    </TouchableOpacity>
                </View>
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
    },
    ChildContainer: {
        alignItems: "center",
        padding: 5,
        flexDirection: "row",
        height: "auto",
    },
    productImage: {
        width: "100%",
        height: 100,
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