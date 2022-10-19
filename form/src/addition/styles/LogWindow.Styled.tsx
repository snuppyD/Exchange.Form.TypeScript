import styled from 'styled-components'

export const StyledLogWindowSelector = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export const StyledLogRecords = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  height: 150px;
  border-radius: 0.5rem;
  &::-webkit-scrollbar-thumb {
    height: 17px;
    outline: 1px solid black;
    border-radius: 0.5rem;
  }
  &::-webkit-scrollbar {
    outline: 1px solid grey;
    border-radius: 0.5rem;
  }
`

export const StyledLogRecord = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  height: 155px;
  justify-content: space-between;
  background-color: grey;
  border: 1px solid black;
  border-radius: 0.5rem;
  margin-bottom: 2px;
  & span,
  & div {
    background-color: grey;
    border-radius: 1rem;
  }
  & div {
    display: flex;
    flex-direction: column;
  }
  & div:first-child {
    padding-left: 0.5rem;
    padding-top: 0.7rem;
  }
  & span {
    margin-top: -0.9rem;
  }
  & button {
    margin-top: 40%;
    margin-right: 1rem;
    border: 1px solid grey;
    border-radius: 0.3rem;
    color: black;
    height: 20px;
  }
  & button:first-child {
    background-color: red;
  }
  & button:last-child {
    background-color: #0eca80;
  }
  & button:first-child:hover {
    background-color: #fd3232;
  }
  & button:last-child:hover {
    background-color: #43cb89;
  }
`
export const StyledInputField = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
export const StyledFormsWrapper = styled.div`
  background-color: black;
  display: flex;
  flex-direction: row;
  @media only screen and (max-width: 900px) {
    flex-direction: column;
    width: 100vw;
    align-items: center;
  }
  padding: 1rem;
  border: 1px solid black;
  border-radius: 0.5rem;
`
