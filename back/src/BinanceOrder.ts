import axios, {AxiosResponse} from 'axios'
import getSignature from './signature'
import { BinanceBalances, BinanceSymbolInfo } from './typesComponents/binanceTypes'
import { config } from 'dotenv'
import { OrderBody,
  CustomerOrder,
  PreparedSymbols,
  RequestedBalances } from './typesComponents/sharedTypes'
config()
const apiUrl = 'https://testnet.binance.vision/api/v3'

async function getBinanceTime() {
  const endpointUrl = `${apiUrl}/time`
  const response = await axios.get(endpointUrl)
  return response.data
}

async function binanceWithAuth(method: string = 'get', endpoint : string = 'ping', params_: object = {}): Promise<AxiosResponse<any>> {
  const { serverTime } = await getBinanceTime()
  const baseParameters = Object.assign({}, { timestamp: serverTime }, params_)
  const toStringParameters = Object.entries(baseParameters)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')

  const signature = getSignature(toStringParameters, 'binance')

  const parameters = Object.assign({}, baseParameters, { signature })
  const headers = {
    'X-MBX-APIKEY': typeof process.env.BINANCE_API_KEY === 'string'
    ? process.env.BINANCE_API_KEY
    : '',
  }

  switch (method) {
    case 'get':
      return axios.get(apiUrl + endpoint, {
        headers,
        params: parameters,
      })
    case 'post':
      return axios.post(apiUrl + endpoint, false, {
        headers,
        params: parameters,
      })
    case 'delete':
      return axios.delete(apiUrl + endpoint, {
        headers,
        params: parameters,
      })
    default:
      console.log('error')
  }

  return new Promise((resolve, reject) => {
    reject(false)
  })
}

export async function getAveragePrice(symbol: string) {
  try {
    const response = await axios.get(apiUrl + `/avgPrice`, {
      params: {
        symbol: symbol,
      },
    })
    const price = response?.data?.price
    return price ? parseFloat(price) : false
  } catch (e: any) {
    console.error(e.response.data.msg, e)
    return false
  }
}
// getAveragePrice('BTCUSDT')

export async function getDepth(symbol:string, limit: number = 10) {
  try {
    const response = await axios.get(apiUrl + '/depth', {
      params: {
        symbol: symbol,
        limit: limit,
      },
    })
    if (response.status === 200) {
      return { bids: response.data.bids, asks: response.data.asks }
    }
  } catch (e: any) {
    console.error(e?.response?.data?.msg, e)
    return false
  }
  return false
}

export async function makeOrder(order: CustomerOrder) {
  try {
    const response = await binanceWithAuth('post', '/order', order)
    const newOrder = response.data
    newOrder['stock'] = 'binance'
    return newOrder
  } catch (err: any) {
    console.error(err.response.data.msg, err)
    return false
  }
}

// makeOrder({
//   symbol: 'BTCUSDT',
//   side: 'SELL',
//   quantity: '0.00210',
//   type: 'MARKET',
// }).catch(e => console.log(e))

export async function cancelOrder(order : OrderBody) {
  try {
    const response = await binanceWithAuth('delete', '/order', order)
    console.log(response.data)

    return response.data
  } catch (e: any) {
    console.error(e.response.data.msg, e)
    return false
  }
}
// cancelOrder({ symbol: 'BTCUSDT', orderId: '10356209' })

export async function getOrder(order: OrderBody) {
  try {
    const response = await binanceWithAuth('get', '/order', order)
    console.log(response.data)
    return response.data
  } catch (e: any) {
    console.error(e.response.data.msg, e)
    return false
  }
}
// getOrder({ symbol: 'BTCUSDT', orderId: '9001707' })

export async function getOrdersList(order: { symbol: string }) {
  try {
    const response = await binanceWithAuth('get', '/allOrders', order)
    return response.data
  } catch (e: any) {
    console.error(e.response.data.msg, e)
    return false
  }
}

export async function getBalances(symbols: string[]) {
  try {
    if (!Array.isArray(symbols)) {
      return []
    }
    const response = await binanceWithAuth('get', '/account')
    const balances : RequestedBalances = {}
    response.data.balances.forEach(({ asset, free }: BinanceBalances) => {
      if (symbols.includes(asset)) {
        balances[asset] = free
      }
    })
    return balances
  } catch (err: any) {
    console.error(err.message, err)
    return false
  }
}

// getBalances(['BTC', 'USDT']).then(response => console.log(response))

export async function getLegalSymbols() {
  try {
    const preparedSymbols : PreparedSymbols = {}
    const { data } = await axios.get(apiUrl + '/exchangeInfo')
    const { symbols } = data

    symbols.forEach(({ baseAsset, quoteAsset }:BinanceSymbolInfo ) => {
      if (Object.keys(preparedSymbols).includes(baseAsset)) {
        preparedSymbols[baseAsset].push(quoteAsset)
      } else {
        preparedSymbols[baseAsset] = [quoteAsset]
      }
    })
    console.log(preparedSymbols)
    return preparedSymbols
  } catch (err: any) {
    console.error(err.message, err)
    return false
  }
}
// getLegalSymbols()
