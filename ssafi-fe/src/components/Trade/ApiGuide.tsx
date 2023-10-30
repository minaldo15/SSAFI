import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import apiGuide1 from '../../assets/images/apiGuide_1.png';
import apiGuide2 from '../../assets/images/apiGuide_2.png';
import apiGuide3 from '../../assets/images/apiGuide_3.png';
import apiGuide4 from '../../assets/images/apiGuide_4.png';
import apiGuide5 from '../../assets/images/apiGuide_5.png';
import apiGuide6 from '../../assets/images/apiGuide_6.png';

interface GuideProps {
  closeModal: () => void;
}

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const ModalContainer = styled.div`
  background-color: var(--white-color);
  padding: 20px 40px 40px;
  border-radius: 20px;
  transition: height 0.3s;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin: 10px 0 20px 10px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  margin-top: 20px;
`;

const GuideBtn = styled.button`
  font-size: 20px;
  font-weight: 400;
  color: var(--white-color);
  background-color: var(--dark-color);
  width: 80px;
  height: 40px;
  border: none;
  border-radius: 10px;
  margin-right: 10px;
  cursor: pointer;

  &:hover {
    color: var(--dark-color);
    background-color: var(--white-color);
    border: 2px solid var(--dark-color);
  }
`;

const guideList: Array<string> = ['1. 모의 계좌 개설(앱)', '2. 한국투자증권 웹 접속', '3. PC 인증', '4. KIS Developers 신청', '5. 모의 계좌 연결', '6. KEY 발급'];
const allGuides = guideList.length - 1;
const imageList = [
  apiGuide1,
  apiGuide2,
  apiGuide3,
  apiGuide4,
  apiGuide5,
  apiGuide6,
];

const ApiGuide = ({ closeModal }: GuideProps) => {
  const [guideNum, setGuideNum] = useState(0);

  const nextGuideNum = () => {
    if (guideNum < allGuides) {
      setGuideNum(guideNum + 1);
    }
  };

  const previousGuideNum = () => {
    if (guideNum > 0) {
      setGuideNum(guideNum - 1);
    }
  };

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <ModalBackground onClick={closeModal}>
      <ModalContainer onClick={stopPropagation}>
        <div>
          <Title>{guideList[guideNum]}</Title>
          <img src={imageList[guideNum]} width={760}/>
          {guideNum !== allGuides
            ? <div>
              {guideNum === 0
                ? <ButtonBox><GuideBtn onClick={nextGuideNum}>다음</GuideBtn></ButtonBox>
                : <ButtonBox>
                  <GuideBtn onClick={previousGuideNum}>이전</GuideBtn>
                  <GuideBtn onClick={nextGuideNum}>다음</GuideBtn>
                </ButtonBox>
              }
            </div>
            : <ButtonBox>
              <GuideBtn onClick={previousGuideNum}>이전</GuideBtn>
              <GuideBtn onClick={closeModal}>창 닫기</GuideBtn>
            </ButtonBox>
          }
        </div>
      </ModalContainer>
    </ModalBackground>
  );
};

export default ApiGuide;
