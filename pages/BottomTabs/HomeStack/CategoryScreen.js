import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { CategoryData } from "../../../data/Category";


export default function CategoryScreen({ route }) {
  const { categoryId, title } = route.params; // Nhận ID danh mục từ điều hướng

  // Lọc sản phẩm theo danh mục (giả định sản phẩm có trường `categoryId`)

  return (
    <View style={styles.container}>
        <Text>CategoryId: {categoryId}</Text>
        <Text>CategoryName: {title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  list: {
    paddingBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "gray",
  },
});
