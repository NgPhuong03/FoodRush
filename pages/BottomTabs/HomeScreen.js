import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useRef, useMemo } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

export default function HomeScreen() {
  const navigation = useNavigation();

  const bottomSheetRef = useRef(null);

  // Các điểm snap
  const snapPoints = useMemo(() => ["25%", "80%"], []);

  return (
    <View style={styles.container}>
      <Text>HomeScreen!</Text>
      <TouchableOpacity
        style={{ backgroundColor: "red" }}
        onPress={() => navigation.navigate("Notification")}
      >
        <Text>Thong bao</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ backgroundColor: "red" }}
        onPress={() => bottomSheetRef.current?.expand()}
      >
        <Text>Mo ta san pham</Text>
      </TouchableOpacity>
      <BottomSheet 
      ref={bottomSheetRef} 
      index={-1} 
      snapPoints={snapPoints}
      enablePanDownToClose
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "lightblue",
  },
});
