import { createStackNavigator } from "@react-navigation/stack";
import CartScreen from "../pages/BottomTabs/CartStack/CartScreen";
import PayScreen from "../pages/BottomTabs/CartStack/PayScreen";

const Stack = createStackNavigator();

export default function CartStack() {
  return (
  <Stack.Navigator>
    <Stack.Screen name="Main" component={CartScreen} options={{headerShown: false}}/>
    <Stack.Screen name="ToPay" component={PayScreen} options={{headerTitle: 'Thanh toán'}}/>
  </Stack.Navigator>
  );
}
