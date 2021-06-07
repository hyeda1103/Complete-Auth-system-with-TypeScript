import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Link, RouteComponentProps } from 'react-router-dom'
import { RootState } from '../modules'
import Layout from './../components/common/Layout';


const Profile: React.FunctionComponent<RouteComponentProps> = ({ history, location }) => {
  const dispatch = useDispatch()

  const emailSignIn = useSelector((state: RootState) => state.signIn)
  const googleSignIn = useSelector((state: RootState) => state.googleSignIn)
  const { userInfo: userInfoWithEmail } = emailSignIn
  const { userInfo: userInfoWithGoogle } = googleSignIn
  const userInfo = userInfoWithEmail || userInfoWithGoogle

  useEffect(() => {
    if (!userInfo) {
      history.push('/signin')
    } 
  }, [dispatch, history, userInfo])

  return (
    <Layout>
      <ProfileForm>
        <Title>프로필</Title>

        <Button to="/close-account">회원탈퇴</Button>
      </ProfileForm>
    </Layout>
  )
}

export default Profile


const ProfileForm = styled.div`
  width: 450px;
`

const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
`

const Button = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  letter-spacing: 1.4px;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 5px;
  transition: 0.4s ease;

  &:hover {
    background: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.body};
  }
`
