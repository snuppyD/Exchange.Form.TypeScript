import ExchangeDepth from './ExchangeDepth'
import { changeLimit } from './ExchangeSlice'
import { SelectorButtonStyled, StyledHeaderSelector } from '../styles/HeaderSelector.styled'
import { useAppDispatch } from '../../app/store'
import React from 'react'

function HeaderSelector() {
  const dispatch = useAppDispatch()

  return (
    <StyledHeaderSelector>
      <SelectorButtonStyled
        onClick={(e: React.FormEvent<HTMLButtonElement>) => {
          e.preventDefault()
          dispatch(changeLimit(true))
        }}
      >
        Limit
      </SelectorButtonStyled>
      <ExchangeDepth />
      <SelectorButtonStyled
        onClick={(e: React.FormEvent<HTMLButtonElement>) => {
          e.preventDefault()
          dispatch(changeLimit(false))
        }}
      >
        Market
      </SelectorButtonStyled>
    </StyledHeaderSelector>
  )
}

export default HeaderSelector
