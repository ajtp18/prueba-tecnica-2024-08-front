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


export const getCustomerId = async (customerId: number): Promise<number | undefined> => {
    try {
        const response = await httpClient.get(`/customer/${customerId}`);
        return response.data.productId;
    } catch (error) {
        console.error('Error fetching customer product ID:', error);
        return undefined;
    }

}


export const patchCustomerAddCard = async (customerId: number, number: string, cvc: string, exp_month: string, exp_year: string, card_holder: string): Promise<number | undefined> => {
    try {
        const response = await httpClient.patch(`/customer/${customerId}/addCard`, {number, cvc, exp_month, exp_year, card_holder});
        return response.data;
    } catch (error) {
        console.error('Error fetching customer product ID:', error);
        return undefined;
    }

}

