import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { OrderFollowingData } from '../../../data/Order/OrderFollowing';
import FoodCardInOrder from '../../../components/Order/FoodCardInOrder';
import AddressCard from '../../../components/Cart/AddressCard';

export default function FollowingOrder({route}) {
  const {order_id, created_at, paymethod, dungcu} = route.params;
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const filteredOrders = OrderFollowingData.filter((item) => item.order_id === order_id);
    setOrder(filteredOrders);
  }, []); // Chạy một lần sau khi component được mount

  const formatDate = (dateString) => {
    const [datePart, timePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('-');
    const [hours, minutes] = timePart.split(':');

    return `${parseInt(day)} thg${parseInt(month)} ${year} ${hours}:${minutes}`;
  };

  const calculateTotalAmount = (cart) => {
    return cart.reduce((total, item) => {

      // Tổng tiền cho sản phẩm chính
      const mainProductTotal = item.quantity * item.cost * (1 - item.discount / 100);
      
      // Tổng tiền cho Pepsi (nếu có)
      const pepsiTotal = item.addons.pepsi.quantity > 0 
        ? item.addons.pepsi.quantity * item.addons.pepsi.cost_pepsi 
        : 0;
  
      // Tổng tiền cho Sting (nếu có)
      const stingTotal = item.addons.sting.quantity > 0 
        ? item.addons.sting.quantity * item.addons.sting.cost_sting 
        : 0;
  
      // Cộng tất cả vào tổng tiền
      return total + mainProductTotal + pepsiTotal + stingTotal;

    }, 0); // Bắt đầu từ 0
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.mapContainer}>
        <Image 
          source={{ uri: "https://thanhnien.mediacdn.vn/Uploaded/trungnq/2022_10_29/1-2829.jpg"}} 
          style={styles.img}
        />
        <Text style={styles.txtUnderMap}>Đơn hàng của bạn sẽ được giao trong vòng 10-15 phút</Text>
      </View>


      <View style={styles.infoContainer}>
          <Text style={{fontSize: 18, fontWeight: "600"}}>Thông tin chung</Text>

          <View style={{flexDirection: "row", paddingVertical: 5}}>
            <Text style={styles.txtLeft}>Mã đơn hàng: #{order_id}</Text>
            <Text style={styles.txtRight}>
              <Icon name='clock' size={18} color={"black"}/>
              &nbsp;{formatDate(created_at)}      
            </Text>
          </View>

          <View style={{
            flexDirection: "row", 
            paddingVertical: 5, 
            justifyContent: "space-between",
          }}>
            <Text style={styles.txtLeft}>Phương thức thanh toán</Text>
            <View style={[styles.statusContainer, {alignSelf: "flex-start",backgroundColor: "rgba(250, 74, 12, 0.2)"}]}>
                  <Text style={[styles.txtStatus, { color: "#FA4A0C"}]}>
                    {paymethod ? "Chuyển khoản" : "COD"}
                  </Text>
            </View>
          </View>

          <View style={{flexDirection: "row", paddingVertical: 5}}>
            <Text style={styles.txtLeft}>Số lượng món ăn: {order.length} </Text>
            <Text style={styles.txtRight}>
              Đang giao  
            </Text>
          </View>

          
          <View style={{flexDirection: "row", paddingVertical: 5}}>
            <Text style={styles.txtLeft}>Dụng cụ ăn uống</Text>
            <Text style={styles.txtRight}>
              {dungcu ? "Có" : "Không"}  
            </Text>
          </View>       
      </View>

      <View style={styles.listFood}>
            <Text style={{fontSize: 18, fontWeight: "600"}}>Thông tin món ăn</Text>
            {order.map((item, index) => (
                <FoodCardInOrder key={index} item={item} />
            ))}
      </View>

      <View style={{paddingHorizontal: 10}}>
        <AddressCard isPay={false}/>
      </View>

      <View style={styles.noteContainer}>
          <Text style={{fontSize: 18, fontWeight: "600"}}>Chi tiết đơn hàng:</Text>
          <View style={{width: "100%", height: 1, backgroundColor: "black", paddingHorizontal: 20}}></View>

          <View style={{flexDirection: "row", paddingVertical: 10}}>
            <Text style={{width: "50%", fontSize: 16, textAlign: "left"}}>Tổng cộng</Text>
            <Text style={{width: "50%", fontSize: 16, textAlign: "right"}}>
              {calculateTotalAmount(order).toLocaleString('vi-VN')}đ
            </Text>
          </View>


          <View style={{flexDirection: "row", paddingBottom: 10}}>
            <Text style={{width: "50%", fontSize: 16, textAlign: "left"}}>Phí vận chuyển</Text>
            <Text style={{width: "50%", fontSize: 16, textAlign: "right"}}>
              {(50000).toLocaleString('vi-VN')}đ
            </Text>
          </View>
        
        </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  mapContainer: {
    width: "100%",
    height: "auto",
    padding: 10,
    alignContent: "center",
    alignItems: "center"
  },
  img: {
    width: "100%",
    height: 200,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#FA4A0C"
  },
  txtUnderMap: {
    textAlign: "center",
    width: "80%",
    fontSize: 16,
    fontWeight: "500",
    paddingTop: 5
  },
  infoContainer: {
    width: "100%",
    height: "auto",
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  txtLeft:{
    width:"50%",
    fontSize: 15,
  },
  txtRight: {
    width: "50%", 
    textAlign: "right",
    fontSize: 15
  },
  statusContainer: {
    width: "40%",
    justifyContent: "center",
    borderRadius: 5,
  },
  txtStatus: {
      width: "100%",
      textAlign: "center",
      fontSize: 15,
      fontWeight: "600",
  },
  listFood: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  noteContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "black",
    shadowOffset: {
    width: 0,
    height: 2
    },
    shadowRadius: 5,
    elevation: 5,
    shadowOpacity: 0.3,
    paddingTop: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginBottom: 30
  }

});
