import { createStackNavigator } from "@react-navigation/stack";
import MenuScreen from "../../pages/BottomTabs/MenuStack/Menu";
import LocationStack from "../LocationStack";
import ProfileScreen from "../../pages/BottomTabs/OrderStack/ProfileScreen";
import TermsScreen from "../../pages/BottomTabs/MenuStack/TermsScreen"
import PolicyScreen from "../../pages/BottomTabs/MenuStack/PolicyScreen"
import HelpScreen from "../../pages/BottomTabs/MenuStack/HelpScreen";

const Stack = createStackNavigator();

export default function MenuStack() {
  return (
  <Stack.Navigator>
    <Stack.Screen name="Main" component={MenuScreen} options={{headerShown: false}}/>
    <Stack.Screen name="ToLocation" component={LocationStack} options={{headerShown:false}}/>
    <Stack.Screen name="ToProfile" component={ProfileScreen} options={{headerTitle: 'Thông tin cá nhân'}}/>
    {/* <Stack.Screen name="ToEditAddress" component={} options={{headerTitle: 'Chỉnh sửa địa chỉ'}}/> */}
    <Stack.Screen name="Terms" component={TermsScreen} options={{headerTitle: 'Điều khoản và dịch vụ'}}/>
    <Stack.Screen name="Policy" component={PolicyScreen} options={{headerTitle: 'Chính sách bảo mật'}}/>
    <Stack.Screen name="Help" component={HelpScreen} options={{headerTitle: "Trợ giúp và hỗ trợ"}}/>
  </Stack.Navigator>
  );
}


