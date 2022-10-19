import React from 'react'
import LogWindowSelect from './LogWindowSelect'
import { useEffect, useState } from 'react'
import LogWindowRecord from './LogWindowRecord'
import { useSelector } from 'react-redux'
import { selectLogRecords, selectRecordsType, updateLogRecords } from './LogWindowSlice'
import { selectCurrenciesSymbol, selectStock } from '../ExchangeSlice'
import { useAppDispatch } from '../../../app/store'
import { nanoid } from '@reduxjs/toolkit'
import {TimeoutId} from "@reduxjs/toolkit/dist/query/core/buildMiddleware/types";
import { StyledLogRecord, StyledLogRecords } from '../../styles/LogWindow.Styled'

type Timer = {
  timerId: TimeoutId;
  symbol: string;
  recordsType: string;
}


const initialTimer : Timer = {
  timerId: setTimeout(() => {}),
  symbol: '',
  recordsType: '',
}

function LogWindow() {
  const dispatch = useAppDispatch()
  const recordsType = useSelector(selectRecordsType)
  const logRecords = useSelector(selectLogRecords)
  const symbol = useSelector(selectCurrenciesSymbol)
  const stock = useSelector(selectStock)
  const [timer] = useState(initialTimer)

  const preparedRecords = logRecords.map(record => {
    return <LogWindowRecord order={record} key={record._id} />
  })

  if (preparedRecords.length < 1) {
    preparedRecords.push(
      <StyledLogRecord key={nanoid()}>
        <div>
          <span>No records yet...</span>
        </div>
      </StyledLogRecord>
    )
  }

  function refreshLog() {
    dispatch(updateLogRecords({ symbol, recordsType }))
  }

  function setUpdateTimer() {
    clearInterval(timer.timerId)
    timer.timerId = setInterval(refreshLog, 2000)
  }

  useEffect(() => {
    refreshLog()
  }, [recordsType, symbol, stock, timer])

  useEffect(() => {
    if (timer.symbol !== symbol.slice() || timer.recordsType !== recordsType.slice()) {
      setUpdateTimer()
      timer.symbol = symbol.slice()
      timer.recordsType = recordsType.slice()
    }
  }, [recordsType, symbol])

  return (
    <>
      <LogWindowSelect />
      <StyledLogRecords>{preparedRecords}</StyledLogRecords>
    </>
  )
}

export default LogWindow
