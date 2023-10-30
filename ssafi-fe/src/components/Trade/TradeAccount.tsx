import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import handleScroll from '../../utils/scrollUtils';
import HistoryTable from './HistoryTable';
import { fetchCheckAccount } from '../../utility/api';
import AccountTabs from '../Tab/AccountTabs';

interface StyleProps {
  width?: string;
  maxHeight?: string;
  padding?: string;
  color?: string;
  marginTop?: string;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 558px;
  padding: 35px 30px;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BoxContainer = styled.div<StyleProps>`
  width: ${({ width }) => width || '320px'};
  max-height: ${({ maxHeight }) => maxHeight || ''};
  padding: ${({ padding }) => padding || '30px 40px'};
  background-color: var(--white-color);
  border-radius: 16px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.08);
`;

const RowContainer = styled.div<StyleProps>`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: ${({ marginTop }) => marginTop || '10px'};
`;

const RowContainerBorder = styled(RowContainer)`
  padding-bottom: 6px;
  border-bottom: 1px solid var(--light-gray-color);
`;

const Text = styled.div<StyleProps>`
  font-size: 20px;
  font-weight: 500;
  &.gray {
    color: var(--gray-color);
    font-weight: 400;
  }
  &.big {
    font-size: 28px;
    color: ${({ color }) => color || 'var(--dark-color)'};
  }
`;
function formatNumber(num: string | number) {
  return Intl.NumberFormat().format(Number(num));
}

export default function TradeAccount() {
  const [accountData, setAccountData] = useState<any | null>(null);
  // 표 내부 스크롤 때문에 스크롤 컨트롤러 주석
  // React.useEffect(() => {
  //   window.addEventListener('wheel', handleScroll);

  //   return () => {
  //     window.removeEventListener('wheel', handleScroll);
  //   };
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchCheckAccount();

      if (!Array.isArray(result) && result.AccountData) {
        setAccountData(result.AccountData[0]);
      }
    };

    fetchData();
  }, []);
  console.log(accountData);

  return (
    <Container>
      <LeftContainer>
        <BoxContainer>
          <Text>총 계좌 잔액</Text>
          <RowContainerBorder marginTop="20px">
            <Text className="big" color="var(--gray-color)">
              &#8361;
            </Text>
            <Text className="big">
              {accountData
                ? `${formatNumber(accountData.nass_amt)} 원`
                : 'Loading...'}
            </Text>
          </RowContainerBorder>
          <RowContainer
            marginTop="20px"
            style={{ justifyContent: 'flex-end' }}
          ></RowContainer>
          <RowContainer>
            <Text className="gray">투자금액</Text>
            <Text>
              {accountData
                ? `${formatNumber(accountData.scts_evlu_amt)} 원`
                : 'Loading...'}
            </Text>
          </RowContainer>
          <RowContainer>
            <Text className="gray">투자잔액</Text>
            <Text>
              {accountData
                ? `${formatNumber(accountData.dnca_tot_amt)} 원`
                : 'Loading...'}
            </Text>
          </RowContainer>
          <RowContainer marginTop="20px">
            <Text>총 손익</Text>
            {accountData ? (
              accountData.asst_icdc_erng_rt.slice(0, 1) === '-' ? (
                <Text className="big" color="var(--lower-color)">
                  {parseFloat(accountData.asst_icdc_erng_rt).toFixed(2)} %
                </Text>
              ) : (
                <Text className="big" color="var(--upper-color)">
                  {parseFloat(accountData.asst_icdc_erng_rt).toFixed(2)} %
                </Text>
              )
            ) : (
              <Text className="big" color="var(--black-color)">Loading...</Text>
            )}
          </RowContainer>
        </BoxContainer>
        <BoxContainer>
          <Text>예수금</Text>
          <RowContainerBorder marginTop="20px">
            <Text className="big" color="var(--gray-color)">
              &#8361;
            </Text>
            <Text className="big">
              {accountData
                ? `${formatNumber(accountData.dnca_tot_amt)} 원`
                : 'Loading...'}
            </Text>
          </RowContainerBorder>
          <RowContainer marginTop="20px">
            <Text className="gray">D + 1</Text>
            <Text>
              {accountData
                ? `${formatNumber(accountData.nxdy_excc_amt)} 원`
                : 'Loading...'}
            </Text>
          </RowContainer>
          <RowContainer>
            <Text className="gray">D + 2</Text>
            <Text>
              {accountData
                ? `${formatNumber(accountData.prvs_rcdl_excc_amt)} 원`
                : 'Loading...'}
            </Text>
          </RowContainer>
        </BoxContainer>
      </LeftContainer>
      <LeftContainer>
        <BoxContainer width="660px" maxHeight="498px" padding="30px">
          <Text>거래 내역</Text>
          <HistoryTable />
        </BoxContainer>
      </LeftContainer>
    </Container>
  );
}
