export type DataBaseOrder = {
    _id: number;
    symbol: string;
    orderId: number;
    orderListId: number;
    clientOrderId: number;
    price: number;
    origQty: string;
    executedQty: string;
    cummulativeQuoteQty: string;
    status: string;
    timeInForce: string;
    type: string;
    side: string;
    stopPrice: string;
    icebergQty: string;
    time: number;
    updateTime: number;
    isWorking: boolean;
    origQuoteOrderQty: string;
    stock: string;
}

export type Filter = {
    [key: string]: string;
}

export type CompoundFilter = {
    [key: string]: Filter[];
}