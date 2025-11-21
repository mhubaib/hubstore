import { useState } from "react";
import { TextInput, Text, Button, Alert, StyleSheet, ScrollView, Platform, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAuth } from "../contexts/authContext";
import ButtonCustom from "../components/Button";

export default function LoginScreen({ navigation }: NativeStackScreenProps<any>) {
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const { login } = useAuth()

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert("Error", "Username and password cannot be empty.");
            return;
        }
        try {
            const credentials = await login(username, password)
            if (credentials) {
                navigation.navigate('MainDrawer')
            } else {
                Alert.alert("Invalid credentials");
            }
        } catch (error) {
            console.error("Registration error:", error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0} // Sesuaikan offset jika perlu
            >
                <SafeAreaView style={styles.innerContainer}>
                    <ScrollView contentContainerStyle={styles.formLogin}>
                        <Text style={styles.title}>Login Screen</Text>
                        <TextInput placeholder="username.." style={styles.input} placeholderTextColor={'#7a7979ff'} value={username} onChangeText={setUsername} />
                        <TextInput placeholder="********" style={styles.input} placeholderTextColor={'#7a7979ff'} value={password} onChangeText={setPassword} secureTextEntry />
                        <Button title="Register" onPress={() => navigation.navigate('RegisterScreen')} />
                    </ScrollView>
                    <ButtonCustom title="Login" onPress={handleLogin} />
                </SafeAreaView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    formLogin: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: '600'
    },
    input: {
        width: 300, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10, borderRadius: 10
    }
});