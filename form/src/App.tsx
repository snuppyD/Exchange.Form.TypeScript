import React from 'react'
import ExchangeSection from './addition/components/ExchangeForm'
import LogWindow from './addition/components/LogWindow/LogWindow'
import { StyledApp } from './addition/styles/App.styled'

function App() {
  return (
    <StyledApp>
      <ExchangeSection />
      <LogWindow />
    </StyledApp>
  )
}

export default App
