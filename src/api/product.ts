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

export const getProducts = async (options: {
    category?: string,
    search?: string,
    limit?: number,
    skip?: number,
} = {}) => {
    const { category = '', search = '', limit = 20, skip = 0 } = options;

    try {
        let endpoint = '/products'

        if (category) {
            endpoint = `/products/category/${encodeURIComponent(category)}`;
        }
        if (search) {
            endpoint = `/products/search?q=${encodeURIComponent(search)}`
        }

        const params = { limit, skip };
        const response = await axiosInstance.get(endpoint, { params });

        return response.data.products;
    } catch (err) {
        throw new Error('Error fetching products')
    }
}