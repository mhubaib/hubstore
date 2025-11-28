import { StyleSheet, Text, TouchableOpacity } from "react-native";

type ChipProps = {
    label: string;
    selected: boolean;
    onPress: () => void;
}

export default function Chip({ label, selected, onPress }: ChipProps) {
    return (
        <TouchableOpacity
            style={[styles.chip, selected && styles.chipSelected]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
                {label}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    chip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
        backgroundColor: '#d7d9dbff',
        marginRight: 8,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    chipSelected: {
        backgroundColor: '#2D5F2E',
        borderColor: '#2D5F2E',
    },
    chipText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#666',
    },
    chipTextSelected: {
        color: '#fff',
        fontWeight: '600',
    },
});
