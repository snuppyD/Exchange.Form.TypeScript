import React from 'react'
import { changeRecordsType } from './LogWindowSlice'
import { StyledLogWindowSelector } from '../../styles/Selector.Styled'
import { SelectorButtonStyled } from '../../styles/Selector.Styled'
import { useAppDispatch} from '../../../app/store'

function LogWindowSelect() {
  const dispatch = useAppDispatch()

  return (
    <StyledLogWindowSelector>
      <SelectorButtonStyled
        onClick={(e: React.FormEvent<HTMLButtonElement>) => {
          e.preventDefault()
          dispatch(changeRecordsType('Last'))
        }}
      >
        Last
      </SelectorButtonStyled>
      <SelectorButtonStyled
        onClick={(e: React.FormEvent<HTMLButtonElement>) => {
          e.preventDefault()
          dispatch(changeRecordsType('Active'))
        }}
      >
        Active
      </SelectorButtonStyled>
    </StyledLogWindowSelector>
  )
}

export default LogWindowSelect
