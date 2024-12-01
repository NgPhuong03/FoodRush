import { useNavigation } from '@react-navigation/native';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { CartData } from '../../../data/Cart/Cart';
import FoodCardInCart from '../../../components/Cart/FoodCardInCart';
import { useState } from 'react';

export default function CartScreen() {
  const navigation = useNavigation();
  const [cart, setCart] = useState(CartData);

  const handleIncreaseQuantity = (id) => {
    console.log("Đang gọi tăng")
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id 
          ? { ...item, quantity: item.quantity + 1 } //Sao chép toàn bộ thuộc tính của item hiện tại và tăng số lượng lên 1
          : item
      )
    );
    console.log("Đã gọi tăng")
  };
  
  const handleDecreaseQuantity = (id) => {
    console.log("Đang gọi giảm")
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
    console.log("Đã gọi giảm")
  };
  
  const handleRemove = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id != id))
  }

  const calculateTotalAmount = (cart) => {
    return cart.reduce((total, item) => {

      // Tổng tiền cho sản phẩm chính
      const mainProductTotal = item.quantity * item.cost * (1 - item.discount / 100);
      
      // Tổng tiền cho Pepsi (nếu có)
      const pepsiTotal = item.addons.pepsi.isHave 
        ? item.addons.pepsi.quantity * item.addons.pepsi.cost_pepsi 
        : 0;
  
      // Tổng tiền cho Sting (nếu có)
      const stingTotal = item.addons.sting.isHave 
        ? item.addons.sting.quantity * item.addons.sting.cost_sting 
        : 0;
  
      // Cộng tất cả vào tổng tiền
      return total + mainProductTotal + pepsiTotal + stingTotal;

    }, 0); // Bắt đầu từ 0
  };
  

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
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <FoodCardInCart
              item={item}
              onIncrease={() => handleIncreaseQuantity(item.id)}
              onDecrease={() => handleDecreaseQuantity(item.id)}
              onRemove={() => handleRemove(item.id)}
            />

          )}
          contentContainerStyle={{ paddingHorizontal: 10 }}
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
          onPress={() => navigation.navigate('ToPay',{totalAmount: calculateTotalAmount(cart)} )}
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
