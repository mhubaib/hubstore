import { useState } from "react";
import { TextInput, Text, View, Alert, StyleSheet, ScrollView, Platform, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAuth } from "../contexts/authContext";
import ButtonCustom from "../components/Button";
import Ionicons from "@react-native-vector-icons/ionicons";
import Input from "../components/Input";

export default function LoginScreen({ navigation }: NativeStackScreenProps<any>) {
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const { login, biometricLogin } = useAuth()

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

    const handleLoginBiometric = async () => {
        try {
            const result = await biometricLogin();
            if (result) {
                navigation.navigate('MainDrawer')
            } else {
                Alert.alert("Biometric authentication failed");
            }
        } catch (error) {
            console.error("Biometric login error:", error);
            Alert.alert("Error", "Biometric login failed.");
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
                        <Text style={styles.title}>Welcome Back</Text>
                        <Text style={styles.subtitle}>Sign in to continue</Text>
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
                            <ButtonCustom title="Login" onPress={handleLogin} iconLibrary="fontawesome" iconName="sign-in" iconSize={20} />
                        </View>

                        <View style={styles.registerContainer}>
                            <Text style={styles.registerText}>Don't have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                                <Text style={styles.registerLink}>Register</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.dividerContainer}>
                            <View style={styles.divider} />
                            <Text style={styles.dividerText}>OR</Text>
                            <View style={styles.divider} />
                        </View>

                        <TouchableOpacity style={styles.biometricButton} onPress={handleLoginBiometric}>
                            <Ionicons name="finger-print" size={40} color="#2D5F2E" />
                            <Text style={styles.biometricText}>Biometric Login</Text>
                        </TouchableOpacity>
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
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    registerText: {
        color: '#666',
        fontSize: 14,
    },
    registerLink: {
        color: '#2D5F2E',
        fontWeight: 'bold',
        fontSize: 14,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#E0E0E0',
    },
    dividerText: {
        marginHorizontal: 16,
        color: '#999',
        fontSize: 12,
    },
    biometricButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    biometricText: {
        marginTop: 8,
        color: '#2D5F2E',
        fontSize: 12,
        fontWeight: '500',
    },
});