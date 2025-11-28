export type Product = {
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

