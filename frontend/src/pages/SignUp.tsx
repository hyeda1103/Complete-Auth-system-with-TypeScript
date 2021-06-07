import React, {useState, ChangeEvent, FormEvent} from 'react'
import styled from 'styled-components'
import Layout from './../components/common/Layout';
import { useDispatch, useSelector } from 'react-redux'
import { signUp } from "../modules/user" 
import { RootState } from '../modules';
import Loader from './../components/common/Loader';
import Message from './../components/common/Message';
import Error from './../components/common/Error';
import Meta from '../components/common/Meta';

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

  return (
    <>
      <Meta title={`회원가입`} />
      <Layout>
        <SignUpForm>
          <Title>회원가입</Title>
          <Form>
            <FormItem>
              <Label htmlFor="name">이름</Label>
              <Input id="name" onChange={handleChange('name')} type="text" autoComplete="off" value={name} />
            </FormItem>
            <FormItem>
              <Label htmlFor="email">이메일</Label>
              <Input id="email" onChange={handleChange('email')} type="email" autoComplete="off" value={email} />
            </FormItem>
            <FormItem>
              <Label htmlFor="password">비밀번호</Label>
              <Input id="password" onChange={handleChange('password')} type="password" autoComplete="off" value={password} />
            </FormItem>
            {loading && <Loader />}
            {error && <Error>{error}</Error>}
            {response && <Message>{response.message}</Message>}
            <FormItem>
              <Button type="submit" onClick={clickSubmit}>
                회원가입
              </Button>
            </FormItem>
          </Form>
        </SignUpForm>
      </Layout>
    </>
  )
}

export default SignUp

const SignUpForm = styled.div`
  width: 450px;
  margin-top: -30px;
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
