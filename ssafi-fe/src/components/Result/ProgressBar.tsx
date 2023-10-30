import React from 'react';
import styled from 'styled-components';

interface MbtiPoint {
  element: Array<string>;
  percentage: number;
}

interface MbtiProps {
  mbtiPoint: MbtiPoint;
}

interface BarProps {
  isReversed?: boolean;
}

export default function ProgressBar({ mbtiPoint }: MbtiProps) {
  const [width, setWidth] = React.useState<number>(0);
  const [isReversed, setIsReversed] = React.useState<boolean>(false);
  const [mbtiPercent, setMbtiPercent] = React.useState<number>(0);
  const [barRadius, setBarRadius] = React.useState<string>('');

  React.useEffect(() => {
    if (mbtiPoint.percentage < 50) {
      setMbtiPercent(100 - mbtiPoint.percentage);
      setWidth((100 - mbtiPoint.percentage) * 5);
      setIsReversed(true);
      if (mbtiPoint.percentage === 0) {
        setBarRadius('50px');
      } else {
        setBarRadius('0px 50px 50px 0px');
      }
    } else {
      setMbtiPercent(mbtiPoint.percentage);
      setWidth(mbtiPoint.percentage * 5);
      if (mbtiPoint.percentage === 100) {
        setBarRadius('50px');
      } else {
        setBarRadius('50px 0px 0px 50px');
      }
    }
  }, []);

  return (
    <ProgressBarContainer>
      <ElementA isReversed={isReversed}>{mbtiPoint.element[0]}</ElementA>
      <EmptyBar isReversed={isReversed}>
        <PercentageBar isReversed={isReversed} style={{
          width: `${width}px`,
          borderRadius: `${barRadius}`,
          }}>
        {mbtiPercent}%
        </PercentageBar>
      </EmptyBar>
      <ElementB isReversed={isReversed}>{mbtiPoint.element[1]}</ElementB>
    </ProgressBarContainer>
  );
}

const ProgressBarContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;

const ElementA = styled.div<BarProps>`
width: 170px;
text-align: center;
white-space: pre-line;
margin-right: 20px;
font-size: 24px;
font-weight: ${(props) => (props.isReversed ? '400' : '500')};
color: ${(props) => (props.isReversed ? 'var(--black-color)' : 'var(--point-color)')};
`;

const ElementB = styled.div<BarProps>`
width: 170px;
text-align: center;
white-space: pre-line;
margin-left: 20px;
font-size: 24px;
font-weight: ${(props) => (props.isReversed ? '500' : '400')};
color: ${(props) => (props.isReversed ? 'var(--point-color)' : 'var(--black-color)')};

`;

const EmptyBar = styled.div<BarProps>`
display: flex;
width: 500px;
height: 30px;
background-color: var(--light-gray-color);
border-radius: 50px;

justify-content: ${(props) => (props.isReversed ? 'end' : 'start')};
`;

const PercentageBar = styled.div<BarProps>`
display: flex;
justify-content: center;
align-items: center;
height: 30px;
color: var(--white-color);
background-color: var(--point-color);
transition: width 1s;
`;
