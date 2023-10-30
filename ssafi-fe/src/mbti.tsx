import React from 'react';
import styled from 'styled-components';
import Survey from './components/Survey';
import Result from './components/Result';
import instance from './api/apiControlller';

const MbtiContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 30px;
`;

export default function Mbti() {
  const [surveyDone, setSurveyDone] = React.useState<boolean>(false);
  const [mbtiScore, setMbtiScore] = React.useState<number[]>([]);
  const [ratio, setRatio] = React.useState<number[]>([]);
  const [portfolio, setPortfolio] = React.useState<string>('');

  React.useEffect(() => {
    const fetchMbtiPoint = async () => {
      const mbtiData = await instance.get('/portfolio');
      const mbtiScores = mbtiData.data;
      if (mbtiScores.aiScore !== null) {
        setMbtiScore([
          mbtiScores.aiScore,
          mbtiScores.pbScore,
          mbtiScores.mwScore,
          mbtiScores.lcScore,
        ]);
        setRatio([
          mbtiScores.riskRatio,
          mbtiScores.neutralRatio,
          mbtiScores.safetyRatio,
        ]);
        setPortfolio(mbtiScores.recommendedStock);
        setSurveyDone(true);
      }
    };
    fetchMbtiPoint();
  }, []);

  return (
    <MbtiContainer>
      {surveyDone ? (
        <Result setSurveyDone={setSurveyDone} mbtiScore={mbtiScore} ratio={ratio} portfolio={portfolio} />
      ) : (
        <Survey setSurveyDone={setSurveyDone} />
      )}
    </MbtiContainer>
  );
}
