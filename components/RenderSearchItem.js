import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default RenderSearchItem = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate("ProductDetails", { item })}
    >
      <View style={styles.contentContainer}>
        <Image source={{ uri: item.image }} style={styles.img} />
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    width: "90%",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  contentContainer: {
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    paddingHorizontal: 24,
    fontSize: 18,
  },
  age: {
    fontSize: 16,
    color: "gray",
  },
  img: {
    width: 40,
    height: 40,
    resizeMode: "cover",
  },
});
