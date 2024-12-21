import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";
import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useContext,
} from "react";
import { Image } from "expo-image";
import Icon5 from "react-native-vector-icons/FontAwesome5";
import BottomSheetComponent from "../../components/BottomSheet";
import FavouriteCart from "../../components/Favourite/FavouriteCard";
import { getFavorites, deleteFavorite } from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";

export default function FavoritesScreen() {
  const navigation = useNavigation();
  const { favorites, unFavourite } = useContext(AuthContext);
  const [favourite, setFavourite] = useState(null);
  const [selectedCartProduct, setSelectedCartProduct] = useState(); // Lưu sản phẩm được chọn
  const snapPoints = useMemo(() => ["25%", "80%"], []);
  const bottomSheetRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const handleProductPress = (item) => {
    setSelectedCartProduct(item); // Cập nhật sản phẩm được chọn
    bottomSheetRef.current?.expand(); // Mở BottomSheet
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const loadData = async () => {
    setRefreshing(true);
    const response = await getFavorites();
    if (response) {
      const sortedData = response.result.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setFavourite(sortedData.length > 0 ? sortedData : null);
    } else {
      setFavourite(null);
    }
    setIsLoading(false);
    setRefreshing(false);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View View style={styles.headerContainer}>
          <Text style={styles.txtHeader}>Yêu thích</Text>
        </View>
        <View
          style={{
            width: "full",
            height: "full",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Image
            source={require("../../assets/loading.gif")}
            style={{ height: 100, width: 100 }}
            contentFit="contain"
          />
        </View>
      </View>
    );
  }

  if (!favorites) {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.txtHeader}>Yêu thích</Text>
        </View>
        <Icon5
          name="heart-broken"
          size={50}
          color={"rgba(250, 74, 12, 0.7)"}
          style={{ marginTop: "25%" }}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "500",
            marginTop: "5%",
          }}
        >
          Không có sản phẩm yêu thích
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header  */}
      <View style={styles.headerContainer}>
        <Text style={styles.txtHeader}>Yêu thích</Text>
      </View>

      <View style={styles.listProduct}>
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <FavouriteCart
              item={item}
              onAddToCart={() => handleProductPress(item)}
              onUnLike={() => unFavourite(item.id)}
            />
          )}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          refreshing={refreshing}
          onRefresh={loadData} // Gọi hàm loadData khi người dùng kéo để làm mới
        />
      </View>

      <BottomSheetComponent
        bottomSheetRef={bottomSheetRef}
        snapPoints={snapPoints} // Các điểm dừng của Bottom Sheet
        selectedProduct={selectedCartProduct} // Truyền sản phẩm được chọn
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
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
      height: 2,
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
  },
});
