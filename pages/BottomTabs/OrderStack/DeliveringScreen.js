import { StyleSheet, Text, View } from 'react-native';

export default function DeliveringScreen() {
  return (
    <View style={styles.container}>
      <Text>DeliveringScreen!</Text>
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
