import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
import darkLogo from '../../assets/logos/logo-dark.png';
import kakaoURL from '../../OAuth';
import { useAuth } from '../../context/AuthContext';

interface SiteMenuProps {
  active?: boolean;
}

// styled-component 파트
const NavContainer = styled.div`
  display: flex;
  justify-content: center;
  min-width: 1270px;
  height: 60px;
  border-bottom: 1px solid var(--black-color);
  background-color: var(--dark-color);
`;

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1270px;
  align-items: center;
  padding: 0px 30px;
`;

const NavbarLeft = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SiteLogo = styled.img.attrs({
  src: `${darkLogo}`,
})`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin-right: 30px;
  height: 28px;
`;

const SiteMenu = styled.div<SiteMenuProps>`
  font-size: 24px;
  margin-left: 30px;
  cursor: pointer;
  color: ${(props) =>
    props.active ? 'var(--point-color)' : 'var(--white-color)'};
`;

const NavbarRight = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LoginButton = styled.div`
  font-size: 18px;
  cursor: pointer;
  color: var(--white-color);
`;

const LogoutButton = styled.div`
  font-size: 18px;
  cursor: pointer;
  color: var(--white-color);
`;

export default function Header() {
  // 기능 코드 파트
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  // console.log(isLoggedIn);
  const navigate = useNavigate();
  const location = useLocation();
  const toMain = () => {
    navigate('/');
  };

  const toTrade = () => {
    navigate('/trade');
  };

  const toSurvey = () => {
    navigate('/mbti');
  };

  useEffect(() => {
    // 페이지 로딩 시 localStorage에서 토큰 유무를 확인하여 로그인 상태 설정
    const token = localStorage.getItem('accessToken');
    // console.log(token);
    if (token !== null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [setIsLoggedIn]);

  // isLoggedIn 상태가 변경될 때마다 로그를 출력
  // useEffect(() => {
  //   console.log(isLoggedIn);
  // }, [isLoggedIn]);

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };
  // const handleTest = () => {

  // }
  const handleLogout = async () => {
    const token = localStorage.getItem('accessToken');
    console.log(token);
    if (!token) {
      console.error('토큰이 없습니다.');
      setIsLoggedIn(false);
      return;
    }
    try {
      await axios.post(
        'http://localhost:8083/api/logout',
        {},
        {
          headers: {
            Authorization: token,
          },
        },
      );
      console.log(token);
      localStorage.clear();
      setIsLoggedIn(false);
      window.alert('로그아웃되었습니다.');
      navigate('/');
    } catch (error) {
      console.error('로그아웃 중 에러가 발생했습니다:', error);
    }
  };

  const toNews = () => {
    navigate('/news');
  };

  return (
    <NavContainer>
      <Navbar>
        <NavbarLeft>
          <SiteLogo onClick={toMain} />
          <SiteMenu
            active={location.pathname.includes('/trade')}
            onClick={toTrade}
          >
            AI 트레이딩
          </SiteMenu>
          <SiteMenu active={location.pathname === '/mbti'} onClick={toSurvey}>
            금융 MBTI
          </SiteMenu>
          <SiteMenu
            active={location.pathname.includes('/news')}
            onClick={toNews}
          >
            뉴스
          </SiteMenu>
        </NavbarLeft>
        <NavbarRight>
          {/* <button onClick={}>테스트</button> */}
          {/* 로그인 상태에 따라 버튼을 동적으로 렌더링 */}
          {!isLoggedIn && (
            <LoginButton onClick={handleLogin}>로그인</LoginButton>
          )}
          {isLoggedIn && (
            <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
          )}
        </NavbarRight>
      </Navbar>
    </NavContainer>
  );
}
