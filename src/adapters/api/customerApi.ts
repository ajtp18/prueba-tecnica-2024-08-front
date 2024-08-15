import { customer } from "../types/apiTypes";
import { httpClient } from "./httpClient";

export const postCustomer = async (name: string, pin: string) => {
    try {
        const response = await httpClient.post('/customer', {name, pin});
        const data: customer | undefined = response.data;
        return data;
    }catch(error){
        console.error(error);
    }
}