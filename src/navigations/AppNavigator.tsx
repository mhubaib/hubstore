import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainDrawerNavigator from './MainDrawerNavigator';
import LoginScreen from '../screens/Login';
import SplashScreen from '../screens/Splash';

const AppStack = createNativeStackNavigator()

export default function AppNavigator() {
    return (
        <AppStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <AppStack.Screen name='SplashScreen' component={SplashScreen} />
            <AppStack.Screen name='LoginScreen' component={LoginScreen} />
            <AppStack.Screen name='MainDrawer' component={MainDrawerNavigator} />
        </AppStack.Navigator>
    )
}