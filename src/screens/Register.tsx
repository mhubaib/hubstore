import { useState } from "react";
import { TextInput, Text, View, Alert, StyleSheet, ScrollView, Platform, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAuth } from "../contexts/authContext";
import ButtonCustom from "../components/Button";
import Ionicons from "@react-native-vector-icons/ionicons";
import Input from "../components/Input";

export default function RegisterScreen({ navigation }: NativeStackScreenProps<any>) {
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const { register } = useAuth()

    const handleRegister = async () => {
        if (!username || !password) {
            Alert.alert("Error", "Username and password cannot be empty.");
            return;
        }
        try {
            const response = await register(username, password)
            if (response) {
                Alert.alert("Success", "Account created successfully", [
                    { text: "OK", onPress: () => navigation.navigate('LoginScreen') }
                ]);
            } else {
                Alert.alert("Error", "Registration failed");
            }
        } catch (error) {
            console.error("Registration error:", error);
            Alert.alert("Error", "An unexpected error occurred");
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Create Account</Text>
                        <Text style={styles.subtitle}>Sign up to get started</Text>
                    </View>

                    <View style={styles.card}>
                        <Input
                            placeholder="Username"
                            value={username}
                            onChangeText={setUsername}
                            icon="person-outline"
                        />

                        <Input
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            icon="lock-closed-outline"
                            type="password"
                        />

                        <View style={styles.buttonContainer}>
                            <ButtonCustom title="Register" onPress={handleRegister} iconLibrary="ionicons" iconName="person-add-outline" iconSize={20} />
                        </View>

                        <View style={styles.loginContainer}>
                            <Text style={styles.loginText}>Already have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                                <Text style={styles.loginLink}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    header: {
        marginBottom: 30,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    buttonContainer: {
        marginTop: 8,
        marginBottom: 16,
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginText: {
        color: '#666',
        fontSize: 14,
    },
    loginLink: {
        color: '#2D5F2E',
        fontWeight: 'bold',
        fontSize: 14,
    },
});