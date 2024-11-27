import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function OrderScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>OrderScreen!</Text>

      <TouchableOpacity style={{backgroundColor: 'lightblue'}} onPress={() => navigation.navigate('FollowingOrder')}>
        <Text>Theo doi don hang</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{backgroundColor: 'green'}} onPress={() => navigation.navigate('OrderDetails')}>
        <Text>Chi tiet don hang</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
