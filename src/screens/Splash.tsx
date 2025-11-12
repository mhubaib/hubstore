import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Text, View } from "react-native";
import { useEffect } from "react";

export default function SplashScreen({ navigation }: { navigation: any }) {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('LoginScreen')
        }, 2000)
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Text style={{ fontSize: 24 }}>Splash</Text>
                <ActivityIndicator animating={true} color="red" />
            </View>
        </SafeAreaView>
    )
}
