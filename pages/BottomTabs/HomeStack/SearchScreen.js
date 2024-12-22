import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import RenderSearchItem from "../../../components/RenderSearchItem";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

function removeVietnameseTones(str) {
  str = str.toLowerCase();
  str = str.replace(
    /[\u00E0\u00E1\u1EA3\u00E3\u1EA1\u0103\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u00E2\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD]/g,
    "a"
  );
  str = str.replace(
    /[\u00E8\u00E9\u1EBB\u1EBD\u1EB9\u00EA\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7]/g,
    "e"
  );
  str = str.replace(/[\u00EC\u00ED\u1EC9\u0129\u1ECB]/g, "i");
  str = str.replace(
    /[\u00F2\u00F3\u1ECF\u00F5\u1ECD\u00F4\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u01A1\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5]/g,
    "o"
  );
  str = str.replace(
    /[\u00F9\u00FA\u1EE7\u0169\u1EEB\u1EED\u1EEF\u1EF1\u1EF3]/g,
    "u"
  );
//   str = str.replace(/[\u00FD\u1EF7\u1EF9\u1EF5]/g, "y");
//   str = str.replace(/[\u0111]/g, "d");
//   str = str.replace(/[\u0300\u0301\u0303\u0309\u0323]/g, ""); // Các dấu thanh
//   str = str.replace(/[\u02C6\u0306\u031B]/g, ""); // Các dấu mũ, dấu móc
  str = str.replace(/\s+/g, ""); // Xóa khoảng trắng
  return str;
}

function containsAllCharacters(strA, strB) {
    let lastPosition = 0;
  for (let char of strB) {
    const newCharPosition = strA.indexOf(char);
    if (lastPosition > newCharPosition){
        return false;
    }
    if (!strA.includes(char)) {
      return false;
    }
    lastPosition = newCharPosition;
  }
  return true;
}

export default function SearchScreen({route}) {
  const {all} = route.params;
  const [searchData, setSearchData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();
  const SearchFood = (text) => {
    setSearchText(text);
    if (text === "") {
      setSearchData(all);
    } else {
      const dataFilter = all.filter((e) =>
        containsAllCharacters(
          removeVietnameseTones(e.name),
          removeVietnameseTones(text)
        )
      );
      setSearchData(dataFilter.slice(0, 5));
    }
  };

  useEffect(() => {
    setSearchData(all)
    
  },[]);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Icon name="search" size={20} color="black" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Bạn đang đói à?"
          placeholderTextColor="#FFA8A8"
          value={searchText}
          onChangeText={(e) => SearchFood(e)}
        />
      </View>

      <FlatList
        data={searchData}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (<RenderSearchItem item={item} navigation={navigation}/>)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
    marginHorizontal: 16,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 5,
    elevation: 5,
    shadowOpacity: 0.3,
    marginTop: 10,
    borderWidth: 1
  },
  input: {
    width: "90%",
    height: 50,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 20,
    color: "#FA4A0C",
  },
  icon: {
    marginLeft: 10,
    width: "8%",
  },
});
