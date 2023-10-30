import React from 'react';
import styled from 'styled-components';

import SurveyQnA from './QNA';
import instance from '../../api/apiControlller';

// 설문 완료 prop
interface Props {
  setSurveyDone: React.Dispatch<React.SetStateAction<boolean>>;
}

// styled-component 파트

const SurveyContainer = styled.div`
width:1210px;
margin-bottom: 100px;
`;

const SurveyTitle = styled.p`
font-size: 36px;
font-weight: 600;
color: var(--black-color);
margin-top: 50px;
`;

const SurveyNotice = styled.ul`
font-size: 20px;
font-weight: 400;
color: var(--black-color);
`;

const SurveySubTitle = styled.div`
font-size: 28px;
font-weight: 400;
color: var(--point-color);
margin-top: 50px;
`;

const SurveyBtn = styled.button`
font-size: 28px;
font-weight: 400;
color: var(--white-color);
background-color: var(--dark-color);
width: 150px;
height: 50px;
border: none;
border-radius: 10px;
margin-top: 50px;
cursor: pointer;

&:hover {
  color: var(--dark-color);
  background-color: var(--white-color);
  border: 2px solid var(--dark-color);
}
`;

export default function Survey({ setSurveyDone }: Props) {
  const questionList: Array<string> = [
    '나는 안정적인 수익이 있고 앞으로도 꾸준히 늘어날 것 같다.',
    '나의 금융자산 중 투자자산은 100%에 가깝다.',
    '가상화폐도 투자할 수 있다고 생각한다.',
    '나는 펀드, ETF, 주식 등 다양한 금융상품을 보유하고 있다.',
    '하나의 상품에 집중투자 하지 않고 안전하게 분산투자하고 있다.',
    '금융상품을 다양한 앱으로 투자하고 있고 자주 이용하고 있다.',
    '나의 관심사는 수익률과 판매량이 가장 높은 상품이다.',
    '혼자 투자하는건 역시 걱정돼서 친구의 조언을 따른다.',
    '나는 리밸런싱이 뭔지 알고 있고, 계획적이고 주기적으로 하고 있다.',
    '금융기관의 정보를 신뢰하고, 투자상품 가입 후 자주 확인한다.',
    '나는 내가 투자 중인 자산의 규모와 위험성에 대해 잘 이해하고 있다.',
    '나는 투자한 상품에 대해서는 수익률과 연관된 정보를 자주 확인한다.',
    '나는 평소 뉴스와 신문에서 자주 볼 수 있는 상품이나 테마를 고려해 투자한다.',
    '시장수익률 보다는 내 투자 수익률이 훨씬 높은 것 같다.',
    '손실이 났을대도 좌절 없이 미래의 수익성을 생각하면 감당할 수 있다.',
    '좋은 투자정보를 알게 되면 누구보다 빠르게 투자하고 싶다.',
    '내가 아는 투자정보는 이미 대부분이 알고 있는 것 같다.',
    '현재 성과가 좋은 종목보다 저평가된 종목에 투자한다.',
    '나는 앱을 통한 투자상품 거래가 익숙하다.',
    '나는 주식이나 펀드보다 예금, 적금처럼 안정적인 투자를 선호한다.',
  ];

  const [answerList, setAnswerList] = React.useState<Array<number>>(
    new Array(questionList.length).fill(-1),
  );

  const handleSurveyData = async (surveyData: number[], mbtiString: string) => {
    const request = {
      'aiScore': surveyData[0],
      'pbScore': surveyData[1],
      'mwScore': surveyData[2],
      'lcScore': surveyData[3],
      'type': mbtiString,
    };
    console.log(request);
    const submit = await instance.post('/member/mbti', request);
    console.log(submit);
  };

  const handleSurveyDone = () => {
    console.log(answerList);
    const notAllChecked: boolean = answerList.some((item) => item === -1);
    if (notAllChecked) {
      let notAnswered = '';
      for (let i = 0; i < answerList.length; i += 1) {
        if (answerList[i] === -1) {
          notAnswered += `${i + 1}번 `;
        }
      }
      alert(`다음 질문에 답해주세요!\n${notAnswered}`);
    } else {
      const mbtiPoint: number[] = [0, 0, 0, 0];
      for (let i = 0; i < answerList.length; i += 1) {
        const numRange = Math.floor(i / 5);
        if (numRange === 0) {
          mbtiPoint[0] += answerList[i];
        } else if (numRange === 1) {
          mbtiPoint[1] += answerList[i];
        } else if (numRange === 2) {
          mbtiPoint[2] += answerList[i];
        } else if (numRange === 3) {
          mbtiPoint[3] += answerList[i];
        }
      }

      let mbtiString = '';
      if (mbtiPoint[0] >= 10) {
        mbtiString += 'A';
      } else {
        mbtiString += 'I';
      }

      if (mbtiPoint[1] >= 10) {
        mbtiString += 'P';
      } else {
        mbtiString += 'B';
      }

      if (mbtiPoint[2] >= 10) {
        mbtiString += 'M';
      } else {
        mbtiString += 'W';
      }

      if (mbtiPoint[3] >= 10) {
        mbtiString += 'L';
      } else {
        mbtiString += 'C';
      }

      console.log(mbtiPoint);
      console.log(mbtiString);
      handleSurveyData(mbtiPoint, mbtiString);
      window.location.href = '/mbti';
    }
  };

  return (
    <SurveyContainer>
      <SurveyTitle>
        내게 맞는 포트폴리오
      </SurveyTitle>
      <SurveyNotice>
        <li>본 설문은 고객님의 투자 스타일을 더욱 정확하게 파악하기 위한 것으로, 총 20개의 문항으로 구성되어 있습니다.</li>
        <li>질문을 읽으시고 5개의 선택지 중 고객님과 가장 가까운 탑변을 선택해 주시기 바랍니다.</li>
      </SurveyNotice>
      <SurveySubTitle>금융 MBTI 시작</SurveySubTitle>
      {questionList.map((question: string, index: number) => (
        <div key={index}>
          <SurveyQnA
            question={question}
            index={index}
            answerList={answerList}
            setAnswerList={setAnswerList}
          />
        </div>
      ))}
      <SurveyBtn onClick={handleSurveyDone}>제출하기</SurveyBtn>
    </SurveyContainer>
  );
}
