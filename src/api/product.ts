import axios from "axios";

/**
 * @param {Object} options - Parameter opsional untuk filter/pagination.
 * @param {string} [options.category] - Nama kategori produk.
 * @param {string} [options.search] - Kata kunci pencarian produk.
 * @param {number} [options.limit=20] - Jumlah produk per halaman.
 * @param {number} [options.skip=0] - Offset/pagination (berapa data dilewati).
 */

const axiosInstance = axios.create({
    baseURL: 'https://dummyjson.com',
    timeout: 10000,
})

export const getProductById = async (id: number) => {
    try {
        const response = await axiosInstance.get(`/products/${id}`);
        return response.data;
    } catch (err) {
        throw new Error('Error fetching product detail: ' + (err instanceof Error ? err.message : String(err)))
    }
}

export const getProductsByCategory = async ({ category, skip = 0, limit = 20 }: { category: string, skip?: number, limit?: number }) => {
    try {
        const params = { skip, limit }
        const response = await axiosInstance.get(`/products/category/${encodeURIComponent(category)}`, { params });
        return response.data.products ?? []
    } catch (error) {
        throw new Error('Error fetching products by category' + error)
    }
}

export const getProducts = async (limit: number, skip: number) => {
    try {
        const params = { limit, skip }
        const response = await axiosInstance.get('/products', { params })
        return response.data.products
    } catch (error) {
        throw new Error('Error fetching products' + error)
    }
}

export const getProductCategories = async () => {
    try {
        const response = await axiosInstance.get('/products/categories')
        return response.data
    } catch (error) {
        throw new Error('Error fetch product categories' + error)
    }
}