import React from "react";
import { StyleSheet, Text, View } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const BottomSheetComponent = ({ bottomSheetRef, snapPoints, selectedProduct }) => {
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
    >
      <BottomSheetView style={styles.contentContainer}>
        {selectedProduct ? (
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {selectedProduct.name}
          </Text>
        ) : (
          <Text>Không có sản phẩm nào được chọn</Text>
        )}
      </BottomSheetView>
    </BottomSheet>
  );
};

export default BottomSheetComponent;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "lightblue",
  },
});
