// Product Types
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    stock: number;
}

export interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
}
