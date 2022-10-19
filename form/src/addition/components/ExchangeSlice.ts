import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {RootState} from "../../app/store";

type State = {
  currencies: string[];
  balances: { [ key: string ]: number; };
  limit: boolean;
  prices: {
      bids: string[];
      asks: string[];
  };
  stock: string;
  averagePrice: number;
  symbols: { [ key: string ]: string[]; };
}


const initialState : State = {
  currencies: ['BTC', 'USDT'],
  balances: { BTC: 0, USDT: 0 },
  limit: true,
  prices: { bids: ['0'], asks: ['0'] },
  stock: 'binance',
  averagePrice: 0,
  symbols: {},
}

export const switchStock = createAsyncThunk('back/switchStock', async (stockName: string) => {
  try {
    await axios.get(`http://localhost:5000/switch_stock?stock=${stockName}`)
    return stockName
  } catch (err: any) {
    console.log(err.message)
  }
})

export const updateDepths = createAsyncThunk('back/updateDepths', async (symbol: string) => {
  try {
    const response = await axios.get(`http://localhost:5000/get_depth?symbol=${symbol}`)
    return response.data
  } catch (err: any) {
    console.log(err.message)
  }
})

export const updateAvaragePrice = createAsyncThunk('back/getAveragePrice', async (currencyCross: string) => {
  try {
    const response = await axios.get(`http://localhost:5000/get_average_price?symbol=${currencyCross}`)
    return response.data.price
  } catch (err: any) {
    console.log(err.message)
  }
})

export const updateBalances = createAsyncThunk('back/updateBalances', async (currencies: string[]) => {
  try {
    const response = await axios.get(`http://localhost:5000/get_balances?symbols=${currencies[0]}&symbols=${currencies[1]}`)
    return response.data
  } catch (err: any) {
    console.log(err.message)
  }
})

export const updateSymbols = createAsyncThunk('back/updateSymbols', async () => {
  try {
    const response = await axios.get('http://localhost:5000/get_symbols')
    return response.data
  } catch (err: any) {
    console.log(err.message)
    return false
  }
})

const exchangeFormSlice = createSlice({
  name: 'exchangeForm',
  initialState,
  reducers: {
    changeCurrencyBuy(state, action) {
      state.currencies[0] = action.payload
    },
    changeCurrencySell(state, action) {
      state.currencies[1] = action.payload
    },
    changeLimit(state, action) {
      state.limit = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(switchStock.fulfilled, (state, action) => {
        if (action.payload) {
          state.stock = action.payload
        } else {
          console.log(action.payload)
        }
      })
      .addCase(updateDepths.fulfilled, (state, action) => {
        if (action.payload) {
          state.prices = action.payload
        } else {
          console.log(action.payload)
        }
      })
      .addCase(updateAvaragePrice.fulfilled, (state, action) => {
        if (action.payload) {
          state.averagePrice = action.payload
        } else {
          console.log(action.payload)
        }
      })
      .addCase(updateBalances.fulfilled, (state, action) => {
        if (action.payload) {
          state.balances = action.payload
        }
      })
      .addCase(updateSymbols.fulfilled, (state, action) => {
        if (action.payload) {
          state.symbols = action.payload
          // console.log(JSON.stringify(action.payload))
        } else {
          console.log(action.payload)
        }
      })
  },
})

export const selectCurrencies = (state: RootState) => state.exchangeForm.currencies
export const selectCurrenciesSymbol = (state: RootState) => state.exchangeForm.currencies.join('')
export const selectCurrencyBuy = (state: RootState) => state.exchangeForm.currencies[0]
export const selectCurrencySell = (state: RootState) => state.exchangeForm.currencies[1]
export const selectLimit = (state: RootState) => state.exchangeForm.limit
export const selectStock = (state: RootState) => state.exchangeForm.stock
export const selectBalances = (state: RootState) => state.exchangeForm.balances
export const selectAveragePrice = (state: RootState) => state.exchangeForm.averagePrice
export const selectPrices = (state: RootState) => state.exchangeForm.prices
export const selectAllSymbols = (state: RootState) => state.exchangeForm.symbols
export const selectValidSymbols = (state: RootState, symbol: string) => state.exchangeForm.symbols[symbol]

export const { changeCurrencyBuy, changeCurrencySell, changeLimit } = exchangeFormSlice.actions

export default exchangeFormSlice.reducer
