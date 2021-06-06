import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Link, RouteComponentProps } from 'react-router-dom'
import { RootState } from '../modules'
import Layout from './../components/common/Layout';


const Profile: React.FunctionComponent<RouteComponentProps> = ({ history, location }) => {
  const dispatch = useDispatch()

  const signIn = useSelector((state: RootState) => state.signIn)
  const { userInfo } = signIn

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } 
  }, [dispatch, history, userInfo])

  return (
    <Layout>
      <ProfileFormat>
        <Title>프로필</Title>

        <Button to="/close-account">회원탈퇴</Button>
      </ProfileFormat>
    </Layout>
  )
}

export default Profile


const ProfileFormat = styled.div`
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
