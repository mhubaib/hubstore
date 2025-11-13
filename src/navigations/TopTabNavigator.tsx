import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { getProductCategories } from "../api/product";
import { useEffect, useState } from "react";
import { Text, View, ActivityIndicator, useWindowDimensions } from "react-native";
import CatalogScreen from "../screens/Catalog";

const TopTab = createMaterialTopTabNavigator();

export default function TopTabNavigator() {
    const [categories, setCategories] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const { width } = useWindowDimensions()

    const tabWidth = width * 1 / 3

    useEffect(() => {
        let isMounted = true;

        const fetch = async () => {
            try {
                setLoading(true);
                const response = await getProductCategories();

                if (isMounted && response) {
                    setCategories(response);
                }
            } catch (err) {
                if (isMounted) {
                    setError("Failed to fetch product categories" + err);
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
                <Text style={{ color: "red", textAlign: 'center' }}>{error}</Text>
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
                    width: tabWidth,
                }
            }}
        >
            {categories.map((category: string) => (
                <TopTab.Screen
                    key={category.name}
                    name={category.name}
                    children={() => (
                        <CatalogScreen category={category.name} />
                    )}
                />
            ))}
        </TopTab.Navigator>
    );
}
