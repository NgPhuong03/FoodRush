import LoginScreen from "../pages/LoginScreen";
import SignUpScreen from "../pages/SignUpScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

export default function AuthenticationStack() {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#FA4A0C', // Màu chữ khi được chọn
      tabBarInactiveTintColor: 'gray', // Màu chữ khi không được chọn
      tabBarIndicatorStyle: {
        backgroundColor: '#FA4A0C', // Màu của thanh trỏ
        width: "35%", // Độ rộng của thanh trỏ
        marginHorizontal: "7%", // Căn chỉnh thanh trỏ vào giữa
        height: 3, // Độ cao của thanh trỏ
        borderRadius: 2, // Bo góc thanh trỏ
      },
      tabBarStyle: {
        backgroundColor: 'white', // Màu nền của tabBar
        borderBottomStartRadius: 20, 
        borderBottomEndRadius: 20,
        overflow: 'hidden', // Đảm bảo bo góc hiển thị đúng
        shadowColor: '#000', // Màu của shadow (iOS)
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.65, // Độ mờ của shadow
        elevation: 5, // Đổ bóng (Android)
      },
      tabBarLabelStyle: {
        fontSize: 18, // Kích thước chữ
        fontWeight: 'bold', // Độ đậm của chữ
      },
    }}
    >
      <Tab.Screen name="Đăng nhập" component={LoginScreen} />
      <Tab.Screen name="Đăng ký" component={SignUpScreen} />
    </Tab.Navigator>
  );
}


