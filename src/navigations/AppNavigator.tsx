import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainDrawerNavigator from './MainDrawerNavigator';
import SplashScreen from '../screens/Splash';
import AuthStackNavigator from './AuthStackNavigator';
import { useAuth } from '../contexts/authContext';

const AppStack = createNativeStackNavigator()

export default function AppNavigator() {
    const { isAuthenticated, onboardingCompletedState } = useAuth()

    return (
        <AppStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            {!isAuthenticated && !onboardingCompletedState && (
                <AppStack.Screen name='SplashScreen' component={SplashScreen} />
            )}  
            {!isAuthenticated && onboardingCompletedState && (
                <AppStack.Screen name='Auth' component={AuthStackNavigator} />
            )}
            {isAuthenticated && (
                <AppStack.Screen name='MainDrawer' component={MainDrawerNavigator} />
            )}
        </AppStack.Navigator>
    )
}