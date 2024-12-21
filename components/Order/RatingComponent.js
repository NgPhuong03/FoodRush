import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function RatingComponent({ initialRating = 0, onRatingChange }) {
    const [rating, setRating] = useState(initialRating);

    const handleRating = (value) => {
        setRating(value);
        if (onRatingChange) {
            onRatingChange(value);
        }
    };

    return (
        <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => handleRating(star)}>
                    <Icon
                        name="star"
                        size={30}
                        color={star <= rating ? "#FA4A0C" : "#D3D3D3"}
                        style={styles.star}
                    />
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    ratingContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
    },
    star: {
        marginHorizontal: 10,
    },
});
