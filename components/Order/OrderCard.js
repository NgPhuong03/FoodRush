import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome6";


export default function OrderCart({item, onFollow, onFeedBack}) {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
      
        return `${day}/${month}/${year} ${hours}:${minutes}`;
      }
    
    const formatStatus = (status) => {
        switch (status) {
            case "choxacnhan":
                return "Chờ Xác nhận";
            case "dangnau":
                return "Đang nấu";  
            case "danggiao":
                return "Đang giao";        
            case "dagiao":
                return "Đã giao";      
            default: 
                return "null";
        }
    }
    
    if(item.status === 'dangnau'){
        return (
            <View style={styles.container}>
                <Image  source={require('../../assets/logo.png')} style={styles.img}/>

                <View style={{width: "45%", paddingLeft: 5, justifyContent: "center"}}>
                    <Text style={styles.txtOrderID}>
                        Mã đơn hàng: #{item.order_id}
                    </Text>
                    <Text style={styles.txtDate}>
                        {formatDate(item.create_at)}
                    </Text>
                    <Text style={styles.txtCost}>{(item.cost).toLocaleString('vi-VN')}đ</Text>
                </View>

                <View style={{width: "35%", paddingRight: 5}}>
                    <View style={[styles.statusContainer, {backgroundColor: "rgba(151, 71, 255, 0.2)",}]}>
                        <Text style={[styles.txtStatus, { color: "#9747FF"}]}>{formatStatus(item.status)}</Text>
                    </View>

                </View>
            </View>
        )
    }


    if(item.status === 'danggiao'){
        return (
            <View style={styles.container}>
                <Image  source={require('../../assets/logo.png')} style={styles.img}/>

                <View style={{width: "45%", paddingLeft: 5, justifyContent: "center"}}>
                    <Text style={styles.txtOrderID}>
                        Mã đơn hàng: #{item.order_id}
                    </Text>
                    <Text style={styles.txtDate}>
                        {formatDate(item.create_at)}
                    </Text>
                    <Text style={styles.txtCost}>{(item.cost).toLocaleString('vi-VN')}đ</Text>
                </View>

                <View style={{width: "35%", paddingRight: 5}}>
                    <View style={[styles.statusContainer, {backgroundColor: "rgba(250, 74, 12, 0.2)"}]}>
                        <Text style={[styles.txtStatus, { color: "#FA4A0C"}]}>{formatStatus(item.status)}</Text>
                    </View>

                    <TouchableOpacity 
                        onPress={onFollow}
                        style={{height: "50%", justifyContent: "center", marginTop: 10}}
                    >
                        <View 
                            style={{
                                flexDirection: "row", 
                                borderWidth: 1, 
                                borderColor: "#FA4A0C",
                                borderRadius: 10,
                                paddingHorizontal: 5,
                                paddingVertical: 5,
                                alignContent:"center"
                            }}>
                            <Icon name="truck-fast" size={20} color={'#FA4A0C'} />
                            <Text style={{
                                color: "#FA4A0C",
                                paddingLeft: 5,
                                fontSize: 15
                            }}>
                                Theo dõi
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>       
            </View>
        )
    }

    if(item.status === 'dagiao'){
        return (
            <View style={styles.container}>
                <Image  source={require('../../assets/logo.png')} style={styles.img}/>

                <View style={{width: "45%", paddingLeft: 5, justifyContent: "center"}}>
                    <Text style={styles.txtOrderID}>
                        Mã đơn hàng: #{item.order_id}
                    </Text>
                    <Text style={styles.txtDate}>
                        {formatDate(item.create_at)}
                    </Text>
                    <Text style={styles.txtCost}>{(item.cost).toLocaleString('vi-VN')}đ</Text>
                </View>

                <View style={{width: "35%", paddingRight: 5}}>
                    <View style={[styles.statusContainer, {backgroundColor: "rgba(2, 159, 46, 0.2)"}]}>
                        <Text style={[styles.txtStatus, { color: "#029f2e"}]}>{formatStatus(item.status)}</Text>
                    </View>

                    <TouchableOpacity 
                        onPress={onFeedBack}
                        style={{height: "50%", justifyContent: "center", marginTop: 10}}
                    >
                        <View 
                            style={{
                                flexDirection: "row", 
                                borderWidth: 1, 
                                borderColor: "#FA4A0C",
                                borderRadius: 10,
                                paddingHorizontal: 5,
                                paddingVertical: 5,
                                alignContent:"center"
                            }}>
                            <Icon name="star" size={20} color={'#FA4A0C'} />
                            <Text style={{
                                color: "#FA4A0C",
                                paddingLeft: 5,
                                fontSize: 15
                            }}>
                                Đánh giá
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>       
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        with: "100%",
        height: 120,
        backgroundColor: "#fff",
        borderWidth: 1,
        flexDirection: "row",
        paddingHorizontal: 10,
        marginTop: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5.27,
        elevation: 10, // Dành cho Android
    },
    img: {
        height: 80,
        width: 80,
        borderWidth: 1,
        alignSelf: "center",
        borderRadius: 10,
        borderColor: "#FA4A0C"
    },
    txtOrderID: {
        fontSize: 17,
        fontWeight: "600"
    },
    txtDate: {
        fontSize: 14,
        fontWeight: "400",
        color: "#ACABAB",
        paddingVertical: 3
    },
    txtCost: {
        fontSize: 22,
        fontWeight: "600",
        color: "#FA4A0C"
    },
    statusContainer: {
        paddingVertical: 3,
        justifyContent: "center",
        borderRadius: 5,
        marginTop: 20
    },
    txtStatus: {
        width: "100%",
        textAlign: "center",
        fontSize: 15,
        fontWeight: "600",
    }
})