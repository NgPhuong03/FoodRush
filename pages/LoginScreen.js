import { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';

export default function LoginScreen() {
  const {LogIn} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text>LoginScreen!</Text>
      <TouchableOpacity onPress={LogIn}>
        <Text>Dang nhap</Text>
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
