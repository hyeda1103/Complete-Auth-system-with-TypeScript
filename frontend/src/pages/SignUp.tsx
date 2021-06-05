import React, {useState, ChangeEvent, FormEvent} from 'react'
import styled from 'styled-components'
import Layout from './../components/common/Layout';
import { useDispatch, useSelector } from 'react-redux'
import { signUp } from "../modules/user" 
import { RootState } from '../modules';
import Loader from './../components/common/Loader';
import Message from './../components/common/Message';
import { useEffect } from 'react';

const SignUp = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: ""
  })

  const {name, email, password} = values

  const dispatch = useDispatch()

  const userSignUp = useSelector((state: RootState) => state.signUp)
  const { loading, error, response } = userSignUp

  const handleChange = (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: e.target.value })
  }

  const clickSubmit = (e: FormEvent) => {
    e.preventDefault()
    dispatch(signUp(name, email, password))
  }

  useEffect(() => {
    console.log(error)
  }, [error])

  return (
    <Layout>
      <SignUpFormat>
        <Title>회원가입</Title>
        {response && <Message>{response.message}</Message>}
        {/* {loading && <Loader />} */}
        {error && <Message>{error}</Message>}
        <Form>
          <FormItem>
            <Label>이름</Label>
            <Input onChange={handleChange('name')} type="text" value={name} />
          </FormItem>
          <FormItem>
            <Label>이메일</Label>
            <Input onChange={handleChange('email')} type="email" value={email} />
          </FormItem>
          <FormItem>
            <Label>비밀번호</Label>
            <Input onChange={handleChange('password')} type="password" value={password} />
          </FormItem>
          <FormItem>
            <Button onClick={clickSubmit}>회원가입</Button>
          </FormItem>
        </Form>
      </SignUpFormat>
    </Layout>
  )
}

export default SignUp

const SignUpFormat = styled.div`
  width: 450px;
`

const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
`

const Form = styled.form`
  
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

const Button = styled.div`
  padding: 0.5rem;
  letter-spacing: 1.4px;
  font-size: 1.25rem;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 5px;
  text-align: center;
  transition: .4s ease;

  &:hover {
    background: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.body};
  }
`
