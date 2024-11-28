import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Keyboard,
  Alert,
} from "react-native";
import axios from "axios";
import debounce from "lodash.debounce";

export default function SearchAddress({ Direction, setUserLocation, setTyping }) {
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const apiKey = "GKkG446Pg4YiEAnnW6z15pGzLALuh1WSBShBZBOW"; // Đổi sang key của bạn

  // Hàm tìm kiếm địa chỉ (debounce)
  const searchAddress = debounce(async (query) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(
        `https://rsapi.goong.io/Place/AutoComplete`,
        {
          params: {
            api_key: apiKey,
            input: query,
          },
        }
      );
      if (response.data.status === "OK") {
        setSuggestions(response.data.predictions || []);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  }, 2000);

  const geocode = async () => {
    try {
      const response = await axios.get(`https://rsapi.goong.io/geocode`, {
        params: {
          address: address,
          api_key: apiKey,
        },
      });
      if (response) {
        const location = response.data.results[0].geometry.location;
        setUserLocation(location.lat,location.lng)
        Direction(location.lat,location.lng);
      }
    } catch (error) {
      console.error("Error fetching geocode:", error);
    }
  };

  const handleSelectSuggestion = (item) => {
    setTyping(false);
    setAddress(item.description);
    setSuggestions([]);
    geocode();
    Keyboard.dismiss();
    
  };

  const handleSubmit = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        {/* <Text style={styles.label}>Địa chỉ</Text> */}
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={(text) => {
            setTyping(true);
            setAddress(text);
            searchAddress(text);
          }}
          placeholder="Nhập địa chỉ của bạn"
          numberOfLines={2}
        />
        {suggestions.length > 0 && (
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.place_id}
            nestedScrollEnabled={true}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => handleSelectSuggestion(item)}
              >
                <Text style={styles.suggestionText}>{item.description}</Text>
              </TouchableOpacity>
            )}
            style={styles.suggestionsContainer}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 4,
    width: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    left: "50%",
    transform: [{ translateX: "-50%" }],
    zIndex: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputGroup: {
    flex: 1,
    width: "96%",
  },
  input: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    width: "100%",
    borderWidth: 2,
  },
  suggestionsContainer: {
    width: "96%",
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    maxHeight: 200,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    zIndex: 10,
  },
  suggestionItem: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    zIndex: 5,
  },
  suggestionText: {
    fontSize: 16,
  }
});
