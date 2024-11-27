import { Dimensions, StyleSheet, Text, View } from "react-native";

export default function Cpn_Location() {
  const { width, height } = Dimensions.get("window");
  return (
    <View
      style={[{ width: width * 0.98, height: height * 0.1 }, styles.container]}
    >
      <View style={{ width: "100%", height: "100%", flexDirection: "row" }}>
        <View style={styles.s1}></View>

        <View style={styles.s2}>
          <Text style={{fontWeight: 'bold', fontSize: 18, padding: 4}}>Nhà riêng</Text>
          <Text style={{ fontSize: 16, padding: 4}}>ádsd, ádasd, adsa</Text>
        </View>

        <View style={styles.s3}></View>
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
    backgroundColor: "red",
  },
  s2: {
    flex: 3,
    backgroundColor: "blue",
    justifyContent: 'center',
  },
  s3: {
    flex: 1,
    backgroundColor: "green",
  },
  
});
