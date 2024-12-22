import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { OrderFollowingData } from '../../../data/Order/OrderFollowing';
import FoodCardInOrder from '../../../components/Order/FoodCardInOrder';
import AddressCard from '../../../components/Cart/AddressCard';
import { getOrderDetailById } from '../../../services/api';

export default function OrderDetailsScreen({route}) {
  const {order_id} = route.params;
  const [orderDetail, setOrderDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
      const loadData = async () => {
        const response = await getOrderDetailById(order_id);
        console.log(response)
        setOrderDetail(response)
        setIsLoading(false)
      }
      loadData()
  }, []); // Chạy một lần sau khi component được mount

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  const calculateTotalAmount = (orderList) => {
    let totalAmount = 0;
  
    orderList.forEach((item) => {
      // Tính tiền món chính
      const foodCost = item.food.cost * item.food_quantity;
  
      // Tính tiền addon (nếu có)
      const addonCost = item.addon_list
        ? item.addon_list.reduce((sum, addon) => sum + addon.price * addon.quantity, 0)
        : 0;
  
      // Cộng tổng tiền món chính và addon vào tổng
      totalAmount += foodCost + addonCost;
    });
  
    return totalAmount;
  }


      if(isLoading){
        return(
          <View style={styles.container}>
            <View style={{
              width: "full", 
              height: "full", 
              justifyContent: "center",
              alignItems: "center",
              flex: 1
            }}>
              <Image 
                source={require('../../../assets/loading.gif')} 
                style={{height: 100, width: 100}}
                contentFit="contain"
              />
            </View>
          </View>
    
        )
      }
    


  return (
    <ScrollView style={styles.container}>
      <View style={styles.mapContainer}>
        <Image 
          source={require("../../../assets/logo.png")} 
          style={styles.img}
        />
      </View>


      <View style={styles.infoContainer}>
          <Text style={styles.title}>Thông tin chung</Text>

          <View style={{flexDirection: "row", paddingVertical: 5}}>
            <Text style={styles.txtLeft}>Mã đơn hàng: #{order_id}</Text>
            <Text style={styles.txtRight}>
              <Icon name='clock' size={18} color={"black"}/>
              &nbsp;{orderDetail?.create_at ? formatDate(orderDetail.create_at) : "N/A"}     
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
                    {orderDetail?.paymethod ? "Chuyển khoản" : "COD"}
                  </Text>
            </View>
          </View>

          <View style={{flexDirection: "row", paddingVertical: 5}}>
            <Text style={styles.txtLeft}>Số lượng món ăn: {orderDetail.list.length} </Text>
            <Text style={styles.txtRight}>
              Đã giao {formatDate(orderDetail.paid_at)} 
            </Text>
          </View>
     
      </View>

      <View style={styles.listFood}>
            <Text style={styles.title}>Thông tin món ăn</Text>
            {orderDetail.list.map((item, index) => (
                <FoodCardInOrder key={index} item={item} />
            ))}
      </View>

      <View style={[styles.noteContainer, {marginBottom: 10}]}>
        <Text style={styles.title}>Ghi chú:</Text>
        <Text style={styles.txtNote}>{orderDetail.note}</Text>
      </View>

      <View style={{paddingHorizontal: 10}}>
        <AddressCard isPay={false} userInOrderHistory={orderDetail.address}/>
      </View>

      <View style={[styles.noteContainer, {marginBottom: 30}]}>
          <Text style={styles.title}>Chi tiết đơn hàng:</Text>
          <View style={{width: "100%", height: 1, backgroundColor: "black", paddingHorizontal: 20}}></View>

          <View style={{flexDirection: "row", paddingVertical: 10}}>
            <Text style={{width: "50%", fontSize: 16, textAlign: "left"}}>Tổng cộng</Text>
            <Text style={{width: "50%", fontSize: 16, textAlign: "right"}}>
              {/* {calculateTotalAmount(order).toLocaleString('vi-VN')}đ */}
              {calculateTotalAmount(orderDetail.list).toLocaleString('vi-VN')}đ
            </Text>
          </View>


          <View style={{flexDirection: "row", paddingBottom: 10}}>
            <Text style={{width: "50%", fontSize: 16, textAlign: "left"}}>Phí vận chuyển</Text>
            <Text style={{width: "50%", fontSize: 16, textAlign: "right"}}>
              {(orderDetail.cost - calculateTotalAmount(orderDetail.list) ).toLocaleString('vi-VN')}đ
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
    flex:1,
    backgroundColor: "#fff",
    alignContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  img: {
    width: 150,
    height: 100,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#FA4A0C",
  },
  infoContainer: {
    width: "100%",
    height: "auto",
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  txtLeft:{
    width:"45%",
    fontSize: 15,
  },
  txtRight: {
    width: "55%", 
    textAlign: "right",
    fontSize: 15, 
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
  },
  title: {
    fontSize: 18, 
    fontWeight: "600"
  },
  txtNote: {
    paddingBottom: 10,
    paddingTop: 5
  }

});