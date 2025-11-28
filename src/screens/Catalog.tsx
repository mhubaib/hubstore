import { useNavigation } from "@react-navigation/native";
import {
    ActivityIndicator,
    RefreshControl,
    Text,
    TextInput,
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductItem from "../components/ProductItem";
import Chip from "../components/Chip";
import { useCallback, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product } from "../types/product";
import { getProducts } from "../api/product";
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import FontAwesome from "@react-native-vector-icons/fontawesome";
import Ionicons from "@react-native-vector-icons/ionicons";

const HEADER_MAX = 160;
const HEADER_MIN = 90;

export default function CatalogScreen() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const navigation = useNavigation<any>();
    const scrollY = useSharedValue(0)

    const fetch = useCallback(async () => {
        try {
            setError(null);
            setLoading(true);
            const localProducts = await AsyncStorage.getItem(`@app:products`);
            if (localProducts) {
                setProducts(JSON.parse(localProducts));
            } else {
                const result = await getProducts();
                setProducts(result);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to fetch products");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            fetch();
        }
        return () => {
            isMounted = false;
        };
    }, []);

    const onScroll = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y
        }
    })

    const headerStyle = useAnimatedStyle(() => {
        const height = interpolate(
            scrollY.value,
            [0, HEADER_MAX - HEADER_MIN],
            [HEADER_MAX, HEADER_MIN],
            Extrapolation.CLAMP
        )
        return { height }
    })

    const addressStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            scrollY.value,
            [0, 40],
            [1, 0],
            Extrapolation.CLAMP
        );
        const translateY = interpolate(
            scrollY.value,
            [0, 60],
            [0, -20],
            Extrapolation.CLAMP
        );
        return {
            opacity,
            transform: [{ translateY }],
        };
    });

    const pushToDetail = useCallback((id: number) => {
        navigation.navigate("DetailScreen", { id });
    }, [navigation]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            fetch();
            setRefreshing(false);
        }, 1000);
    }, [fetch]);

    const categories = useMemo(() => {
        const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
        return ['All', ...uniqueCategories];
    }, [products]);

    const filteredProducts = useMemo(() => {
        let filtered = products;

        if (selectedCategory !== 'All') {
            filtered = filtered.filter((product) => product.category === selectedCategory);
        }

        if (searchQuery) {
            filtered = filtered.filter((product) =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return filtered;
    }, [products, searchQuery, selectedCategory]);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
            </View>
        );
    }

    if (products.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
            <Animated.View style={[styles.headerContainer, headerStyle]}>

                <Animated.View style={[styles.addressContainer, addressStyle]}>
                    <TouchableOpacity style={styles.rightButton} onPress={() => navigation.navigate('WishlistScreen')}>
                        <Ionicons name="heart-outline" size={30} color="#ff0303ff" />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.title}>Solutions for your needs</Text>
                        <Text style={styles.address}>Mini E-Commerce</Text>
                    </View>
                    <TouchableOpacity style={styles.leftButton} onPress={() => navigation.navigate('NotificationScreen')}>
                        <FontAwesome name="bell" size={30} color="#f3bf13ff" />
                    </TouchableOpacity>
                </Animated.View>

                <View style={styles.searchWrapper}>
                    <FontAwesome name="search" size={20} color="#5e5c5cff" />
                    <TextInput
                        placeholder="Search the entire shop"
                        style={styles.searchInput}
                        placeholderTextColor={'#131212ff'}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </Animated.View>

            <Animated.FlatList
                data={filteredProducts}
                numColumns={2}
                onScroll={onScroll}
                scrollEventThrottle={16}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} progressViewOffset={HEADER_MAX} />
                }
                contentContainerStyle={styles.containerStyle}
                columnWrapperStyle={styles.wrapperStyle}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ProductItem product={item} onPress={() => pushToDetail(item.id)} />
                )}
                ListHeaderComponent={
                    <View style={styles.headerList}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.chipContainer}
                        >
                            {categories.map((category) => (
                                <Chip
                                    key={category}
                                    label={category}
                                    selected={selectedCategory === category}
                                    onPress={() => setSelectedCategory(category)}
                                />
                            ))}
                        </ScrollView>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    containerStyle: {
        paddingTop: HEADER_MAX,
        padding: 15,
        gap: 15,
    },
    wrapperStyle: {
        gap: 10
    },
    headerContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        backgroundColor: 'white',
        zIndex: 100,
        paddingHorizontal: 16,
        paddingBottom: 10,
        justifyContent: 'flex-end',
        borderBottomWidth: 1,
        borderColor: '#EEE',
    },
    addressContainer: {
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 14,
        color: '#999',
    },
    address: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '700',
    },
    searchWrapper: {
        flexDirection: 'row',
        backgroundColor: '#F3F3F3',
        borderRadius: 12,
        height: 45,
        gap: 5,
        alignItems: 'center',
        paddingHorizontal: 18,
    },
    searchInput: {
        flex: 1,
        color: '#131212ff',
        fontSize: 14,
    },
    rightButton: {
        backgroundColor: 'rgba(170, 167, 167, 0.3)',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
    },
    leftButton: {
        backgroundColor: 'rgba(170, 167, 167, 0.3)',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
    },
    headerList: {
        marginBottom: 16,
    },
    chipContainer: {
        paddingRight: 15,
    },
});