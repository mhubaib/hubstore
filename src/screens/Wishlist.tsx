import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWishlist } from "../contexts/wishlistContext";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../contexts/cartContext";
import ProductItem from "../components/ProductItem";

export default function WishlistScreen() {
    const { wishlistItems, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();
    const navigation = useNavigation<any>();

    const handleRemoveFromWishlist = (id: number) => {
        Alert.alert('Remove from wishlist', 'Are you sure you want to remove this item?', [
            {
                text: 'Cancel',
                style: 'cancel'
            },
            {
                text: 'Remove',
                style: 'destructive',
                onPress: () => removeFromWishlist(id)
            }
        ]);
    };

    const handleAddToCart = (item: any) => {
        addToCart(item);
    };

    const renderEmptyWishlist = () => (
        <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
                <Ionicons name="heart-outline" size={80} color="#CCC" />
            </View>
            <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
            <Text style={styles.emptySubtitle}>Add products you love to your wishlist</Text>
        </View>
    );

    const renderWishlistItem = ({ item }: { item: any }) => (
        <ProductItem product={item} onPress={() => navigation.navigate('DetailScreen', { id: item.id })} />
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Wishlist</Text>
                <View style={styles.headerRight}>
                    <Text style={styles.itemCount}>{wishlistItems.length} items</Text>
                </View>
            </View>

            {wishlistItems.length === 0 ? (
                renderEmptyWishlist()
            ) : (
                <FlatList
                    data={wishlistItems}
                    renderItem={renderWishlistItem}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    contentContainerStyle={styles.listContainer}
                    columnWrapperStyle={styles.columnWrapper}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
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
    headerRight: {
        width: 40,
        alignItems: 'flex-end',
    },
    itemCount: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
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
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    productCard: {
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 3,
    },
    imageContainer: {
        height: 160,
        backgroundColor: '#F8F9FA',
        position: 'relative',
    },
    productImage: {
        width: '100%',
        height: '100%',
    },
    removeButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: '#fff',
        borderRadius: 14,
    },
    productInfo: {
        padding: 12,
    },
    productCategory: {
        fontSize: 11,
        color: '#888',
        textTransform: 'capitalize',
        marginBottom: 4,
    },
    productTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1A1A1A',
        marginBottom: 8,
        height: 36,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    ratingText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#333',
        marginLeft: 4,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2D5F2E',
    },
    addToCartButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#2D5F2E',
        justifyContent: 'center',
        alignItems: 'center',
    },
});