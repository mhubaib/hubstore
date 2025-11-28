import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCart } from "../contexts/cartContext";
import Ionicons from "@react-native-vector-icons/ionicons";
import ButtonCustom from "../components/Button";
import { useMemo } from "react";

export default function CartScreen() {
    const { cartItems, removeFromCart, clearCart } = useCart();

    const summary = useMemo(() => {
        const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
        const tax = subtotal * 0.1;
        const shipping = cartItems.length > 0 ? 5.00 : 0;
        const total = subtotal + tax + shipping;

        return { subtotal, tax, shipping, total };
    }, [cartItems]);

    const renderEmptyCart = () => (
        <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
                <Ionicons name="cart-outline" size={80} color="#CCC" />
            </View>
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.emptySubtitle}>Add some products to get started</Text>
        </View>
    );

    const renderCartItem = ({ item }: { item: any }) => (
        <View style={styles.cartItem}>
            <Image source={{ uri: item.thumbnail }} style={styles.itemImage} resizeMode="contain" />

            <View style={styles.itemDetails}>
                <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.itemCategory}>{item.category}</Text>

                <View style={styles.itemFooter}>
                    <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => removeFromCart(item.id)}
            >
                <Ionicons name="trash-outline" size={20} color="#FF4444" />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Shopping Cart</Text>
                {cartItems.length > 0 && (
                    <TouchableOpacity onPress={clearCart} style={styles.clearButtonContainer}>
                        <Text style={styles.clearButton}>Clear All</Text>
                    </TouchableOpacity>
                )}
            </View>

            {cartItems.length === 0 ? (
                renderEmptyCart()
            ) : (
                <>
                    <FlatList
                        data={cartItems}
                        renderItem={renderCartItem}
                        keyExtractor={(item, index) => `${item.id}-${index}`}
                        contentContainerStyle={styles.listContainer}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                    />

                    <View style={styles.summaryContainer}>
                        <View style={styles.summaryCard}>
                            <Text style={styles.summaryTitle}>Order Summary</Text>

                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Subtotal ({cartItems.length} items)</Text>
                                <Text style={styles.summaryValue}>${summary.subtotal.toFixed(2)}</Text>
                            </View>

                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Tax (10%)</Text>
                                <Text style={styles.summaryValue}>${summary.tax.toFixed(2)}</Text>
                            </View>

                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Shipping</Text>
                                <Text style={styles.summaryValue}>${summary.shipping.toFixed(2)}</Text>
                            </View>

                            <View style={styles.divider} />

                            <View style={styles.summaryRow}>
                                <Text style={styles.totalLabel}>Total</Text>
                                <Text style={styles.totalValue}>${summary.total.toFixed(2)}</Text>
                            </View>
                        </View>

                        <View style={styles.checkoutButtonContainer}>
                            <ButtonCustom
                                title="Proceed to Checkout"
                                onPress={() => { }}
                                iconLibrary="ionicons"
                                iconName="checkmark-circle-outline"
                                iconSize={20}
                            />
                        </View>
                    </View>
                </>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    emptyIconContainer: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: '#F0F2F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    listContainer: {
        padding: 16,
    },
    cartItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        elevation: 2,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        backgroundColor: '#F8F9FA',
    },
    itemDetails: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'space-between',
    },
    itemTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1A1A1A',
        marginBottom: 4,
    },
    itemCategory: {
        fontSize: 12,
        color: '#888',
        textTransform: 'capitalize',
        marginBottom: 8,
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2D5F2E',
    },
    deleteButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#FFEBEE',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    separator: {
        height: 12,
    },
    summaryContainer: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#EEE',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 16,
    },
    summaryCard: {
        marginBottom: 16,
    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 16,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    summaryLabel: {
        fontSize: 14,
        color: '#666',
    },
    summaryValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1A1A1A',
    },
    divider: {
        height: 1,
        backgroundColor: '#EEE',
        marginVertical: 12,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    totalValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2D5F2E',
    },
    checkoutButtonContainer: {
        marginTop: 8,
    },
    clearButtonContainer: {
        backgroundColor: '#FF4444',
        padding: 8,
        borderRadius: 8,
        alignItems: 'center',
    },
    clearButton: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    }
});