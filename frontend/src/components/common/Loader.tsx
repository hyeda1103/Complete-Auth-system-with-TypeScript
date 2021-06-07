import React from 'react'
import styled from 'styled-components'

interface IProps {
  children: string | undefined
}

const Loader = () => {
  return <MsgForm>로딩중입니다</MsgForm>
}

export default Loader

const MsgForm = styled.div`
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 5px;
  padding: 0.5rem;
`
