 export interface Product {
    id: string;
    title: string;
    brand: string;
    category: string;
    price: number;
    compareAtPrice: number;
    rating: number;
    colours: string[];
    sizes: string[];
    inStock: boolean,
    isNew: boolean,
    imageUrl: string,
    description: string
}
   
