import React, { ReactChildren, ReactChild } from 'react'
import styled from 'styled-components'

interface IChildren {
    children: ReactChild | ReactChildren
}

export const Layout = ({ children }: IChildren) => {
  return (
    <Main>
      <Inner>{children}</Inner>
    </Main>
  )
}

const Main = styled.main`
  height: 100%;
`

const Inner = styled.div`
  width: 960px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 4rem 0;
  font-size: 80px;
`
