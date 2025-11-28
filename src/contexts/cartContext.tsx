import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Product } from '../types/product';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';

interface CartContextType {
    cartItems: Product[];
    addToCart: (item: Product) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    loading: boolean;
    error: string | null;
}

const CartContext = createContext<CartContextType | null>(null);

const PRODUCT_KEY = '@cart_products';

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                const storedProducts = await AsyncStorage.getItem(PRODUCT_KEY);
                if (storedProducts) {
                    setCartItems(JSON.parse(storedProducts));
                }
            } catch (error) {
                console.error('Failed to load products:', error);
                setError('Failed to load products');
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    const addToCart = (item: Product) => {
        try {
            setLoading(true);
            AsyncStorage.setItem(PRODUCT_KEY, JSON.stringify([...cartItems, item]));
            setCartItems((prevItems) => [...prevItems, item]);
        } catch (error) {
            console.error('Failed to add product to cart:', error);
            setError('Failed to add product to cart');
        } finally {
            setLoading(false);
            ToastAndroid.show('Product added to cart', ToastAndroid.SHORT);
        }
    };

    const removeFromCart = (id: number) => {
        try {
            setLoading(true);
            AsyncStorage.setItem(PRODUCT_KEY, JSON.stringify(cartItems.filter((item) => item.id !== id)));
            setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
        } catch (error) {
            console.error('Failed to remove product from cart:', error);
            setError('Failed to remove product from cart');
        } finally {
            setLoading(false);
            ToastAndroid.show('Product removed from cart', ToastAndroid.SHORT);
        }
    };

    const clearCart = () => {
        try {
            setLoading(true);
            AsyncStorage.removeItem(PRODUCT_KEY);
            setCartItems([]);
        } catch (error) {
            console.error('Failed to clear cart:', error);
            setError('Failed to clear cart');
        } finally {
            setLoading(false);
            ToastAndroid.show('Cart cleared', ToastAndroid.SHORT);
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, loading, error }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};