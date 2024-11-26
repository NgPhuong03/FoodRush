
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../../../contexts/AuthContext';

export default function MenuScreen() {
  const navigation = useNavigation();
  const {LogOut} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text>MenuScreen!</Text>

      <TouchableOpacity style={{backgroundColor: 'lightblue'}} onPress={() => navigation.navigate('ToLocation')}>
        <Text>Dia chi cua toi</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{backgroundColor: 'green'}} onPress={() => navigation.navigate('ToProfile')}>
        <Text>Thong tin ca nhan</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{backgroundColor: 'orange'}} onPress={LogOut}>
        <Text>Dang xuat</Text>
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
