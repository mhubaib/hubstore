import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabNavigator from "./MainTabNavigator";
import DetailScreen from "../screens/Detail";
import NotificationScreen from "../screens/Notification";
import WishlistScreen from "../screens/Wishlist";

const MainStack = createNativeStackNavigator<any>()

export default function MainStackNavigator() {
    return (
        <MainStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <MainStack.Screen name='MainTab' component={MainTabNavigator} />
            <MainStack.Screen name='DetailScreen' component={DetailScreen} />
            <MainStack.Screen name='WishlistScreen' component={WishlistScreen} />
            <MainStack.Screen name='NotificationScreen' component={NotificationScreen} />
        </MainStack.Navigator>
    )
}