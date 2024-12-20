import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function ProductDetailsScreen({ route, navigation }) {
  const { item } = route.params;
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imgContainer}>
          <Image source={{ uri: item.image }} style={styles.img} />
        </View>
        <View style={styles.content}>
          <View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.mota}>Mô tả</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imgContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 12,
    borderWidth: 1,
  },
  img: {
    width: "90%",
    height: 320,
    resizeMode: "contain",
  },
  content: {
    flex: 2,
    padding: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FA4A0C",
  },
  description: {
    fontSize: 16,
    fontWeight: 400,
  },
  mota: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 12,
  },
});
