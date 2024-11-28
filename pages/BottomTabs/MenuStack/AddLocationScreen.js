import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import AddMap from "../../../components/LocationMap/AddMap";
import * as Location from "expo-location";

export default function AddLocationScreen() {

  return(
    <View style={styles.container}>
      
      <AddMap/>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  search: {
    width: '100%',
    height: '10%',
    backgroundColor: "#fff",
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    width: "96%"
  },
});
