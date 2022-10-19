import { RefObject,useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import {
  selectLimit,
  selectCurrencyBuy,
  selectCurrencySell,
  selectBalances,
  selectAveragePrice,
  changeCurrencyBuy,
  changeCurrencySell,
  updateAvaragePrice,
  selectAllSymbols,
  selectValidSymbols,
  updateSymbols,
} from './ExchangeSlice'
import InputOrder from './InputOrder'
import axios from 'axios'
import React from 'react'
import { StyledExchangeForm, StyledBalance, StyledExchangeButton } from '../styles/ExchangeForm.Styled'
import { StyledSelector } from '../styles/Selector.Styled'
import { RootState, useAppDispatch } from '../../app/store'

type Props = {buy : boolean}

export type ExchangeRefs = {
  priceRef: RefObject<HTMLInputElement>;
  amountRef: RefObject<HTMLInputElement>;
  totalRef: RefObject<HTMLInputElement>;
  formRef: RefObject<HTMLFormElement>;
}

function ExchangeForm({ buy } : Props) {
  const dispatch = useAppDispatch()
  const limit = useSelector(selectLimit)
  const balances = useSelector(selectBalances)
  const averagePrice = useSelector(selectAveragePrice)
  const [currencyBuy, currencySell] = [useSelector(selectCurrencyBuy), useSelector(selectCurrencySell)]
  const buySymbols = useSelector(selectAllSymbols)
  const sellSymbols = useSelector((state: RootState) => selectValidSymbols(state, currencyBuy))

  const refs: ExchangeRefs = {
    priceRef: useRef(null),
    amountRef: useRef(null),
    totalRef: useRef(null),
    formRef: useRef(null),
  }

  function onCurrencyChange(event : React.ChangeEvent<HTMLSelectElement>) {
    if (buy) {
      dispatch(changeCurrencySell(event.target.value))
    } else {
      dispatch(changeCurrencyBuy(event.target.value))
    }
  }
  useEffect(() => {
    dispatch(updateSymbols())
  }, [])
  function setAveragePrice() {
    const { priceRef, amountRef, totalRef } = refs
    if (priceRef.current && amountRef.current && totalRef.current) {
      priceRef.current.value = averagePrice.toFixed(2)
      amountRef.current.value = '1'
      totalRef.current.value = averagePrice.toFixed(2)
    }
  }

  useEffect(() => {
    if (limit) {
      dispatch(updateAvaragePrice(currencyBuy + currencySell))
    }
  }, [currencySell, currencyBuy, limit, dispatch])

  useEffect(() => {
    setAveragePrice()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [averagePrice, refs.amountRef, refs.totalRef, refs.priceRef])

  async function makeOrder() {
    const { formRef } = refs
    if (formRef.current) {
      try {
        let reqBody = {
          symbol: currencyBuy + currencySell,
          side: buy ? 'BUY' : 'SELL',
          type: limit ? 'LIMIT' : 'MARKET',
          quantity: formRef.current['Amount'].value,
        }

        if (limit) {
          const additionalReqBody = {
            timeInForce: 'GTC',
            price: formRef.current['Price'].value,
          }
          reqBody = Object.assign({}, reqBody, additionalReqBody)
        }

        let response = await axios.post('http://localhost:5000/make_order', reqBody)

        if (response) {
          alert('the purchase of the order was completed successfully')
          return true
        } else {
          alert('something went wrong')
          return false
        }
      } catch (e : any) {
        console.error(e.message)
        return false
      }
    }
  }

  function makeOptions() {
    if (buy) {
      if (sellSymbols) {
        return sellSymbols.map(symbol => (
          <option value={symbol} key={symbol}>
            {symbol}
          </option>
        ))
      } else {
        return false
      }
    } else {
      if (buySymbols) {
        return Object.keys(buySymbols).map(symbol => (
          <option value={symbol} key={symbol}>
            {symbol}
          </option>
        ))
      } else {
        return false
      }
    }
  }

  return (
    <StyledExchangeForm>
      <StyledBalance>
        <span>Your current balance:</span>
        <span>
          {balances[buy ? currencySell : currencyBuy]} {buy ? currencySell : currencyBuy}
        </span>
      </StyledBalance>
      <StyledSelector defaultValue={'Choose Currency'} onChange={onCurrencyChange}>
        {makeOptions()}
      </StyledSelector>
      <form ref={refs.formRef}>
        {limit ? <InputOrder name={'Price'} currency={currencySell} thisRef={refs.priceRef} refs={refs} /> : false}
        <InputOrder name={'Amount'} currency={currencyBuy} thisRef={refs.amountRef} refs={refs} />
        {limit ? <InputOrder name={'Total'} currency={currencySell} thisRef={refs.totalRef} refs={refs} /> : false}
        <StyledExchangeButton
          onClick={(e: React.FormEvent<HTMLButtonElement>) => {
            e.preventDefault()
            makeOrder().catch(err => console.error(err.message))
          }}
        >
          {buy ? 'Buy' : 'Sell'} {currencyBuy}
        </StyledExchangeButton>
      </form>
    </StyledExchangeForm>
  )
}

export default ExchangeForm
