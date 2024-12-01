import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native';
import OrderCart from '../../../components/Order/OrderCard';
import { OrderData } from '../../../data/Order/Order';
import { useState, useEffect } from 'react';


export default function OrderScreen() {
  const navigation = useNavigation();
  const [order, setOrder] = useState([]);

  useEffect(() => {
    // Lọc các đơn hàng có status = 'DangNau'
    const filteredOrders = OrderData.filter((item) => item.status === 'DangNau');
    setOrder(filteredOrders);
  }, []); // Chạy một lần sau khi component được mount

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
