import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import Logo from '../../assets/logos/logo.png';

// styled-component 파트
const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 1270px;
  justify-content: center;
  align-items: center;
  background-color: #EBEBEF;
  padding: 36px 0;
`;

const FooterArea = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1270px;
  align-items: start;
  padding: 0 30px;
`;

const FooterLogo = styled.img.attrs({
  src: `${Logo}`,
})`
  height: 28px;
  margin: 3px 0 24px 0;
`;

const FooterRighTArea = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
`;

const FooterTitle = styled.p`
  font-weight: 700;
  font-size: 22px;
  margin: 0;
  padding: 6px 0;
`;

const FooterContent = styled.div`
  font-weight: 500;
  font-size: 14px;
  margin-top: 8px;
  margin-right:4px;
  color: var(--gray-color);
  cursor: pointer;

  &:not(.text):hover {
    color: black;
  }

  &.text {
    cursor: default;
    margin-top: 6px;
  }
`;

const FooterBottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 30px;
  margin-top: 24px;
  color: rgba(128, 128, 128, 0.5);
  border-top: 0.5px solid rgba(128, 128, 128, 0.3);
`;

export default function Footer() {
  const navigate = useNavigate();

  const toGo = (endPoint: string) => {
    navigate(endPoint);
  };

  return (
    <FooterContainer>
      <FooterArea>
        <div>
          <FooterLogo />
          <FooterContent className='text'>
            서비스명 :  SSAFI | 대표자명 :  최휘빈
          </FooterContent>
          <FooterContent className='text'>
            연락처 :  012-3456-7890 | 이메일 :  ssafiofficial@ssafi.com
          </FooterContent>
          <FooterContent className='text'>
            주소 : 서울특별시 강남구 테헤란로 212 12F
          </FooterContent>
        </div>
        <FooterRighTArea>
          <div>
            <FooterTitle>AI Trading</FooterTitle>
            <FooterContent onClick={() => toGo('/trade')}>
              AI
            </FooterContent>
            <FooterContent onClick={() => toGo('/trade/order')}>
              빠른 주문
            </FooterContent>
            <FooterContent onClick={() => toGo('/trade/account')}>
              내 계좌
            </FooterContent>
          </div>
          <div>
            <FooterTitle>Finance MBTI</FooterTitle>
            <FooterContent onClick={() => toGo('/mbti')}>
              금융 MBTI 검사
            </FooterContent>
          </div>
          <div>
            <FooterTitle>News</FooterTitle>
            <FooterContent onClick={() => toGo('/news')}>
              뉴스 홈
            </FooterContent>
            <div style={{ display: 'flex' }}>
              <FooterContent onClick={() => toGo('/news/newest')}>
                최신 뉴스
              </FooterContent>
              <FooterContent onClick={() => toGo('/news/policies')}>
                |  증권 정책
              </FooterContent>
              <FooterContent onClick={() => toGo('/news/markets')}>
                |  시황
              </FooterContent>
              <FooterContent onClick={() => toGo('/news/announce')}>
                |  공시
              </FooterContent>
              <FooterContent onClick={() => toGo('/news/infos')}>
                |  기업 정보
              </FooterContent>
            </div>
          </div>
        </FooterRighTArea>
      </FooterArea>
      <FooterBottom>
        Copyright 2023 SSAFI. All rights reserved.
      </FooterBottom>
    </FooterContainer>
  );
}
