import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Circle, Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import SearchAddress from "../../components/LocationMap/SearchAddress";
import polyline from "@mapbox/polyline";
import IconMater from "react-native-vector-icons/MaterialIcons";
import { addMap } from "../../services/api";


export default function AddMap() {
  const FOOD_RUSH_LOCATION = {
    latitude: 10.882245102818498,
    longitude: 106.78249876263239,
    latitudeDelta: 0.040545,
    longitudeDelta: 0.11545,
  };

  const apiKey = "GKkG446Pg4YiEAnnW6z15pGzLALuh1WSBShBZBOW";
  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [khoangcach, setDistance] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [canPress, setPress] = useState(false);
  const [duongdi, setDuongdi] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [isTyping, setTyping] = useState(false);
  const [isFocus, setFocus] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      const x = location.coords;
      setUserLocation({
        latitude: x.latitude,
        longitude: x.longitude,
      });

      console.log(x);

      const origin = x.latitude + "," + x.longitude;
      const url =
        "https://rsapi.goong.io/direction?origin=" +
        origin +
        "&destination=10.882245102818498,106.78249876263239&vehicle=car&api_key=GKkG446Pg4YiEAnnW6z15pGzLALuh1WSBShBZBOW";
      const response = await fetch(url);

      if (response) {
        const data = await response.json();
        const encoded = data.routes[0].overview_polyline.points;
        const distance = data.routes[0].legs[0].distance.value;
        const coordinates = polyline
          .decode(encoded)
          .map(([latitude, longitude]) => ({ latitude, longitude }));

        console.log("Directed");
        setDistance(distance);
        setDuongdi(coordinates);
        
      }
      setLoading(false);
    };

    getLocation();
  }, []);

  const direction = async (lat, long) => {
    const origin = lat + "," + long;
    const url =
      `https://rsapi.goong.io/direction?origin=` +
      origin +
      "&destination=10.882245102818498,106.78249876263239&vehicle=car&api_key=GKkG446Pg4YiEAnnW6z15pGzLALuh1WSBShBZBOW";

    try {
      setLoading(true);

      const response = await fetch(url);

      if (response) {
        const data = await response.json();

        const encoded = data.routes[0].overview_polyline.points;
        const coordinates = polyline
          .decode(encoded)
          .map(([latitude, longitude]) => ({ latitude, longitude }));
        const distance = data.routes[0].legs[0].distance.value;

        setDistance(distance);
        setDuongdi(coordinates);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching direction:", error);
    }
  };

  const ChangeUserLocation = (latitude, longitude) => {
    setUserLocation({ latitude: latitude, longitude: longitude });
    // setDiachi({
    //   latitude: latitude,
    //   longitude: longitude,
    // });
  };

  const handlePress = async (event) => {
    setLoading(true);
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setUserLocation({ latitude: latitude, longitude: longitude });
    direction(latitude, longitude);
  };

  const PopUp = async () => {
    if (khoangcach > 10000) {
      Alert.alert("Vượt quá 10km", "Vui lòng chọn lại địa chỉ");
    } else {
      var address = "";
      const url =
        "https://rsapi.goong.io/geocode?latlng=" +
        userLocation.latitude +
        "," +
        userLocation.longitude +
        "&api_key=GKkG446Pg4YiEAnnW6z15pGzLALuh1WSBShBZBOW";
      const response = await axios.get(url);
      if (response) {
        address = response.data.results[0].formatted_address;
      }

      const DIACHI = {
        address: address,
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        type: 'default',
        title: 'Tieu de'
      };

      const res = await addMap(DIACHI);
      if (res){
        navigation.navigate("Location");
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // Màn hình được focus

      setFocus(true);
      // console.log("Screen is focused");

      return () => {
        // Màn hình bị unfocus
        setFocus(false);
        // console.log("Screen is unfocused");
      };
    }, [])
  );
  if (isFocus) {
    return (
      <View style={styles.container}>
        {isLoading && (
          <View>
            <Text>Lan dau nen hoi lau, doi xiuuu nhaaa!</Text>
          </View>
        )}

        {!isLoading && (
          <MapView
            style={styles.map}
            initialRegion={FOOD_RUSH_LOCATION}
            onPress={canPress ? handlePress : null}
            scrollEnabled={isTyping ? false : true}
          >
            <Marker
              coordinate={{
                latitude: FOOD_RUSH_LOCATION.latitude,
                longitude: FOOD_RUSH_LOCATION.longitude,
              }}
              title="Vị trí của bạn"
              description="Đây là một mô tả"
            >
              <Image
                source={require("../../assets/logo.png")}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 32,
                  resizeMode: "center",
                }}
              />
            </Marker>

            <Marker
              coordinate={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
              }}
              title="Vị trí của bạn"
              description="Đây là một mô tả"
            >
              <Image
                source={require("../../assets/jack.png")}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 32,
                  resizeMode: "center",
                }}
              />
            </Marker>

            <Polyline
              coordinates={duongdi}
              strokeColor="#FA4A0C" // Màu của đường
              strokeWidth={6} // Độ dày của đường
            />
            {/* <Circle
              center={{
                latitude: FOOD_RUSH_LOCATION.latitude,
                longitude: FOOD_RUSH_LOCATION.longitude,
              }}
              radius={7000} // Bán kính 15km
              strokeColor="rgba(0, 0, 255, 0.5)"
              fillColor="rgba(0, 0, 255, 0.1)"
            /> */}
          </MapView>
        )}

        {!isLoading && (
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => {
              setPress(!canPress);
            }}
          >
            { !canPress ? <IconMater name="touch-app" size={24} /> : <IconMater name="cancel" size={24}/>}
          </TouchableOpacity>
        )}
        {!isLoading && (
          <SearchAddress
            Direction={direction}
            setUserLocation={ChangeUserLocation}
            setTyping={setTyping}
          />
        )}
        {!isLoading && (
          <TouchableOpacity style={styles.saveBtn} onPress={PopUp}>
            <Text style={styles.saveText}>Lưu địa chỉ</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  } else {
    return;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    flex: 1,
  },
  saveBtn: {
    width: "90%",
    height: "10%",
    position: "absolute",
    bottom: 32,
    backgroundColor: "#FA4A0C",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  saveText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
  },
  editBtn: {
    margin: 4,
    width: "13%",
    height: 52,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    bottom: "20%",
    right: 20,
    zIndex: 5,
  },
});
