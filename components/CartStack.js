import { createStackNavigator } from "@react-navigation/stack";
import CartScreen from "../pages/BottomTabs/CartStack/CartScreen";
import PayScreen from "../pages/BottomTabs/CartStack/PayScreen";
import SelectedAddressScreen from "../pages/BottomTabs/CartStack/SelectAddressScreen";
import AddLocationScreen from "../pages/BottomTabs/MenuStack/AddLocationScreen";

const Stack = createStackNavigator();

export default function CartStack() {
  return (
  <Stack.Navigator>
    <Stack.Screen name="Main" component={CartScreen} options={{headerShown: false}}/>
    <Stack.Screen name="ToPay" component={PayScreen} options={{headerTitle: 'Thanh toán'}}/>
    <Stack.Screen name="SelectedAddress" component={SelectedAddressScreen} options={{headerTitle: 'Chọn địa chỉ'}}/>
    <Stack.Screen name="AddLocation" component={AddLocationScreen} options={{headerTitle: 'Chọn địa chỉ'}}/>
  </Stack.Navigator>
  );
}
