import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CartScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>CartScreen!</Text>

      <TouchableOpacity style={{backgroundColor: 'green'}} onPress={() => navigation.navigate('ToPay')}>
        <Text>Thanh toan </Text>
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
