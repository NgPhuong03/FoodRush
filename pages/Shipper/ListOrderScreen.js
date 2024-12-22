import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
import OrderCartInShipper from "../../components/Shipper/OrderCardInShipper";
import { getOrderByUserIdTestShipper } from "../../services/api";
import { useState, useEffect, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function ListOrderScreen({ orderStatus }) {
  const navigation = useNavigation();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);  

  useFocusEffect(
    useCallback(() => {
      const resetData = async () => {
        const response = await getOrderByUserIdTestShipper();
        if (response) {
          // Lọc đơn hàng theo trạng thái 'dangnau'
          const filteredOrders = response.filter((item) => item.status === orderStatus);
          
          // Sắp xếp theo 'create_at' giảm dần
          const sortedOrders = filteredOrders.sort((a, b) => new Date(b.create_at) - new Date(a.create_at));
          
          setOrder(sortedOrders.length > 0 ? sortedOrders : null);
        } else {
          setOrder(null);
        }

      };
      resetData();
      setIsLoading(false);

    }, [])
  );

  if(isLoading) return null;

  return (
    <View style={styles.container}>
        <View style={styles.listOrder}>
            <FlatList 
              data={order}
              keyExtractor={(item) => item.order_id.toString()}
              renderItem={({item}) => (
                  <OrderCartInShipper 
                    item={item}
                  />
              )}
              contentContainerStyle={{ paddingHorizontal: 10 }}
              refreshing={refreshing}
            />
        </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  listOrder: {
    width: "100%",
  }
});
