import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native';
import Icon5 from "react-native-vector-icons/MaterialCommunityIcons"
import OrderCart from '../../../components/Order/OrderCard';
import { useState, useEffect } from 'react';
import { getOrderByUserId } from '../../../services/api';
import { Image } from 'expo-image';

export default function OrderScreen() {
  const navigation = useNavigation();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const response = await getOrderByUserId();
      if (response) {
        // Lọc các đơn hàng có status = "dagiao"
        const filteredOrders = response.filter((item) => item.status === 'dangnau');
        console.log(filteredOrders)
        setOrder(filteredOrders);
      } else {setOrder(null)}
      setIsLoading(false)
    }
    loadData()
  },[])

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
  
    if(order){
      return(
        <View style={styles.container}>
          <Icon5 name="chef-hat" size={50} color={"rgba(250, 74, 12, 0.7)"} style={{marginTop: "25%"}}/>
          <Text style={{
            fontSize: 20,
            fontWeight: "500",
            marginTop: "5%"
          }}>Không có đơn hàng đang nấu</Text>
        </View>
      )
    }

  return (
    <View style={styles.container}>
      <View style={styles.listOrder}>
          <FlatList 
            data={order}
            keyExtractor={(item) => item.order_id.toString()}
            renderItem={({item}) => (
              <TouchableOpacity>
                <OrderCart 
                  item={item}
                  onFollow={() => navigation.navigate('FollowingOrder', {order_id: item.order_id})}
                />
              </TouchableOpacity>
            )}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listOrder: {
    width: "100%",
    height: "95%",
    borderWidth: 1,
  }

});
