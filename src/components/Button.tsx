import { StyleSheet, Text, TouchableNativeFeedback, View, Platform, TouchableOpacity } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import FontAwesome from "@react-native-vector-icons/fontawesome";

interface ButtonCustomProps {
    title: string;
    onPress: () => void;
    iconLibrary?: 'fontawesome' | 'ionicons';
    iconName?: string;
    iconSize?: number;
    variant?: 'primary' | 'secondary' | 'outline';
}

export default function ButtonCustom({
    title,
    onPress,
    iconLibrary,
    iconName,
    iconSize = 20,
    variant = 'primary'
}: ButtonCustomProps) {
    const ripple = TouchableNativeFeedback.Ripple('rgba(255, 255, 255, 0.3)', false);

    const renderIcon = () => {
        if (!iconName) return null;

        const iconColor = variant === 'outline' ? '#2D5F2E' : '#fff';

        if (iconLibrary === 'fontawesome') {
            return <FontAwesome name={iconName as any} size={iconSize} color={iconColor} style={styles.icon} />;
        } else if (iconLibrary === 'ionicons') {
            return <Ionicons name={iconName as any} size={iconSize} color={iconColor} style={styles.icon} />;
        }
        return null;
    };

    const buttonStyle = [
        styles.button,
        variant === 'secondary' && styles.buttonSecondary,
        variant === 'outline' && styles.buttonOutline,
    ];

    const textStyle = [
        styles.buttonText,
        variant === 'outline' && styles.buttonTextOutline,
    ];

    // Gunakan TouchableOpacity untuk iOS
    if (Platform.OS === 'ios') {
        return (
            <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
                <View style={buttonStyle}>
                    {renderIcon()}
                    <Text style={textStyle}>{title}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    // Gunakan TouchableNativeFeedback untuk Android
    return (
        <TouchableNativeFeedback
            onPress={onPress}
            background={ripple}
            useForeground={true}
        >
            <View style={buttonStyle}>
                {renderIcon()}
                <Text style={textStyle}>{title}</Text>
            </View>
        </TouchableNativeFeedback>
    );
}

const styles = StyleSheet.create({
    button: {
        minWidth: 300,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#2D5F2E',
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        paddingHorizontal: 20,
    },
    buttonSecondary: {
        backgroundColor: '#4A8B4D',
    },
    buttonOutline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#2D5F2E',
        elevation: 0,
        shadowOpacity: 0,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        letterSpacing: 0.5,
    },
    buttonTextOutline: {
        color: '#2D5F2E',
    },
    icon: {
        marginRight: 8,
    }
});