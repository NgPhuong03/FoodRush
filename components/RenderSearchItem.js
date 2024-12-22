import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default RenderSearchItem = ({ item, navigation }) => {

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {navigation.navigate("ProductDetails", { item })}}
    >
      <View style={styles.contentContainer}>
        <Image source={{ uri: item.image }} style={styles.img} />
        <View>
            <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
            {item.sale > 0 ? (
                 <>
                 <Text style={styles.txtCostDaGiam}>
                    {(item.cost - (item.cost * item.sale) / 100).toLocaleString("vi-VN")}đ
                 </Text>
                </>
                        ) : (
                 <Text style={styles.txtCostDaGiam}>
                 {item.cost.toLocaleString("vi-VN")}đ
                 </Text>
             )}
        </View>

      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    width: "100%",
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
    fontWeight: "500"
  },
  age: {
    fontSize: 16,
    color: "gray",
  },
  img: {
    width: 60,
    height: 60,
    resizeMode: "cover",
  },
  txtCostDaGiam: {
    paddingHorizontal: 24,
    fontSize: 18,
    color: "#fa4a0c",
    fontWeight: "600"
  }
});
