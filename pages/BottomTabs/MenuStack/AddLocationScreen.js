import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";

export default function AddLocationScreen() {
  const FOOD_RUSH_LOCATION = {
    latitude: 10.882245102818498,
    longitude: 106.78249876263239,
    latitudeDelta: 0.14545,
    longitudeDelta: 0.14545,
  };

  const [isFocus, setFocus] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      // Màn hình được focus
      setFocus(true)
      console.log("Screen is focused");

      return () => {
        // Màn hình bị unfocus
        setFocus(false);
        console.log("Screen is unfocused");
      };
    }, [])
  );
  if (isFocus) {
    return (
      <View style={styles.container}>
        <MapView style={styles.map} initialRegion={FOOD_RUSH_LOCATION}>
          <Marker
            coordinate={{
              latitude: FOOD_RUSH_LOCATION.latitude,
              longitude: FOOD_RUSH_LOCATION.longitude,
            }}
            title="Vị trí của bạn"
            description="Đây là một mô tả"
          >
            <Image
              source={require("../../../assets/logo.png")}
              style={{
                width: 32,
                height: 32,
                borderRadius: 32,
                resizeMode: 'center',
              }}
            />
          </Marker>
          <Circle
            center={{
              latitude: FOOD_RUSH_LOCATION.latitude,
              longitude: FOOD_RUSH_LOCATION.longitude,
            }}
            radius={7000} // Bán kính 15km
            strokeColor="rgba(0, 0, 255, 0.5)"
            fillColor="rgba(0, 0, 255, 0.1)"
          />
        </MapView>
      </View>
    );
  } else {
    return ;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    width: "100%",
    height: "40%",
  },
  loadingMap: {
    opacity: 0,
  },
});
