import { createStackNavigator } from "@react-navigation/stack";
import MenuScreen from "../pages/BottomTabs/MenuStack/Menu";
import LocationStack from "./LocationStack";
import ProfileScreen from "../pages/BottomTabs/OrderStack/ProfileScreen";
import { StyleSheet } from "react-native";

const Stack = createStackNavigator();

export default function MenuStack() {
  return (
  <Stack.Navigator>
    <Stack.Screen name="Main" component={MenuScreen} options={{headerShown: false}}/>
    <Stack.Screen name="ToLocation" component={LocationStack} options={{headerShown:false}}/>
    <Stack.Screen name="ToProfile" component={ProfileScreen} options={{headerTitle: 'Thông tin cá nhân'}}/>
  </Stack.Navigator>
  );
}


