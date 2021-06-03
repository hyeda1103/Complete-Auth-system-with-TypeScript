import React from 'react'
import styled from 'styled-components'

const SignIn = () => {
  return (
    <Main>
      <Inner>로그인</Inner>
    </Main>
  )
}

export default SignIn

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
