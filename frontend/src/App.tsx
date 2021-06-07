import React, { useState } from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import styled from "styled-components"
import { ThemeProvider } from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './modules'
import { closeSideBar } from './modules/sideBar'
import { lightTheme, darkTheme } from './Theme'
import GlobalStyle from './globalStyles'
import ScrollToTop from './ScrollToTop'
import Header from './components/common/Header'
import Home from './pages'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Activate from './pages/ActivateAccount'
import ForgotPassword from './pages/Forgot'
import ResetPassword from './pages/Reset'
import CloseAccount from './pages/CloseAccount';
import Profile from './pages/Profile';

function App() {
  // 상태 조회. state의 타입을 RootState로 지정해야 함
  const open = useSelector((state: RootState) => state.sideBar.open)
  const dispatch = useDispatch() 
  const clickToOpen = () => {
    dispatch(closeSideBar())
  }
  const [theme, setTheme] = useState('light')
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }
  return (
    <Router>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyle />
        <ScrollToTop />
        <DimmedOut onClick={clickToOpen} open={open} />
        <Header themeToggler={themeToggler} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/auth/activate/:token" component={Activate} />
          <Route path="/auth/password/forgot" component={ForgotPassword} />
          <Route path="/auth/password/reset/:token" component={ResetPassword} />
          <Route path="/close-account" component={CloseAccount} />
        </Switch>
      </ThemeProvider>
    </Router>
  )
}

export default App

interface IProps {
  open: boolean
}

const DimmedOut = styled.div<IProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: ${({ open }) => (open ? '#000000' : '#fff')};
  opacity: ${({ open }) => (open ? '0.6' : '0')};
  display: ${({ open }) => (open ? 'flex' : 'none')};
  z-index: 2;
`
