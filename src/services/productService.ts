import apiClient from './apiClient';
import { Product } from '@/src/types/product';

// ------------------------------------------------------------------
// fetchProducts
// GET /products?length=12
// Returns an array of 12 random products from the mock API
// ------------------------------------------------------------------
export const fetchProducts = async (): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>('/products', {
        params: { length: 12 },
    });
    return response.data;
};

// ------------------------------------------------------------------
// fetchProductById
// GET /products/{id}
// Returns a single product object from the mock API
// ------------------------------------------------------------------
export const fetchProductById = async (id: number): Promise<Product> => {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
};
