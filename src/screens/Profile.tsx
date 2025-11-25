import { useState } from 'react';
import { View, Button, TextInput } from 'react-native';
import { useAuth } from '../contexts/authContext';

const ProfileScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { logout } = useAuth()

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
                <Button title="Logout" onPress={handleLogout} color="red" />
            </View>
        </View>
    );
};

export default ProfileScreen;
