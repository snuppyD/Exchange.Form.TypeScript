import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrenciesSymbol, selectStock, switchStock, updateAvaragePrice } from './ExchangeSlice'
import { StyledOption, StyledSelector } from '../styles/Selector.Styled'
import { useAppDispatch } from '../../app/store'

function StockSwitch() {
  const dispatch = useAppDispatch()
  const stock = useSelector(selectStock)
  const symbol = useSelector(selectCurrenciesSymbol)

  async function onChangedStock(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(switchStock(e.target.value))
    dispatch(updateAvaragePrice(symbol))
  }

  return (
    <StyledSelector defaultValue={stock} onChange={onChangedStock}>
      <StyledOption value={'binance'}>Binance</StyledOption>
      <StyledOption value={'kuna'}>Kuna</StyledOption>
    </StyledSelector>
  )
}

export default StockSwitch
