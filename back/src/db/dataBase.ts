import mongoose from 'mongoose'
const { Schema } = mongoose

const Orders = new Schema({
  _id: { type: Number, required: true },
  symbol: { type: String, required: true },
  orderId: { type: Number, required: true },
  orderListId: Number,
  clientOrderId: String,
  price: { type: String, required: true },
  origQty: { type: String, required: true },
  executedQty: String,
  cummulativeQuoteQty: String,
  status: { type: String, required: true },
  timeInForce: String,
  type: { type: String, required: true },
  side: { type: String, required: true },
  stopPrice: String,
  icebergQty: String,
  time: Number,
  updateTime: Number,
  isWorking: Boolean,
  origQuoteOrderQty: String,
  stock: String,
})

export function getOrdersModel() {
  const connection = mongoose.createConnection('mongodb://localhost:27017/VadikDB')
  return connection.model('OrdersModel', Orders)
}
