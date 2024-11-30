import { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function Header() {
  const { LogOut } = useContext(AuthContext);
  return (
      <View style={styles.container}>
        <View style={styles.imgBorder}>
          <Image source={require('../../assets/jack.png')} style={styles.img}/>
        </View>
        <View style={styles.infor}>
          <Text style={{fontWeight: 'bold', fontSize: 20, marginBottom: 8, color: '#fff'}}>Anh Jack Ma</Text>
          <Text style={{ fontSize: 16, color: '#ddd'}} >Khu phố Ohio, quận Cam, tỉnh Bên Cồn</Text>
        </View>
        <TouchableOpacity
          style={styles.logout}
          onPress={LogOut}
        >
          <Icon name="logout" size={40} color={'#fff'} />
        </TouchableOpacity>
      </View>
      
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "24%",
    backgroundColor: "#FA4A0C",
    flexDirection: "row",
    paddingTop: 40,
    paddingHorizontal: 12,
    paddingBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 72,
    height: 72,
  },
  imgBorder: {
    width: 84,
    height: 84,
    borderWidth: 4,
    borderRadius: 42,
    borderColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  infor: {
    flex: 4,
    padding: 12,
    justifyContent: 'center'
  },
  logout: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16
  }
});
