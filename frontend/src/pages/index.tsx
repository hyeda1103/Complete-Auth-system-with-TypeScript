import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import Layout from '../components/common/Layout';
import Meta from '../components/common/Meta';
import { RootState } from '../modules';


const Home = () => {
  const emailSignIn = useSelector((state: RootState) => state.signIn)
  const googleSignIn = useSelector((state: RootState) => state.googleSignIn)
  const { userInfo: userInfoWithEmail } = emailSignIn
  const { userInfo: userInfoWithGoogle } = googleSignIn
  const userInfo = userInfoWithEmail || userInfoWithGoogle

  return (
    <>
      <Meta title={userInfo ? `우아한 ${userInfo.name}` : `우아한 글쓰기`} description={`우아한 테크러닝 4기 시니어봇과 함께 만드는 우아한 글쓰기입니다`} />
      <Layout>홈</Layout>
    </>
  )
      
}

export default Home

