
import { StyleSheet, Text, View } from 'react-native';

export default function LocationScreen() {
  return (
    <View style={styles.container}>
      <Text>LocationScreen!</Text>
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
