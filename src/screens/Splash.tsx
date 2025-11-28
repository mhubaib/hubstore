import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

export default function SplashScreen() {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.3)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    tension: 20,
                    friction: 7,
                    useNativeDriver: true,
                }),
            ]),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 600,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.logoContainer,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }],
                    },
                ]}
            >
                <View style={styles.iconWrapper}>
                    <Ionicons name="cart" size={80} color="#fff" />
                </View>
                <Animated.View
                    style={{
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }],
                    }}
                >
                    <Text style={styles.appName}>HubStore</Text>
                    <Text style={styles.tagline}>Shop Smart, Live Better</Text>
                </Animated.View>
            </Animated.View>

            <Animated.View
                style={[
                    styles.footer,
                    {
                        opacity: fadeAnim,
                    },
                ]}
            >
                <View style={styles.loadingContainer}>
                    <View style={styles.loadingBar}>
                        <Animated.View
                            style={[
                                styles.loadingProgress,
                                {
                                    width: fadeAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['0%', '100%'],
                                    }),
                                },
                            ]}
                        />
                    </View>
                </View>
                <Text style={styles.footerText}>Version 1.0.0</Text>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2D5F2E',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 100,
    },
    iconWrapper: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
        borderWidth: 3,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    appName: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        letterSpacing: 1,
        marginBottom: 8,
    },
    tagline: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.9)',
        textAlign: 'center',
        letterSpacing: 0.5,
    },
    footer: {
        position: 'absolute',
        bottom: 60,
        alignItems: 'center',
        width: '100%',
    },
    loadingContainer: {
        width: '60%',
        marginBottom: 16,
    },
    loadingBar: {
        height: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 2,
        overflow: 'hidden',
    },
    loadingProgress: {
        height: '100%',
        backgroundColor: '#fff',
        borderRadius: 2,
    },
    footerText: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.7)',
        letterSpacing: 0.5,
    },
});
