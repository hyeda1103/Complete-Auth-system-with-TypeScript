import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from './../modules/user'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router-dom'
import Message from './../components/common/Message';
import Loader from './../components/common/Loader';
import { RootState } from '../modules'
import Layout from './../components/common/Layout';
import Error from './../components/common/Error';
import Meta from '../components/common/Meta'
var jwt = require("jsonwebtoken")

const Reset = ({ match }: RouteComponentProps<{ token?: any }>) => {
  const [values, setValues] = useState({
    name: '',
    token: '',
    newPassword: '',
  })

  const dispatch = useDispatch()
  const userResetPassword = useSelector((state: RootState) => state.resetPassword)
  const { loading, error, resetInfo } = userResetPassword

  useEffect(() => {
    const token = match.params.token
    const { name } = jwt.decode(token)
    if (token) {
      setValues({ ...values, name, token })
    }
  }, [])

  const { name, token, newPassword } = values

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, newPassword: e.target.value })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    dispatch(resetPassword({ newPassword, resetPasswordLink: token }))
  }

  return (
    <>
      <Meta title={`우아한 ${name}`} description={`우아한 테크러닝 4기 시니어봇과 함께 만드는 우아한 글쓰기입니다`} />
      <Layout>
        <ResetForm>
          <Title>{name}님, 반가워요! 새로운 비밀번호를 입력하여 비밀번호 재설정을 완료해주세요.</Title>
          <Form>
            <FormItem>
              <Label htmlFor="password">새로운 비밀번호</Label>
              <Input id="password" type="password" value={newPassword} autoComplete="off" placeholder="새로운 비밀번호를 입력하세요" onChange={handleChange} required />
            </FormItem>
            {error && <Error>{error}</Error>}
            {resetInfo && <Message>{resetInfo.message}</Message>}
            {loading && <Loader />}
            <FormItem>
              <Button type="submit" onClick={handleSubmit}>
                비밀번호 재설정
              </Button>
            </FormItem>
          </Form>
        </ResetForm>
      </Layout>
    </>
  )
}

export default Reset

const ResetForm = styled.div`
  width: 450px;
  margin-top: -30px;
`


const Form = styled.form``

const Title = styled.h1`
  text-align: center;
  font-size: 1.5rem;
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
