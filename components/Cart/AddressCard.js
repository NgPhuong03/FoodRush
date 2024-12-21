import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import { getUser } from "../../services/api";
import Icon from "react-native-vector-icons/FontAwesome6";
import { AuthContext } from "../../contexts/AuthContext";



export default function AddressCard({isPay, userInOrderHistory, setAddressId , navigation}){
    const {lastAddressOrder} = useContext(AuthContext);
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const Loaddata = async () => {
            const resUser = await getUser();
            setUser(resUser.result);
            setIsLoading(false);
        };
        Loaddata();
    }, [])

    if(isLoading){
        return null
    }

    // useEffect(() => {
    //     if (isPay) {
    //       setAddressId(address[0].id);
    //     }
    //   }, [setAddressId]);

    if(isPay == true){
        return (
            <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("SelectedAddress")}>
                <View style={{
                    width: "20%", 
                    justifyContent: "flex-start",
                    paddingLeft: 20,
                    paddingTop: 10
                }}>
                        <Icon name="map-location-dot" size={24} color={"#FA4A0C"}/>
                </View>
    
                <View style={{width: "65%"}}>
                    <Text style={styles.titleAddress}>Địa chỉ nhận hàng</Text>
                    <Text style={styles.address}>
                        {user.name} | {user.phone_number}
                    </Text>
                    <Text style={styles.address} numberOfLines={2}>
                        {lastAddressOrder?.address}
                    </Text>
                </View>
    
                <View style={{
                    width: "15%", 
                    justifyContent: "center", 
                    paddingLeft: 10
                }}>
                    <Icon name="chevron-right" size={24}/>
                </View>
    
            </TouchableOpacity>
        )
    }

    if (isPay == false){
        return (
            <View style={styles.container}>
                <View style={{
                    width: "20%", 
                    justifyContent: "flex-start",
                    paddingLeft: 20,
                    paddingTop: 10
                }}>
                        <Icon name="map-location-dot" size={24} color={"#FA4A0C"}/>
                </View>
    
                <View style={{width: "80%"}}>
                    <Text style={styles.titleAddress}>Địa chỉ nhận hàng</Text>
                    <Text style={styles.address}>
                        {userInOrderHistory.name} | {userInOrderHistory.phoneNumber}
                    </Text>
                    <Text style={styles.address} numberOfLines={3}>
                        {userInOrderHistory.address}
                    </Text>
                </View>    
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "auto",
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 10,
        borderWidth: 1,
        borderWidth: 0.5 ,
        borderColor: "#ACABAB",
        alignContent: "center",
        justifyContent: "center",
        shadowColor: "black",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowRadius: 5,
        elevation: 5,
        shadowOpacity: 0.3,
        marginBottom: 10
    },
    titleAddress: {
        fontSize: 18,
        fontWeight: "600",
        paddingTop: 5
    },
    address: {
        fontSize: 15,
        fontWeight: "400"
    }
})