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
            {item.discount > 0 
                ?
                <View style={styles.discountContainer}>
                    <Text style={styles.txtDiscount}>{item.discount}% off</Text>
                </View>
                : null
            }

            <View style={styles.ChildContainer}>
                {/* Hình ảnh sản phẩm  */}
                <View style={{alignSelf: "stretch", width: "25%" }}>
                    <Image
                        source={{ uri: item.image }} // Hiển thị ảnh từ URL
                        style={styles.productImage}
                    />
                </View>


                {/* Tên, đánh giá, giá sản phẩm  */}
                <View style={{
                    width: "55%",
                    paddingStart: 10,
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
                            <Text style={styles.txtCost}>
                                {item.cost.toLocaleString("vi-VN")}đ
                            </Text>
                            <Text style={styles.txtCostDaGiam}>
                                {(item.cost - (item.cost * item.discount) / 100).toLocaleString("vi-VN")}đ
                            </Text>                           
                            </>
                        ) : (
                            <Text style={styles.txtCostDaGiam}>
                            {item.cost.toLocaleString("vi-VN")}đ
                            </Text>
                        )}
                    </View>

                    {/* Kèm theo  */}
                    {item.addons.pepsi.quantity > 0 || item.addons.sting.quantity > 0 
                        ? (
                        <View style={{flexDirection: "row", alignItems: "baseline", height: "auto", width: "auto"}}>
                            <Text style={{fontSize: 18, fontWeight:"600"}}>Kèm theo:{" "}
                            {/* Kiểm tra có pepsi không  */}
                            {item.addons.pepsi.quantity > 0 
                                ?  ( 
                                <Text style={{fontSize: 16, fontWeight: "450"}}>
                                    Pepsi
                                    ({item.addons.pepsi.quantity})
                                </Text> 
                                )
                                : null
                            }
                            {/* Kiểm tra có sting không  */}
                            {item.addons.sting.quantity > 0
                                ?  ( 
                                <Text style={{fontSize: 16, fontWeight: "450"}}>
                                    {/* Nếu có sting thì kiểm tra tiếp trước nó pepsi không để có thể thêm dấu phẩy đúng format  */}
                                    {item.addons.pepsi.quantity > 0
                                        ?  ( 
                                        <Text style={{fontSize: 16, fontWeight: "450"}}>
                                            , Sting ({item.addons.sting.quantity})
                                        </Text> 
                                        )
                                        : ( 
                                        <Text style={{fontSize: 16, fontWeight: "450"}}>
                                            Sting ({item.addons.sting.quantity})
                                        </Text> 
                                        )
                                    }
    
                                </Text> 
                                )
                                : null
                            }   
                            </Text>
                        </View>
                        )
                        : null
                    }
                </View>

                {/* Icon bên phải cùng  */}
                <View style={{
                    width: "20%",
                    height: "100%",
                    paddingTop: 50,
                    marginLeft: -10
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
                            {item.quantity}
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