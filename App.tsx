import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigations/AppNavigator';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/contexts/authContext';
import { enableScreens } from 'react-native-screens';
import { CartProvider } from './src/contexts/cartContext';
import { WishlistProvider } from './src/contexts/wishlistContext';

enableScreens();

function App() {

  const linking: LinkingOptions<any> = {
    prefixes: ['hubaibapp://'],
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
