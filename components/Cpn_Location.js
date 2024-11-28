import { Dimensions, StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Cpn_Location({title, address, type}) {
  const { width, height } = Dimensions.get("window");
  return (
    <View
      style={[{ width: width * 0.98, height: height * 0.1 }, styles.container]}
    >
      <View style={{ width: "100%", height: "100%", flexDirection: "row" }}>
        <View style={styles.s1}>
          <Icon name="home" size={32} color={'#FA4A0C'}/>
        </View>

        <View style={styles.s2}>
          <Text style={{fontWeight: 'bold', fontSize: 18, padding: 4}}>Nhà riêng</Text>
          <Text style={{ fontSize: 16, padding: 4}}>ádsd, ádasd, adsa</Text>
        </View>

        <View style={styles.s3}>
          <Icon name="trash-o" size={30} color={'#FA4A0C'} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
  },
  s1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  s2: {
    flex: 3,
    justifyContent: 'center',
  },
  s3: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  
});
