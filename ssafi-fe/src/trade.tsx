import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
// import axios from './api/apiControlller';
import axios from 'axios';
import TradeApi from './components/Trade/TradeApi';
import TradeAi from './components/Trade/TradeAi';
import TradeOrder from './components/Trade/TradeOrder';
import TradeAccount from './components/Trade/TradeAccount';

interface TradeMenuProps {
  active?: boolean;
}

const TradeContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 1270px;
  align-items: center;
`;

const TradeNavContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 58px;
  width: 100%;
  border-bottom: 1px solid var(--gray-color);
`;

const TradeMenuArea = styled.div`
  display: flex;
  align-items: center;
  width: 1270px;
  padding: 0px 30px;
  gap: 30px;
`;

const TradeMenu = styled.div<TradeMenuProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  padding: 0px 10px;
  cursor: pointer;
  height: ${(props) => (props.active ? '55px' : '58px')};
  color: ${(props) =>
    props.active ? 'var(--dark-color)' : 'var(--gray-color)'};
  font-weight: ${(props) => (props.active ? '600' : '400')};
  border-bottom: ${(props) =>
    props.active ? '3px solid var(--dark-color)' : '0px'};
  padding-top: ${(props) => (props.active ? '2px' : '0px')};
`;

const TradeArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1270px;
  padding: 0px 30px;
`;

export default function Trade() {
  const navigate = useNavigate();
  const location = useLocation();
  const [hasApi, setHasApi] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        // 토큰이 없을 경우
        alert('로그인이 필요합니다.');
        navigate('/'); // 메인 페이지로 이동. (경로는 실제 메인 페이지 경로에 따라 수정해야 합니다.)
        return;
      }

      try {
        const responseData = await axios.get(
          'http://localhost:8083/api/member/key-account',
          {
            headers: {
              Authorization: token,
            },
          },
        );

        if (responseData.status === 200) {
          console.log(responseData);
          if (responseData.data.appKey) {
            setHasApi(true);
            console.log('앱키 있음');
          } else {
            setHasApi(false);
            console.log('앱키 없음');
            navigate('/trade/api');
          }
        } else {
          console.log(`Request failed with status: ${responseData.status}`);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const toAI = () => {
    if (!hasApi) {
      navigate('/trade/api');
    } else {
      navigate('/trade');
    }
  };

  const toOrder = () => {
    navigate('/trade/order');
  };

  const toAccount = () => {
    navigate('/trade/account');
  };

  return (
    <TradeContainer>
      <TradeNavContainer>
        <TradeMenuArea>
          <TradeMenu
            active={
              location.pathname === '/trade' ||
              location.pathname === '/trade/api'
            }
            onClick={toAI}
          >
            AI
          </TradeMenu>
          <TradeMenu
            active={location.pathname === '/trade/order'}
            onClick={toOrder}
          >
            빠른주문
          </TradeMenu>
          <TradeMenu
            active={location.pathname === '/trade/account'}
            onClick={toAccount}
          >
            내 계좌
          </TradeMenu>
        </TradeMenuArea>
      </TradeNavContainer>
      <TradeArea>
        <Routes>
          <Route path="/" element={<TradeAi />} />
          <Route path="/api" element={<TradeApi />} />
          <Route path="/order" element={<TradeOrder />} />
          <Route path="/account" element={<TradeAccount />} />
        </Routes>
      </TradeArea>
    </TradeContainer>
  );
}
