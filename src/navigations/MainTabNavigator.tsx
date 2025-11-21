import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../screens/Profile";
import Ionicons from "@react-native-vector-icons/ionicons";
import CatalogScreen from "../screens/Catalog";
import CartScreen from "../screens/Cart";

const MainTab = createBottomTabNavigator<any>()

const getTabBarIcon = (route: any) => ({ color }: { color: string }) => {
    if (route.name === "CatalogScreen") {
        return <Ionicons name="home" size={24} color={color} />
    } else if (route.name === "CartScreen") {
        return <Ionicons name="cart" size={24} color={color} />
    } else if (route.name === "ProfileScreen") {
        return <Ionicons name="person" size={24} color={color} />
    }
}

export default function MainTabNavigator() {
    return (
        <MainTab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: getTabBarIcon(route),
                headerShown: false,
                tabBarActiveTintColor: '#2d8c2eff',
            })}

        >
            <MainTab.Screen name="CatalogScreen" component={CatalogScreen} />
            <MainTab.Screen name="CartScreen" component={CartScreen} />
            <MainTab.Screen name="ProfileScreen" component={ProfileScreen} />
        </MainTab.Navigator>
    )
}