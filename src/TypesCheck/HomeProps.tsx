export interface ProductListParams {
    category: any;
    isFeatured?: boolean;
    _id: string;
    images: [string];
    name: string;
    price: number;
    oldPrice: number;
    inStock?: boolean;
    color?: string;
    size?: string;
    description?: string;
    quantity: number;
}

export interface FetchProductsParam {
    data: {
        Products: ProductListParams[];
        results: ProductListParams[]
    }
}

