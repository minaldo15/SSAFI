import React, { useState } from 'react';
import styled from 'styled-components';
import convertToKoreannum from '../../utils/convertToKorean';

interface TradeModalProps {
  type: string;
  stockName: string | undefined;
  amount: string;
  price: string;
  total: string;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleStock: () => void;
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
  margin: 18px 0;
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 0.2px;
  color: var(--dark-color);
  padding-bottom: 24px;
`;

const Info = styled.div`
  display: flex;
  align-items: end;
  padding-bottom: 4px;
`;

const Text = styled.div`
  font-size: 16px;
  font-weight: 400;
  margin: 2px 0;

  &.bold {
    font-weight: 500;
    letter-spacing: 0.5px;
  }
`;

const CheckBox = styled.input<{color?: string}>`
  margin: 12px 4px 3px 0;
  accent-color: ${(props) => (
    props.color === '매수' ? 'var(--upper-color)' : 'var(--lower-color)'
  )};
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`;

const Btn = styled.div<{check: boolean, color?: string}>`
  padding: 6px 12px;
  cursor: ${(props) => (props.check ? 'pointer' : 'default')};
  color: ${(props) => (props.check ? 'var(--white-color)' : 'var(--black-color)')};
  background: ${(props) => (
    props.check
      ? (props.color === '매수' ? 'var(--upper-color)' : 'var(--lower-color)')
      : ('var(--light-gray-color)')
  )};
  &.cancle {
    cursor: pointer;
  }
`;

const TradingModal = ({ type, stockName, amount, price, total, closeModal, handleStock }: TradeModalProps) => {
  const [isCheck, setIsCheck] = useState(false);

  const handleStartBtn = (start: boolean) => {
    if (start) {
        closeModal(false);
        handleStock();
    }
  };

  return (
    <ModalBackground>
      <ModalContainer>
        <Title>{type}하려는 내역을 확인해 주세요.</Title>
        <Info>
          <Text className='bold'>{stockName}</Text>
          <Text style={{ marginLeft: '4px' }}>종목을 1주 당</Text>
          <Text className='bold' style={{ marginLeft: '4px' }}>{price}</Text>
          <Text>원에</Text>
          <Text className='bold' style={{ marginLeft: '4px' }}>{type}</Text>
          <Text>합니다.</Text>
        </Info>
        <Info>
          <Text>총</Text>
          <Text className='bold' style={{ marginLeft: '4px' }}>{amount}주</Text>
          <Text style={{ marginLeft: '4px' }}>{type}하며, 전체 금액은</Text>
          <Text className='bold' style={{ marginLeft: '4px' }}>{total}</Text>
          <Text>원 입니다.</Text>
        </Info>
        <Text style={{ fontWeight: '300' }}>
          내용이 맞다면 체크박스 클릭 후 {type}를 진행해주세요.
        </Text>
        <RowContainer>
          <CheckBox type='checkbox' color={type} checked={isCheck} onChange={() => setIsCheck(!isCheck)}/>
          <Text>{type} 내역을 확인했습니다.</Text>
        </RowContainer>
        <BtnContainer>
          <Btn className='cancle' check={false} onClick={() => closeModal(false)}>취소</Btn>
          <Btn check={isCheck} color={type} onClick={() => handleStartBtn(isCheck)}>
            {type}하기
          </Btn>
        </BtnContainer>
      </ModalContainer>
    </ModalBackground>
  );
};

export default TradingModal;
