// Product Types — matches fake.jsonmockapi.com API response
export interface Product {
    id: number;
    productName: string;
    description: string;
    category: string;
    price: number;
    stock: number;
    manufacturer: string;
    sku: number;
    image: string;
    thumbnail: string;
}

// Redux state shape for the products slice
export interface ProductState {
    products: Product[];
    selectedProduct: Product | null;
    loading: boolean;
    error: string | null;
    currentPage: number;
}
