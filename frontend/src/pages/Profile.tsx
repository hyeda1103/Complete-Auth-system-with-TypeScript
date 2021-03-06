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
      setMessage('??????????????? ???????????? ????????????')
    } else {
      dispatch(updateProfile({ id: user._id, name, email, password }))
      dispatch(openSideBar())
    }
  }

  return (
    <>
      <Meta title={`????????? ${name}`} description={`????????? ???????????? 4??? ??????????????? ?????? ????????? ????????? ??????????????????`} />
      <Layout>
        <ProfileForm>
          <Title>?????????</Title>
          <Form onSubmit={submitHandler}>
            <FormItem>
              <Label htmlFor="name">??????</Label>
              <Input id="name" type="name" placeholder="??????" value={name} autoComplete="off" onChange={(e) => setName(e.target.value)} />
            </FormItem>
            <FormItem>
              <Label htmlFor="role">??????</Label>
              <Input id="role" type="text" placeholder="??????" value={role} disabled />
            </FormItem>
            <FormItem>
              <Label htmlFor="email">????????? ??????</Label>
              <Input id="email" type="email" placeholder="????????? ??????" value={email} disabled />
            </FormItem>
            <FormItem>
              <Label htmlFor="passsword">????????????</Label>
              <Input id="password" type="password" placeholder="????????????" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormItem>
            <FormItem>
              <Label htmlFor="confirmPassword">???????????? ??????</Label>
              <Input id="confirmPassword" type="password" placeholder="???????????? ??????" autoComplete="off" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </FormItem>
            {loading && <Loader />}
            {error && <Error>{error}</Error>}
            {message && <Error>{message}</Error>}
            {success && <Message>???????????? ??????????????? ???????????????????????????</Message>}
            <FormItem>
              <Button type="submit">????????????</Button>
            </FormItem>
          </Form>
          <SignOut to="/close-account">????????????</SignOut>
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
