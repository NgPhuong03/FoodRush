import { createStackNavigator } from "@react-navigation/stack";
import FollowingOrder from "../pages/BottomTabs/OrderStack/FollowingOrder";
import OrderDetailsScreen from "../pages/BottomTabs/OrderStack/OrderDetailsScreen";
import MenuScreen from "../pages/BottomTabs/MenuStack/Menu";
import LocationScreen from "../pages/BottomTabs/MenuStack/LocationScreen";
import AddLocationScreen from "../pages/BottomTabs/MenuStack/AddLocationScreen";

const Stack = createStackNavigator();

export default function LocationStack() {
  return (
  <Stack.Navigator>
    <Stack.Screen name="Location" component={LocationScreen} options={{headerTitle: 'Địa chỉ của tôi'}}/>
    <Stack.Screen name="AddLocation" component={AddLocationScreen} options={{headerTitle: 'Thêm địa chỉ'}}/>
  </Stack.Navigator>
  );
}
