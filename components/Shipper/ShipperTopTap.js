import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { TouchableOpacity, Text } from "react-native";
import ListOrderScreen from "../../pages/Shipper/ListOrderScreen";
import MapToCustomerScreen from "../../pages/Shipper/MapToCustomerScreen";
import OrderDetailsScreen from "../../pages/BottomTabs/OrderStack/OrderDetailsScreen";

const Tab = createMaterialTopTabNavigator()
const Stack = createStackNavigator()
const TopTab = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#fa4a0c', // Màu chữ khi tab được trỏ đến
        indicatorStyle: { // Thanh bên dưới
          backgroundColor: '#fa4a0c', // Màu của thanh bên dưới
        },
        labelStyle: {
          fontWeight: 'bold', // Màu chữ kiểu chữ in đậm
        },
        style: {
          backgroundColor: 'white', // Màu nền của tab
        },
      }}
    >
      <Tab.Screen name="Đang chờ"  children={(props) => (
          <ListOrderScreen {...props} orderStatus="dangnau" />
        )}/>
      <Tab.Screen name="Đang giao"children={(props) => (
          <ListOrderScreen {...props} orderStatus="danggiao" />
        )}/>
      <Tab.Screen name="Đã giao" children={(props) => (
          <ListOrderScreen {...props} orderStatus="dagiao" />
        )}/>
    </Tab.Navigator>
  );
};

export default function ShipperTopTab() {
    const {LogOut} = useContext(AuthContext)

  return (
  <Stack.Navigator>
    <Stack.Screen name="Main" component={TopTab} options={{
        headerShown: true, 
        title: "Đơn hàng",
        headerRight: () => (
            <TouchableOpacity
              style={{
                marginRight: 15,
                backgroundColor: "#fa4a0c",
                padding: 10,
                borderRadius: 5,
              }}
              onPress={LogOut}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Đăng xuất</Text>
            </TouchableOpacity>
          ),
    }}/>
    <Stack.Screen name="ToMap" component={MapToCustomerScreen} options={{title: "Bản đồ"}}/>
    <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} options={{title: "Chi tiết đơn hàng"}}/>
  </Stack.Navigator>
  );
}

