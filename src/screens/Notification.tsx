import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotificationScreen() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(170, 167, 167, 0.3)' }}>
            <Text>NotificationScreen</Text>
        </SafeAreaView>
    )
}