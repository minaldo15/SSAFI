import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// eslint-disable-next-line import/no-extraneous-dependencies
import mainImage from './assets/images/main-image.png';
import { ReactComponent as RightArrow } from './assets/images/button-arrow.svg';
import longLogo from './assets/logos/logo-long.png';
import aiTradeImage from './assets/images/ai-trade.svg';
import investPortfolio from './assets/images/invest-portfolio.svg';
import stockNews from './assets/images/stock-news.svg';
import handleScroll from './utils/scrollUtils';

// styled-components
// 메인 영역
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 1270px;
`;

// 메인 배너 속성
const MainBanner = styled.div`
  display: flex;
  width: 1140px;
  margin-top: 60px;
  padding: 0px 30px;
  position: relative;
`;

// 메인 배너 제목 텍스트 속성
const BannerTitle = styled.p`
  font-size: 58px;
  font-weight: 600;
  color: var(--black-color);
  line-height: 80px;
`;

// 메인 배너 내용 텍스트 속성
const BannerContent = styled.p`
  font-size: 26px;
  font-weight: 400;
  color: var(--gray-color);
`;

// 배너 버튼 영역
const ButtonDiv = styled.div`
  width: 510px;
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
`;

// 배너 버튼 속성
const BannerBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--gradation-color);
  color: var(--dark-color);
  font-size: 28px;
  font-weight: 400;
  border: 0px;
  border-radius: 20px;
  cursor: pointer;
`;

// 배너 버튼 내 텍스트 속성
const ButtonText = styled.p`
  margin: 10px;
`;

const ButtonArrow = styled(RightArrow)`
  fill: var(--dark-color);
  margin-right: 10px;
`;

// 배너 이미지 속성
const BannerImg = styled.img.attrs({
  src: `${mainImage}`,
})`
  width: 450px;
  position: absolute;
  bottom: 0;
  right: 0;
  margin-right: 30px;
`;

// 메인 서비스 안내 영역
const MainService = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1140px;
  padding: 160px 30px;
`;

// 긴 로고 이미지 속성
const LongLogo = styled.img.attrs({
  src: `${longLogo}`,
})`
  width: 670px;
`;

// 서비스 박스 영역
const ServiceDiv = styled.div`
  display: flex;
  margin-top: 50px;
  width: 1000px;
  justify-content: space-between;
`;

// 서비스 박스 속성
const ServiceBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 280px;
  height: 400px;
  background: var(--light-gradation-color);
  border-radius: 18px;
`;

// 서비스 이름 속성
const ServiceTitle = styled.p`
  color: var(--dark-color);
  font-size: 24px;
  font-weight: 500;
  margin: 20px;
`;

// 서비스 내용 속성
const ServiceContent = styled.p`
  color: var(--gray-color);
  font-size: 20px;
  font-weight: 400;
  margin: 0px 36PX;
`;

// AI 트레이딩 이미지 속성
const AiTradeImg = styled.img.attrs({
  src: `${aiTradeImage}`,
})`
  width: 160px;
  margin-bottom: 10px;
`;

// 포트폴리오 이미지 속성
const InvestPortfolioImg = styled.img.attrs({
  src: `${investPortfolio}`,
})`
  width: 160px;
  margin-bottom: 10px;
`;

// 뉴스 이미지 속성
const StockNewsImg = styled.img.attrs({
  src: `${stockNews}`,
})`
  width: 160px;
  margin-bottom: 10px;
`;

export default function Main() {
  React.useEffect(() => {
    // wheel 이벤트 리스너
    window.addEventListener('wheel', handleScroll);

    // 컴포넌트가 언마운트될 때 리스너를 제거
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  const navigate = useNavigate();

  const handleButtonClick = (page: string) => {
    if (page === 'mbti') {
      navigate('/mbti');
    } else if (page === 'ai') {
      navigate('/trade');
    } else if (page === 'news') {
      navigate('/news');
    }
  };

  return (
    <MainContainer>
      <MainBanner>
        <div>
          <BannerTitle>
            똑똑한 SSAFI AI로
            <br />
            일하는 동안에도 주식 투자하세요
          </BannerTitle>
          <BannerContent>
            AI 트레이딩 플랫폼 SSAFI는<br />
            사용자의 투자 스타일을 바탕으로 주식 거래를 돕습니다.<br />
            <br />
            금융 MBTI 검사를 통해 나의 투자 스타일을 확인하고, <br />
            AI 트레이딩으로 더 똑똑하게 투자하세요
          </BannerContent>
          <ButtonDiv>
            <BannerBtn onClick={() => handleButtonClick('mbti')}>
              <ButtonText>금융 MBTI 검사하기</ButtonText>
              <ButtonArrow />
            </BannerBtn>
            <BannerBtn onClick={() => handleButtonClick('ai')}>
              <ButtonText>AI 트레이딩</ButtonText>
              <ButtonArrow />
            </BannerBtn>
          </ButtonDiv>
        </div>
        <BannerImg />
      </MainBanner>
      <MainService>
        <LongLogo />
        <ServiceDiv>
          <ServiceBox onClick={() => handleButtonClick('ai')}>
            <AiTradeImg />
            <ServiceTitle>AI 트레이딩</ServiceTitle>
            <ServiceContent>
              AI를 활용해 일하는 시간에도 주식 투자를 해보세요
            </ServiceContent>
          </ServiceBox>
          <ServiceBox onClick={() => handleButtonClick('mbti')}>
            <InvestPortfolioImg />
            <ServiceTitle>
              금융 MBTI
            </ServiceTitle>
            <ServiceContent>
              금융 MBTI로 나의 투자 스타일을 발견하고 투자 방식을 추천받아보세요
            </ServiceContent>
          </ServiceBox>
          <ServiceBox onClick={() => handleButtonClick('news')}>
            <StockNewsImg />
            <ServiceTitle>증권 뉴스</ServiceTitle>
            <ServiceContent>
              관심종목과 관련된 증권 이슈를 확인하고 투자 수익률을 높여봐요.
            </ServiceContent>
          </ServiceBox>
        </ServiceDiv>
      </MainService>
    </MainContainer>
  );
}
