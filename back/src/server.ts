import { getOrdersModel } from './db/dataBase'
import bodyParser from 'body-parser'
import express, {Express, Request, Response} from 'express'
import dotenv from 'dotenv'
import cors from 'cors' //TODO а його хто буде додавати?
// import { getDepth, makeOrder, cancelOrder, getOrder, getOrdersList, getBalances } from './BinanceOrder.js'
import {FuncModules} from "./typesComponents/serverTypes";
import { Filter,CompoundFilter } from './typesComponents/dataBaseTypes'


const app: Express = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const port = process.env.PORT || 5000
const OrdersModel = getOrdersModel()
const timers = new Map()
let stock: string = 'binance'
dotenv.config() //TODO А змінні хто завантажувати буде?
const funcModules: FuncModules = {
  binance: './BinanceOrder.js',
  kuna: './KunaOrder.js',
} //додати Куну

app.get('/switch_stock', async (req : Request, res : Response) => {
  const reqStock = req.query['stock']
  if (typeof reqStock === 'string') {
    stock = reqStock
    if (Object.keys(funcModules).includes(stock)) {
      res.sendStatus(200)
    }
  } else {
    res.sendStatus(500)
  }
})

app.get('/get_average_price', async (req: Request, res: Response) => {
  const { getAveragePrice } = await import(funcModules[stock])
  const response = await getAveragePrice(req.query['symbol'])
  res.send({ price: response })
})

app.get('/get_balances', async (req: Request, res: Response) => {
  const { getBalances } = await import(funcModules[stock])
  const response = await getBalances(req.query['symbols'])
  res.send(response)
})

app.get('/get_depth', async (req: Request, res: Response) => {
  const { getDepth } = await import(funcModules[stock])
  const response = await getDepth(req.query['symbol'], 1)
  if (response) {
    res.send(response)
  } else {
    res.sendStatus(500)
  }
})

app.get('/get_orders', async (req: Request, res: Response) => {
  const symbol = req?.query?.symbol

  if (symbol && typeof symbol === 'string') {
    let filter: Filter | CompoundFilter = { symbol: symbol, stock: stock }
    const activeOnly : boolean = req.query['active'] === 'yes'

    if (activeOnly) {
      filter = {
        $or: [Object.assign({}, filter, { status: 'NEW' }), Object.assign({}, filter, { status: 'PARTIALLY_FILLED' })],
      }
    }

    const response = await OrdersModel.find(filter, '', {
      sort: {
        time: -1,
      },
      limit: 20,
    })

    if (response) {
      res.send(response)
    } else {
      res.send([])
    }
  } else {
    res.send([])
  }
})

app.get('/cancel_order', async (req: Request, res : Response) => {
  const { cancelOrder } = await import(funcModules[stock])
  const orderId = req.query['orderId']
  const symbol = req.query['symbol']
  const result = await cancelOrder({ symbol: symbol, orderId: orderId })
  let resp
  if (result.status === 'CANCELED') {
    resp = await OrdersModel.updateOne({ _id: orderId }, { $set: { status: 'CANCELED' } })
  }
  if (resp?.modifiedCount) {
    res.send({ success: 'ok' })
  } else {
    res.send({ success: 'fail' })
  }
})

app.get('/update_order_status', async (req: Request, res: Response) => {
  const { getOrder } = await import(funcModules[stock])
  const [orderId, symbol] = [Number(req.query['orderId']), req.query['symbol']]
  const order = await getOrder({ symbol: symbol, orderId: orderId })
  let resp

  if (order && order.orderId === orderId) {
    resp = await OrdersModel.updateOne({ _id: orderId }, order)
  }

  if (resp?.modifiedCount) {
    res.send({ success: 'ok' })
  } else {
    res.send({ success: 'fail' })
  }
})

app.get('/get_symbols', async (req : Request, res: Response) => {
  const { getLegalSymbols } = await import(funcModules[stock])
  const response = await getLegalSymbols()
  if (response) {
    res.send(response)
  } else {
    res.sendStatus(500)
  }
})

app.post('/make_order', async (req: Request, res: Response) => {
  const { makeOrder, getOrder } = await import(funcModules[stock])
  const result = await makeOrder(req.body)
  if (result) {
    result['_id'] = result.orderId
    await OrdersModel.create(result).catch(e => console.error(e.message))

    if (result.status === 'NEW' || result.status === 'PARTIALLY_FILLED') {
      timers.set(
        result.orderId,
        setInterval(async () => {
          const order = await getOrder({ symbol: result.symbol, orderId: result.orderId })
          if (order.status !== 'NEW' && order.status !== 'PARTIALLY_FILLED') {
            try {
              const update = await OrdersModel.updateOne({ _id: order.orderId }, order, { upsert: true })
              console.log(update)
              clearInterval(timers.get(order.orderId))
              timers.delete(order.orderId)
            } catch (e: any) {
              console.error(e.message, e)
            }
          }
        }, 5000)
      )
    }
  }
  res.send(result)
})

app.listen(port, () => console.log(`Listening on port ${port}...`))
