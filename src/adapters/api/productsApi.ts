import { httpClient } from "./httpClient";
import { product } from "../types/apiTypes";

export const getProducts = async () => {
    try {
        const response = await httpClient.get('/products');
        const data: product[] = response.data;
        return data[0];
    }catch(error){
        console.error(error);
    }
}