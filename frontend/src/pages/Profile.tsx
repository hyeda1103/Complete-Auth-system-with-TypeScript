import React, { useState, useEffect, FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Link, RouteComponentProps } from 'react-router-dom'
import { RootState } from '../modules'
import Layout from './../components/common/Layout';
import { updateProfile, getProfile, USER_UPDATE_PROFILE_RESET } from './../modules/user';
import Loader from './../components/common/Loader';
import Error from './../components/common/Error';
import Message from './../components/common/Message';
import { openSideBar } from './../modules/sideBar';
import Meta from '../components/common/Meta'


const Profile: React.FunctionComponent<RouteComponentProps> = ({ history, location }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState("")
  
  const dispatch = useDispatch()

  const userProfile = useSelector((state: RootState) => state.getProfile)
  const { loading, error, user } = userProfile

  const userUpdateProfile = useSelector((state: RootState) => state.updateProfile)
  const { success } = userUpdateProfile

  const emailSignIn = useSelector((state: RootState) => state.signIn)
  const googleSignIn = useSelector((state: RootState) => state.googleSignIn)
  const { userInfo: userInfoWithEmail } = emailSignIn
  const { userInfo: userInfoWithGoogle } = googleSignIn
  const userInfo = userInfoWithEmail || userInfoWithGoogle


  useEffect(() => {
    if (!userInfo) {
      history.push('/signin')
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getProfile('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
        setRole(user.role)
      }
    }
  }, [userInfo, history, user, dispatch, success])

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('비밀번호가 일치하지 않습니다')
    } else {
      dispatch(updateProfile({ id: user._id, name, email, password }))
      dispatch(openSideBar())
    }
  }

  return (
    <>
      <Meta title={`우아한 ${name}`} description={`우아한 테크러닝 4기 시니어봇과 함께 만드는 우아한 글쓰기입니다`} />
      <Layout>
        <ProfileForm>
          <Title>프로필</Title>
          <Form onSubmit={submitHandler}>
            <FormItem>
              <Label htmlFor="name">이름</Label>
              <Input id="name" type="name" placeholder="이름" value={name} autoComplete="off" onChange={(e) => setName(e.target.value)} />
            </FormItem>
            <FormItem>
              <Label htmlFor="role">역할</Label>
              <Input id="role" type="text" placeholder="역할" value={role} disabled />
            </FormItem>
            <FormItem>
              <Label htmlFor="email">이메일 주소</Label>
              <Input id="email" type="email" placeholder="이메일 주소" value={email} disabled />
            </FormItem>
            <FormItem>
              <Label htmlFor="passsword">비밀번호</Label>
              <Input id="password" type="password" placeholder="비밀번호" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormItem>
            <FormItem>
              <Label htmlFor="confirmPassword">비밀번호 확인</Label>
              <Input id="confirmPassword" type="password" placeholder="비밀번호 확인" autoComplete="off" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </FormItem>
            {loading && <Loader />}
            {error && <Error>{error}</Error>}
            {message && <Error>{message}</Error>}
            {success && <Message>프로필이 성공적으로 업데이트되었습니다</Message>}
            <FormItem>
              <Button type="submit">업데이트</Button>
            </FormItem>
          </Form>
          <SignOut to="/close-account">회원탈퇴</SignOut>
        </ProfileForm>
      </Layout>
    </>
  )
}

export default Profile


const ProfileForm = styled.div`
  width: 450px;
  margin-top: -30px;
`

const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
`

const Form = styled.form``

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
`

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-size: 1rem;
  padding-left: 0.5rem;
`

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  outline: none;
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 5px;
`


const Button = styled.button`
  padding: 0.5rem;
  margin-top: 1rem;
  letter-spacing: 1.4px;
  font-size: 1.25rem;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 5px;
  text-align: center;
  transition: 0.4s ease;

  &:hover {
    background: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.body};
  }
`

const SignOut = styled(Link)`
  display: block;
  text-align: right;
  color: ${({ theme }) => theme.text};
`
