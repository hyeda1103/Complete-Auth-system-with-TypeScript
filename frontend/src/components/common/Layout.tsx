import React, { ReactChild, ReactChildren } from 'react'
import styled from "styled-components"

interface IProps {
    children: ReactChild | ReactChildren
}

const Layout = ({children}: IProps) => {
    return (
        <Main>
            <Inner>
                {children}
            </Inner>
        </Main>
    )
}

export default Layout

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
