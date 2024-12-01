import React, { useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { fetchByCategory } from "../../../services/api";


export default function CategoryScreen({ route }) {
  const { categoryId, title } = route.params; // Nhận ID danh mục từ điều hướng

  // Lọc sản phẩm theo danh mục (giả định sản phẩm có trường `categoryId`)
  useEffect(() => {
    const get = async () => {
      let category;
      switch (categoryId) {
        case 1:
          category = 'rice';
          break;
        case 2:
          category = 'noodle';
          break;
        case 3:
          category = 'mon40k';
          break;
        default:
          category = 'vegan';
          break;
      }

      const res = await fetchByCategory(category);
      if (res){
        console.log(res);
        
      }

    }
    get();
  }, [])
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
