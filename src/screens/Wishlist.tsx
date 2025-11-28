import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";

export default function WishlistScreen() {
    const headerHeight = useHeaderHeight()

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', paddingTop: headerHeight }}>
            <Text>Wishlist</Text>
        </SafeAreaView>
    )
}