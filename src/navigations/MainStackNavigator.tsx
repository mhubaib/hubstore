import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabNavigator from "./MainTabNavigator";
import DetailScreen from "../screens/Detail";
import SettingScreen from "../screens/Setting";
import { MainStackParamList } from "../types/navigation";

const MainStack = createNativeStackNavigator<MainStackParamList>()

export default function MainStackNavigator() {
    return (
        <MainStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <MainStack.Screen name='MainTab' component={MainTabNavigator} />
            <MainStack.Screen name='DetailScreen' component={DetailScreen} />
            <MainStack.Screen name='SettingScreen' component={SettingScreen} />
        </MainStack.Navigator>
    )
}