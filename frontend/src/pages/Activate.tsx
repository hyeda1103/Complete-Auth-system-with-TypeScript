import React from 'react'
import styled from 'styled-components'

const Activate = () => {
    return (
      <Main>
        <Inner>계정 활성화</Inner>
      </Main>
    )
}

export default Activate

const Main = styled.main`
  height: 100%;
`

const Inner = styled.div`
  width: 960px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 4rem 0;
  font-size: 80px;
`
