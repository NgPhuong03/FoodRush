
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "../pages/BottomTabs/HomeScreen";
import NotificationScreen from "../pages/BottomTabs/HomeStack/NotificationScreen";
import ProductDetailsScreen from '../pages/BottomTabs/HomeStack/ProductDetailsScreen';
import CategoryScreen from '../pages/BottomTabs/HomeStack/CategoryScreen';
import SearchScreen from '../pages/BottomTabs/HomeStack/SearchScreen';
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";

const Stack = createStackNavigator();

export default function HomeStack() {


  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={HomeScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Notification" component={NotificationScreen} options={{headerTitle: 'Thông báo'}}/>
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        headerTitle: "Chi tiết món ăn"
      }} />
      <Stack.Screen name="Category" component={CategoryScreen}  
          options={({ route }) => ({
          headerTitle: route.params.title, // Hiển thị tiêu đề là tên danh mục
        })}/>
        <Stack.Screen name="Search" component={SearchScreen}  
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            headerTitle: "Tìm kiếm"}}/>
    </Stack.Navigator>
  );
}


