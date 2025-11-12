import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text } from "react-native";

export default function LoginScreen({ navigation }: { navigation: any }) {
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Login</Text>
            <Button title="Login" />
            <Button title="Skip" onPress={() => navigation.replace('MainDrawer')} />
        </SafeAreaView>
    )
}
