import { createStackNavigator } from "@react-navigation/stack";
import LocationScreen from "../pages/BottomTabs/MenuStack/LocationScreen";
import AddLocationScreen from "../pages/BottomTabs/MenuStack/AddLocationScreen";
import { StyleSheet } from "react-native";

const Stack = createStackNavigator();

export default function LocationStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: true,
        headerStyle: styles.headerShadow,
        headerTintColor: "#000",
        headerBackTitle: '',
        headerTitleAlign: 'center'
      }}
    >
      <Stack.Screen
        name="Location"
        component={LocationScreen}
        options={{
          headerTitle: "Địa chỉ của tôi",
        }}
      />
      <Stack.Screen
        name="AddLocation"
        component={AddLocationScreen}
        options={{
          headerTitle: "Thêm địa chỉ",
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
});
