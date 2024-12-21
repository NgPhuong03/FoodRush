import { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';

export default function ListOrderScreen({navigation}) {
  const {LogOut} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text>ListOrderScreen!</Text>
      <TouchableOpacity style={{width: 200,height: 200, backgroundColor: 'green'}} onPress={()=>navigation.navigate('ToMap')}>

      </TouchableOpacity>
      <TouchableOpacity style={{width: 200,height: 200, backgroundColor: 'red'}} onPress={LogOut}>

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
