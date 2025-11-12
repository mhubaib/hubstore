import { createDrawerNavigator } from '@react-navigation/drawer'
import MainStackNavigator from './MainStackNavigator'

const MainDrawer = createDrawerNavigator()

export default function MainDrawerNavigator() {
    return (
        <MainDrawer.Navigator
            screenOptions={{
            headerShown: false
        }}
        >
            <MainDrawer.Screen name='MainStack' component={MainStackNavigator} />
        </MainDrawer.Navigator>
    )
}