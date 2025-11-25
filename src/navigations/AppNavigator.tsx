import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/Splash';
import AuthStackNavigator from './AuthStackNavigator';
import { useAuth } from '../contexts/authContext';
import MainStackNavigator from './MainStackNavigator';

const AppStack = createNativeStackNavigator()

export default function AppNavigator() {
    const { username, isAuthenticated, onboardingCompletedState } = useAuth()

    return (
        <AppStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            {!onboardingCompletedState && (
                <AppStack.Screen name='SplashScreen' component={SplashScreen} />
            )}  
            {!username || !isAuthenticated && (
                <AppStack.Screen name='Auth' component={AuthStackNavigator} />
            )}
            {username && isAuthenticated && onboardingCompletedState && (
                <AppStack.Screen name='MainStack' component={MainStackNavigator} />
            )}
        </AppStack.Navigator>
    )
}