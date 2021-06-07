import React, { ReactChild, ReactChildren } from 'react'
import styled from "styled-components"
import { useSelector } from 'react-redux';
import { RootState } from '../../modules'
interface IProps {
    children: ReactChild | ReactChildren
}

const Layout = ({ children }: IProps) => {
    const open = useSelector((state: RootState) => state.sideBar.open)

    return (
        <Main open={open}>
            {children}
        </Main>
    )
}

export default Layout

interface IProps {
    open?: boolean
}

const Main = styled.main<IProps>`
  width: ${({ open }) => (open ? 'calc(100% - 250px)' : '100%')};
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  left: ${({ open }) => (open ? '250px' : '0')};
  position: absolute;
  transition: .6s ease;
`
