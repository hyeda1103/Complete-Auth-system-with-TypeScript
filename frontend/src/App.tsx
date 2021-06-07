import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './modules'
import { turnOn, turnOff } from './modules/theme'
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
  const dispatch = useDispatch() 

  const lightOn = useSelector((state: RootState) => state.switchTheme.lightOn)
  const themeToggler = () => {
    lightOn ? dispatch(turnOff()) : dispatch(turnOn())
  }
  return (
    <Router>
      <ThemeProvider theme={lightOn ? lightTheme : darkTheme}>
        <GlobalStyle />
        <ScrollToTop />
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
