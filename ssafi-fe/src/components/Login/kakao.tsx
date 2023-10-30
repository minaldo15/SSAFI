import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';

const Kakao = () => {
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  // 인가 코드 추출
  let codeParam = new URL(window.location.href).searchParams.get('code');
  let code = codeParam || '';

  useEffect(() => {
    const fetchData = async () => {
      if (code) {
        console.log(code);
        try {
          const request = {
            snsType: 'KAKAO',
            code,
          };
          const response = await axios.post(
            'http://localhost:8083/api/user/social-login',
            request,
          );

          if (response.status === 200) {
            // 헤더에 있는 토큰 정보 저장
            const accessToken = response.headers.authorization;
            const refreshToken = response.headers.refreshtoken;
            console.log(response.data);
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            // 응답 본문에 있는 추가 정보 저장
            const { appKey, secretKey } = response.data.authResponseDto;
            const apiAccessToken = response.data.authResponseDto.accessToken;
            const cano = response.data.accountPrefix;
            if (apiAccessToken) {
              localStorage.setItem('apiAccessToken', apiAccessToken);
            }
            if (appKey) localStorage.setItem('appKey', appKey);
            if (secretKey) localStorage.setItem('secretKey', secretKey);
            if (cano) localStorage.setItem('cano', cano);
            window.alert('로그인 성공!.');
            setIsLoggedIn(true);
            console.log('스토리지:', localStorage);
            // 필요한 정보가 모두 있으면 주식 투자 창으로 이동
            if (apiAccessToken && appKey && secretKey) {
              // navigate('/stockInvestment');
              navigate('/trade');
            } else if (accessToken || refreshToken) {
              // navigate('/appKeyRegistration');
              navigate('/trade/api');
            } else {
              navigate('/');
            }
          } else {
            console.error('로그인 실패');
            window.alert('로그인에 실패하였습니다.');
            navigate('/');
          }
        } catch (error) {
          console.error('로그인 에러', error);
          window.alert('로그인에 실패하였습니다.');
          navigate('/');
        }
      } else {
        console.log('인가 코드가 없습니다.');
        window.alert('인가 코드를 불러오지 못했습니다.');
        navigate('/');
      }
    };
    fetchData();
  }, [code, navigate, setIsLoggedIn]);

  return <div>로그인 중입니다.</div>;
};

export default Kakao;
