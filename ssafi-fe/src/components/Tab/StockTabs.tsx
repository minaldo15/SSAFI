import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './StockTabs.css';
import searchIcon from '../../assets/icons/search-icon.svg';
import { fetchStockCode } from '../../utility/api';
import { fetchStockPrice } from '../../utility/api';
import StockEach from './StockEach';

// 뉴스 검색바 영역 (이후 확장성을 위해 만들어둠)
const StocksSearchBarArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 4px 0;
`;

// 뉴스 검색바 속성
const StocksSearchBar = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 28px;
  border: 1px solid var(--dark-color);
  border-radius: 20px;
  background-color: var(--white-color);
`;

// 돋보기 모양 아이콘
const StocksSearchIcon = styled.img.attrs({
  src: `${searchIcon}`,
})`
  width: 10%;
  position: relative;
  left: 5%;
`;

// 검색바 텍스트 입력 영역 속성
const StocksSearchTextbox = styled.input.attrs({
  placeholder: '원하는 종목을 입력하세요.',
})`
  width: 70%;
  margin-left: 7%;
  font-size: 12px;
  color: var(--dark-color);
  background-color: var(--white-color);
  border: 0px;
  outline: none;
`;

const StocksList = styled.div`
  display: flex;
  flex-direction: column;
  margin: 4px 0;
`;

const RenewedButton = styled.button`
  border: none;
  background-color: transparent;
`;

const Text = styled.div`
  width: 100%;
  text-align: center;
  font-size: 14px;
  font-weight: 300;
  color: var(--gray-color);
  margin: 20px 0;
`;

interface StockTabsProps {
  onStockClick: (stockCode: string) => void;
}

interface Stock {
  code: string;
  name: string;
  prdy_vrss_sign: number;
  stck_prpr: number;
}

function StockTabs({ onStockClick }: StockTabsProps) {
  const [toggleState, setToggleState] = useState(1);
  const [stockInfo, setStockInfo] = useState<any[]>([]);
  const [stockData, setStockData] = useState<any[]>([]); // 종목 정보를 저장할 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태를 관리하는 상태 변수
  const [searchText, setSearchText] = useState('');
  const [filteredStockData, setFilteredStockData] = useState<any[]>([]);
  const [interests, setInterests] = useState<Stock[]>([]); // 관심 종목을 담을 상태
  const [clickedStar, setClickedStar] = useState<Record<string, boolean>>({}); // 별이 클릭되었는지 담을 상태
  const toggleTab = (index: number) => {
    setToggleState(index);
  };
  const handlePageChange = async (newPage: number) => {
    setCurrentPage(newPage); // 현재 페이지 상태 업데이트
    await loadPageData(newPage); // 페이지에 맞는 데이터 로딩
  };

  // 모든 주식 코드를 미리 가져온다
  useEffect(() => {
    fetchStockCode().then((info) => {
      setStockInfo(info);
      // 모든 주식 이름을 먼저 stockData에 설정
      const initialData = info.map(({ stockCode, stockName }) => ({
        code: stockCode,
        name: stockName,
      }));
      setStockData(initialData);
    });
  }, []);

  const itemsPerPage = 20;

  const loadPageData = async (page: number) => {
    setIsLoading(true); // 데이터를 불러오기 시작할 때 로딩 상태를 true로 설정

    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;

    // 해당 페이지의 stockPrice만 업데이트
    const updatedStockData = [...stockData];
    for (let i = start; i < end; i++) {
      const { code } = updatedStockData[i];
      const stockPriceData = await fetchStockPrice(code);
      updatedStockData[i] = {
        ...updatedStockData[i],
        ...stockPriceData,
      };
    }

    setStockData(updatedStockData);
    setIsLoading(false); // 데이터를 모두 불러왔을 때 로딩 상태를 false로 설정
  };

  useEffect(() => {
    if (stockInfo.length > 0) {
      loadPageData(1);
    }
  }, [stockInfo]);

  useEffect(() => {
    if (searchText === '') {
      setFilteredStockData(stockData);
    } else {
      handlePageChange(1);
      const filteredData = stockData.filter((stock) =>
        stock.name.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilteredStockData(filteredData);
    }
  }, [searchText, stockData]);

  const toggleStar = (stock: Stock) => {
    if (interests.includes(stock)) {
      const newInterests = interests.filter((item) => item !== stock);
      setInterests(newInterests);
      setClickedStar({
        ...clickedStar,
        [stock.code]: false,
      });
    } else {
      setInterests([...interests, stock]);
      setClickedStar({
        ...clickedStar,
        [stock.code]: true,
      });
    }
  };

  return (
    <div className="container">
      <div className="bloc-tabs">
        <div
          className={toggleState === 1 ? 'tabs active-tabs' : 'tabs'}
          onClick={() => toggleTab(1)}
        >
          전체
        </div>
        <div
          className={toggleState === 2 ? 'tabs active-tabs' : 'tabs'}
          onClick={() => toggleTab(2)}
        >
          관심
        </div>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? 'content active-content' : 'content'}
        >
          {/* 서치바 */}
          <StocksSearchBarArea>
            <StocksSearchBar>
              <StocksSearchIcon />
              <StocksSearchTextbox
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
              />{' '}
            </StocksSearchBar>
          </StocksSearchBarArea>
          {/* 전체목록 */}
          <StocksList>
            {/* 종목 데이터를 맵핑하여 표시 */}
            {filteredStockData.map((stock, index) => {
              const start = (currentPage - 1) * itemsPerPage;
              const end = currentPage * itemsPerPage;
              if (index >= start && index < end) {
                return (
                  <StockEach
                    stock = {stock}
                    clickedStar = {clickedStar}
                    toggleStar = {toggleStar}
                    onStockClick = {onStockClick}
                    toggleState = {toggleState}
                  />
                );
              }
              return null; // 현재 페이지에 속하지 않는 주식은 렌더링하지 않음
            })}
          </StocksList>
          {filteredStockData.length === 0 && (
            <Text>일치하는 결과가 없습니다.</Text>
          )}
          {/* 버튼 */}
          <div className="button-container">
            <RenewedButton
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              이전
            </RenewedButton>
            {/* 버튼이 항상 5개만 보이도록 처리 */}
            {(() => {
              let startPage = currentPage - 2;
              let endPage = currentPage + 2;

              // 페이지가 1, 2인 경우
              if (currentPage < 3) {
                startPage = 1;
                endPage = 5;
              }

              // 페이지가 마지막 두 페이지인 경우
              // 예: 9, 10 페이지인 경우 (총 페이지가 10개일 때)
              if (currentPage > 8) {
                startPage = 6;
                endPage = 10;
              }

              return Array.from(
                { length: endPage - startPage + 1 },
                (_, index) => startPage + index,
              ).map((pageNum) => (
                <RenewedButton
                  key={pageNum}
                  disabled={currentPage === pageNum}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </RenewedButton>
              ));
            })()}
            <RenewedButton disabled={currentPage === 10} onClick={() => handlePageChange(currentPage + 1)}>
              다음
            </RenewedButton>
          </div>
        </div>
        <div
          className={toggleState === 2 ? 'content active-content' : 'content'}
        >
          {interests.length === 0 ? (
            <Text>등록된 관심 종목이 없습니다.</Text>
          ) : (
            <StocksList>
              {interests.map((stock, index) => (
                <StockEach
                  stock = {stock}
                  clickedStar = {clickedStar}
                  toggleStar = {toggleStar}
                  onStockClick = {onStockClick}
                  toggleState = {toggleState}
                />
              ))}
            </StocksList>
          )}
        </div>
      </div>
    </div>
  );
}

export default StockTabs;
