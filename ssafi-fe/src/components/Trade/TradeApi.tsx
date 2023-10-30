import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// import axios from '../../api/apiControlller';
import axios from 'axios';
import { ReactComponent as Doubts } from '../../assets/images/doubts-button.svg';
import ApiGuide from './ApiGuide';
import handleScroll from '../../utils/scrollUtils';

interface ContainerProps {
  dark?: boolean;
}

const ApiContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 628px;
  position: relative;
`;

const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.dark ? 'flex-end' : 'center')};
  width: ${(props) => (props.dark ? '1100px' : '470px')};
  height: ${(props) => (props.dark ? '300px' : '420px')};
  position: absolute;
  top: 50%;
  left: ${(props) => (props.dark ? '50%' : '25%')};
  transform: ${(props) =>
    props.dark ? 'translate(-50%, -50%)' : 'translate(-40%, -50%)'};
  background-color: ${(props) =>
    props.dark ? 'var(--dark-color)' : 'var(--white-color)'};
  box-shadow: ${(props) =>
    props.dark ? 'none' : '4px 4px 12px rgba(0, 0, 0, 0.2)'};
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 85%;
  height: 70%;
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 20px;
  color: var(--white-color);
  margin: 16px 0;
  &.small {
    font-size: 16px;
    font-weight: 300;
    line-height: 26px;
  }
  &.button {
    font-size: 16px;
    cursor: pointer;
  }
`;

const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: 5px 0;
`;

const InputName = styled.div<{ visibled?: boolean }>`
  font-size: 20px;
  &.name {
    width: 31%;
    text-align: end;
  }

  &.header {
    font-weight: 500;
    font-size: 22px;
    color: var(--point-color);
  }

  &.button {
    background-color: ${(props) =>
      props.visibled ? 'var(--point-color)' : 'var(--light-gray-color)'};
    color: var(--white-color);
    align-self: flex-end;
    padding: 6px 20px;
    cursor: ${(props) => (props.visibled ? 'pointer' : '')};
  }
`;

const Input = styled.input`
  width: 60%;
  border: none;
  border-bottom: 1px solid var(--gray-color);
  outline: none;
  font-size: 16px;
  margin: 20px 10px 0 0;
  padding: 0 0 1% 2%;

  &::placeholder {
    color: var(--gray-color);
  }
`;

const DoubtsButton = styled(Doubts)`
  fill: var(--white-color);
  margin-left: 10px;
  cursor: pointer;
`;

const Notice = styled.div`
  font-size: 14px;
  font-weight: 300;
  color: var(--upper-color);
  margin: 2px 0 0 144px;
`;

export default function TradeApi() {
  // React.useEffect(() => {
  //   window.addEventListener('wheel', handleScroll);

  //   return () => {
  //     window.removeEventListener('wheel', handleScroll);
  //   };
  // }, []);

  const [appKey, setApiKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const openApiPage = () => {
    // 한국투자증권
    window.open(
      'https://securities.koreainvestment.com/main/customer/systemdown/install_non_activex_tobe.jsp?P_name=ASTx',
      '_blank',
    );
  };

  const handleApiChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 입력 값이 변경될 때마다 appKey 상태를 업데이트
    setApiKey(event.target.value);
  };

  const handleSecretChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 입력 값이 변경될 때마다 appKey 상태를 업데이트
    setSecretKey(event.target.value);
  };

  const handleAccountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.replace(/[^0-9]/g, '');
    setAccountNumber(newValue);
  };

  const handleButtonClick = () => {
    if (!appKey) {
      alert('API Key를 입력해 주세요!');
    } else if (!secretKey) {
      alert('SECRET Key를 입력해 주세요!');
    } else if (!accountNumber || accountNumber.length !== 8) {
      // 앞 8자리만 입력 체크
      alert('계좌 번호를 8자리로 입력해 주세요!');
    } else {
      const socialLoginToken = localStorage.getItem('accessToken');
      axios
        .post(
          'http://localhost:8083/api/member/key-account',
          {
            appKey: appKey, // 'appKey'로 변경
            secretKey: secretKey, // 'secretKey'로 변경
            accountPrefix: accountNumber,
            accountSuffix: '01',
          },
          {
            headers: {
              Authorization: socialLoginToken,
            },
          },
        )
        .then((res) => {
          if (res.status === 200) {
            // accessToken을 'apiAcessToken'에 저장
            console.log(res);
            const apiAcessToken = res.data.accessToken;
            localStorage.setItem('apiAcessToken', apiAcessToken);
            navigate('/trade');
          } else {
            // 응답 코드가 200이 아닌 다른 코드를 받을 경우의 처리
            alert(res.data.message || '알 수 없는 오류가 발생했습니다.');
          }
        })
        .catch((error) => {
          // 서버 요청 중에 오류가 발생한 경우의 처리
          alert(error.message || '네트워크 오류가 발생했습니다.');
        });
    }
  };

  return (
    <ApiContainer>
      <Container dark={true}>
        <div style={{ width: '540px' }}>
          <InnerContainer>
            <Text>
              API Key가 없으신가요? <DoubtsButton onClick={handleOpenModal} />
            </Text>
            <Text className="small">
              SSAFI에서는 한국투자증권 API Key를 통해 계좌 인증을 진행하며,
              <br />
              인증에 성공한 회원에 한해 AI 트레이딩 서비스를 제공하고 있습니다.
              <br />
              APP Key, SECRET Key와 모의 계좌 번호를 입력해주세요.
            </Text>
            <Text className="button" onClick={openApiPage}>
              API Key 발급/확인하기 &gt;
            </Text>
          </InnerContainer>
        </div>
      </Container>
      <Container dark={false}>
        <InnerContainer>
          <InputName className="header">
            모의투자 정보를 입력해주세요.
          </InputName>
          <div>
            <InputBox>
              <InputName className="name">APP Key :</InputName>
              <Input
                placeholder="APP Key를 입력하세요"
                value={appKey}
                onChange={handleApiChange}
              />
            </InputBox>
            <InputBox>
              <InputName className="name">SECRET Key :</InputName>
              <Input
                placeholder="SECRET Key를 입력하세요"
                value={secretKey}
                onChange={handleSecretChange}
              />
            </InputBox>
            <InputBox>
              <InputName className="name">계좌 번호 :</InputName>
              <Input
                maxLength={8}
                placeholder="계좌 번호를 입력하세요"
                value={accountNumber}
                onChange={handleAccountChange}
              />
            </InputBox>
            <Notice>* 앞 8자리만 숫자로 입력하세요.</Notice>
          </div>
          <InputName
            visibled={appKey !== '' && secretKey !== '' && accountNumber !== ''}
            className="button"
            onClick={handleButtonClick}
          >
            입력하기
          </InputName>
        </InnerContainer>
      </Container>
      {modalOpen && <ApiGuide closeModal={handleCloseModal} />}
    </ApiContainer>
  );
}
