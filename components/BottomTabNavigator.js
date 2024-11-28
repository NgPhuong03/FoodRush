import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FavoritesScreen from '../pages/BottomTabs/FavouritesScreen';
import MenuStack from '../components/MenuStack';
import { StyleSheet, Text, View } from 'react-native';
import HomeStack from './HomeStack';
import OrderTopTabStack from './OrderTopTabStack';
import CartStack from './CartStack';
import Icon from "react-native-vector-icons/FontAwesome";
import Icon6 from "react-native-vector-icons/FontAwesome6";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigatior() {
  return (
    <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle:{
          height: 80
        },
        tabBarActiveTintColor:"#FA4A0C",
        tabBarIconStyle: {
          marginTop: 10,
        }
    }}>
      <Tab.Screen name="Home" component={HomeStack} 
        options={{
          tabBarIcon: ({ color, size }) => (
              <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen name="Favorites" component={FavoritesScreen} 
          options={{
          tabBarIcon: ({ color, size }) => (
              <Icon name="heart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen name="Cart" component={CartStack}   
        options={{
          tabBarIcon: ({size, color, focused }) => 
            (
            <View style={[styles.cartWrapper, focused && styles.activeCart]}>
              <Icon name="shopping-cart" size={size} color={color} />
            </View>
            ),
          }}
      />
      <Tab.Screen name="Order" component={OrderTopTabStack} 
          options={{
            tabBarIcon: ({ color, size, focused }) => (
                <Icon6 name="bag-shopping" size={size} color={color} />
            ),
          }}
      />
      <Tab.Screen name="Menu" component={MenuStack} 
          options={{
            tabBarIcon: ({ color, size, focused }) => (
                <Icon name="navicon" size={size} color={color} />
            ),
          }}
      />
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
  },
  cartWrapper: {
    position: "absolute",
    top: -40, // Đẩy biểu tượng Cart lên phía trên thanh navigation
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    borderWidth: 0.5
  },
})