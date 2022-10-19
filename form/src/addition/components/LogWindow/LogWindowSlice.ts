import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../../../app/store'

export type Order = {
  _id: number,
  orderId: number,
  symbol: string,
  side: string,
  price: string,
  origQty: string,
  status: string,
}

type State = {
  logRecords: Array<Order>;
  recordsType: string;
}

const initialState: State = {
  logRecords: [],
  recordsType: 'Last',
}

export const updateLogRecords = createAsyncThunk('back/logUpdate', async (reqParams: {symbol: string, recordsType: string}) => {
  try {
    const { symbol, recordsType } = reqParams
    const response = await axios.get(`http://localhost:5000/get_orders?symbol=${symbol}&active=${recordsType === 'Active' ? 'yes' : 'no'}`)
    return response.data
  } catch (err) {
    return false
  }
})

const logWindowSlice = createSlice({
  name: 'logWindow',
  initialState,
  reducers: {
    changeRecordsType(state, action) {
      state.recordsType = action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(updateLogRecords.fulfilled, (state, action) => {
      if (Array.isArray(action.payload)) {
        state.logRecords = action.payload
      } else {
        console.log(action.payload)
      }
    })
  },
})

export const selectRecordsType = (state: RootState) => state.logWindow.recordsType
export const selectLogRecords = (state : RootState) => state.logWindow.logRecords

export const { changeRecordsType } = logWindowSlice.actions

export default logWindowSlice.reducer
