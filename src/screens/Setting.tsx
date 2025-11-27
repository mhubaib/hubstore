import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";

export default function SettingScreen() {
    const headerHeight = useHeaderHeight()

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', paddingTop: headerHeight }}>
            <Text>Setting</Text>
        </SafeAreaView>
    )
}