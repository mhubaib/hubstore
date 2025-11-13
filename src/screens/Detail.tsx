import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Image, ScrollView, Text } from "react-native";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { getProductById } from "../api/product";

type ProductDetail = {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    rating?: number;
    stock?: number;
    thumbnail: string;
    images?: string[];
}

export default function DetailScreen() {
    const route = useRoute<any>();
    const { id } = route.params || {};

    const [product, setProduct] = useState<ProductDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

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
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'red' }}>{error}</Text>
            </SafeAreaView>
        );
    }

    if (!product) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Tidak ada data produk.</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                <Image
                    source={{ uri: product.thumbnail }}
                    style={{ width: '100%', height: 240, borderRadius: 8, marginBottom: 16 }}
                    resizeMode="cover"
                />
                <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 8 }}>{product.title}</Text>
                <Text style={{ fontSize: 16, color: '#666', marginBottom: 8 }}>{product.category}</Text>
                <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 12 }}>${product.price}</Text>
                <Text style={{ fontSize: 14, lineHeight: 20 }}>{product.description}</Text>
            </ScrollView>
        </SafeAreaView>
    )
}
