import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
// import axios from '../../api/apiControlller';
import axios from 'axios';
import DoubtsButton from './ToolTip';
import convertToKoreanNumber from '../../utils/convertToKorean';

interface inputDataPorps {
  safetyRatio: number;
  neutralRatio: number;
  riskRatio: number;
  aiBudget: string;
  aiGoal: string;
}

interface TradeInputProps {
  isTrade: boolean;
  setIsTrade: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  inputData: inputDataPorps;
  setInputData: React.Dispatch<React.SetStateAction<inputDataPorps>>;
}

const Container = styled.div`
  width: 480px;
  height: 390px;
  margin: 30px 82px;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  justify-content: space-between;
`;

const SelectBox = styled.div`
  position: relative;
  width: 98%;
  padding: 2% 1%;
  align-self: center;
  border-bottom: 2px solid var(--white-color);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  &::before {
    content: '⌵';
    position: absolute;
    top: 0px;
    right: 12px;
    color: var(--white-color);
    font-size: 28px;
  }
`;

const Label = styled.label`
  font-size: 22px;
  text-align: center;
  color: var(--white-color);
`;

const SelectOptions = styled.ul<{ show: boolean }>`
  position: absolute;
  list-style: none;
  top: 32px;
  left: 0;
  width: 91.5%;
  overflow: hidden;
  height: 150px;
  max-height: ${(props) => (props.show ? 'none' : '0')};
  border-radius: 0 0 8px 8px;
  background-color: var(--white-color);
  color: var(--gray-color);
  overflow-y: auto;
  z-index: 1;
`;

const Option = styled.li`
  font-size: 18px;
  padding: 6px 0;
  transition: background-color 0.2s ease-in;
  &:hover {
    font-size: 19px;
    background-color: var(--sub-color);
    color: var(--black-color);
  }
`;

const Notice = styled.div`
  font-size: 15px;
  font-weight: 300;
  padding: 6px 0;
  color: var(--point-color);
  &.small {
    font-size: 14px;
    padding: 2px 0;
    color: var(--gray-color);
  }
`;

const RateContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2px;
`;

const RateOfType = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const RightBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Input = styled.input`
  width: 50%;
  padding: 0 5%;
  font-size: 20px;
  color: var(--white-color);
  background: none;
  border: none;
  border-bottom: 1px solid var(--white-color);
  margin-bottom: 2px;
  outline: none;
  text-align: center;

  &.ammount {
    width: 60%;
    text-align: right;
  }
`;

const StopBtn = styled.div<{ stop: boolean }>`
  width: 172px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid var(--point-color);
  font-size: 20px;
  color: ${(props) =>
    props.stop ? 'var(--point-color)' : 'var(--white-color)'};
  background: ${(props) => (props.stop ? '' : 'var(--point-color)')};
  cursor: pointer;
`;

export default function TradeInput({
  isTrade,
  setIsTrade,
  setShowModal,
  inputData,
  setInputData,
}: TradeInputProps) {
  const [currentValue, setCurrentValue] = useState('투자 성향');
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  const handleOnChangeSelectValue = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    const { innerText } = event.currentTarget;
    setCurrentValue(innerText);

    const selectedOption = options.find((option) => option.type === innerText);
    if (selectedOption) {
      setInputData({
        ...inputData,
        safetyRatio: selectedOption.rates[2],
        neutralRatio: selectedOption.rates[1],
        riskRatio: selectedOption.rates[0],
      });
    }
  };

  // 비율 값 바꿀 때
  const createRatioHandler =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(event.target.value, 10);
      setInputData({
        ...inputData,
        [field]: newValue,
      });
    };

  // 금액 값 바꿀 때
  const createAmountHandler =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value.replace(/[^0-9]/g, '');
      setInputData({
        ...inputData,
        [field]: newValue.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      });
    };

  const handleAiButton = (stop: boolean) => {
    if (stop) {
      const token = localStorage.getItem('accessToken');
      axios
        .patch(
          'http://localhost:8083/api/ai/stop',
          {},
          {
            headers: {
              Authorization: token,
            },
          },
        )
        .then((res) => {
          setIsTrade(!stop);
          navigate('/trade');
          console.log(res);
        })
        .catch((error) => {
          console.error('Error while stopping AI:', error);
        });
    } else if (
      inputData.safetyRatio + inputData.neutralRatio + inputData.riskRatio !==
      100
    ) {
      // 에러 처리, 에러 처리 통과하면 모달 띄워서 확인 버튼
      alert('투자 비율의 합이 100이 아닙니다.');
    } else if (
      !inputData.aiBudget ||
      parseInt(inputData.aiBudget.replace(/,/g, ''), 10) === 0
    ) {
      alert('투자 금액을 입력해주세요.');
    } else if (
      !inputData.aiGoal ||
      parseInt(inputData.aiGoal.replace(/,/g, ''), 10) === 0
    ) {
      alert('목표 금액을 입력해주세요.');
    } else if (
      parseInt(inputData.aiBudget.replace(/,/g, ''), 10) >=
      parseInt(inputData.aiGoal.replace(/,/g, ''), 10)
    ) {
      alert('목표 금액이 투자 금액보다 작습니다.');
    } else {
      // 확인 모달 창 띄우기
      setShowModal(true);
      // setIsTrade(!stop);
    }
  };

  const options = [
    {
      type: '타고난 리더형 투자 지도자(APML)',
      rates: [50, 30, 20],
    },
    {
      type: '박학다식한 투자의 달인(APMC)',
      rates: [60, 30, 10],
    },
    {
      type: '똘똘한 분산투자 능력자(APWL)',
      rates: [30, 40, 30],
    },
    {
      type: '당당하고 유능한 투자자(APWC)',
      rates: [20, 30, 50],
    },
    {
      type: '똑똑한 투자 트렌디세터(ABML)',
      rates: [40, 30, 30],
    },
    {
      type: '시대를 앞서는 투자 리더(ABMC)',
      rates: [50, 25, 25],
    },
    {
      type: '용감한 투자 탐정가(ABWL)',
      rates: [40, 35, 25],
    },
    {
      type: '통찰력있는 투자 예술인(ABWC)',
      rates: [20, 40, 40],
    },
    {
      type: '전략적인 투자 연구자(IPML)',
      rates: [50, 30, 20],
    },
    {
      type: '미래지향적 투자 탐험가(IPMC)',
      rates: [50, 30, 20],
    },
    {
      type: '노련한 투자의 아이콘(IPWL)',
      rates: [30, 40, 30],
    },
    {
      type: '다재다능한 투자 지휘관(IPWC)',
      rates: [30, 20, 50],
    },
    {
      type: '도전을 즐기는 투자 샛별(IBML)',
      rates: [60, 20, 20],
    },
    {
      type: '탐구하는 투자 탐색가(IBMC)',
      rates: [40, 30, 30],
    },
    {
      type: '호기심 가득한 투자 관찰가(IBWL)',
      rates: [30, 40, 30],
    },
    {
      type: '잠재력있는 새싹 투자자(IBWC)',
      rates: [33, 33, 34],
    },
  ];

  return (
    <Container>
      <div>
        <SelectBox onClick={() => setShowOptions((prev) => !prev)}>
          <Label>{currentValue}</Label>
          <SelectOptions show={showOptions}>
            {options.map((option, index) => (
              <Option key={index} onClick={handleOnChangeSelectValue}>
                {option.type}
              </Option>
            ))}
          </SelectOptions>
        </SelectBox>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Notice>
            금융 MBTI 결과를 바탕으로 종목별 주식 투자 비율을 추천해드려요.
          </Notice>
          <DoubtsButton />
        </div>
      </div>
      <div>
        <RateContainer>
          <RateOfType>
            <Label>안전</Label>
            <Input
              type="number"
              min="0"
              max="100"
              value={inputData.safetyRatio}
              onChange={createRatioHandler('safetyRatio')}
            />
          </RateOfType>
          <RateOfType>
            <Label>중립</Label>
            <Input
              type="number"
              min="0"
              max="100"
              value={inputData.neutralRatio}
              onChange={createRatioHandler('neutralRatio')}
            />
          </RateOfType>
          <RateOfType>
            <Label>위험</Label>
            <Input
              type="number"
              min="0"
              max="100"
              value={inputData.riskRatio}
              onChange={createRatioHandler('riskRatio')}
            />
          </RateOfType>
        </RateContainer>
        <Notice>원하시는 투자 비율을 퍼센트(%) 단위로 입력해주세요.</Notice>
      </div>
      <div>
        <RateContainer>
          <Label>투자 금액</Label>
          <Input
            type="text"
            maxLength={16}
            className="ammount"
            value={inputData.aiBudget}
            onChange={createAmountHandler('aiBudget')}
          />
        </RateContainer>
        <RightBox>
          <Notice className="small">
            {convertToKoreanNumber(inputData.aiBudget, '투자')}
          </Notice>
        </RightBox>
      </div>
      <div>
        <RateContainer>
          <Label>목표 금액</Label>
          <Input
            type="text"
            maxLength={16}
            className="ammount"
            value={inputData.aiGoal}
            onChange={createAmountHandler('aiGoal')}
          />
        </RateContainer>
        <RightBox>
          <Notice className="small">
            {convertToKoreanNumber(inputData.aiGoal, '목표')}
          </Notice>
        </RightBox>
      </div>
      <RightBox>
        <StopBtn stop={isTrade} onClick={() => handleAiButton(isTrade)}>
          {isTrade ? 'AI 투자 중지하기' : 'AI 투자 시작하기'}
        </StopBtn>
      </RightBox>
    </Container>
  );
}
