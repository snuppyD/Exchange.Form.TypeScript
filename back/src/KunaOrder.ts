import axios from 'axios'
import getSignature from './signature.js'
import { config } from 'dotenv'
import {
  KunaBalance,
  KunaOrder,
  KunaOrderBody,
  KunaOrderBook,
  KunaOrderBookOrder,
  KunaSymbolInfo
} from './typesComponents/kunaTypes'
import {CustomerOrder,
  OrderBody,
  PreparedSymbols,
  RequestedBalances} from './typesComponents/sharedTypes'
config()
const apiUrl = 'https://api.kuna.io:443'

class KunaOrderDataComposer {
  private _id: number;
    private symbol: string;
    private orderId: number;
    private price: string;
    private origQty: string;
    private status: string;
    private type: string;
    private side: string;
    private time: number;
    private updateTime: number;
    private stock: string;

  constructor([orderId, , , symbol, time, updateTime, side, origQty, type, , , , , status, , , price]: KunaOrder | any[], fromSearch = false) {
    if (fromSearch) {
      ;[origQty, side] = [side, origQty]
    }
    this._id = orderId
    this.symbol = symbol.toUpperCase()
    this.orderId = orderId
    this.price = price
    this.origQty = origQty
    this.status = status === 'ACTIVE' ? 'NEW' : status
    this.type = type
    this.side = Number(side) > 0 ? 'BUY' : 'SELL'
    this.time = time
    this.updateTime = updateTime
    this.stock = 'kuna'
  }
}

async function withAuth(method: string = 'post', endpoint: string = '', params: object = {}) {
  const nonce = new Date().getTime()
  const queryString = `${endpoint}${nonce}${JSON.stringify(params)}`
  const signature = getSignature(queryString, 'kuna')

  const headers = {
    "accept": 'application/json',
    'content-type': 'application/json',
    'kun-nonce': nonce,
    'kun-apikey': typeof process.env.KUNA_API_KEY === 'string' ? process.env.KUNA_API_KEY : '',
    'kun-signature': signature,
  }

  switch (method) {
    case 'post':
      return await axios.post(`${apiUrl}${endpoint}`, params, {
        headers: headers
      })
    default:
      throw new Error(`Wrong http method. Only post method available, 
            but ${method} was used`)
  }
}

export async function getLegalSymbols() {
  try {
    const preparedSymbols : PreparedSymbols =  {}
    const { data } = await withAuth('post', '/v3/auth/markets', {})
    data.forEach(({ base_unit, quote_unit }: KunaSymbolInfo) => {
      if (Object.keys(preparedSymbols).includes(base_unit.toUpperCase())) {
        preparedSymbols[base_unit.toUpperCase()].push(quote_unit.toUpperCase())
      } else {
        preparedSymbols[base_unit.toUpperCase()] = [quote_unit.toUpperCase()]
      }
    })
    return preparedSymbols
  } catch (err: any) {
    console.error(err.message, err)
    return false
  }
}

export async function getDepth(symbol: string, limit = 1) {
  const url = `${apiUrl}/v3/book/${symbol}`
  let response

  function findFirstNegative(respArray: KunaOrderBook): number {
    for (const [index, [, amount]] of Object.entries(respArray)) {
      if (amount < 0) {
        return Number(index)
      }
    }
    return 0
  }

  try {
    response = await axios.get(url)

    if (response?.status === 200) {
      const askStart = findFirstNegative(response.data)
      const bidsList = response.data.slice(0, limit <= askStart ? limit : askStart)
      const asksList = response.data.slice(askStart, askStart + limit)

      asksList.forEach((value: KunaOrderBookOrder) => {
        value[1] = value[1] * -1
      })

      if (bidsList.length > 0 && asksList.length > 0) {
        return { bids: bidsList, asks: asksList }
      } else {
        return false
      }
    } else {
      return false
    }
  } catch (err: any) {
    console.error(err.message, err)
    return false
  }
}

export async function getAveragePrice(symbol: string) {
  try {
    const { data } = await axios.get(`${apiUrl}/v3/tickers?symbols=${symbol}`)
    if (data) {
      return data[0][1]
    } else {
      return false
    }
  } catch (err: any) {
    console.error(err.message, err)
    return false
  }
}

//private

export async function getBalances(symbols: string[]) {
  const endpoint = '/v3/auth/r/wallets'

  try {
    const response = await withAuth('post', endpoint, {})
    const balances : RequestedBalances = {}
    response.data.forEach(([, symbol, , , balance]: KunaBalance) => {
      if (symbols.includes(symbol)) {
        balances[symbol] = balance
      }
    })
    return balances
  } catch (err: any) {
    console.error(err.message, err)
    return false
  }
}

export async function getActiveOrdersList(symbol: string) {
  const endpoint = `/v3/auth/r/orders`

  try {
    const response = await withAuth('post', endpoint, { market: symbol })
    return response.data
  } catch (err: any) {
    console.error(err.message, err)
    return false
  }
}

export async function getInactiveOrdersList(symbol: string) {
  const endpoint = `/v3/auth/r/orders/${symbol.toLowerCase()}/hist`

  try {
    const response = await withAuth('post', endpoint, {})
    return response.data
  } catch (err: any) {
    console.error(err.message, err)
    return false
  }
}

export async function getOrder(order: OrderBody) {
  try {
    const { symbol, orderId } = order
    let response = await getActiveOrdersList(symbol)

    for (const order_ of response) {
      if (orderId === order_[0]) {
        return new KunaOrderDataComposer(order_, true)
      }
    }

    response = await getInactiveOrdersList(symbol)

    for (const order_ of response) {
      if (orderId === order_[0]) {
        return new KunaOrderDataComposer(order_, true)
      }
    }
  } catch (err: any) {
    console.error(err.message, err)
    return false
  }
  return false
}

export async function getOrderTrades(order: OrderBody) {
  const { symbol, orderId } = order
  const endpoint = `/v3/auth/r/order/${symbol}:${orderId}/trades`

  try {
    const params = { market: symbol.toLowerCase(), order_id: orderId }
    const response = await withAuth('post', endpoint, params)
    return response.data
  } catch (err: any) {
    console.error(err.message, err)
    return false
  }
}

export async function makeOrder(order: CustomerOrder) {
  const endpoint = '/v3/auth/w/order/submit'
  const { symbol, side, type, quantity, price } = order
  const kunaOrder: KunaOrderBody = {
    symbol: symbol.toLowerCase(),
    type: type,
    amount: side === 'BUY' ? quantity : String(Number(quantity) * -1),
  }

  if (type === 'LIMIT') {
    kunaOrder['price'] = price
  }

  try {
    const response = await withAuth('post', endpoint, kunaOrder)
    const data = response.data

    if (Array.isArray(data)) {
      return new KunaOrderDataComposer(data, false)
    } else {
      return false
    }
  } catch (err: any) {
    console.error(err.message, err)
    return false
  }
}

export async function cancelOrder(order: OrderBody) {
  const endpoint = '/v3/order/cancel'
  const params = { order_id: order.orderId }
  const response = await withAuth('post', endpoint, params)

  try {
    if (response) {
      const updatedOrder = await getOrder(order)
      console.log(response)
      if (updatedOrder) {
        return updatedOrder
      }
    } else {
      return false
    }
  } catch (err: any) {
    console.error(err.message, err)
    return false
  }
}
