/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigations/AppNavigator';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/contexts/authContext';

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
        MainDrawer: {
          screens: {

          }
        }
      }
    }
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer linking={linking}>
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
