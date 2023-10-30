import { useState, useEffect } from 'react';
import styled from 'styled-components';
import './AccountTabs.css';
import { fetchCheckAccount, fetchCheckOrder } from '../../utility/api';

interface StyleProps {
  index?: number;
  color?: boolean;
  width?: string;
}

const TableContainer = styled.div`
  margin: 2% 0%;
  width: 100%;
  height: 96%;
`;

const Table = styled.div`
  border-collapse: collapse;
  border-radius: 12px;
  width: 100%;
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-evenly;
  background: var(--gradation-color);
  border-radius: 12px;
  font-size: 14px;
`;

const TableRow = styled.div<StyleProps>`
  display: flex;
  justify-content: space-evenly;
  background-color: ${(props) =>
    props.index === 0 ? 'transparent' : 'var(--light-gray-color)'};
  font-size: 10px;
`;

// 테이블 데이터 셀 요소에 스타일 적용
const TableCell = styled.div<StyleProps>`
  width: ${({ width }) => width || '85px'};
  padding: 5px 0;
  white-space: nowrap;
  text-align: center;
  font-weight: 400;
  /* &.header {
    font-weight: 400;
  } */
  &.color {
    color: ${(props) =>
      props.color ? 'var(--upper-color)' : 'var(--lower-color)'};
  }
`;

const TableBody = styled.div`
  max-height: 406px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0;
  }
`;

function AccountTabs() {
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index: number) => {
    setToggleState(index);
  };
  const [balance, setBalance] = useState([
    {
      stockName: '',
      amount: '',
      purchasePrice: '',
      nowPrice: '',
      totalPrice: '',
      profitRate: '',
    },
  ]);
  const [orders, setOrders] = useState([
    {
      ord_tmd: '', // 주문시간
      prdt_name: '', // 종목명
      sll_buy_dvsn_cd: '', // 구분 (01: 매도, 02: 매수)
      ord_unpr: '', // 주문가
      tot_ord_qty: '', // 총 주문량
      tot_ccld_qty: '', // 체결량
    },
  ]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchCheckAccount();

        if (!Array.isArray(result)) {
          console.log('balance', result.refinedOutput);

          const updatedBalance = result.refinedOutput.map((item: any) => ({
            stockName: item.prdt_name,
            amount: item.hldg_qty,
            purchasePrice: item.pchs_avg_pric,
            nowPrice: item.prpr,
            totalPrice: item.evlu_pfls_amt,
            profitRate: item.evlu_pfls_rt,
          }));

          setBalance(updatedBalance);
        } else {
          console.log('Array가 없음');
        }
      } catch (error) {
        console.error('Fetching Error:', error);
      }
    };

    fetchData();
  }, []);

  // 미체결 내역 받아오는 함수인데 데이터에 미체결내역 없음(total 갯수만 뜸)
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const fetchedData = await fetchCheckOrder();
  //       console.log('Orders Data:', fetchedData); // 데이터 로그 출력

  //       const updatedOrders = fetchedData.map((item: any) => ({
  //         ord_tmd: item.ord_tmd,
  //         prdt_name: item.prdt_name,
  //         sll_buy_dvsn_cd: item.sll_buy_dvsn_cd,
  //         ord_unpr: item.ord_unpr,
  //         tot_ord_qty: item.tot_ord_qty,
  //         tot_ccld_qty: item.tot_ccld_qty,
  //       }));
  //       setOrders(updatedOrders);
  //     } catch (error) {
  //       console.error('Fetching Error:', error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <div className="account-container">
      <div className="bloc-tabs">
        <div
          className={toggleState === 1 ? 'tabs active-tabs' : 'tabs'}
          onClick={() => toggleTab(1)}
        >
          잔고
        </div>
        <div
          className={toggleState === 2 ? 'tabs active-tabs' : 'tabs'}
          onClick={() => toggleTab(2)}
        >
          미체결
        </div>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? 'content active-content' : 'content'}
        >
          <TableContainer>
            <Table>
              <TableHeader>
                <TableCell width="80px">종목명</TableCell>
                <TableCell width="60px">보유수량</TableCell>
                <TableCell>매입평균가</TableCell>
                <TableCell>현재가</TableCell>
                <TableCell width="120px">손익금액 (수익률)</TableCell>
              </TableHeader>
              <TableBody>
                {balance.map((item: any, idx: number) => (
                  <TableRow key={idx} index={idx % 2}>
                    <TableCell width="80px">{item.stockName}</TableCell>
                    <TableCell width="60px">{item.amount}</TableCell>
                    <TableCell>
                      {Math.round(parseFloat(item.purchasePrice))
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                      원
                    </TableCell>
                    <TableCell>
                      {item.nowPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                      원
                    </TableCell>
                    <TableCell
                      width="120px"
                      className="color"
                      color={item.totalPrice > 0}
                    >
                      {item.totalPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                      원 ( {item.profitRate}% )
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div
          className={toggleState === 2 ? 'content active-content' : 'content'}
        >
          <TableContainer>
            <Table>
              <TableHeader>
                <TableCell width="70px">주문시간</TableCell>
                <TableCell width="60px">종목명</TableCell>
                <TableCell>구분</TableCell>
                <TableCell>주문가</TableCell>
                <TableCell width="80px">미체결/주문량</TableCell>
              </TableHeader>
              <TableBody>
                {/* {orders.map((order) => (
                  <TableRow key={order.ord_tmd}>
                    <TableCell>{order.ord_tmd}</TableCell>
                    <TableCell>{order.prdt_name}</TableCell>
                    <TableCell>
                      {order.sll_buy_dvsn_cd === '01' ? '매도' : '매수'}
                    </TableCell>
                    <TableCell>{order.ord_unpr}</TableCell>
                    <TableCell>
                      {Number(order.tot_ord_qty) - Number(order.tot_ccld_qty)}/
                      {order.tot_ord_qty}
                    </TableCell>
                  </TableRow>
                ))} */}
                <div
                  style={{
                    textAlign: 'center',
                    color: 'var(--gray-color)',
                    marginTop: '50px',
                    fontSize: '14px',
                    fontWeight: '300',
                  }}
                >
                  미체결 내역이 없습니다.
                </div>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default AccountTabs;
