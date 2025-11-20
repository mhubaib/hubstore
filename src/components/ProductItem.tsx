import { Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Product } from "../types/product";

export default function ProductItem({ product, onPress }: { product: Product, onPress: () => void }) {
    const { width } = useWindowDimensions()
    const insets = useSafeAreaInsets()

    const styles = StyleSheet.create({
        container: {
            padding: 10,
            borderWidth: 0.5,
            borderColor: '#b4b3b3ff',
            borderRadius: 10,
            elevation: 6,
            backgroundColor: '#fff',
            width: width / 2 - insets.left - 20
        },
        image: {
            width: "100%",
            height: 150,
            borderRadius: 8,
            borderWidth: 0.5,
            borderColor: '#b4b3b3ff',
        },
        title: {
            fontSize: 14,
            fontWeight: "bold",
            marginTop: 6,
        },
        price: {
            color: "green",
        },
        category: {
            fontSize: 12,
            color: 'gray',
            marginTop: 4,
        },
        containerCategory: {
            
        }
    });

    return (
        <TouchableOpacity activeOpacity={0.7} style={styles.container} onPress={onPress}>
            <Image
                source={{ uri: product.thumbnail }}
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>${product.price}</Text>
            <View style={styles.containerCategory}>
                <Text style={styles.category}>{product.category}</Text>
            </View>
        </TouchableOpacity>
    );
}
