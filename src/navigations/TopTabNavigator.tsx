import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { getProducts } from "../api/product";
import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FlatList, Text, View, ActivityIndicator, Dimensions } from "react-native";
import ProductItem from "../components/ProductItem";

const TopTab = createMaterialTopTabNavigator();

export type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    rating: number;
    stock: number;
    thumbnail: string;
    images: string[];
};

const ProductList = ({ products }: { products: Product[] }) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={products}
                numColumns={2}
                contentContainerStyle={{ padding: insets.left + 15, gap: 15, columnGap: 20 }}
                columnWrapperStyle={{ justifyContent: "space-evenly", gap: 10 }}   
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <ProductItem product={item} />}
            />
        </View>
    );
};

export default function TopTabNavigator() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        let isMounted = true;

        const fetch = async () => {
            try {
                setLoading(true);
                const response = await getProducts();

                if (isMounted && response) {
                    setProducts(response);

                    const uniqueCategories = Array.from(
                        new Set(response.map((p: any) => p.category))
                    );
                    setCategories(["All", ...uniqueCategories]);
                }
            } catch (err) {
                if (isMounted) {
                    setError("Failed to fetch products " + err);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetch();

        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) {
        return (
            <View
                style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            >
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (error) {
        return (
            <View
                style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            >
                <Text style={{ color: "red" }}>{error}</Text>
            </View>
        );
    }

    if (categories.length === 0) {
        return <ActivityIndicator />;
    }

    return (
        <TopTab.Navigator
            screenOptions={{
                tabBarScrollEnabled: true,
                lazy: true,
                tabBarItemStyle: {
                    width: Dimensions.get('window').width * 1 / 3,
                }
            }}
        >
            {categories.map((category) => (
                <TopTab.Screen
                    key={category}
                    name={category}
                    children={() => (
                        <ProductList
                            products={
                                category === "All"
                                    ? products
                                    : products.filter(
                                        (p) => p.category === category
                                    )
                            }
                        />
                    )}
                />
            ))}
        </TopTab.Navigator>
    );
}
