import { createDrawerNavigator } from '@react-navigation/drawer'
import MainStackNavigator from './MainStackNavigator'
import { MainDrawerParamList } from '../types/navigation'

const MainDrawer = createDrawerNavigator<MainDrawerParamList>()

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