import { 
    View,
    StyleSheet,
    Text,
    Image
 } from "react-native";


export default function CategoriesCart({item}){
    return (
        <View style={styles.container}>
            <Image source={{uri: item.icon}} style={styles.icon}/>
            <Text style={styles.txtName} numberOfLines={2}>{item.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 80, 
        height: 100, 
        alignItems: "center"
    },
    icon: {
        width: 60,
        height: "60%",
        marginTop: 2
    },
    txtName: {
        fontSize: 14,
        textAlign: "center",
        fontWeight: "500",
        paddingHorizontal: 5
    }
})