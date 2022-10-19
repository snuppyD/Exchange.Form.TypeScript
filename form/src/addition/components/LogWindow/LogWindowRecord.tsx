import React from 'react'
import {  useSelector } from 'react-redux'
import { Order, selectRecordsType, updateLogRecords } from './LogWindowSlice'
import axios from 'axios'
import { StyledLogRecord } from '../../styles/LogWindow.Styled'
import {useAppDispatch} from '../../../app/store'

type Props = {
  order: Order;
}

function LogWindowRecord({ order }: Props) {
  const recordsType = useSelector(selectRecordsType)
  const dispatch = useAppDispatch()

  async function refreshLog() {
    dispatch(updateLogRecords({ symbol: order.symbol, recordsType }))
  }

  async function refreshOrder(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault()
    try {
      await axios.get(`http://localhost:5000/update_order_status?symbol=${order.symbol}&orderId=${order.orderId}`)
      await refreshLog()
    } catch (e : any) {
      console.error(e.message)
    }
  }

  async function cancelOrder(e : React.FormEvent<HTMLButtonElement>) {
    e.preventDefault()
    try {
      let response = await axios.get(`http://localhost:5000/cancel_order?symbol=${order.symbol}&orderId=${order.orderId}`)
      if (response.data.success === 'ok') {
        alert(`cancelled ${order.orderId}`)
        await refreshOrder(e)
        await refreshLog()
      }
    } catch (e : any) {
      console.error(e.message)
    }
  }

  return (
    <StyledLogRecord>
      <div>
        <span>Order ID: {order._id}</span>
        <br />
        <span>Symbol: {order.symbol}</span>
        <br />
        <span>Side: {order.side}</span>
        <br />
        <span>Price: {order.price}</span>
        <br />
        <span>Amount: {order.origQty}</span>
        <br />
        <span>Status: {order.status}</span>
      </div>
      {order.status === 'NEW' || order.status === 'PARTIALLY_FILLED' ? (
        <div>
          <button title={'cancel'} onClick={cancelOrder}>
            cancel
          </button>
          <button title={'refresh'} onClick={refreshOrder}>
            refresh
          </button>
        </div>
      ) : (
        false
      )}
    </StyledLogRecord>
  )
}

export default LogWindowRecord
