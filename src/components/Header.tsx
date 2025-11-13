import { StyleSheet, Text, useWindowDimensions, View } from "react-native";

export default function Header({ title }: { title: string }) {
    const height = useWindowDimensions()


    const styles = StyleSheet.create({
        header: {
            height: height * 10 / 100
        }
    })

    return (
        <View style={styles.header}>
            <Text>{title}</Text>
        </View>
    )
}
