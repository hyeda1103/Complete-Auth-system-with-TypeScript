import React, { Fragment } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../modules/user";
import { RootState } from '../../modules'

interface IProps {
  open: boolean;
};

const SideBar = ({ open }: IProps) => {
  const dispatch = useDispatch(); // 디스패치 함수를 가져옵니다
  
  const emailSignIn = useSelector((state: RootState) => state.signIn)
  const googleSignIn = useSelector((state: RootState) => state.googleSignIn)
  const { userInfo: userInfoWithEmail } = emailSignIn
  const { userInfo: userInfoWithGoogle } = googleSignIn
  const userInfo = userInfoWithEmail || userInfoWithGoogle

  const logoutHandler = () => {
    dispatch(signout());
    document.location.href = "/signin";
  };

  return (
    <Nav open={open}>
      {userInfo ? (
        <Fragment>
          <NavItem to="/profile">
            {userInfo.name}의 우아한 글쓰기
          </NavItem>
          <NavItemNoLink onClick={logoutHandler}>로그아웃</NavItemNoLink>
        </Fragment>
      ) : (
        <Fragment>
          <NavItem to="/signup">
            회원가입
          </NavItem>
          <NavItem to="/signin">
            로그인
          </NavItem>
        </Fragment>
      )}
    </Nav>
  );
};

export default SideBar;

const Nav = styled.section<IProps>`
  height: calc(100vh - 60px);
  width: 250px;
  top: 60px;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
  position: fixed;
  z-index: 3;
  padding: 1.25rem;
  background: #22272e;
  transition: 0.6s ease;
`

const NavItem = styled(Link)`
  text-decoration: none;
  font-size: 18px;
  padding: 15px 20px;
  width: 100%;
  letter-spacing: 1.4px;
  cursor: pointer;
  display: block;
  color: #f6f5f0;
`;

const NavItemNoLink = styled.span`
  font-size: 18px;
  padding: 15px 20px;
  width: 100%;
  letter-spacing: 1.4px;
  cursor: pointer;
  display: block;
  color: #f6f5f0;
`;
