export type KunaOrderBody = {
    [key: string]: string;
}

export type KunaOrder = [
    orderI: number,
    unused: null,
    unused: null,
    symbol: string,
    createTime: number,
    updateTime: number,
    orderVolume: string,
    initialOrderVolume: string,
    orderType: string,
    unused: null,
    unused: null,
    unused: null,
    unused: null,
    orderStatus: string,
    unused: null,
    unused: null,
    orderPrice: string,
    orderMiddlePrice: string,
];

export type KunaSymbolInfo = {
    id: string;
    base_unit: string;
    quote_unit: string;
    base_precision: number;
    quote_precision: number;
    display_precision: number;
    price_change: number;
}

export type KunaOrderBookOrder = [
    price: number,
    volume: number,
    side: number
];

export type KunaOrderBook = [ KunaOrderBookOrder ];

export type KunaBalance = [
  exchange: string,
  symbol: string,
  ballance: number,
  unused: null,
  availableAssets: number,
];

export type KunaBalances = [ KunaBalance ]