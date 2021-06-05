import React from 'react'
import styled from "styled-components"

interface IProps {
  children: string | undefined
}

const Message = ({ children }: IProps) => {
  return (
    <MsgBlock>
      {children}
    </MsgBlock>
  )
}

export default Message

const MsgBlock = styled.div`
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 5px;
  padding: 0.5rem;
`
