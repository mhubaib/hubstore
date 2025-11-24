import { useState } from 'react';
import { View, Button, Alert, TextInput, TouchableOpacity } from 'react-native';
import { simplePrompt, isSensorAvailable } from '@sbaiahmed1/react-native-biometrics';
import * as Keychain from 'react-native-keychain';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useAuth } from '../contexts/authContext';

const ProfileScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { logout } = useAuth()

    // 2. Login via Biometrik
    const handleLogin = async () => {

        const creds = await Keychain.getGenericPassword({ service: '@app:credentials' });

        if (!creds) {
            Alert.alert('Anda belum mempunyai akun!', 'Login manual terlebih dahulu.');
            return;
        }

        // Cek ketersediaan dulu
        const { available } = await isSensorAvailable();
        if (!available) {
            Alert.alert('Maaf', 'Sensor tidak tersedia');
            return;
        }

        const { success } = await simplePrompt(
            'Login',
        );

        if (success) {

            // Jika sidik jari cocok, ambil password dari Keychain
            const credentials = await Keychain.getGenericPassword({ service: '@app:credentials' });
            if (credentials) {
                Alert.alert('Welcome Back!', `Halo ${credentials.username ?? 'User'}, Anda berhasil login.`);
            } else {
                Alert.alert('Info', 'Tidak ada data tersimpan. Login manual dulu.');
            }
        }
    };

    const handleLoginManual = async () => {
        try {
            if (!username || !password) {
                Alert.alert('Semua field harus diisi!')
            }
            const creds = await Keychain.setGenericPassword(username.trim(), password.trim(), {
                service: '@app:credentials'
            });
            if (creds) {
                Alert.alert('Anda bisa login menggunakan biometric sekarang!')
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleLogout = async () => {
        try {
            await logout()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <View style={{ padding: 20, flex: 1, justifyContent: 'center' }}>
            <TextInput
                placeholder="Username" value={username} onChangeText={setUsername} placeholderTextColor="gray"
                style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
            />
            <TextInput
                placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry placeholderTextColor="gray"
                style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
            />

            <View style={{ alignItems: 'center', gap: 20, marginTop: 10 }}>
                <Button title="Login Manual" onPress={handleLoginManual} color="green" />
                <Button title="Logout" onPress={handleLogout} color="red" />
                <TouchableOpacity onPress={handleLogin}>
                    <Ionicons name="finger-print" size={40} color="green" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ProfileScreen;
