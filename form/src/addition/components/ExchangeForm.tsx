import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrencies, updateBalances } from './ExchangeSlice'
import ExchangeForm from './ExchangeOrder'
import HeaderSelector from './HeaderSelector'
import { StyledFormsWrapper } from '../styles/LogWindow.Styled'
import { StyledHeaderSelectorWrapper } from '../styles/HeaderSelector.styled'
import {TimeoutId} from "@reduxjs/toolkit/dist/query/core/buildMiddleware/types";
import { useAppDispatch } from '../../app/store'


type BalanceTimer = {
  currencies: string[];
  timerId: TimeoutId;
}

const balanceTimer : BalanceTimer = {
  currencies: [],
  timerId: setTimeout(() => {}),
}

function ExchangeSection() {
  const dispatch = useAppDispatch()
  const currencies = useSelector(selectCurrencies)
  const [timer] = useState(balanceTimer)

  async function refreshBalances() {
    dispatch(updateBalances(currencies))
  }

  useEffect(
    () => {
      if (currencies !== timer.currencies) {
        clearInterval(timer.timerId)
        timer.timerId = setInterval(refreshBalances, 5000)
        timer.currencies = currencies
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currencies, timer]
  )

  return (
    <>
      <StyledHeaderSelectorWrapper>
        <HeaderSelector />
      </StyledHeaderSelectorWrapper>
      <StyledFormsWrapper>
        <ExchangeForm buy={true} />
        <ExchangeForm buy={false} />
      </StyledFormsWrapper>
    </>
  )
}

export default ExchangeSection
