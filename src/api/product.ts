import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosInstance = axios.create({
    baseURL: 'https://dummyjson.com',
    timeout: 10000,
})

export const getProductById = async (id: number) => {
    try {
        const response = await axiosInstance.get(`/products/${id}`);
        await AsyncStorage.setItem(`@app:product_${id}`, JSON.stringify(response.data));
        return response.data;
    } catch (err) {
        throw new Error('Error fetching product detail: ' + (err instanceof Error ? err.message : String(err)))
    }
}

export const getProducts = async () => {
    try {
        const response = await axiosInstance.get('/products')
        await AsyncStorage.setItem(`@app:products`, JSON.stringify(response.data.products));
        return response.data.products
    } catch (error) {
        throw new Error('Error fetch product categories' + error)
    }
}