import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../../../components/Menu/Header";
import IconFeather from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/FontAwesome";
import IconIon from "react-native-vector-icons/Ionicons";

export default function MenuScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Header />
      
      <View style={styles.contextContainer}>
        <Text style={styles.tongquan}>Tổng quan</Text>

        <TouchableOpacity
          style={{ flexDirection: 'row', padding:16, alignItems: 'center'}}
          onPress={() => navigation.navigate("ToProfile")}
        >
          <IconFeather name="user" size={32} style={{width: 32}} />
          <Text style={{ paddingLeft: 20, fontSize: 16, fontWeight: 'bold'}}>Trang cá nhân</Text>
        </TouchableOpacity>

        <View style={{width: '96%', height: 1, backgroundColor: '#ccc', alignSelf: 'center'}} />

        <TouchableOpacity
          style={{ flexDirection: 'row', padding:16, alignItems: 'center'}}
          onPress={() => navigation.navigate("ToLocation")}
        >
          <IconFeather name="map" size={32} style={{width: 32}} />
          <Text style={{ paddingLeft: 20, fontSize: 16, fontWeight: 'bold'}}>Địa chỉ của tôi</Text>
        </TouchableOpacity>

        
      </View>

      <View style={styles.contextContainer}>
        <Text style={styles.tongquan}>Trợ giúp & hỗ trợ</Text>

        <TouchableOpacity
          style={{ flexDirection: 'row', padding:16, alignItems: 'center'}}
          onPress={() => navigation.navigate("Help")}
        >
          <IconFeather name="phone" size={32} style={{width: 32}} />
          <Text style={{ paddingLeft: 20, fontSize: 16, fontWeight: 'bold'}}>Trợ giúp & hỗ trợ</Text>
        </TouchableOpacity>

        <View style={{width: '96%', height: 1, backgroundColor: '#ccc', alignSelf: 'center'}} />

        <TouchableOpacity
          style={{ flexDirection: 'row', padding:16, alignItems: 'center'}}
          onPress={() => navigation.navigate("Terms")}
        >
          <Icon name="file-text-o" size={32} style={{width: 32}} />
          <Text style={{ paddingLeft: 20, fontSize: 16, fontWeight: 'bold'}}>Điều khoản và dịch vụ</Text>
        </TouchableOpacity>

        <View style={{width: '96%', height: 1, backgroundColor: '#ccc', alignSelf: 'center'}} />

        <TouchableOpacity
          style={{ flexDirection: 'row', padding:16, alignItems: 'center'}}
          onPress={() => navigation.navigate("Policy")}
        >
          <IconIon name="document-lock-outline" size={32} style={{width: 32}} />
          <Text style={{ paddingLeft: 20, fontSize: 16, fontWeight: 'bold'}}>Chính sách bảo mật</Text>
        </TouchableOpacity>

        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
  },
  topContainer: {
    width: "100%",
    height: "24%",
    backgroundColor: "#FA4A0C",
    flexDirection: "row",
    paddingTop: 40,
    paddingHorizontal: 12,
    paddingBottom: 24,
  },
  contextContainer: {
    flexWrap: 1,
    marginTop: 40,
    margin: 8,
    borderWidth: 2,
    borderColor: "#bbb",
    borderRadius: 10,
    backgroundColor: '#fff'
  },
  tongquan: {
    position: 'absolute',
    top: -36,
    left: 0,
    fontSize: 24,
    color: '#FA4A0C',
    fontWeight: "bold"
  }
});
