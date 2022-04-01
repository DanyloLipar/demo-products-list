import { Product } from "../types/Product";
const BASE_URL = 'https://my-json-server.typicode.com/DanyloLipar/products-api/products';

export const getProducts = (): Promise<Product[]> => {
    return fetch(BASE_URL)
        .then(response => response.json());
}