import React, { useState, useEffect, FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from './../components/common/Layout';
import { closeAccount, signout } from '../modules/user'
import { RootState } from '../modules';
import { RouteComponentProps } from 'react-router-dom';
import styled from "styled-components"

const CloseAccount = ({ history }: RouteComponentProps) => {
    const [agree, setAgree] = useState(false)
    
    const dispatch = useDispatch()

    const userCloseAccount = useSelector((state: RootState) => state.closeAccont)
    const { loading, error, success } = userCloseAccount

    const emailSignIn = useSelector((state: RootState) => state.signIn)
    const googleSignIn = useSelector((state: RootState) => state.googleSignIn)
    const { userInfo: userInfoWithEmail } = emailSignIn
    const { userInfo: userInfoWithGoogle } = googleSignIn
    const userInfo = userInfoWithEmail || userInfoWithGoogle

    const submitHandler = (e: FormEvent) => {
      e.preventDefault()
      dispatch(closeAccount(userInfo._id))
    }
    
    useEffect(() => {
      if (success) {
          dispatch(signout())
          document.location.href = '/signin'
      }
    }, [history, success, dispatch])

    return (
      <Layout>
        <CloseAccountForm>
          <Form onSubmit={submitHandler}>
            <FormItem>
              <Input type="checkbox" checked={agree} id="agreement" onChange={(e) => setAgree(e.target.checked)} />
              <Check />
              <Label htmlFor="agree">회원탈퇴에 대한 모든 조항을 확인하였으며 이에 동의합니다</Label>
            </FormItem>
            <Button type="submit" disabled={!agree}>
              회원탈퇴
            </Button>
          </Form>
        </CloseAccountForm>
      </Layout>
    )
}

export default CloseAccount

const CloseAccountForm = styled.div`
  width: 450px;
`

const Form = styled.form``

const FormItem = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;

  &:last-child {
    margin: 2rem 0;
  }
`

const Label = styled.label`
  font-size: 1rem;
  padding-left: 0.5rem;
  color: ${({ theme }) => theme.text};
  transition: 0.4s ease;
`

interface IProps {
    disabled: boolean
}

const Button = styled.button<IProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.5rem;
  letter-spacing: 1.4px;
  font-size: 1.25rem;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 5px;
  transition: 0.4s ease;

  &:hover {
    background: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.body};
  }

  &:disabled {
    opacity: 0.65;
  }
`

const Check = styled.span``

const Input = styled.input`
  outline: none;
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 5px;
`



