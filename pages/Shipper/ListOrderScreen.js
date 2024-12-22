import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Alert } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
import OrderCartInShipper from "../../components/Shipper/OrderCardInShipper";
import { useState, useEffect, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { changeStatusDangGiao, getOrderByShipper } from "../../services/api";

export default function ListOrderScreen({ orderStatus }) {
  const navigation = useNavigation();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);  
  const [onGoing, setOnGoing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const resetData = async () => {
        const response = await getOrderByShipper();
        if (response) {
          // Lọc đơn hàng theo trạng thái 'dangnau'
          const filteredOrders = response.filter((item) => item.status === orderStatus);
          
          // Sắp xếp theo 'create_at' giảm dần
          const sortedOrders = filteredOrders.sort((a, b) => new Date(b.create_at) - new Date(a.create_at));
          
          setOrder(sortedOrders.length > 0 ? sortedOrders : null);
          if (response.find(e => e.status === 'danggiao')){
            setOnGoing(true);
          } else {
            setOnGoing(false);
          }
          
        } else {
          setOrder(null);
        }

      };
      resetData();
      setIsLoading(false);

    }, [])
  );

  const hanldeStatusPress = async (id) => {
    if (onGoing){
      Alert.alert('LOI');
    } else {
      await changeStatusDangGiao(id);
      setOnGoing(true);
      navigation.navigate("Đang giao");
    }
  }

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
                    onFollow={hanldeStatusPress}
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
