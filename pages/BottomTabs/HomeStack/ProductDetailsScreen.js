import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo, useRef, useContext, useState } from "react";
import {  ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "@rneui/themed";
import BottomSheetComponent from "../../../components/BottomSheet";
import { AuthContext } from "../../../contexts/AuthContext";

export default function ProductDetailsScreen({ route, navigation }) {
  const { item } = route.params;
  const bottomSheetRef = useRef(null);
  const { favorites, addToFavourite , unFavourite} = useContext(AuthContext);
  const [isFavor, setFavor] = useState(false);
  const snapPoints = useMemo(() => ["25%", "80%"], []);

  useEffect(() => {
    if(favorites){
      setFavor(favorites.some((obj) => item?.id === obj.id));
    }
  },[favorites])

  const handleOpenBottomSheet = () => {
      bottomSheetRef.current?.expand();
  };

  const handleFavorPress = (items) => {
    isFavor ? unFavourite(items.id) : addToFavourite(item);
    setFavor(!isFavor);
  }


  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Thẻ giảm giá */}
        {item.sale > 0 
            ?
              <View style={styles.discountContainer}>
                  <Text style={styles.txtDiscount}>{item.sale}% off</Text>
              </View>
            : null
        }       
        <View style={styles.imgContainer}>
          <Image source={{ uri: item.image }} style={styles.img} />
        </View>
    

        <View style={{flexDirection: "row"}}>
            <View style={{width: "60%" ,paddingHorizontal: 10}}>
              <View style={styles.CostContainer} >
              {item.sale > 0 ? (
                      <>
                      <Text style={styles.txtCostDaGiam}>
                          {(item.cost - (item.cost * item.sale) / 100).toLocaleString("vi-VN")}đ
                      </Text>
                      <Text style={styles.txtCost}>
                          {item.cost.toLocaleString("vi-VN")}đ
                      </Text>

                      </>
                  ) : (
                      <Text style={styles.txtCostDaGiam}>
                                  {item.cost.toLocaleString("vi-VN")}đ
                      </Text>
                  )}
              </View>

              <View style={styles.ReviewContainer} >
                  <Text style={styles.txtStar}>{item.star}</Text>
                  <Icon name="star" color="#FA4A0C" size={24} style={styles.iconStar}/>
                  <Text style={styles.txtCount}>({item.count_rv})</Text>
              </View>
            </View>
                    {/* Thả tim nè hihi  */}
            <View
                      style={{
                        width: "35%",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <TouchableOpacity
                        style={styles.bgIcon}
                        onPress={() => handleFavorPress(item)}
                      >
                        {isFavor ? <Icon name="heart" size={30} color={'#FA4A0C'}/> : <Icon name="heart-o" size={30} color="#ACABAB" /> }
                      </TouchableOpacity>
            </View>
        </View>




        <View style={styles.content}>
          <View>
            <Text style={styles.name}>{item.name}</Text>

            <View>
              <Button
                title="Thêm vào giỏ hàng"
                onPress={handleOpenBottomSheet}
                loading={false}
                buttonStyle={{
                  backgroundColor: "white",
                  borderRadius: 15,
                  borderColor: "#fa4a0c",
                  borderWidth: 1
                }}
                containerStyle={{
                  width: "100%",
                  marginTop: 15,
                }}
                titleStyle={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#fa4a0c"
                }}
                icon={{
                  name: "add-shopping-cart",
                  color: "#fa4a0c",
                  size: 25,
                  type: "materialicons"
                }}
              />
            </View>

            <Text style={styles.mota}>Mô tả</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
      </ScrollView>

      <BottomSheetComponent 
            bottomSheetRef={bottomSheetRef}
            snapPoints={snapPoints}
            selectedProduct={item}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imgContainer: {
    width: "100%",
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1
  },
  img: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
  },
  content: {
    flex: 2,
    padding: 12,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
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
  discountContainer: {
    backgroundColor: "#fa4a0c",
    width: "auto",
    position: "absolute",
    zIndex: 1, 
    top: 15,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    flex: 1,
    height: 30,
    justifyContent: "center",
    paddingEnd: 5
},
txtDiscount: {
    color: "white",
    fontSize: 20,
    width: "auto",
    paddingLeft: 10,
    paddingRight: 5,
    fontWeight: "500"
},
ReviewContainer: {
  flexDirection: "row",
  width: "100%",
  gap: 2,
  paddingHorizontal: 2,
  justifyContent: "flex-start",
  alignItems: "flex-end",
  marginTop: 8
},
txtStar: {
  fontSize: 18,
  textAlign: "left",
  display: "flex",
  alignItems: "center"
},
txtCount: {
  marginLeft: 5,
  color: "#ACABAB",
  fontSize: 18,
  textAlign: "left",
  display: "flex",
  alignItems: "center",
},
CostContainer: {
  flexDirection: "row",
  alignItems: "flex-end", // Căn đáy cho cả hai
  width: "100%",
  height: 30,
  paddingHorizontal: 2,
  marginTop: 5,
  gap: 2,
},
txtCost: {
  fontSize: 18,
  height: 25,
  fontWeight: "400",
  textAlign: "left",
  textDecorationLine: "line-through",
  alignSelf: "flex-end",
},
txtCostDaGiam: {
  color: "#fa4a0c",
  fontSize: 27,
  fontWeight: "bold",
  textAlign: "center",

},
bgIcon: {
  borderRadius: 5,
  padding: 5,
  width: 45,
  height: 45,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(250, 74, 12, 0.15)"
},
});
