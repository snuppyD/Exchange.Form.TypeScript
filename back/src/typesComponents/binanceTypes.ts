export type BinanceOrder = {
    "symbol": string;
    "orderId": number;
    "orderListId": number;
    "clientOrderId": string;
    "price": string;
    "origQty": string;
    "executedQty": string;
    "cummulativeQuoteQty": string;
    "status": string;
    "timeInForce": string;
    "type": string;
    "side": string;
    "stopPrice": string;
    "icebergQty": string;
    "time": number;
    "updateTime": number;
    "isWorking": boolean;
    "origQuoteOrderQty": string;
}

export type BinanceServerTime = {
    serverTime: number;
}

export type BinanceBalances = {
    asset: string;
    free: string;
    locked: string;
}

export type BinanceSymbolInfo = {
    "symbol": string;
    "status": string;
    "baseAsset": string;
    "baseAssetPrecision": number;
    "quoteAsset": string;
    "quotePrecision": number;
    "quoteAssetPrecision": number;
    "orderTypes": string[];
    "icebergAllowed": boolean;
    "ocoAllowed": boolean;
    "quoteOrderQtyMarketAllowed": boolean;
    "allowTrailingStop": boolean;
    "cancelReplaceAllowed": boolean;
    "isSpotTradingAllowed": boolean;
    "isMarginTradingAllowed": boolean;
    "filters": object[];
    "permissions": string[];
}