import React from 'react';
import styled from 'styled-components';

import tempImg from '../../assets/images/temp-image.png';

const NewsDetailContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;

const NewsDetailBox = styled.div`
width: 650px`;

const NewsDetailTitle = styled.p`
font-size: 32px;
font-weight: 600;
color: var(--black-color);
`;

const NewsDetailTime = styled.p`
font-size: 14px;
font-weight: 400;
color: var(--gray-color);
`;

const NewsDetailWriter = styled.p`
font-size: 16px;
font-weight: 500;
color: var(--black-color);
`;

const NewsDetailSubTitle = styled.div`
font-size: 18px;
font-weight: 400;
color: var(--gray-color);
border-left: 5px solid var(--point-color);
margin-bottom: 30px;
`;

const NewsDetailImg = styled.img`
width: 650px
`;

const NewsDetailContent = styled.div`
font-size: 18px;
font-weight: 400;
color: var(--black-color);
margin-top: 50px;
margin-bottom: 100px;
`;

const BackBtn = styled.button`
display: flex;
justify-content: center;
align-items: center;
background-color: var(--gray-color);
`;

const BtnTxt = styled.p`
font-size: 26px;
font-weight: 700;
color: var(--black-color)
`;

export default function NewsDetail() {
  return (
    <NewsDetailContainer>
      <NewsDetailBox>
        <NewsDetailTitle>
          투자 괜히 했다 지뢰밟나... 상장사 불투명한 정보에 전전긍긍
        </NewsDetailTitle>
        <NewsDetailTime>
          입력: 2023.09.06. 11:56
        </NewsDetailTime>
        <NewsDetailWriter>
          런수창 기자
        </NewsDetailWriter>
        <NewsDetailSubTitle>
          불성실공시법인 지정 사례 늘어<br />
          경기 침체에 기업 유동성 노란불
        </NewsDetailSubTitle>
        <NewsDetailImg src={tempImg} />
        <NewsDetailContent>
          올해 들어 국내 증시에서 불투명한 공시로 제재를 받는 상장사가 늘어나면서 투자자들의 한숨이 깊어지고 있다.
          특히 경기 침체가 길어지면서 유독 코스닥 기업들이 불성실공시법인으로 지정되는 사례가 크게 늘고 있다.<br/>
          <br/>
          5일 한국거래소에 따르면 지난 1월부터 지난달까지 코스피 28곳, 코스닥 54곳 등 총 82곳 상장사가 불성실공시법인으로 지정됐다.
          전년 동기 불성실공시법지정 건수가 39곳에 불과했던 것과 비교하면 두 배가 넘게 늘어난 것이다.
        </NewsDetailContent>
      </NewsDetailBox>
    </NewsDetailContainer>
  );
}
