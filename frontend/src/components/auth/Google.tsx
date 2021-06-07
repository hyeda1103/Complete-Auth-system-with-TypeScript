import React, { useEffect } from 'react'
import GoogleLogin from 'react-google-login'
import styled from 'styled-components'
import { FaGoogle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { signInWithGoogle } from '../../modules/user'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { RootState } from '../../modules'

const Google: React.FunctionComponent<RouteComponentProps> = ({ history, location }) => {
  const dispatch = useDispatch()

  const googleSignIn = useSelector((state: RootState) => state.googleSignIn)
  const { userInfo } = googleSignIn

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const responseGoogle = (response: any) => {
    dispatch(signInWithGoogle(response.tokenId))
  }

  return (
    <GoogleLogin
      clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
      render={(renderProps) => (
        <GoogleButton onClick={renderProps.onClick} disabled={renderProps.disabled}>
          <GoogleIcon />
          구글 로그인
        </GoogleButton>
      )}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  )
}

export default withRouter(Google)

const GoogleButton = styled.button`
  width: 100%;
  font-family: 'Noto Sans KR', sans-serif;
  background: #ff3e30;
  color: #fff;
  border: 1px solid #ff3e30;
  border-radius: 5px;
  padding: 0.5rem;
  margin: 1rem 0;
  font-size: 1.25rem;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.4s ease;
`

const GoogleIcon = styled(FaGoogle)`
  font-size: 1.25rem;
  color: #fff;
  margin-right: 0.5rem;
`
