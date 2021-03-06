import React from 'react'
import styled from "styled-components"

interface IProps {
  children: string | undefined
}

const Message = ({ children }: IProps) => {
  return (
    <MsgForm>
      {children}
    </MsgForm>
  )
}

export default Message

const MsgForm = styled.div`
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 5px;
  padding: 0.5rem;
`
