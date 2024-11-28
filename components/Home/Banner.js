import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Animated } from 'react-native';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

const bannerData = [
    {
        image: require("../../assets/banner1.jpg")
    },
    {
        image: require("../../assets/banner2.jpg")
    },
    {
        image: require("../../assets/banner3.jpg")
    },
];

const Banner = () => {

    return (
        <View style={{
            width: "100%",
            height: 220

        }}>
            <Swiper
                loop
                autoplay
                autoplayTimeout={3}
                containerStyle={styles.swiperContainer}
                dot={<View style={styles.dot} />} 
                activeDot={<View style={styles.activeDot} />}
            >
                {bannerData.map((item, index) => (
                <View key={index} style={styles.slide}>
                    {/* <Image source={{ uri: item.image }} style={styles.image} /> */}
                      <Image source={item.image } style={styles.image} />
                </View>
                ))}
            </Swiper>
                    
        </View>
    );
};

const styles = StyleSheet.create({
    swiperContainer: {
        marginTop: 10,
    },
    slide: {
        borderRadius: 8,
        overflow: 'hidden',
        width: width * 0.95,
        height: '80%',
        alignSelf: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    dot: { 
        backgroundColor: "rgba(255, 189, 115, 0.6)",
        width: 8, 
        height: 8, 
        borderRadius: 4, 
        marginHorizontal: 3,
    }, 
    activeDot: { 
        backgroundColor: '#fa4a0c',
        width: 8, 
        height: 8, 
        borderRadius: 4, 
        marginHorizontal: 3,

    }
});

export default Banner;
