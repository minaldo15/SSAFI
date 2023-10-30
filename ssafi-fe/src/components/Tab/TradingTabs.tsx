import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import './TradingTabs.css';
import {
  fetchBuyStock,
  fetchSellStock,
  fetchModifyStock,
  fetchAskingPrice,
  fetchCheckAccount,
} from '../../utility/api';
import TradingModal from './TradingModal';
// import WebSocketComponent from '../../utility/webSockets';

const PriceList = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  gap: 4px;
`;

const PriceItem = styled.div<{ lower?: boolean; border?: boolean }>`
  color: ${(props) =>
    props.lower ? 'var(--lower-color)' : 'var(--upper-color)'};
  background-color: ${(props) =>
    props.lower ? 'var(--light-lower-color)' : 'var(--light-upper-color)'};
  border: ${(props) => (props.border ? '2px solid var(--black-color)' : '')};
  font-size: 0.9em;
  text-align: end;
  padding: 3px 6px;
  .volume {
    font-size: 0.7em;
    color: var(--gray-color);
  }
`;

const TradingBox = styled.div`
  display: flex;
  width: 62%;
  margin: 0 1%;
  height: 195px;
  flex-direction: column;
  justify-content: space-between;
`;

const PriceDivision = styled.div`
  display: flex;
  margin-top: 6px;
`;

const Specified = styled.div`
  display: flex;
  margin-right: 20%;
  gap: 10px;
  cursor: pointer;
`;

const PriceAble = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  .big {
    font-size: 16px;
    font-weight: 500;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const InputLabel = styled.label`
  position: absolute;
  left: 8px; // 위치를 조절하여 input 내부에 텍스트를 정렬합니다.
  top: 48%;
  font-size: 14px;
  transform: translateY(-50%);
  pointer-events: none;
`;

const InputSpan = styled.span<{ right?: string }>`
  position: absolute;
  right: ${(props) => props.right || '8px'};
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
`;

const InputAmount = styled.input`
  width: 60px;
  padding: 1% 20% 1% 28%;
  text-align: right;
`;

const InputPrice = styled.input`
  width: 126px;
  padding: 1% 12% 1% 20%;
  text-align: right;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 190px;
  justify-content: space-between;
`;

const ButtonReset = styled.button`
  border: none;
  padding: 4px 24px;
  background-color: var(--light-gray-color);
  font-size: 14px;
  letter-spacing: 1px;
  &.sell {
    color: var(--white-color);
    background-color: var(--lower-color);
  }
  &.buy {
    color: var(--white-color);
    background-color: var(--upper-color);
  }
`;

const Text = styled.div`
  font-size: 14px;
  font-weight: 300;
  color: var(--gray-color);
  text-align: center;
  line-height: 24px;
  width: 100%;
  height: 147.2px;
  margin-top: 50px;
`;

const CountBtn = styled.div`
  padding: 0 8px;
  height: 22px;
  background-color: var(--light-gray-color);
  display: flex;
  align-items: center;
  margin-left: 8px;
  cursor: pointer;
`;

interface PriceData {
  askp1: number;
  askp2: number;
  askp3: number;
  bidp1: number;
  bidp2: number;
  bidp3: number;
  askp_rsqn1: number;
  askp_rsqn2: number;
  askp_rsqn3: number;
  bidp_rsqn1: number;
  bidp_rsqn2: number;
  bidp_rsqn3: number;
}

interface TradingTabsProps {
  stockName: string | undefined;
  stockCode: string;
}

function formatNumber(num: string | number) {
  return Intl.NumberFormat().format(Number(num));
}

function TradingTabs({ stockName, stockCode }: TradingTabsProps) {
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index: number) => {
    setToggleState(index);
  };
  const [askingPrices, setAskingPrices] = useState<PriceData | null>(null);
  const [division, setDivision] = useState('00');
  const [isSpecifiedChecked, setSpecifiedChecked] = useState(true);
  const [isMarketChecked, setMarketChecked] = useState(false);
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [total, setTotal] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [accountData, setAccountData] = useState<any | null>(null);
  const [sellAble, setSellAble] = useState('0');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchCheckAccount();
        if (!Array.isArray(result)) {
          const updatedBalance = result.refinedOutput.filter((item) => item.prdt_name === stockName);
          if (updatedBalance) {
            setSellAble(updatedBalance[0].hldg_qty);
          }
        }
      } catch (error) {
        console.error('Fetching Error:', error);
      }
    };
    fetchData();
  }, [stockName]);

  useEffect(() => {
    const getAskingPrices = async () => {
      const prices = await fetchAskingPrice(stockCode);
      setAskingPrices(prices);
    };
    getAskingPrices();
  }, [stockCode]); // stockCode가 변경될 경우에만 useEffect가 다시 실행됩니다.

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchCheckAccount();

      if (!Array.isArray(result) && result.AccountData) {
        setAccountData(result.AccountData[0]);
      }
    };

    fetchData();
  }, []);

  const handleSpecifiedClick = () => {
    if (division === '01') {
      setDivision('00'); // 지정을 선택
      setSpecifiedChecked(true);
      setMarketChecked(false); // 시장은 선택 해제
      setPrice(''); // 지정가 선택 시, 가격을 초기화
    }
  };

  const handleMarketClick = (type: number) => {
    if (division === '00') {
      setDivision('01'); // 시장을 선택
      setMarketChecked(true);
      setSpecifiedChecked(false); // 지정은 선택 해제
      // 시장가 선택 시, 매도호가 중 askingPrices.askp1를 가격으로 설정
      if (askingPrices && type === 1) {
        setPrice(
          askingPrices.askp1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        );
      } else if (askingPrices && type === 2) {
        setPrice(
          askingPrices.bidp1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        );
      }
    }
  };

  const handleReset = () => {
    setDivision('00');
    setMarketChecked(false);
    setSpecifiedChecked(true);
    setAmount('');
    setPrice('');
    setTotal('');
  };

  useEffect(() => {
    handleReset();
  }, [stockName, toggleState]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (toggleState === 2 && Number(e.target.value) > Number(sellAble)) {
      setAmount(sellAble);
    } else {
      setAmount(e.target.value);
    }
  };
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const priceNumber = e.target.value.replace(/,/g, '');
    setPrice(priceNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
  };

  useEffect(() => {
    // amount와 price가 숫자형태이면 아래와 같이 곱셈을 바로 할 수 있습니다.
    const totalPriceNum =
      Number(amount) * parseInt(price.replace(/,/g, ''), 10);
    if (totalPriceNum > 0) {
      setTotal(totalPriceNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    } else {
      setTotal('');
    }
  }, [amount, price]); // amount나 price 상태가 변경될 때마다 이 훅을 실행

  const handleOpenBuyModal = () => {
    setModalOpen(true);
  };
  const handleOpenSellModal = () => {
    setModalOpen(true);
  };

  const handleBuyStock = () => {
    fetchBuyStock(stockCode, division, amount, price.replace(/,/g, ''))
      .then((response) => {
        console.log('매수 성공:', response);
        setModalOpen(false);
      })
      .catch((error) => {
        console.log('매수 실패:', error);
      });
  };

  const handleSellStock = () => {
    fetchSellStock(stockCode, division, amount, price.replace(/,/g, ''))
      .then((response) => {
        console.log('매도 성공:', response);
        setModalOpen(false);
      })
      .catch((error) => {
        console.log('매도 실패:', error);
      });
  };

  const handleSetAmountChange = (add: boolean) => {
    const amountCount = Number(amount);
    if (add) {
      if (toggleState === 1 && Number(accountData.dnca_tot_amt) >= Number(total.replace(/,/g, ''))) {
        setAmount((amountCount + 1).toString());
      } else if (toggleState === 2 && Number(sellAble) > Number(amount)) {
        setAmount((amountCount + 1).toString());
      }
    } else if (amountCount > 0) {
      setAmount((amountCount - 1).toString());
    }
  };

  return (
    <div className="trading-container">
      <div className="bloc-tabs">
        <div
          className={toggleState === 1 ? 'tabs active-tabs' : 'tabs'}
          onClick={() => toggleTab(1)}
        >
          매수
        </div>
        <div
          className={toggleState === 2 ? 'tabs active-tabs' : 'tabs'}
          onClick={() => toggleTab(2)}
        >
          매도
        </div>
        <div
          className={toggleState === 3 ? 'tabs active-tabs' : 'tabs'}
          onClick={() => toggleTab(3)}
        >
          정정
        </div>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? 'content active-content' : 'content'}
        >
          <PriceList>
            {askingPrices && (
              <>
                <PriceItem lower={true}>
                  {formatNumber(askingPrices.askp3)}
                  <div className="volume">{formatNumber(askingPrices.askp_rsqn3)}</div>
                </PriceItem>
                <PriceItem lower={true}>
                  {formatNumber(askingPrices.askp2)}
                  <div className="volume">{formatNumber(askingPrices.askp_rsqn2)}</div>
                </PriceItem>
                <PriceItem lower={true} border={true}>
                  {formatNumber(askingPrices.askp1)}
                  <div className="volume">{askingPrices.askp_rsqn1}</div>
                </PriceItem>
              </>
            )}

            {askingPrices && (
              <>
                <PriceItem>
                  {formatNumber(askingPrices.bidp1)}
                  <div className="volume">{formatNumber(askingPrices.bidp_rsqn1)}</div>
                </PriceItem>
                <PriceItem>
                  {formatNumber(askingPrices.bidp2)}
                  <div className="volume">{formatNumber(askingPrices.bidp_rsqn2)}</div>
                </PriceItem>
              </>
            )}
          </PriceList>
          <TradingBox>
            <PriceDivision>
              <Specified onClick={handleSpecifiedClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <circle
                    cx="9"
                    cy="9"
                    r="8.5"
                    fill="var(--white-color)"
                    stroke="var(--gray-color)"
                  />
                  {isSpecifiedChecked && (
                    <path
                      d="M16 9C16 12.866 12.866 16 9 16C5.13401 16 2 12.866 2 9C2 5.13401 5.13401 2 9 2C12.866 2 16 5.13401 16 9Z"
                      fill="var(--point-color)"
                    />
                  )}
                </svg>
                지정
              </Specified>
              <Specified onClick={() => handleMarketClick(1)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <circle
                    cx="9"
                    cy="9"
                    r="8.5"
                    fill="var(--white-color)"
                    stroke="var(--gray-color)"
                  />
                  {isMarketChecked && (
                    <path
                      d="M16 9C16 12.866 12.866 16 9 16C5.13401 16 2 12.866 2 9C2 5.13401 5.13401 2 9 2C12.866 2 16 5.13401 16 9Z"
                      fill="var(--point-color)"
                    />
                  )}
                </svg>
                시장
              </Specified>
            </PriceDivision>
            <PriceAble>
              <div style={{ color: 'var(--gray-color)' }}>주문가능</div>
              <div className="big">
                {accountData ? formatNumber(accountData.dnca_tot_amt) : 0}원
              </div>
            </PriceAble>
            <div style={{ display: 'flex' }}>
              <InputWrapper>
                <InputLabel>수량</InputLabel>
                <InputAmount
                  placeholder="0"
                  value={amount}
                  onChange={handleAmountChange}
                />
                <InputSpan>주</InputSpan>
              </InputWrapper>
              <CountBtn onClick={() => handleSetAmountChange(false)}>
                -
              </CountBtn>
              <CountBtn onClick={() => handleSetAmountChange(true)}>+</CountBtn>
            </div>
            <InputWrapper>
              <InputLabel>가격</InputLabel>
              <InputPrice
                placeholder="0"
                value={price}
                onChange={handlePriceChange}
              />
              <InputSpan right="4px">원</InputSpan>
            </InputWrapper>
            <InputWrapper>
              <InputLabel>총액</InputLabel>
              <InputPrice placeholder="0" value={total} />
              <InputSpan right="4px">원</InputSpan>
            </InputWrapper>
            <ButtonContainer>
              <ButtonReset onClick={handleReset}>초기화</ButtonReset>
              <ButtonReset className="buy" onClick={handleOpenBuyModal}>
                매수
              </ButtonReset>
              {modalOpen && (
                <TradingModal
                  type="매수"
                  stockName={stockName}
                  amount={amount}
                  price={price}
                  total={total}
                  closeModal={setModalOpen}
                  handleStock={handleBuyStock}
                />
              )}
            </ButtonContainer>
          </TradingBox>
        </div>
        <div
          className={
            toggleState === 2 && sellAble !== '0'
              ? 'content active-content'
              : 'content'
          }
        >
          <PriceList>
            {askingPrices && (
              <>
                <PriceItem lower={true}>
                  {formatNumber(askingPrices.askp2)}
                  <div className="volume">{formatNumber(askingPrices.askp_rsqn2)}</div>
                </PriceItem>
                <PriceItem lower={true}>
                  {formatNumber(askingPrices.askp1)}
                  <div className="volume">{formatNumber(askingPrices.askp_rsqn1)}</div>
                </PriceItem>
              </>
            )}
            {askingPrices && (
              <>
                <PriceItem border={true}>
                  {formatNumber(askingPrices.bidp1)}
                  <div className="volume">{formatNumber(askingPrices.bidp_rsqn1)}</div>
                </PriceItem>
                <PriceItem>
                  {formatNumber(askingPrices.bidp2)}
                  <div className="volume">{formatNumber(askingPrices.bidp_rsqn2)}</div>
                </PriceItem>
                <PriceItem>
                  {formatNumber(askingPrices.bidp3)}
                  <div className="volume">{formatNumber(askingPrices.bidp_rsqn3)}</div>
                </PriceItem>
              </>
            )}
          </PriceList>
          <TradingBox>
            <PriceDivision>
              <Specified onClick={handleSpecifiedClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <circle
                    cx="9"
                    cy="9"
                    r="8.5"
                    fill="var(--white-color)"
                    stroke="var(--gray-color)"
                  />
                  {isSpecifiedChecked && (
                    <path
                      d="M16 9C16 12.866 12.866 16 9 16C5.13401 16 2 12.866 2 9C2 5.13401 5.13401 2 9 2C12.866 2 16 5.13401 16 9Z"
                      fill="var(--point-color)"
                    />
                  )}
                </svg>
                지정
              </Specified>
              <Specified onClick={() => handleMarketClick(2)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <circle
                    cx="9"
                    cy="9"
                    r="8.5"
                    fill="var(--white-color)"
                    stroke="var(--gray-color)"
                  />
                  {isMarketChecked && (
                    <path
                      d="M16 9C16 12.866 12.866 16 9 16C5.13401 16 2 12.866 2 9C2 5.13401 5.13401 2 9 2C12.866 2 16 5.13401 16 9Z"
                      fill="var(--point-color)"
                    />
                  )}
                </svg>
                시장
              </Specified>
            </PriceDivision>
            <PriceAble>
              <div style={{ color: 'var(--gray-color)' }}>매도 가능 수량</div>
              <div className="big">{sellAble} 주</div>
            </PriceAble>
            <div style={{ display: 'flex' }}>
              <InputWrapper>
                <InputLabel>수량</InputLabel>
                <InputAmount
                  placeholder="0"
                  value={amount}
                  onChange={handleAmountChange}
                />
                <InputSpan>주</InputSpan>
              </InputWrapper>
              <CountBtn onClick={() => handleSetAmountChange(false)}>-</CountBtn>
              <CountBtn onClick={() => handleSetAmountChange(true)}>+</CountBtn>
            </div>
            <InputWrapper>
              <InputLabel>가격</InputLabel>
              <InputPrice
                placeholder="0"
                value={price}
                onChange={handlePriceChange}
              />
              <InputSpan right="4px">원</InputSpan>
            </InputWrapper>
            <InputWrapper>
              <InputLabel>총액</InputLabel>
              <InputPrice placeholder="0" value={total} />
              <InputSpan right="4px">원</InputSpan>
            </InputWrapper>
            <ButtonContainer>
              <ButtonReset onClick={handleReset}>초기화</ButtonReset>
              <ButtonReset className="sell" onClick={handleOpenSellModal}>
                매도
              </ButtonReset>
              {modalOpen && (
                <TradingModal
                  type = '매도'
                  stockName = {stockName}
                  amount = {amount}
                  price = {price}
                  total = {total}
                  closeModal = {setModalOpen}
                  handleStock = {handleSellStock}
                />
              )}
            </ButtonContainer>
          </TradingBox>
        </div>
        <div
          className={toggleState === 2 && sellAble === '0'
            ? 'content active-content'
            : 'content'}
        >
          <Text>
            보유하고 있는 {stockName} 주가 없습니다.
          </Text>
        </div>
        <div
          className={toggleState === 3 ? 'content active-content' : 'content'}
        >
          <Text>
            정정할 미체결 내역이 없습니다. <br />
            매수, 매도를 먼저 진행해주세요.
          </Text>
        </div>
      </div>
    </div>
  );
}

export default TradingTabs;
