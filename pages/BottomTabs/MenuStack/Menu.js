
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MenuScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>MenuScreen!</Text>

      <TouchableOpacity style={{backgroundColor: 'lightblue'}} onPress={() => navigation.navigate('ToLocation')}>
        <Text>Dia chi cua toi</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{backgroundColor: 'green'}} onPress={() => navigation.navigate('ToProfile')}>
        <Text>Thong tin ca nhan</Text>
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
