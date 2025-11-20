import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

interface HeaderProps {
    tintColor?: string;
}

export default function Header({ tintColor = '#000' }: HeaderProps) {
    const navigation = useNavigation<DrawerNavigationProp<any>>();
    const route = useRoute<any>();

    // Tentukan title berdasarkan route aktif
    const getTitleFromRoute = () => {
        switch (route.name) {
            case 'MainTab':
                return 'Home';
            case 'DetailScreen':
                return 'Product Detail';
            case 'SettingScreen':
                return 'Settings';
            default:
                return route.params?.title || route.name || 'Home';
        }
    };

    const title = getTitleFromRoute();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Text style={[styles.menuIcon, { color: tintColor }]}>☰</Text>
            </TouchableOpacity>
            <Text style={[styles.title, { color: tintColor }]}>{title}</Text>
            <View style={{ width: 40 }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    menuIcon: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        flex: 1,
        textAlign: 'center',
    },
});