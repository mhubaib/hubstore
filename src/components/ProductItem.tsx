import { Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View, Platform } from "react-native";
import { Product } from "../types/product";
import Ionicons from "@react-native-vector-icons/ionicons";

export default function ProductItem({ product, onPress }: { product: Product, onPress: () => void }) {
    const { width } = useWindowDimensions();

    const cardWidth = (width - 40) / 2;

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.container, { width: cardWidth }]}
            onPress={onPress}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: product.thumbnail }}
                    style={styles.image}
                    resizeMode="contain"
                />
                <View style={styles.badgeContainer}>
                    {product.stock < 5 && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>Low Stock</Text>
                        </View>
                    )}
                </View>
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.categoryRow}>
                    <Text style={styles.category} numberOfLines={1}>{product.category}</Text>
                    <View style={styles.ratingContainer}>
                        <Ionicons name="star" size={12} color="#FFD700" />
                        <Text style={styles.ratingText}>{product.rating}</Text>
                    </View>
                </View>

                <Text style={styles.title} numberOfLines={2}>{product.title}</Text>

                <View style={styles.footer}>
                    <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                    <View style={styles.addButton}>
                        <Ionicons name="add" size={20} color="#fff" />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 16,
        elevation: 4,
        overflow: 'hidden',
    },
    imageContainer: {
        height: 160,
        backgroundColor: '#F8F9FA',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    badgeContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    badge: {
        backgroundColor: '#FF4444',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    badgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    contentContainer: {
        padding: 12,
    },
    categoryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    category: {
        fontSize: 12,
        color: '#888',
        textTransform: 'capitalize',
        flex: 1,
        marginRight: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF9E6',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    ratingText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#333',
        marginLeft: 4,
    },
    title: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1A1A1A',
        marginBottom: 12,
        lineHeight: 20,
        height: 40, // Fixed height for 2 lines alignment
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2D5F2E',
    },
    addButton: {
        backgroundColor: '#2D5F2E',
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
