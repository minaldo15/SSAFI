import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import axios from '../../api/apiControlller';
import axios from 'axios';
import handleScroll from '../../utils/scrollUtils';
import SemiCircleProgress from './SemiCircleProgress';
import { ReactComponent as EditBtn } from '../../assets/icons/edit.svg';
import TradeInput from './TradeInput';
import ConfirmModal from './ConfirmModal';
import TradeChart from '../Charts/TradeChart';

interface inputDataPorps {
  safetyRatio: number;
  neutralRatio: number;
  riskRatio: number;
  aiBudget: string;
  aiGoal: string;
}

interface StyleProps {
  weight?: number;
  width?: string;
  height?: string;
  color?: string;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  // justify-content: space-evenly;
  align-items: center;
  height: 704px;

  &.small {
    height: 624px;
  }
`;

const Title = styled.div<StyleProps>`
  font-size: 42px;
  font-weight: ${({ weight }) => weight || 500};
  color: ${({ color }) => color || 'var(--black-color)'};
  margin: 20px 0 36px 0;
`;

const BoxContainer = styled.div<StyleProps>`
  display: flex;
  justify-content: space-between;
  width: ${({ width }) => width || '1000px'};
  height: ${({ height }) => height || ''};
`;

const Box = styled.div<StyleProps>`
  width: ${({ width }) => width || '280px'};
  height: inhert;
  background-color: ${({ color }) => color || 'none'};
  padding: 0 20px;
`;

const Text = styled.div<StyleProps>`
  text-align: center;
  font-size: 28px;
  font-weight: 400;
  color: ${({ color }) => color || 'var(--white-color)'};
`;

const InputBox = styled.input`
  width: 80%;
  border: none;
  border-bottom: 1px solid var(--gray-color);
  outline: none;
  font-size: 18px;
  margin-top: 30px;

  &::placeholder {
    color: var(--gray-color);
    // padding: 5px;
  }
`;

const Row = styled.div`
  position: relative;
  top: 5%;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-end;
`;

export default function TradeAi() {
  // hasResult: 분석 결과가 있는지를 나타내는 boolean(처음이 아닐 때) - 임시 데이터
  const [hasResult, setHasResult] = useState(false);
  // ai 트레이딩이 진행 중인지 아닌지(ai 거래로드에서 보내줘야 함)
  const [isTrade, setIsTrade] = useState(false);
  // const [botName, setBotName] = useState('');
  // ai 시작버튼 눌렀을 때 확인 모달창
  const [showModal, setShowModal] = useState(false);
  const [inputData, setInputData] = useState<inputDataPorps>({
    safetyRatio: Number(localStorage.getItem('safetyRatio') || 0),
    neutralRatio: Number(localStorage.getItem('neutralRatio') || 0),
    riskRatio: Number(localStorage.getItem('riskRatio') || 0),
    aiBudget: localStorage.getItem('aiBudget') || '',
    aiGoal: localStorage.getItem('aiGoal') || '',
  });
  const stockRateInfo = [
    {
      category: 'safe',
      percent: 58,
    },
    {
      category: 'middle',
      percent: 35,
    },
    {
      category: 'danger',
      percent: 7,
    },
  ];

  // useEffect(() => {
  //   window.addEventListener('wheel', handleScroll);

  //   return () => {
  //     window.removeEventListener('wheel', handleScroll);
  //   };
  // }, []);

  useEffect(() => {
    const token = localStorage.getItem('accessToken'); // 토큰을 로컬 스토리지에서 가져옵니다.
    console.log(token);
    if (token) {
      axios
        .get('http://localhost:8083/api/ai', {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          if (res.data.aiBudget > 0) {
            setHasResult(true);
            setIsTrade(true);
          } else {
            setHasResult(false);
            setIsTrade(false);
          }
        });
    } else {
      window.alert('로그인해주세요');
    }
  });

  // const handleBotNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setBotName(event.target.value);
  // };

  return (
    <Container>
      {hasResult && (
        <SubContainer>
          {isTrade ? (
            <div style={{ marginTop: '30px' }}>
            <Title color="var(--dark-color)">
              최근 진행하신 트레이딩 결과입니다
            </Title>
            </div>
          ) : (
            <div style={{ marginTop: '30px' }}>
              <Title color="var(--dark-color)">
                진행 중인 투자 상황을 분석해드려요
              </Title>
            </div>
          )}
          <BoxContainer width="1280px" style={{ alignItems: 'center', marginBottom: '20px' }}>
            <Box>
              {stockRateInfo.map((item) => (
                <SemiCircleProgress
                  color={item.category}
                  percent={item.percent}
                />
              ))}
            </Box>
            <Box width="860px">
              <TradeChart />
            </Box>
          </BoxContainer>
        </SubContainer>
      )}
      <SubContainer className="small">
        <div style={{ display: 'flex', marginTop: '16px' }}>
          {/* <Title weight={600} color='var(--point-color)'>{botName}</Title> */}
          {isTrade ? (
            <Title>현재 진행 중인 트레이딩의 투자 정보입니다</Title>
          ) : (
            <Title>AI로 주식 투자를 시작해보세요</Title>
          )}
        </div>
        <BoxContainer height={'450px'}>
          <Box color="var(--white-color)">
            <div style={{ margin: '120px' }} />
            {/* <Text color='var(--dark-color)'>여러분의 SSAFI AI에 이름을 붙여주세요</Text> */}
            <Text color="var(--dark-color)">
              투자 전략을 알려주세요!
              <br />
              <br />
              입력한 값을 바탕으로 <br />
              트레이딩이 진행됩니다.
            </Text>
            {/* <Row>
              <InputBox
                placeholder="싸피봇"
                value={botName}
                onChange={handleBotNameChange}
              >
              </InputBox>
              <EditBtn />
            </Row> */}
          </Box>
          <Box width="640px" color="var(--dark-color)">
            <TradeInput
              isTrade={isTrade}
              setIsTrade={setIsTrade}
              setShowModal={setShowModal}
              inputData={inputData}
              setInputData={setInputData}
            />
          </Box>
        </BoxContainer>
      </SubContainer>
      {showModal && (
        <ConfirmModal
          inputData={inputData}
          closeModal={setShowModal}
          setIsTrade={setIsTrade}
        />
      )}
    </Container>
  );
}
