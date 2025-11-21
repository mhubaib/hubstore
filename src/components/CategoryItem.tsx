import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

type CategoryItemProps = {
    name: string
    icon: any
    onPress: () => void
}

export default function CategoryItem({name, icon, onPress}: CategoryItemProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.button}
        >
            <View style={styles.innerContainer}>
                <Text style={styles.icon}>{icon}</Text>
            </View>
            <Text style={styles.name}>{name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
    },
    innerContainer: {
        width: 60,
        height: 60,
        backgroundColor: '#f0f0f0',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8
    },
    icon: {
        fontSize: 24,
    },
    name: {
        fontSize: 12,
        color: '#666',
    }
})
