import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AddressCard from '../../../components/Cart/AddressCard';
import PayMethodCard from '../../../components/Cart/PayMethodCard';

export default function PayScreen({route}) {
  const {totalAmount} = route.params;
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={{
        width: "100%",
        flex: 1,
        margin: 5,
        paddingHorizontal: 10,
        gap: 5
      }}>
        <AddressCard/>
        <PayMethodCard/>


      </View>


      <View style={styles.footerContainer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Tổng cộng:</Text>
          <Text style={styles.totalAmount}>
            {(totalAmount).toLocaleString('vi-VN')}đ
          </Text>
        </View>
        <TouchableOpacity
          style={styles.paymentButton}
        >
          <Text style={styles.paymentText}>Đặt hàng</Text>
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
  footerContainer: {
    height: '20%',
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
