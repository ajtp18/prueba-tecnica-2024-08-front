export interface product{
    id: number;
    name: string;
    price: string;
    stock: number;
}

export interface customer{
    id: number;
    name: string;
    pin: string;
}

export interface transaction{
    id: number;
    status: string;
    productId: number;
    customerId: number;
    cardIndex: number;
}