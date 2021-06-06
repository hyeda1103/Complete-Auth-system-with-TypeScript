import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router-dom';
import Layout from './../components/common/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { openSideBar } from '../modules/sideBar'
import { signIn } from '../modules/user'
import { RootState } from '../modules'
import Loader from './../components/common/Loader'
import Message from './../components/common/Message'

const SignIn: React.FunctionComponent<RouteComponentProps> = ({history, location}) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const { email, password } = values

  const dispatch = useDispatch()

  const userSignIn = useSelector((state: RootState) => state.signIn)
  const { loading, error, userInfo } = userSignIn

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
      dispatch(openSideBar())
    }
  }, [dispatch, history, userInfo, redirect]);

  const handleChange = (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: e.target.value })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    dispatch(signIn(email, password))
  }

  return (
    <Layout>
      <SignUpFormat>
        <Title>로그인</Title>
        <Form>
          <FormItem>
            <Label>이메일</Label>
            <Input onChange={handleChange('email')} type="email" value={email} />
          </FormItem>
          <FormItem>
            <Label>비밀번호</Label>
            <Input onChange={handleChange('password')} type="password" value={password} />
          </FormItem>
          {loading && <Loader />}
          {error && <Message>{error}</Message>}
          <FormItem>
            <Button onClick={handleSubmit}>로그인</Button>
          </FormItem>
        </Form>
      </SignUpFormat>
    </Layout>
  )
}

export default SignIn

const SignUpFormat = styled.div`
  width: 450px;
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

  &:last-child {
    margin: 2rem 0;
  }
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

const Button = styled.div`
  padding: 0.5rem;
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
