"use strict";
exports.__esModule = true;
exports.getOrdersModel = void 0;
var mongoose_1 = require("mongoose");
var Schema = mongoose_1["default"].Schema;
var Orders = new Schema({
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
    stock: String
});
function getOrdersModel() {
    var connection = mongoose_1["default"].createConnection('mongodb://localhost:27017/VadikDB');
    return connection.model('OrdersModel', Orders);
}
exports.getOrdersModel = getOrdersModel;
