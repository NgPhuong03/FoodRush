import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FavoritesScreen from '../pages/BottomTabs/FavouritesScreen';
import MenuStack from '../components/MenuStack';
import { StyleSheet, Text, View } from 'react-native';
import HomeStack from './HomeStack';
import OrderTopTabStack from './OrderTopTabStack';
import CartStack from './CartStack';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigatior() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Cart" component={CartStack} options={{
        tabBarIcon: ({size,color}) => 
            (
                <View style={styles.soluong}>
                  {/* <View >
                    <Text style={styles.soluongText}>3</Text>
                  </View> */}
                </View>
            ),
            tabBarLabel: () => ''
            }}/>
      <Tab.Screen name="Order" component={OrderTopTabStack} />
      <Tab.Screen name="Menu" component={MenuStack} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  soluong:{
    width: 20,
    height: 20,
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'red',
      bottom: 15
  },
  soluongText:{
      position: 'absolute',
      color: '#fff',
      fontSize: 13
  }
})