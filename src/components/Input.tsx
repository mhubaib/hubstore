import Ionicons, { IoniconsIconName } from "@react-native-vector-icons/ionicons";
import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

type InputProps = {
    placeholder: string,
    value: string,
    onChangeText: (text: string) => void,
    icon?: IoniconsIconName
    type?: 'email' | 'password'
}

export default function Input({ placeholder, value, onChangeText, icon, type }: InputProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }

    const password = type === 'password'

    return (
        <View style={styles.inputContainer}>
            {icon && <Ionicons name={icon} size={20} color="#666" style={styles.inputIcon} />}
            <TextInput
                placeholder={placeholder}
                style={styles.input}
                placeholderTextColor="#999"
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={password ? !isPasswordVisible : false}
            />
            {password && (
                <TouchableOpacity onPress={togglePasswordVisibility}>
                    <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={20} color="#666" />
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F2F5',
        borderRadius: 12,
        marginBottom: 16,
        paddingHorizontal: 16,
        height: 50,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        color: '#333',
        fontSize: 16,
    },
    iconContainer: {
        position: 'absolute',
        right: 16,
        top: 16,
    },
})
