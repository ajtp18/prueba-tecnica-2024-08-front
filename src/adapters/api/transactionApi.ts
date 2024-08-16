import { httpClient } from "./httpClient";


export const createTransaction = async (transactionData: { productId: number; customerId: number; cardIndex: number }) => {
    const response = await httpClient.post('/transactions', transactionData);
    return response.data;
};

export const getTransactionStatus = async (transactionId: number) => {
    const response = await httpClient.get(`/transactions/${transactionId}`);
    return response.data;
};