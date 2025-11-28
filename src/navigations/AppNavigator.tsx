import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStackNavigator from './AuthStackNavigator';
import { useAuth } from '../contexts/authContext';
import MainStackNavigator from './MainStackNavigator';
import { useEffect, useState } from 'react';
import { useCart } from '../contexts/cartContext';
import { useWishlist } from '../contexts/wishlistContext';
import OnBoardingScreen from '../screens/OnBoarding';
import SplashScreen from '../screens/Splash';

const AppStack = createNativeStackNavigator()

export default function AppNavigator() {
    const [isLoading, setIsLoading] = useState(true)
    const { username, isAuthenticated, onboardingCompletedState, loadCredentials, loadOnboarding } = useAuth()
    const { loadProducts } = useCart()
    const { loadWishlist } = useWishlist()

    useEffect(() => {
        const loadAppData = async () => {
            try {
                await Promise.all([
                    loadCredentials(),
                    loadProducts(),
                    loadWishlist(),
                    loadOnboarding(),
                ])
                setTimeout(() => {
                    setIsLoading(false)
                }, 500)
            } catch (error) {
                setIsLoading(false)
            }
        }

        loadAppData()
    }, [])

    if (isLoading) {
        return <SplashScreen />
    }

    return (
        <AppStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            {!onboardingCompletedState && (
                <AppStack.Screen name='OnBoardingScreen' component={OnBoardingScreen} />
            )}
            {(!username || !isAuthenticated) && (
                <AppStack.Screen name='Auth' component={AuthStackNavigator} />
            )}
            {username && isAuthenticated && onboardingCompletedState && (
                <AppStack.Screen name='MainStack' component={MainStackNavigator} />
            )}
        </AppStack.Navigator>
    )
}