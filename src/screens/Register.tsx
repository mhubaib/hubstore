import { useState } from "react";
import { View, TextInput, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAuth } from "../contexts/authContext";

export default function RegisterScreen({ navigation }: NativeStackScreenProps<any>) {
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const { register } = useAuth()

    const handleRegister = async () => {
        try {
            const response = await register(username, password)
            if (response) {
                navigation.navigate('LoginScreen');
            }
        } catch (error) {
            console.error("Registration error:", error);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: '500' }}>Register Screen</Text>
                <TextInput placeholder="username.." style={{ width: 300, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10, borderRadius: 10 }} placeholderTextColor={'#7a7979ff'} value={username} onChangeText={setUsername} />
                <TextInput placeholder="********" style={{ width: 300, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10, borderRadius: 10 }} placeholderTextColor={'#7a7979ff'} value={password} onChangeText={setPassword} secureTextEntry />
                <Button title="Register" onPress={handleRegister} />
                <Button title="Login" onPress={() => navigation.navigate('LoginScreen')} />
            </View>
        </SafeAreaView>
    )
}