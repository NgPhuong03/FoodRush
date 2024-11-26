
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "../pages/BottomTabs/HomeScreen";
import NotificationScreen from "../pages/BottomTabs/HomeStack/NotificationScreen";
import ProductDetailsScreen from '../pages/BottomTabs/HomeStack/ProductDetailsScreen';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={HomeScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Notification" component={NotificationScreen} options={{headerTitle: 'Thông báo'}}/>
      {/* <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
      }} /> */}
    </Stack.Navigator>
  );
}


