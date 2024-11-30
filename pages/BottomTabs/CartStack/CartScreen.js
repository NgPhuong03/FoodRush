import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function CartScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
            {/* Header  */}
      <View style={styles.headerContainer}>
          <Text style={styles.txtHeader}>Giỏ hàng</Text>
      </View>

      {/* Body  */}
      <ScrollView style={{
        backgroundColor: "lightblue",
        width: "100%",
        flex: 1,
        borderWidth: 1,
        margin: 5,
      }}>

      </ScrollView>

      {/* Footer with Payment Button */}
      <View style={styles.footerContainer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Tổng cộng:</Text>
          <Text style={styles.totalAmount}>1.490.000đ</Text>
        </View>
        <TouchableOpacity
          style={styles.paymentButton}
          onPress={() => navigation.navigate('ToPay')}
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
