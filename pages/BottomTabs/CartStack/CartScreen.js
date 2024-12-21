import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, ScrollView, RefreshControl } from 'react-native';
import FoodCardInCart from '../../../components/Cart/FoodCardInCart';
import Icon5 from "react-native-vector-icons/MaterialIcons"
import { useState, useEffect, useCallback } from 'react';
import { Image } from 'expo-image';
import { getCartByUserId, deleteCart } from '../../../services/api';

export default function CartScreen() {
  const navigation = useNavigation();
  const [cart, setCart] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

    useFocusEffect(
      useCallback(() => {
        const resetData = async () => {
          const response = await getCartByUserId();
          if (response) {
            setCart(response.length > 0 ? response : null);
          } else {
            setCart(null);
          }

        };
        resetData();
        setIsLoading(false);
  
      }, [])
    );

  const loadData = async () => {
    setRefreshing(true);
    const response = await getCartByUserId();
    if (response && response.length > 0) {
      setCart(response);
    } else {
      setCart(null);
    }
    setRefreshing(false);
    setIsLoading(false)
  };
  
  useEffect(() => {
    loadData()
    // const interval = setInterval(() => {
    //   loadData();
    // }, 1000); 
    // return () => clearInterval(interval); 
  },[])

  const handleIncreaseQuantity = (id) => {
    console.log("Đang gọi tăng")
    setCart(prevCart =>
      prevCart.map(item =>
        item.cart_id === id 
          ? { ...item, food_quantity: item.food_quantity + 1 } //Sao chép toàn bộ thuộc tính của item hiện tại và tăng số lượng lên 1
          : item
      )
    );
    console.log("Đã gọi tăng")
  };
  
  const handleDecreaseQuantity = (id) => {
    console.log("Đang gọi giảm")
    setCart(prevCart =>
      prevCart.map(item =>
        item.cart_id === id && item.food_quantity > 1
          ? { ...item, food_quantity: item.food_quantity - 1 }
          : item
      )
    );
    console.log("Đã gọi giảm")
  };
  
  const handleRemove = async (id) => {
    try {
      // Gọi API xóa sản phẩm
      await deleteCart(id);
  
      // Cập nhật lại danh sách giỏ hàng trong state
        setCart((prevCart) => {
            const updatedCart = prevCart.filter((item) => item.cart_id !== id);
            if (updatedCart.length === 0) {
                // Nếu giỏ hàng trống, gọi loadData để reload
                loadData();
            }
            return updatedCart;
        });

      console.log(`Đã xóa sản phẩm có ID: ${id}`);
    } catch (error) {
      console.error(`Lỗi khi xóa sản phẩm có ID: ${id}`, error);
    }
  };
  

  const calculateTotalAmount = (cart) => {
    return cart.reduce((total, item) => {
      // Tổng tiền món chính
      const mainProductTotal = item.food.cost * item.food_quantity;
  
      // Tổng tiền addons
      const addonsTotal = item.addonList.reduce(
        (addonSum, addon) => addonSum + addon.price * addon.quantity,
        0
      );
  
      // Tổng tiền cho từng sản phẩm trong giỏ hàng
      const itemTotal = mainProductTotal + addonsTotal;
  
      // Cộng tổng tiền sản phẩm vào tổng tiền của giỏ hàng
      return total + itemTotal;
    }, 0); // Bắt đầu từ 0
  };
  
  if(isLoading){
      return(
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.txtHeader}>Giỏ hàng</Text>
         </View>
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

    if(!cart){
      return(
        <View style={styles.container}>
            <View style={styles.headerContainer}>
              <Text style={styles.txtHeader}>Giỏ hàng</Text>
          </View>
          <ScrollView
            contentContainerStyle={{flexDirection: "column", alignItems: "center"}}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={loadData} />
            }
          >

            <Icon5 name="add-shopping-cart" size={50} color={"rgba(250, 74, 12, 0.7)"} style={{marginTop: "25%"}}/>
            <Text style={{ fontSize: 20, fontWeight: "500", marginTop: "5%" }}>
              Không có sản phẩm trong giỏ hàng
            </Text>
          </ScrollView>
        </View>

      );
    }

  return (
    <View style={styles.container}>
            {/* Header  */}
      <View style={styles.headerContainer}>
          <Text style={styles.txtHeader}>Giỏ hàng</Text>
      </View>

      {/* Body  */}
      <View style={{
        // backgroundColor: "white",
        width: "100%",
        flex: 1,
        margin: 5,
      }}>
        <FlatList 
          data={cart}
          keyExtractor={(item) => item.cart_id.toString()}
          renderItem={({item}) => (
            <FoodCardInCart
              item={item}
              onIncrease={() => handleIncreaseQuantity(item.cart_id)}
              onDecrease={() => handleDecreaseQuantity(item.cart_id)}
              onRemove={() => handleRemove(item.cart_id)}
            />

          )}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          refreshing={refreshing}
          onRefresh={loadData} // Gọi hàm loadData khi người dùng kéo để làm mới
        />
      </View>

      {/* Footer with Payment Button */}
      <View style={styles.footerContainer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Tổng cộng:</Text>
          <Text style={styles.totalAmount}>
            {calculateTotalAmount(cart).toLocaleString('vi-VN')}đ
           
          </Text>
        </View>
        <TouchableOpacity
          style={styles.paymentButton}
          onPress={() => navigation.navigate('ToPay', {cart: cart, TongTien: calculateTotalAmount(cart)})}
        >
          <Text style={styles.paymentText}>Thanh toán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
  },
  headerContainer: {
    width: "100%",
    height: "10%",
    backgroundColor: "#fff",
    alignContent: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 5,
    elevation: 5,
    shadowOpacity: 0.3,
  },
  txtHeader: {
    width: "auto",
    fontSize: 25,
    fontWeight: "700",
    color: "#FA4A0C",
    textAlign: "center",
  },
  footerContainer: {
    height: '18%',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  totalLabel: {
    fontSize: 18,
    color: '#000',
    fontWeight: '500',
  },
  totalAmount: {
    fontSize: 18,
    color: '#FA4A0C',
    fontWeight: '700',
  },
  paymentButton: {
    backgroundColor: '#FA4A0C',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  paymentText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
  },
  bodyText: {
    height: 100
  }
});
