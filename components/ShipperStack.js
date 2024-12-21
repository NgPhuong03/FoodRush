import { createStackNavigator } from "@react-navigation/stack";
import ListOrderScreen from "../pages/Shipper/ListOrderScreen";
import MapToCustomerScreen from "../pages/Shipper/MapToCustomerScreen";

const Stack = createStackNavigator();

export default function ShipperStack() {
  return (
  <Stack.Navigator>
    <Stack.Screen name="Main" component={ListOrderScreen} options={{headerShown: false}}/>
    <Stack.Screen name="ToMap" component={MapToCustomerScreen} />
  </Stack.Navigator>
  );
}
