import styled from "styled-components";

export const TuningInput = styled.input`
  padding: 8px;
  margin: 10px 10px 10px 0;
  border: 1px solid #ccc;
  border-radius: 10px;
`

const Button = styled.button`
  display: inline;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 10px;
  text-transform: capitalize;
  font-weight: bold;
  cursor: pointer;
`
export const TuningsContainer = styled.ul`
  list-style-type: none;
  padding-inline-start: 0;
  cursor: pointer;
`

export const PrimaryButton = styled(Button)`
  background-color: #1f2937;
`
export const DangerButton = styled(Button)`
  visibility: visible;
  background-color: #ff3232;
  width: 40px;
  height: 40px;
  border-radius: 100%;
`

export const TuningPhrase = styled.h3`
  display: inline;
  font-size: 18px;
  margin: 0 20px;
`


export const Body = styled.div`
  display: flex;
  margin: 10px 0;
  width: 100%;
`


export const ListItem = styled.li``


