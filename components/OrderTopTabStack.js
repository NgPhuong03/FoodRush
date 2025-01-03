import {CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import DeliveringScreen from "../pages/BottomTabs/OrderStack/DeliveringScreen";
import HistoryScreen from "../pages/BottomTabs/OrderStack/HistoryScreen";
import OrderScreen from "../pages/BottomTabs/OrderStack/OrderScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FollowingOrder from "../pages/BottomTabs/OrderStack/FollowingOrder";
import OrderDetailsScreen from "../pages/BottomTabs/OrderStack/OrderDetailsScreen";
import ReviewScreen from "../pages/BottomTabs/OrderStack/ReviewScreen";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

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
      <Tab.Screen name="Đang nấu" component={OrderScreen}/>
      <Tab.Screen name="Đang giao" component={DeliveringScreen} />
      <Tab.Screen name="Lịch sử" component={HistoryScreen} />
    </Tab.Navigator>
  );
};

export default function OrderTopTabStack() {
  return (
  <Stack.Navigator>
    <Stack.Screen name="Main" component={TopTab} options={{headerShown: false}}/>
    <Stack.Screen name="FollowingOrder" component={FollowingOrder} options={{
      cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
      headerTitle: 'Theo dõi đơn hàng'}}/>
    <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} options={{
      cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
      headerTitle: 'Chi tiết đơn hàng'}}/>
    <Stack.Screen name="Review" component={ReviewScreen} options={{headerTitle: 'Đánh giá'}}/>
  </Stack.Navigator>
  );
}
