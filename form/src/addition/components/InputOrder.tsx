import React from 'react'
import { RefObject} from 'react'
import { StyledInputField } from '../styles/ExchangeForm.Styled'
import {ExchangeRefs} from './ExchangeOrder'

type Props = {
  name: string;
  currency: string;
  thisRef: RefObject<HTMLInputElement>;
  refs: ExchangeRefs;
}


function InputOrder({ name, currency, thisRef, refs }: Props) {
  function findCurrentFieldName() {
    for (const [key, value] of Object.entries(refs)) {
      if (value === thisRef) {
        return key
      }
    }
  }

  function setStep() {
    switch (findCurrentFieldName()) {
      case 'priceRef':
        return 0.01
      case 'amountRef':
        return 0.00001
      case 'totalRef':
        return 0.0000001
      default:
        return 1
    }
  }

  function calculateFieldValue() {
    if (refs.totalRef.current && refs.priceRef.current && refs.amountRef.current) {
      switch (findCurrentFieldName()) {
        case 'priceRef':
          refs.totalRef.current.value = (Number(thisRef.current!.value) * Number(refs.amountRef.current.value)).toFixed(7)
          break
        case 'amountRef':
          refs.totalRef.current.value = (Number(thisRef.current!.value) * Number(refs.priceRef.current.value)).toFixed(7)
          break
        case 'totalRef':
          refs.amountRef.current.value = (Number(thisRef.current!.value) / Number(refs.priceRef.current.value)).toFixed(5)
          break
        default:
          return 1
      }
    }
  }

  return (
    <StyledInputField>
      <label>{name}</label>
      <input name={name} type={'number'} autoComplete={'off'} ref={thisRef} step={setStep()} onChange={calculateFieldValue} />
      <span>{currency}</span>
    </StyledInputField>
  )
}

export default InputOrder
