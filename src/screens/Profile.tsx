import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BasicStorage = () => {
    const [username, setUsername] = useState('');
    const [user, setUser] = useState('');

    const saveUser = async () => {
        try {
            await AsyncStorage.setItem('@app:username', JSON.stringify(user));
            console.log('User saved');
        } catch (e) {
            console.error('Save error:', e);
        }
    };

    const loadUser = async () => {
        try {
            const usr = await AsyncStorage.getItem('@app:username');
            if (usr !== null) {
                setUsername(usr);
            }
        } catch (e) {
            console.error('Load error:', e);
        }
    };

    const removeUser = async () => {
        try {
            await AsyncStorage.removeItem('@app:username');
            setUsername('');
        } catch (e) {
            console.error('Remove error:', e);
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Username: {username}</Text>
            <TextInput style={{ borderWidth: 1, borderColor: 'black' }} placeholder='username...' onChangeText={setUser}/>
            <Button title="Save User" onPress={saveUser} />
            <Button title="Load User" onPress={loadUser} />
            <Button title="Remove User" onPress={removeUser} />
        </View>
    );
};

export default BasicStorage;