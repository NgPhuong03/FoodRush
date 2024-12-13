import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import polyline from "@mapbox/polyline";
import { getShipperLocation, getUserLocation } from "../../services/api";
import axios from "axios";

export default FollowingShipper = ({ order_id }) => {
  const [duongdi, setDuongdi] = useState(null);
  const [isFocus, setFocus] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState({
    latitude: 10.870437589665649,
    longitude: 106.80213743671948,
  });
  const [shipperLocation, setShipperLocation] = useState({
    latitude: 10.882245102818498,
    longitude: 106.78249876263239,
  });

  const mapRef = useRef(null);

  const GetShipperLocation = async (order_id) => {
    const res = await getShipperLocation(order_id);
    console.log(res);

    setShipperLocation({
      latitude: res.latitude,
      longitude: res.longitude,
    });
  };

  const GetUserLocation = async (order_id) => {
    const res = await getUserLocation(order_id);
    setUserLocation({
      latitude: res.latitude,
      longitude: res.longitude,
    });
  };
 useEffect(() => {
  direction();
  let camera = {
    center: {
      latitude: shipperLocation.latitude,
      longitude: shipperLocation.longitude,
    },
    zoom: 500,
    heading: 0,
    pitch: 0,
    altitude: 1000,
  };
  if (mapRef.current) {
    
    mapRef.current.animateCamera(camera, { duration: 1000 });
  }
  setLoading(false);
 },[shipperLocation]);

 const direction = async () => {
     const url =
       "https://rsapi.goong.io/direction?origin=" +
       shipperLocation.latitude + "," + shipperLocation.longitude +
       "&destination=" + userLocation.latitude +"," + userLocation.longitude + "&vehicle=car&api_key=GKkG446Pg4YiEAnnW6z15pGzLALuh1WSBShBZBOW";
 
     try {
       const response = await axios.get(url);
       const data = response.data;
       if (data) {
         const encoded = data.routes[0].overview_polyline.points;
         const coordinates = polyline
           .decode(encoded)
           .map(([latitude, longitude]) => ({ latitude, longitude }));

           console.log('decode ',coordinates);
           
         setDuongdi(coordinates);
       }
     } catch (error) {
       console.error("Error fetching direction:", error);
     }
   };

  useFocusEffect(
    React.useCallback(() => {
      setFocus(true);
      GetUserLocation(1);
      GetShipperLocation(1);
      const interval = setInterval(() => {
        GetShipperLocation(1);
      }, 10000);

      return () => {
        clearInterval(interval);
        setFocus(false);
      };
    }, [])
  );

  if (isFocus) {
    return isLoading ? (
      <View></View>
    ) : (
      <MapView
        ref={mapRef}
        style={styles.container}
        initialRegion={{
          latitude: (userLocation.latitude + shipperLocation.latitude) / 2,
          longitude: (userLocation.longitude + shipperLocation.longitude) / 2,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={shipperLocation}
          title="Vị trí của bạn"
          description="Đây là một mô tả"
        >
          <Image
            source={require("../../assets/shipper.png")}
            style={{
              width: 32,
              height: 32,
              borderRadius: 32,
              resizeMode: "center",
            }}
          />
        </Marker>
        {duongdi && <Polyline
              coordinates={duongdi}
              strokeColor="#FA4A0C" // Màu của đường
              strokeWidth={6} // Độ dày của đường
            />}
        <Marker
          coordinate={userLocation}
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
      </MapView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
