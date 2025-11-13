import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProductItem from "../components/ProductItem";
import { useEffect, useState } from "react";
import { getProductsByCategory } from "../api/product";

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


export default function CatalogScreen({ category }: { category: string }) {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [products, setProducts] = useState<Product[]>([])
    const insets = useSafeAreaInsets()
    const navigation = useNavigation<any>()

    useEffect(() => {
        let isMounted = true

        const fetch = async () => {
            try {
                if (isMounted) {
                    setError(null)
                    setLoading(true)
                    const result = await getProductsByCategory({ category, limit: 30 });
                    setProducts(result);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : 'Failed to fetch products')
                }
            } finally {
                setLoading(false)
            }
        }

        fetch()

        return () => { isMounted = false }
    }, [category])

    const pushToDetail = ({ id }: { id: number }) => {
        navigation.navigate("DetailScreen", { id });
    }

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
                <Text style={{ color: "red", textAlign: 'center' }}>{error}</Text>
            </View>
        );
    }


    if (products.length === 0) {
        return (
            <View
                style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            >
                <ActivityIndicator size="large" />
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={products}
                numColumns={2}
                contentContainerStyle={{ padding: insets.left + 15, gap: 15, columnGap: 20 }}
                columnWrapperStyle={{ justifyContent: "space-evenly", gap: 10 }}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <ProductItem product={item} onPress={() => pushToDetail(item)} />}
            />
        </View>
    );
};
