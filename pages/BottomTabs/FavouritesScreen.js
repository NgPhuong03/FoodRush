import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';
import React, { useRef, useMemo, useState } from "react";
import BottomSheetComponent from '../../components/BottomSheet';
import FavouriteCart from '../../components/Favourite/FavouriteCart';
import { FavouriteData } from '../../data/Favourite/Favourite';
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

export default function FavoritesScreen() {
  const [selectedProduct, setSelectedProduct] = useState(null); // Lưu sản phẩm được chọn
  const snapPoints = useMemo(() => ["25%", "80%"], []);
  const bottomSheetRef = useRef(null);

  const handleProductPress = (item) => {
    setSelectedProduct(item); // Cập nhật sản phẩm được chọn
    bottomSheetRef.current?.expand(); // Mở BottomSheet
  };

  return (
    <View style={styles.container}>
      {/* Header  */}
      <View style={styles.headerContainer}>
          <Text style={styles.txtHeader}>Yêu thích</Text>
      </View>

      <View style={styles.listProduct}>
          <FlatList 
            data={FavouriteData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
              <TouchableOpacity>
                <FavouriteCart 
                  item={item} 
                  onAddToCart={() => handleProductPress(item)}
                />
              </TouchableOpacity>
            )}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          />
      </View>

      <BottomSheetComponent
        bottomSheetRef={bottomSheetRef}
        snapPoints={snapPoints} // Các điểm dừng của Bottom Sheet
        selectedProduct={selectedProduct} // Truyền sản phẩm được chọn
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
  },
  headerContainer: {
    width: "100%",
    height: "10%",
    backgroundColor: "#fff",
    alignContent: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 5,
    elevation: 5,
    shadowOpacity: 0.3,
  },
  txtHeader: {
    width: "auto",
    fontSize: 25,
    fontWeight: "700",
    color: "#FA4A0C",
    textAlign: "center",
  },
  listProduct: {
    width: "100%",
    height: "85%",
    marginVertical: 10,
  }
});
