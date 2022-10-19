import styled from 'styled-components'

export const StyledLogWindowSelector = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export const StyledBlockSelector = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const StyledSelector = styled.select`
  border-radius: 0.4rem;
  margin-bottom: 0.5rem;
  margin-top: 0.1rem;
  border-color: grey;
  background-color: #9d4545;

  &:hover,
  &:focus {
    background-color: orange;
    outline: none;
    color: black;
  }
`

export const StyledOption = styled.option``

export const SelectorButtonStyled = styled.button`
  width: 80px;
  padding: 0.2rem 1rem 0.2rem 1rem;
  margin-right: 10px;
  margin-left: 10px;
  background-color: ${props => props.theme.additionalBackgroundColor};
  border-top: 1px solid;
  border-left: 1px solid;
  border-right: 1px solid;
  border-color: ${props => props.theme.borderColor};
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
