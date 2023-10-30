import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from '../../api/apiControlller';
import convertToKoreannum from '../../utils/convertToKorean';

interface ConfirmModalProps {
  inputData: {
    safetyRatio: number;
    neutralRatio: number;
    riskRatio: number;
    aiBudget: string;
    aiGoal: string;
  };
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsTrade: React.Dispatch<React.SetStateAction<boolean>>;
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
  background: var(--white-color);
  padding: 40px 40px 30px 40px;
`;

const RowContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 2px;
  margin-top: 2px;
  margin-left: 10px;
`;

const Title = styled.div`
  text-align: center;
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 0.2px;
  color: var(--dark-color);
  padding-bottom: 18px;
`;

const SubTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  padding: 1px 6px;
  margin-bottom: 8px;
  border-left: 4px solid var(--point-color);
`;

const Info = styled.div`
  padding: 18px 10px;
  border-bottom: 1px solid var(--light-gray-color);
`;

const Content = styled.div`
  width: 100%;
  padding: 0 10px;
`;

const Text = styled.div`
  font-size: 14px;
  font-weight: 300;
  margin: 2px 0;

  &.bold {
    font-weight: 400;
    letter-spacing: 0.5px;
  }
`;

const CheckBox = styled.input`
  margin: 12px 4px 3px 0;
  accent-color: var(--point-color);
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`;

const Btn = styled.div<{ check: boolean }>`
  padding: 6px 12px;
  cursor: ${(props) => (props.check ? 'pointer' : 'default')};
  color: ${(props) =>
    props.check ? 'var(--white-color)' : 'var(--black-color)'};
  background: ${(props) =>
    props.check ? 'var(--point-color)' : 'var(--light-gray-color)'};
  &.cancle {
    cursor: pointer;
  }
`;

const ConfirmModal = ({
  inputData,
  closeModal,
  setIsTrade,
}: ConfirmModalProps) => {
  const { safetyRatio, neutralRatio, riskRatio, aiBudget, aiGoal } = inputData;
  const [isCheck, setIsCheck] = useState(false);

  const handleStartBtn = (start: boolean) => {
    if (start) {
      // check 눌려있으면 api 요청 보내서 ai 트레이딩 시작
      // 토큰 가져오기
      const token = localStorage.getItem('accessToken');

      axios
        .post(
          'http://localhost:8083/api/ai',
          {
            aiBudget: parseInt(inputData.aiBudget.replace(/[^0-9]/g, ''), 10),
            aiGoal: parseInt(inputData.aiGoal.replace(/[^0-9]/g, ''), 10),
            riskRatio: inputData.riskRatio,
            neutralRatio: inputData.neutralRatio,
            safetyRatio: inputData.safetyRatio,
          },
          {
            headers: {
              Authorization: token,
            },
          },
        )
        .then((res) => {
          if (res.status === 200) {
            // 응답받은 데이터를 localStorage에 저장
            localStorage.setItem('safetyRatio', res.data.safetyRatio);
            localStorage.setItem('neutralRatio', res.data.neutralRatio);
            localStorage.setItem('riskRatio', res.data.riskRatio);
            localStorage.setItem('aiBudget', res.data.aiBudget);
            localStorage.setItem('aiGoal', res.data.aiGoal);

            closeModal(false);
            setIsTrade(true);
          } else {
            // 요청이 성공적으로 이루어지지 않았을 때의 처리 (예: 오류 메시지 표시)
            console.log(
              res.data.message || 'AI 트레이딩 시작에 실패하였습니다.',
            );
          }
        })
        .catch((error) => {
          // 서버 요청 중에 오류가 발생한 경우의 처리
          console.error('AI 트레이딩 시작 중 오류:', error);
        });
    }
  };

  return (
    <ModalBackground>
      <ModalContainer>
        <Title>AI 트레이딩을 시작하시겠습니까 ?</Title>
        <Info>
          <SubTitle>AI 트레이딩 조건</SubTitle>
          <RowContainer>
            <Text className="bold">종목 투자 비율</Text>
            <Text>
              : 안전({safetyRatio}%), 중립({neutralRatio}%), 위험({riskRatio}%)
            </Text>
          </RowContainer>
          <RowContainer>
            <Text className="bold">투자금액</Text>
            <Text>
              : {aiBudget}원 ({convertToKoreannum(aiBudget, '투자')})
            </Text>
          </RowContainer>
          <RowContainer>
            <Text className="bold">목표금액</Text>
            <Text>
              : {aiGoal}원 ({convertToKoreannum(aiGoal, '목표')})
            </Text>
          </RowContainer>
        </Info>
        <Info>
          <SubTitle>안내: AI 트레이딩</SubTitle>
          <Content>
            <Text>
              AI 트레이딩 전략은 입력해주신 종목 투자 비율을 바탕으로 진행되며,
            </Text>
            <Text>목표 금액을 달성하면 트레이딩은 자동으로 종료됩니다.</Text>
            <div style={{ height: '8px' }} />
            <Text>
              AI 트레이딩은 금융 시장의 변동성에 영향을 받으며, 수익이나 손실이
              발생할 수 있습니다.
            </Text>
            <Text>
              트레이딩을 시작하기 전에 투자 비율과 자본을 신중하게 고려하십시오.
            </Text>
            <Text>
              투자 정보를 변경하려면 취소 버튼을 눌러 설정을 수정하십시오.
            </Text>
            <div style={{ height: '8px' }} />
            <Text>
              투자 성과와 목표 달성 여부를 실시간으로 확인할 수 있습니다.
            </Text>
            <Text>
              만약, 트레이딩을 중지하려면 투자 중지하기 버튼을 클릭하십시오.
            </Text>
          </Content>
        </Info>
        <RowContainer>
          <CheckBox
            type="checkbox"
            checked={isCheck}
            onChange={() => setIsCheck(!isCheck)}
          />
          <Text>위 사항을 모두 숙지하였습니다.</Text>
        </RowContainer>
        <BtnContainer>
          <Btn
            className="cancle"
            check={false}
            onClick={() => closeModal(false)}
          >
            취소
          </Btn>
          <Btn check={isCheck} onClick={() => handleStartBtn(isCheck)}>
            시작하기
          </Btn>
        </BtnContainer>
      </ModalContainer>
    </ModalBackground>
  );
};

export default ConfirmModal;
