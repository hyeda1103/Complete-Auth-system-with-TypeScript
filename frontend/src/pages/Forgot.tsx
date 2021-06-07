import React, { useState, FormEvent } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword } from './../modules/user'
import { RootState } from '../modules'
import { RouteComponentProps } from 'react-router-dom';
import Message from './../components/common/Message';
import Loader from './../components/common/Loader';
import Layout from './../components/common/Layout';
import Error from './../components/common/Error';

const ForgotPassword = ({ history }: RouteComponentProps) => {
  const [email, setEmail] = useState('')

  const dispatch = useDispatch()

  const userForgotPassword = useSelector((state: RootState) => state.forgotPassword)
  const { loading, error, email: forgotEmail } = userForgotPassword

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    dispatch(forgotPassword({ email: email }))
  }

  return (
    <Layout>
      <SignUpForm>
        <Title>비밀번호 재설정</Title>
        <Form onSubmit={submitHandler}>
          <FormItem>
            <Label htmlFor="email">이메일</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormItem>
          {error && <Error>{error}</Error>}
          {loading && <Loader />}
          {forgotEmail && <Message>{forgotEmail.message}</Message>}
          <FormItem>
            <Button type="submit">비밀번호 재설정 링크 요청</Button>
          </FormItem>
        </Form>
      </SignUpForm>
    </Layout>
  )
}

export default ForgotPassword

const SignUpForm = styled.div`
  width: 450px;
`

const Form = styled.form``

const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
`

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

const Button = styled.button`
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
