import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default RenderSearchItem = ({ item, navigation }) => {
  return (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("ProductDetails",{item})}>
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    item: {
        width: '90%',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      name: {
        fontSize: 18,
      },
      age: {
        fontSize: 16,
        color: 'gray',
      },
});