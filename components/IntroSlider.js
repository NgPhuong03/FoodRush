import React, { useState } from "react";
import { StyleSheet, View, Text, Image, Dimensions, ImageBackground } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

const slides = [
  {
    key: "slide1",
    title: "Chào mừng!",
    text: "Khám phá ứng dụng đặt món ăn nhanh chóng và tiện lợi.",
    image: require("../assets/slider1.png"),
    backgroundImage: require("../assets/bg-slider1.png"),
  },
  {
    key: "slide2",
    title: "Giao hàng nhanh chóng",
    text: "Chúng tôi giao hàng đến nơi trong thời gian ngắn nhất.",
    image: require("../assets/slider2.png"),
    backgroundImage: require("../assets/bg-slider2.png"),
  },
  {
    key: "slide3",
    title: "Ưu đãi hấp dẫn",
    text: "Nhận những ưu đãi đặc biệt mỗi ngày!",
    image: require("../assets/slider3.png"),
    backgroundImage: require("../assets/bg-slider3.png"),
  },
];

const IntroSlider = ({ onDone }) => {
    const renderItem = ({ item }) => (
      <ImageBackground 
        source={item.backgroundImage} 
        style={styles.background} 
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>{item.title}</Text>
          <Image source={item.image} style={styles.image} />
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </ImageBackground>
    );
    
  return (
    <AppIntroSlider 
      renderItem={renderItem} 
      data={slides} 
      onDone={onDone} 
    />
  );
};

const styles = StyleSheet.create({
    background: {
        width: Dimensions.get("window").width, // Chiều rộng full màn hình
        height: Dimensions.get("window").height, // Chiều cao full màn hình
    },
    overlay: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Tạo hiệu ứng overlay tối trên nền
      padding: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: "800",
      color: "#fff",
      textAlign: "center",
      marginBottom: 20,
    },
    text: {
      fontSize: 18,
      color: "#fff",
      textAlign: "center",
    },
    image: {
      width: Dimensions.get("window").width * 0.8,
      height: 300,
      resizeMode: "contain",
      marginVertical: 30,
    },
  });

export default IntroSlider;
