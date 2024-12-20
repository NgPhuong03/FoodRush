import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View, FlatList, ScrollView, RefreshControl} from 'react-native';
import Icon5 from "react-native-vector-icons/MaterialCommunityIcons"
import OrderCart from '../../../components/Order/OrderCard';
import { useState, useEffect, useCallback } from 'react';
import { getOrderByUserId } from '../../../services/api';
import { Image } from 'expo-image';

export default function OrderScreen() {
  const navigation = useNavigation();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);


  useFocusEffect(
    useCallback(() => {
      const resetData = async () => {
        const response = await getOrderByUserId();
        if (response) {
            // Lọc đơn hàng theo trạng thái 'dangnau'
            const filteredOrders = response.filter((item) => item.status === 'dangnau');
            
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

  const loadData = async () => {
    setRefreshing(true);
    const response = await getOrderByUserId();
    if (response) {
          // Lọc đơn hàng theo trạng thái 'dangnau'
          const filteredOrders = response.filter((item) => item.status === 'dangnau');
          
          // Sắp xếp theo 'create_at' giảm dần
          const sortedOrders = filteredOrders.sort((a, b) => new Date(b.create_at) - new Date(a.create_at));
          
          setOrder(sortedOrders.length > 0 ? sortedOrders : null);
    } else {
      setOrder(null);
    }
    setRefreshing(false);
    setIsLoading(false)
  };
  
  useEffect(() => {
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
  
    if(!order){
      return(
        <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadData} />
        }
      >
        <Icon5 name="chef-hat" size={50} color={"rgba(250, 74, 12, 0.7)"} />
        <Text style={{ fontSize: 20, fontWeight: "500", marginTop: "5%" }}>
          Không có đơn hàng đang nấu
        </Text>
      </ScrollView>
      );
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
            refreshing={refreshing}
            onRefresh={loadData} // Gọi hàm loadData khi người dùng kéo để làm mới
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
  }

});
