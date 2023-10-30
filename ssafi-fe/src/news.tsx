import React from 'react';
import {
  Routes, Route, useNavigate, useLocation,
} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import NewsHome from './components/NewsLists/NewsHome';
import NewsNewest from './components/NewsLists/NewsNewest';
import NewsPolicies from './components/NewsLists/NewsPolicies';
import NewsMarkets from './components/NewsLists/NewsMarkets';
import NewsAnnounce from './components/NewsLists/NewsAnnounce';
import NewsInfos from './components/NewsLists/NewsInfos';
import NewsChart from './components/Charts/NewsChart';
import searchIcon from './assets/icons/search-icon.svg';

// 뉴스 메뉴 상태 prop type 정의
interface NewsMenuProps {
  active?: boolean;
}

interface StockDataset {
  indexCategory: string;
  indexNumber: number;
  indexDate: string;
}

export default function News() {
  const dateNow = new Date();
  const localTime = new Date(dateNow.getTime() - dateNow.getTimezoneOffset() * 60000);
  const localIsoString = localTime.toISOString();
  const timeText = `${localIsoString.slice(5, 7)}.${localIsoString.slice(8, 10)} ${localIsoString.slice(11, 16)}`;
  const [kospiStockData, setKospiStockData] = React.useState<number[]>([]);
  const [kospiLabelData, setKospiLabelData] = React.useState<string[]>([]);
  const [kospiStatus, setKospiStatus] = React.useState<string>('');
  const [kosdaqStockData, setKosdaqStockData] = React.useState<number[]>([]);
  const [kosdaqLabelData, setKosdaqLabelData] = React.useState<string[]>([]);
  const [kosdaqStatus, setKosdaqStatus] = React.useState<string>('');
  const [kospiThStockData, setKospiThStockData] = React.useState<number[]>([]);
  const [kospiThLabelData, setKospiThLabelData] = React.useState<string[]>([]);
  const [kospiThStatus, setKospiThStatus] = React.useState<string>('');

  // 기능 코드 파트
  const navigate = useNavigate();
  const location = useLocation();

  // 하위 페이지로 이동
  const toNewsHome = () => {
    navigate('/news');
  };

  const toNewsNewest = () => {
    navigate('/news/newest');
  };

  const toNewsPolicies = () => {
    navigate('/news/policies');
  };

  const toNewsMarkets = () => {
    navigate('/news/markets');
  };

  const toNewsAnnounce = () => {
    navigate('/news/announce');
  };

  const toNewsInfos = () => {
    navigate('/news/infos');
  };

  React.useEffect(() => {
    const fetchStockIndex = async () => {
      const stockIndex = await axios.get('http://localhost:8083/api/stock/index');
      const stockDataset = stockIndex.data.stockIndexVoList;
      stockDataset.forEach((element: StockDataset) => {
        if (element.indexCategory === 'kospi') {
          const combinedStockData = kospiStockData;
          combinedStockData.push(Math.round(element.indexNumber * 100) / 100);
          const combinedLabelData = kospiLabelData;
          combinedLabelData.push(element.indexDate);
          setKospiStockData(combinedStockData);
          setKospiLabelData(combinedLabelData);
        } else if (element.indexCategory === 'kosdaq') {
          const combinedStockData = kosdaqStockData;
          combinedStockData.push(Math.round(element.indexNumber * 100) / 100);
          const combinedLabelData = kosdaqLabelData;
          combinedLabelData.push(element.indexDate);
          setKosdaqStockData(combinedStockData);
          setKosdaqLabelData(combinedLabelData);
        } else if (element.indexCategory === 'kospi200') {
          const combinedStockData = kospiThStockData;
          combinedStockData.push(Math.round(element.indexNumber * 100) / 100);
          const combinedLabelData = kospiThLabelData;
          combinedLabelData.push(element.indexDate);
          setKospiThStockData(combinedStockData);
          setKospiThLabelData(combinedLabelData);
        }
      });
      if (kospiStockData[kospiStockData.length - 1] >= kospiStockData[kospiStockData.length - 2]) {
        setKospiStatus('up');
      } else {
        setKospiStatus('down');
      }
      if (kosdaqStockData[kosdaqStockData.length - 1] >= kosdaqStockData[kosdaqStockData.length - 2]) {
        setKosdaqStatus('up');
      } else {
        setKosdaqStatus('down');
      }
      if (kospiThStockData[kospiThStockData.length - 1] >= kospiThStockData[kospiThStockData.length - 2]) {
        setKospiThStatus('up');
      } else {
        setKospiThStatus('down');
      }
    };
    fetchStockIndex();
  }, []);

  return (
    <NewsContainer>
      <NewsNavContainer>
        <NewsNav>
          <NewsMenuArea>
            <NewsMenu active={location.pathname === '/news'} onClick={toNewsHome}>
              뉴스 홈
            </NewsMenu>
            <NewsMenu active={location.pathname === '/news/newest'} onClick={toNewsNewest}>
              최신뉴스
            </NewsMenu>
            <NewsMenu active={location.pathname === '/news/policies'} onClick={toNewsPolicies}>
              증권정책
            </NewsMenu>
            <NewsMenu active={location.pathname === '/news/markets'} onClick={toNewsMarkets}>
              시황
            </NewsMenu>
            <NewsMenu active={location.pathname === '/news/announce'} onClick={toNewsAnnounce}>
              공시
            </NewsMenu>
            <NewsMenu active={location.pathname === '/news/infos'} onClick={toNewsInfos}>
              기업정보
            </NewsMenu>
          </NewsMenuArea>
          <NewsSearchBarArea>
            <NewsSearchBar>
              <NewsSearchIcon />
              <NewsSearchTextbox />
            </NewsSearchBar>
          </NewsSearchBarArea>
        </NewsNav>
      </NewsNavContainer>
      <NewsArea>
        <Routes>
          <Route path="/" element={<NewsHome />} />
          <Route path="/newest" element={<NewsNewest />} />
          <Route path="/policies" element={<NewsPolicies />} />
          <Route path="/markets" element={<NewsMarkets />} />
          <Route path="/announce" element={<NewsAnnounce />} />
          <Route path="/infos" element={<NewsInfos />} />
        </Routes>
        <GraphArea>
          <GraphTextArea>
            <GraphAreaTitle>이 시각 증시</GraphAreaTitle>
            <GraphTime>{timeText}</GraphTime>
          </GraphTextArea>
          <ChartArea>
            <NewsChart title="코스피" status={kospiStatus} labelData={kospiLabelData.slice(kospiLabelData.length - 10, kospiLabelData.length)} stockData={kospiStockData.slice(kospiStockData.length - 10, kospiStockData.length)}/>
            <NewsChart title="코스닥" status={kosdaqStatus} labelData={kosdaqLabelData.slice(kosdaqLabelData.length - 10, kosdaqLabelData.length)} stockData={kosdaqStockData.slice(kosdaqStockData.length - 10, kosdaqStockData.length)}/>
            <NewsChart title="코스피 200" status={kospiThStatus} labelData={kospiThLabelData.slice(kospiThLabelData.length - 10, kospiThLabelData.length)} stockData={kospiThStockData.slice(kospiThStockData.length - 10, kospiThStockData.length)}/>
          </ChartArea>
        </GraphArea>
      </NewsArea>
    </NewsContainer>
  );
}

// 뉴스 영역
const NewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 1270px;
  align-items: center;
`;

// 뉴스 nav bar 영역
const NewsNavContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 69px;
  width: 100%;
  border-bottom: 1px solid var(--gray-color);
`;

// 뉴스 nav bar 속성
const NewsNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1270px;
  padding: 0px 30px;
`;

// 뉴스 메뉴 영역
const NewsMenuArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 530px;
`;

// 뉴스 메뉴 속성 (페이지 url에 따른 style 변화)
const NewsMenu = styled.div<NewsMenuProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  cursor: pointer;
  height: ${(props) => (props.active ? '66px' : '69px')};
  color: ${(props) => (props.active ? 'var(--dark-color)' : 'var(--gray-color)')};
  font-weight: ${(props) => (props.active ? '600' : '400')};
  border-bottom: ${(props) => (props.active ? '3px solid var(--dark-color)' : '0px')};
  padding-top: ${(props) => (props.active ? '2px' : '0px')};
`;

// 뉴스 검색바 영역 (이후 확장성을 위해 만들어둠)
const NewsSearchBarArea = styled.div``;

// 뉴스 검색바 속성
const NewsSearchBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 380px;
  height: 40px;
  border: 3px solid var(--dark-color);
  border-radius: 20px;
  background-color: var(--white-color);
`;

// 돋보기 모양 아이콘
const NewsSearchIcon = styled.img.attrs({
  src: `${searchIcon}`,
})`
  width: 30px;
`;

// 검색바 텍스트 입력 영역 속성
const NewsSearchTextbox = styled.input.attrs({
  placeholder: '검색할 단어를 입력하세요.',
})`
  width: 280px;
  height: 34px;
  margin-left: 15px; 
  font-size: 22px;
  color: var(--dark-color);
  background-color: var(--white-color);
  border: 0px;
  outline: none;
`;

// 뉴스 본문 영역
const NewsArea = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1270px;
  margin-top: 20px;
`;

// 그래프 영역
const GraphArea = styled.div`
  display: flex;
  width: 400px;
  flex-direction: column;
  align-items: center;
`;

const GraphTextArea = styled.div`
display: flex;
width: 340px;
justify-content: space-between;
align-items: end;
`;

const GraphAreaTitle = styled.p`
  font-size: 24px;
  font-weight: 700;
  color: var(--black-color);
`;

const GraphTime = styled.p`
font-size: 18px;
font-weight: 500;
color: var(--gray-color);
`;

const ChartArea = styled.div`
  display: flex;
  width: 360px;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid var(--black-color);
  padding-top: 20px;
`;
