import { configureStore } from '@reduxjs/toolkit'
import exchangeFormSlice from '../addition/components/ExchangeSlice'
import { useDispatch } from 'react-redux'
import logWindowSlice from '../addition/components/LogWindow/LogWindowSlice'

export const store = configureStore({
  reducer: {
    exchangeForm: exchangeFormSlice,
    logWindow: logWindowSlice,
  },
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export type RootState = ReturnType<typeof store.getState>
