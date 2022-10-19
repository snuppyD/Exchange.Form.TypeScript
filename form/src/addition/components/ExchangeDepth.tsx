import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrenciesSymbol, selectPrices, updateDepths } from './ExchangeSlice'
import { StyledExchangePrices } from '../styles/HeaderSelector.styled'
import StockSwitch from './StockSwitch'
import {TimeoutId} from "@reduxjs/toolkit/dist/query/core/buildMiddleware/types";
import React from 'react'
import { useAppDispatch } from '../../app/store'


type ExchangePricesTimer = {
  timerId: TimeoutId;
  symbol: string;
}

const initialTimer: ExchangePricesTimer = {
  timerId: setTimeout(() => {}),
  symbol: '',
}

function ExchangeDepth() {
  const dispatch = useAppDispatch()
  const symbol = useSelector(selectCurrenciesSymbol)
  const prices = useSelector(selectPrices)
  const [timer] = useState(initialTimer)

  function refreshPrices() {
    dispatch(updateDepths(symbol))
  }

  function changeTimer() {
    if (symbol !== timer.symbol) {
      clearInterval(timer.timerId)
      timer.timerId = setInterval(refreshPrices, 2000)
    }
    timer.symbol = symbol
  }

  useEffect(
    changeTimer,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [symbol, timer]
  )

  return (
    <StyledExchangePrices>
      <div>
        <span>{parseFloat(prices.bids[0]).toFixed(3)}</span>
        <StockSwitch />
        <span>{parseFloat(prices.asks[0]).toFixed(3)}</span>
      </div>
    </StyledExchangePrices>
  )
}

export default ExchangeDepth
