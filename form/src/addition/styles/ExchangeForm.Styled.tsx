import styled from 'styled-components'

export const StyledExchangeForm = styled.div`
  margin: 1rem;
  padding: 0 1rem 0 1rem;
  border: 1px solid black;
  border-radius: 0.5rem;
  @media only screen and (max-width: 900px) {
    width: 90vw;
  }
`

export const StyledBalance = styled.div`
  display: flex;
  width: 100%;
  color: white;
  justify-content: space-between;
  padding: 0.2rem 0 0.2rem 0;
  & span {
    font-size: 0.8rem;
  }
`

export const StyledInputField = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 40px;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  background-color: #9d4545;
  border: 1px solid black;
  border-radius: 0.5rem;
  &:hover {
    border: 1px solid orange;
  }
  & label {
    background-color: #9d4545;
    display: inline-block;
    width: 90px;
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    color: grey;
    border-bottom-left-radius: 0.5rem;
    border-top-left-radius: 0.5rem;
  }
  & input {
    background-color: #9d4545;
    border: none;
    border-bottom-right-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    text-align: right;
    padding-right: 1rem;
    &:focus {
      outline: none;
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
  & span {
    border-bottom-right-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    background-color: $#9d4545;
    padding-right: 0.5rem;
    color: grey;
    display: inline-flex;
    width: fit-content;
    text-align: left;
  }
  @media only screen and (max-width: 900px) {
    justify-content: space-around;
    height: 30px;
    width: 80vw;
  }
`

export const StyledExchangeButton = styled.button`
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
