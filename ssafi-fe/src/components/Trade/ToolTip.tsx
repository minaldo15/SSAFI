import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import styled, { keyframes } from 'styled-components';
import { ReactComponent as Doubts } from '../../assets/images/doubts-button.svg';

const DoubtsButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
`;

const DoubtsIcon = styled(Doubts)`
  width: 16px;
  fill: var(--point-color);
  margin-right:  4px;
  cursor: pointer;
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const ToolTipContainer = styled.div`
  width: 260px;
  position: absolute;
  top: 30px;
  right: 12px;
  background-color: var(--sub-color);
  padding: 6px 12PX;
  border-radius: 6px;
  display: 'block';
  animation: ${fadeIn} 0.3s ease-in-out;

  &::after {
    content: '';
    position: absolute;
    top: -8px;
    right: 0px;
    border-width: 8px;
    border-style: solid;
    border-color: transparent var(--sub-color) transparent transparent;
  }
`;

const Text = styled.div`
  padding: 4px;
  font-size: 16px;
  line-height: 20px;
  color: var(--gray-color);
  cursor: default;

  &:hover.navigate {
    color: var(--black-color);
  }

  &.navigate{
    cursor: pointer;
  }
`;

export default function DoubtsButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate = useNavigate();

  return (
    <DoubtsButtonWrapper
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <DoubtsIcon/>
      {showTooltip && (
        <ToolTipContainer>
          <Text>
            아직 나의 금융 MBTI를 모르시나요?<br />
            검사를 통해 나의 투자 성향을 확인하고, <br />
            투자 비율을 추천 받아보세요!
          </Text>
          <Text className='navigate' onClick={() => navigate('/mbti')}>
            금융 MBTI 알아보러 가기 &gt;
          </Text>
        </ToolTipContainer>
      )}
    </DoubtsButtonWrapper>
  );
}
