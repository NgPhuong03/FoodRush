import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { OrderData } from '../../../data/Order/Order';
import OrderCart from '../../../components/Order/OrderCard';
import { useState, useEffect } from 'react';

export default function HistoryScreen() {
  const navigation = useNavigation();
  const [order, setOrder] = useState([])


  useEffect(() => {
    // Lọc các đơn hàng có status = 'DangNau'
    const filteredOrders = OrderData.filter((item) => item.status === 'DaGiao');
    setOrder(filteredOrders);
  }, []); // Chạy một lần sau khi component được mount

  return (
    <View style={styles.container}>
      <View style={styles.listOrder}>
          <FlatList 
            data={order}
            keyExtractor={(item) => item.order_id.toString()}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => navigation.navigate('OrderDetails', 
                {
                  order_id: item.order_id,
                  order_id: item.order_id,
                  created_at: item.created_at,
                  paid_at: item.paid_at,
                  paymethod: item.paymethod,
                  dungcu: item.dungcu
                })}>
                <OrderCart 
                  item={item}
                  onFeedBack={null}
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
