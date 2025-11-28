import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Image, ScrollView, Text, View, StyleSheet, useWindowDimensions, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getProductById } from "../api/product";
import Ionicons from "@react-native-vector-icons/ionicons";
import ButtonCustom from "../components/Button";
import { useCart } from "../contexts/cartContext";
import { Product } from "../types/product";

export default function DetailScreen() {
    const route = useRoute<any>();
    const navigation = useNavigation<any>();
    const { id } = route.params || {};
    const { width } = useWindowDimensions();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
    const { addToCart } = useCart();

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            if (!id) {
                setError("ID produk tidak ditemukan dari parameter navigasi.");
                return;
            }
            try {
                setLoading(true);
                const data = await getProductById(Number(id));
                if (mounted) setProduct(data);
            } catch (e: any) {
                if (mounted) setError(e?.message || "Gagal memuat detail produk.");
            } finally {
                if (mounted) setLoading(false);
            }
        };
        load();
        return () => { mounted = false; };
    }, [id]);

    if (loading) {
        return (
            <SafeAreaView style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#2D5F2E" />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.centerContainer}>
                <Ionicons name="alert-circle-outline" size={64} color="#FF4444" />
                <Text style={styles.errorText}>{error}</Text>
            </SafeAreaView>
        );
    }

    if (!product) {
        return (
            <SafeAreaView style={styles.centerContainer}>
                <Text style={styles.errorText}>Tidak ada data produk.</Text>
            </SafeAreaView>
        );
    }

    const images = product.images && product.images.length > 0 ? product.images : [product.thumbnail];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Product Detail</Text>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="heart-outline" size={24} color="#1A1A1A" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.imageSection}>
                    <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={(event) => {
                            const index = Math.round(event.nativeEvent.contentOffset.x / width);
                            setSelectedImageIndex(index);
                        }}
                    >
                        {images.map((img, index) => (
                            <Image
                                key={index}
                                source={{ uri: img }}
                                style={[styles.productImage, { width }]}
                                resizeMode="contain"
                            />
                        ))}
                    </ScrollView>

                    {images.length > 1 && (
                        <View style={styles.indicatorContainer}>
                            {images.map((_, index) => (
                                <View
                                    key={index}
                                    style={[
                                        styles.indicator,
                                        selectedImageIndex === index && styles.indicatorActive
                                    ]}
                                />
                            ))}
                        </View>
                    )}
                </View>

                <View style={styles.contentContainer}>
                    <View style={styles.metaRow}>
                        <View style={styles.categoryBadge}>
                            <Text style={styles.categoryText}>{product.category}</Text>
                        </View>
                        {product.stock !== undefined && (
                            <View style={[styles.stockBadge, product.stock < 5 && styles.lowStockBadge]}>
                                <Text style={[styles.stockText, product.stock < 5 && styles.lowStockText]}>
                                    {product.stock < 5 ? 'Low Stock' : `${product.stock} in stock`}
                                </Text>
                            </View>
                        )}
                    </View>

                    <Text style={styles.title}>{product.title}</Text>

                    {product.rating !== undefined && (
                        <View style={styles.ratingRow}>
                            <View style={styles.stars}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Ionicons
                                        key={star}
                                        name={star <= Math.floor(product.rating!) ? "star" : star - 0.5 <= product.rating! ? "star-half" : "star-outline"}
                                        size={18}
                                        color="#FFD700"
                                    />
                                ))}
                            </View>
                            <Text style={styles.ratingText}>{product.rating.toFixed(1)}</Text>
                        </View>
                    )}

                    <Text style={styles.price}>${product.price.toFixed(2)}</Text>

                    <View style={styles.descriptionSection}>
                        <Text style={styles.sectionTitle}>Description</Text>
                        <Text style={styles.description}>{product.description}</Text>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.bottomBar}>
                <View style={styles.priceContainer}>
                    <Text style={styles.bottomPriceLabel}>Total Price</Text>
                    <Text style={styles.bottomPrice}>${product.price.toFixed(2)}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <ButtonCustom
                        title="Add to Cart"
                        onPress={() => addToCart(product)}
                        iconLibrary="ionicons"
                        iconName="cart-outline"
                        iconSize={20}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F7FA',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F0F2F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1A1A1A',
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F0F2F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageSection: {
        backgroundColor: '#fff',
        position: 'relative',
    },
    productImage: {
        height: 360,
        backgroundColor: '#F8F9FA',
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
    },
    indicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#D0D0D0',
        marginHorizontal: 4,
    },
    indicatorActive: {
        backgroundColor: '#2D5F2E',
        width: 24,
    },
    contentContainer: {
        backgroundColor: '#fff',
        marginTop: 8,
        padding: 20,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 8,
    },
    categoryBadge: {
        backgroundColor: '#E8F5E9',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    categoryText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#2D5F2E',
        textTransform: 'capitalize',
    },
    stockBadge: {
        backgroundColor: '#E3F2FD',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    lowStockBadge: {
        backgroundColor: '#FFEBEE',
    },
    stockText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#1976D2',
    },
    lowStockText: {
        color: '#D32F2F',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 12,
        lineHeight: 32,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    stars: {
        flexDirection: 'row',
        marginRight: 8,
    },
    ratingText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    price: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2D5F2E',
        marginBottom: 24,
    },
    descriptionSection: {
        borderTopWidth: 1,
        borderTopColor: '#EEE',
        paddingTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1A1A1A',
        marginBottom: 12,
    },
    description: {
        fontSize: 15,
        lineHeight: 24,
        color: '#666',
    },
    errorText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 16,
    },
    bottomBar: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: '#EEE',
        alignItems: 'center',
        gap: 16,
    },
    priceContainer: {
        flex: 1,
    },
    bottomPriceLabel: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    bottomPrice: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2D5F2E',
    },
    buttonContainer: {
        flex: 1,
    },
});
