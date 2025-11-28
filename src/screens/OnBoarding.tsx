import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Text, View } from "react-native";
import { useEffect } from "react";
import { useAuth } from "../contexts/authContext";

export default function OnBoardingScreen({ navigation }: { navigation: any }) {
    const { setOnboardingCompleted } = useAuth()
    useEffect(() => {
        setTimeout(() => {
            setOnboardingCompleted(true)
            navigation.replace('Auth')
        }, 5000)
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
