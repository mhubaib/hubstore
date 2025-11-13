import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TopTabNavigator from "./TopTabNavigator";
import ProfileScreen from "../screens/Profile";
import Ionicons from "@react-native-vector-icons/ionicons";

const MainTab = createBottomTabNavigator()

const getTabBarIcon = (route: any) => ({ color, size }: { color: string, size: number }) => {
    if (route.name === "Home") {
        return <Ionicons name="home" size={size} color={color} />
    } else if (route.name === "Profile") {
        return <Ionicons name="person" size={size} color={color} />
    }
}

export default function MainTabNavigator() {
    return (
        <MainTab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: getTabBarIcon(route)
            })}
        >
            <MainTab.Screen name="Home" component={TopTabNavigator} />
            <MainTab.Screen name="Profile" component={ProfileScreen} />
        </MainTab.Navigator>
    )
}