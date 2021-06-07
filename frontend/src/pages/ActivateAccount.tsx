import React, {useState, useEffect, FormEvent} from 'react'
import styled from 'styled-components'
import Layout from '../components/common/Layout';
import { RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { activate } from "../modules/user" 
import { RootState } from '../modules';
import Loader from '../components/common/Loader';
import Message from '../components/common/Message';
import Error from './../components/common/Error';
var jwt = require("jsonwebtoken");

const Activate = ({ match }: RouteComponentProps<{ token?: any}>) => {
  const [values, setValues] = useState({
    name: "",
    token: "",
    show: true,
  });
  const { name, token, show } = values;

  const dispatch = useDispatch()

  const userAccountActivate = useSelector((state: RootState) => state.activate)
  const { loading, error, response } = userAccountActivate

  useEffect(() => {
    const token = match.params.token
    const { name } = jwt.decode(token);
    if (token) {
      setValues({ ...values, name, token });
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(activate(token));
  };

  return (
    <Layout>
      <ActivateForm>
          <Title>{name}님, 반가워요! 아래 버튼을 클릭하여 계정 활성화를 완료해주세요</Title>
          {loading && <Loader />}
          {error && <Error>{error}</Error>}
          {response && <Message>{response.message}</Message>}
          <Button onClick={handleSubmit}>계정 활성화</Button>
      </ActivateForm>
    </Layout>
  )
}

export default Activate

const ActivateForm = styled.div`
  width: 450px;
`

const Title = styled.h1`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
`

const Button = styled.div`
  margin: 1rem 0;
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
