import { useNavigation } from "@react-navigation/native";
import { 
  StyleSheet,
  Text, 
  TouchableOpacity, 
  View, 
  TextInput,
  FlatList,
  Animated,
  ScrollView
} from "react-native";
import React, { useRef, useMemo, useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import ProductCart from "../../components/Home/ProductCard";
import Banner from "../../components/Home/Banner";
import CategoriesCart from "../../components/Home/CategoriesCard";
import { CategoryData } from "../../data/Category";
import BottomSheetComponent from "../../components/BottomSheet";
import axios from "axios";
import { fetchAllTop } from "../../services/api";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [selectedProduct, setSelectedProduct] = useState(null); // Lưu sản phẩm được chọn
  const bottomSheetRef = useRef(null);
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const scrollY = useRef(new Animated.Value(0)).current;
  // Các điểm snap
  const snapPoints = useMemo(() => ["25%", "80%"], []);

  const [scrollProgress, setScrollProgress] = useState(0); // Lưu trạng thái tiến trình cuộn

  useEffect(() => {
    
    const get = async () => {
      
      const res = await fetchAllTop();
      
      if (res){
        setData(res);
        setLoading(false)
      }
      // console.log(res)
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
  

  // Hàm xử lý sự kiện khi cuộn
  const handleScroll = (event) => {
    const contentWidth = event.nativeEvent.contentSize.width; // Chiều rộng nội dung
    const scrollOffset = event.nativeEvent.contentOffset.x; // Vị trí cuộn hiện tại
    const visibleWidth = event.nativeEvent.layoutMeasurement.width; // Chiều rộng vùng hiển thị

    // Tính tỷ lệ cuộn (giá trị giữa 0 và 1)
    const progress = Math.min(scrollOffset / (contentWidth - visibleWidth), 1);
    setScrollProgress(progress);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.viewHeader}>
        <Text style={styles.address}>Khu phố 6, phường Linh Trung</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
          <Icon name="bell" size={27} color="white" />
        </TouchableOpacity>
      </View>

      {/* Thanh Tìm Kiếm Sticky */}
      <Animated.View
        style={[
          styles.containerChild,
          {
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 60], // Thay đổi giá trị phù hợp
                  outputRange: [0, -60],
                  extrapolate: "clamp",
                }),
              },
            ],
          },
        ]}
      >
        <View style={styles.inputContainer}>
          <Icon name="search" size={20} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Bạn đang đói à?"
            placeholderTextColor="#FFA8A8"
          />
        </View>
      </Animated.View>

      <Animated.ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        {/* Banner */}
        <Banner/>

        {/* M đang nghĩ gì */}
        <View style={styles.thinkContainer}>
          <Text style={styles.txtThink}>Bạn đang nghĩ gì?</Text>
          <View style={{ flexDirection: "row", gap: 22, marginTop: 10 }}>
              {CategoryData.map((item) => (
                <TouchableOpacity  key={item.id} 
                  onPress={() => navigation.navigate("Category", {categoryId: item.id, title: item.name})}
                >
                    <CategoriesCart item={item}/>
                </TouchableOpacity>
              ))}
          </View>
        </View>

        {/* Thịnh hành hôm nay */}
        <View style={styles.trendContainer}>
          <View style={{ flexDirection: "row", paddingHorizontal: 10, paddingVertical: 10 }}>
            <Text style={styles.txtTrend}>Thịnh hành hôm nay</Text>
            <TouchableOpacity style={styles.btnMore}>
              <Text style={styles.txtMore}>Xem thêm</Text>
            </TouchableOpacity>
          </View>

          <View>
            <FlatList
              data={data.topSale}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <ProductCart item={item} onSelect={() => handleProductPress(item)} />
              )}
              horizontal
              contentContainerStyle={{ paddingHorizontal: 10 }}
              ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
            />
          </View>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${scrollProgress * 100}%` }]} />
          </View>
        </View>

        {/* Đánh giá cao */}
        <View style={styles.topRVContainer}>
          <View style={{ flexDirection: "row", paddingHorizontal: 10, paddingVertical: 10 }}>
            <Text style={styles.txtTopRV}>Đánh giá cao</Text>
            <TouchableOpacity style={styles.btnMoreTop}>
              <Text style={styles.txtMoreTop}>Xem thêm</Text>
            </TouchableOpacity>
          </View>

          <View>
            <FlatList
              data={data.topRating}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <ProductCart item={item} onSelect={() => handleProductPress(item)} />
              )}
              horizontal
              contentContainerStyle={{ paddingHorizontal: 10 }}
              ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
            />
          </View>
        </View>

        {/* Phổ biến  */}
        <View style={styles.topRVContainer}>
          <View style={{ flexDirection: "row", paddingHorizontal: 10, paddingVertical: 10 }}>
            <Text style={styles.txtTopRV}>Phổ biến</Text>
            <TouchableOpacity style={styles.btnMoreTop}>
              <Text style={styles.txtMoreTop}>Xem thêm</Text>
            </TouchableOpacity>
          </View>

          <View>
            <FlatList
              data={data.topOrder}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                  <ProductCart item={item} onSelect={() => handleProductPress(item)} />
              )}
              horizontal
              contentContainerStyle={{ paddingHorizontal: 10 }}
              ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
            />
          </View>
        </View>

        
      </Animated.ScrollView>

      {/* Bottom Sheet */}
      {selectedProduct && (
              <BottomSheetComponent
              bottomSheetRef={bottomSheetRef}
              snapPoints={snapPoints}
              selectedProduct={selectedProduct}
            />
      )  
      }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    // alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "lightblue",
  },
  viewHeader: {
    width: "100%",
    height: 100,
    backgroundColor: "#fa4a0c",
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 25,
    borderWidth: 1
  },
  address: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
    textAlign: "left"
  },
  containerChild: {
    width: "100%",
    height: 60,
    marginTop: -30,
  },
  txt: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 10
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
    marginHorizontal: 16,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 5,
    elevation: 5,
    shadowOpacity: 0.3,

  },
  input: {
    width: "90%",
    height: 50,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 20,
    color: "#FA4A0C"
  },
  icon: {
    marginLeft: 10,
    width: "8%"
  },
  bannerContainer: {
    width: "100%",
    height: 250,
    borderWidth: 1,
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 10,
    backgroundColor: "blue"
  },
  thinkContainer: {
    width: "100%",
    justifyContent: 'center', // Canh giữa theo trục dọc
    alignItems: 'center', // Canh giữa theo trục ngang
  },
  txtThink:{
    width: "95%", 
    alignSelf: "flex-end",
    fontSize: 20,
    fontWeight: "700",
  },
  trendContainer: {
    width: "100%",
    height: 320,
    backgroundColor: "rgba(255, 189, 115, 0.6)",
    marginVertical: 20,
  },
  txtTrend: {
    width: "70%",
    height: 30,
    fontSize: 20,
    fontWeight: "700",
    color: "#fa4a0c",
    textAlign: "left",
    lineHeight: 30,
  },
  btnMore: {
    width: "30%",
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  txtMore: {
    fontSize: 17,
    height: 30,
    fontWeight: "700",
    color: "black",
    textAlign: "center",
    lineHeight: 30,
    textDecorationLine: "underline"
  },
  progressBarContainer: {
    height: 5, // Chiều cao của thanh tiến trình
    backgroundColor: "#F0F0F0", // Màu nền của thanh
    borderRadius: 2.5,
    overflow: "hidden",
    marginHorizontal: 10, // Lề ngang
    marginTop: 15, 
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#FA4A0C", // Màu của thanh tiến trình
  },
  topRVContainer: {
    width: "100%",
    height: 300,
  },
  txtTopRV: {
    width: "70%",
    height: 30,
    fontSize: 20,
    fontWeight: "700",
    color: "black",
    textAlign: "left",
    lineHeight: 30,
  },
  btnMoreTop: {
    width: "30%",
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  txtMoreTop: {
    fontSize: 17,
    height: 30,
    fontWeight: "700",
    color: "#FA4A0C",
    textAlign: "center",
    lineHeight: 30,
    textDecorationLine: "underline",
  },
});
