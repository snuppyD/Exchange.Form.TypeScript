export type RequestedBalances = {
    [key: string]: string | number;
}

export type PreparedSymbols = {
    [key: string]: string[];
}

export type CustomerOrder = {
    symbol: string,
    side: string,
    type: string,
    quantity: string,
    price: string,
    timeInForce?: string,
}

export type OrderBody = {
    symbol: string;
    orderId: number;
}