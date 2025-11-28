import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Product } from '../types/product';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';

interface WishlistContextType {
    wishlistItems: Product[];
    addToWishlist: (item: Product) => void;
    removeFromWishlist: (id: number) => void;
    isInWishlist: (id: number) => boolean;
    clearWishlist: () => void;
    loading: boolean;
    error: string | null;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export const WISHLIST_KEY = '@wishlist_products';

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
    const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadWishlist = async () => {
            try {
                setLoading(true);
                const storedWishlist = await AsyncStorage.getItem(WISHLIST_KEY);
                if (storedWishlist) {
                    setWishlistItems(JSON.parse(storedWishlist));
                }
            } catch (error) {
                console.error('Failed to load wishlist:', error);
                setError('Failed to load wishlist');
            } finally {
                setLoading(false);
            }
        };
        loadWishlist();
    }, []);

    const addToWishlist = (item: Product) => {
        try {
            setLoading(true);
            const newWishlist = [...wishlistItems, item];
            AsyncStorage.setItem(WISHLIST_KEY, JSON.stringify(newWishlist));
            setWishlistItems(newWishlist);
            ToastAndroid.show('Added to wishlist', ToastAndroid.SHORT);
        } catch (error) {
            console.error('Failed to add to wishlist:', error);
            setError('Failed to add to wishlist');
        } finally {
            setLoading(false);
        }
    };

    const removeFromWishlist = (id: number) => {
        try {
            setLoading(true);
            const newWishlist = wishlistItems.filter((item) => item.id !== id);
            AsyncStorage.setItem(WISHLIST_KEY, JSON.stringify(newWishlist));
            setWishlistItems(newWishlist);
            ToastAndroid.show('Removed from wishlist', ToastAndroid.SHORT);
        } catch (error) {
            console.error('Failed to remove from wishlist:', error);
            setError('Failed to remove from wishlist');
        } finally {
            setLoading(false);
        }
    };

    const isInWishlist = (id: number) => {
        return wishlistItems.some((item) => item.id === id);
    };

    const clearWishlist = () => {
        try {
            setLoading(true);
            AsyncStorage.removeItem(WISHLIST_KEY);
            setWishlistItems([]);
            ToastAndroid.show('Wishlist cleared', ToastAndroid.SHORT);
        } catch (error) {
            console.error('Failed to clear wishlist:', error);
            setError('Failed to clear wishlist');
        } finally {
            setLoading(false);
        }
    };

    return (
        <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist, clearWishlist, loading, error }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};
