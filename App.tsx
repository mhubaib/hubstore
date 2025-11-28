import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/contexts/authContext';
import { enableScreens } from 'react-native-screens';
import { CartProvider } from './src/contexts/cartContext';
import { WishlistProvider } from './src/contexts/wishlistContext';
import { useState } from 'react';
import AppNavigator from './src/navigations/AppNavigator';
import SplashScreen from './src/screens/Splash';

enableScreens();

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const linking: LinkingOptions<any> = {
    prefixes: ['hubstore://'],
    config: {
      screens: {
        Auth: {
          screens: {
            LoginScreen: 'login',
            RegisterScreen: 'register',
          }
        },
        MainStack: {
          screens: {
            MainTab: {
              screens: {
                CatalogScreen: 'catalog',
                CartScreen: 'cart',
                ProfileScreen: 'profile',
              }
            }
          }
        }
      }
    }
  }

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <CartProvider>
      <WishlistProvider>
        <AuthProvider>
          <SafeAreaProvider>
            <NavigationContainer linking={linking}>
              <AppNavigator />
            </NavigationContainer>
          </SafeAreaProvider>
        </AuthProvider>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
