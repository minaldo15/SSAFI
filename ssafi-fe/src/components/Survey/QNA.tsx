import React from 'react';
import styled from 'styled-components';

interface Props {
  question: string;
  index: number;
  answerList: Array<number>;
  setAnswerList: React.Dispatch<React.SetStateAction<Array<number>>>;
}

const SurveyQNA = styled.div`
margin: 50px 0px;
`;

const SurveyQuestion = styled.p`
font-size: 24px;
font-weight: 400;
color: var(--black-color);`;

const SurveyAnswers = styled.div`
display: flex;
align-items: center;
`;

const SurveyRadio = styled.input.attrs({
  type: 'radio',
})`
/* 일반 상태 */
/* 기본 스타일 제거 */
appearance: none;
width: 15px;
height: 15px;
border: 1px solid var(--gray-color);
background-color: var(--white-color);
border-radius: 50%;
cursor: pointer;
margin-left: 20px;

/* 선택 상태 */
&:checked {
  background-color: var(--point-color);
  border: 2px solid var(--white-color);
  outline: 2px solid var(--point-color);
}
`;

const AnswerLabel = styled.label`
font-size: 20px;
font-weight: 400;
color: var(--black-color);
cursor: pointer;
margin-left: 5px;
`;

export default function SurveyQnA({
  question, index, answerList, setAnswerList,
}: Props) {
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedList: Array<number> = [...answerList];
    updatedList[index] = +event.target.value;
    setAnswerList(updatedList);
  };

  return (
    <SurveyQNA>
      <SurveyQuestion>{`Q${index + 1}. ${question}`}</SurveyQuestion>
      <SurveyAnswers>
        <SurveyRadio
        id={`answerChoice1-${index}`}
        value={4}
        name={`answer-${index}`}
        checked={answerList[index] === 4}
        onChange={handleRadioChange}
        />
        <AnswerLabel htmlFor={`answerChoice1-${index}`}>
          매우 그렇다
        </AnswerLabel>
        <SurveyRadio
        id={`answerChoice2-${index}`}
        value={3}
        name={`answer-${index}`}
        checked={answerList[index] === 3}
        onChange={handleRadioChange}
        />
        <AnswerLabel htmlFor={`answerChoice2-${index}`}>
          그렇다
        </AnswerLabel>
        <SurveyRadio
        id={`answerChoice3-${index}`}
        value={2}
        name={`answer-${index}`}
        checked={answerList[index] === 2}
        onChange={handleRadioChange}
        />
        <AnswerLabel htmlFor={`answerChoice3-${index}`}>
          보통이다
        </AnswerLabel>
        <SurveyRadio
        id={`answerChoice4-${index}`}
        value={1}
        name={`answer-${index}`}
        checked={answerList[index] === 1}
        onChange={handleRadioChange}
        />
        <AnswerLabel htmlFor={`answerChoice4-${index}`}>
          아니다
        </AnswerLabel>
        <SurveyRadio
        id={`answerChoice5-${index}`}
        value={0}
        name={`answer-${index}`}
        checked={answerList[index] === 0}
        onChange={handleRadioChange}
        />
        <AnswerLabel htmlFor={`answerChoice5-${index}`}>
          매우 아니다
        </AnswerLabel>
      </SurveyAnswers>
    </SurveyQNA>
  );
}
