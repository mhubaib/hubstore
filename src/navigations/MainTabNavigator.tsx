import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TopTabNavigator from "./TopTabNavigator";
import ProfileScreen from "../screens/Profile";

const MainTab = createBottomTabNavigator()

export default function MainTabNavigator() {
    return (
        <MainTab.Navigator>
            <MainTab.Screen name="Home" component={TopTabNavigator} />
            <MainTab.Screen name="Profile" component={ProfileScreen} />
        </MainTab.Navigator>
    )
}