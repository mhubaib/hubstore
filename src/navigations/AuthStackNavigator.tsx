import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Login";
import RegisterScreen from "../screens/Register";

const AuthStack = createNativeStackNavigator();

export default function AuthStackNavigator() {
    return (
        <AuthStack.Navigator screenOptions={{
            headerShown: false,
            headerSearchBarOptions: {
                placeholder: "Search",
            }
        }}>
            <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
            <AuthStack.Screen name="RegisterScreen" component={RegisterScreen} />
        </AuthStack.Navigator>
    )
}