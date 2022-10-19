import styled from 'styled-components'

export const StyledHeaderSelector = styled.div`
  display: flex;
  flex-direction: row;
  @media only screen and (max-width: 900px){
    width: fit-content;
`

export const SelectorButtonStyled = styled.button`
  width: 80px;
  padding: 0.2rem 1rem 0.2rem 1rem;
  margin-right: 10px;
  margin-left: 10px;
  background-color: #9d4545;
  border-top: 1px solid;
  border-left: 1px solid;
  border-right: 1px solid;
  border-color: black;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  font-weight: bold;
  cursor: pointer;
  &:hover,
  &:focus {
    background-color: orange;
    color: black;
    border-top: 1px solid black;
    border-left: 1px solid black;
    border-right: 1px solid black;
  }
  @media only screen and (max-width: 900px) {
    width: fit-content;
  }
`
export const StyledExchangePrices = styled.div`
  display: flex;
  justify-content: center;

  & > div {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 300px;
    border: 1px solid black;
    border-bottom: none;
    background-color: #9d4545;
    border-top-right-radius: 0.5rem;
    border-top-left-radius: 0.5rem;

    & span {
      background-color: #9d4545;
      padding: 0.5rem;
      border-radius: 0.5rem;
    }

    & span:first-child {
      color: lightseagreen;
    }

    & span:last-child {
      color: #ff0000;
    }

    & select {
      outline: none;
      border: none;
      margin-top: 8px;
      font-weight: bold;
      color: orange;
    }
  }
  @media only screen and (max-width: 900px) {
    width: 210px;
    & span {
      padding-left: 0;
      padding-right: 0;
    }
  }
`

export const StyledBalance = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  color: white;
  padding: 0.2rem 0 0.2rem 0;
  & span {
    font-size: 1rem;
  }
`
export const StyledExchangeButtonBuy = styled.button`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  height: 40px;
  border-radius: 0.5rem;
  border: 1px solid gray;
  width: 100%;
  color: white;
  font-weight: bold;
  cursor: pointer;
  background-color: #0eca80;

  &:hover {
    background-color: #43cb89;
    border: none;
    outline: rgba(14, 202, 128, 0.4) groove 0.3rem;
  }
`
export const StyledExchangeButtonSell = styled.button`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  height: 40px;
  border-radius: 0.5rem;
  border: 1px solid gray;
  width: 100%;
  color: white;
  font-weight: bold;
  cursor: pointer;
  background-color: red;

  &:hover {
    background-color: #43cb89;
    border: none;
    outline: rgba(14, 202, 128, 0.4) groove 0.3rem;
  }
`
export const StyledHeaderSelectorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media only screen and (max-width: 900px) {
    width: 100vw;
  }
`
