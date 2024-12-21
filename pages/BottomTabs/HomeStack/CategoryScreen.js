import React, { useEffect, useState, useRef, useMemo } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { Image } from 'expo-image';
import { fetchByCategory } from "../../../services/api";
import ProductCart from "../../../components/Home/ProductCard";
import BottomSheetComponent from "../../../components/BottomSheet";


export default function CategoryScreen({ route }) {
  const { categoryId, title, item } = route.params; // Nhận ID danh mục từ điều hướng
  const [foodCate, setFoodCate] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null); // Lưu sản phẩm được chọn
  const [isLoading, setIsLoading] = useState(true)
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", "90%"], []);

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

      if(categoryId == 1 || categoryId == 2 || categoryId == 3 || categoryId == 4){
        const res = await fetchByCategory(category);
        if (res){
          setFoodCate(res);
        }
      } else {setFoodCate(item)}


      setIsLoading(false)

    }
    get();
  }, [])

  const handleProductPress = (product) => {
    bottomSheetRef.current?.expand();
    setSelectedProduct(product); // Cập nhật sản phẩm được chọn
  };
  
  // Mở BottomSheet khi selectedProduct thay đổi
  useEffect(() => {
    if (selectedProduct && bottomSheetRef.current) {
      console.log("Selected: ", selectedProduct.name);
    }
  }, [selectedProduct]);
  

  if(isLoading){
    return (
      <View style={{
        width: "full", 
        height: "full", 
        justifyContent: "center",
        alignItems: "center",
        flex: 1
      }}>
        <Image 
          source={require('../../../assets/loading.gif')} 
          style={{height: 100, width: 100}}
          contentFit="contain"
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
        <FlatList 
          data={foodCate}
          // keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
              <ProductCart item={item} onSelect={() => handleProductPress(item)} />
          )}
          // ItemSeparatorComponent={() => <View style={{ height: 10, width:10 }} />}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'center' }} 
        />

      <BottomSheetComponent
        bottomSheetRef={bottomSheetRef}
        snapPoints={snapPoints}
        selectedProduct={selectedProduct}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
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
