import React from 'react';
import styled from 'styled-components';
import instance from '../../api/apiControlller';
import { ReactComponent as btnArrow } from '../../assets/images/button-arrow.svg';
// API로 대체될 예정인 뉴스 데이터, 이미지
import tempNews from '../../assets/temp.json';
import tempImage from '../../assets/images/temp-image.png';

// NewsItem 타입 정의
interface NewsItem {
  title: string;
  content: string;
  img_src: string;
  created_at: string;
}

interface NewsData {
  newsCategory: string;
  newsContent: string;
  newsDate: string;
  newsMidTitle: string;
  newsTitle: string;
  newsWriter: string;
}

// styled-component 파트

// 위 테두리가 존재하는 가장 위 box
const NewsListTopBox = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 800px;
border-top: 1px solid var(--black-color);
border-bottom: 1px solid var(--black-color);
margin: 0px;
padding: 18px 0px;
`;

// 그 밑의 box
const NewsListBox = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 800px;
border-bottom: 1px solid var(--black-color);
margin: 0px;
padding: 18px 0px;
`;

// box의 텍스트 부분
const NewsTextContainer = styled.div`
width: 520px;
`;

// 텍스트 중 제목 부분
const NewsTextTitle = styled.p`
font-size: 24px;
font-weight: 500;
color: var(--black-color);
text-overflow: ellipsis;
white-space: nowrap;
overflow: hidden;
margin-top: 0px;
cursor: pointer;
`;

// 텍스트 중 내용 부분
const NewsTextContent = styled.p`
font-size: 18px;
font-weight: 400;
text-align: justify;
color: var(--gray-color);
white-space: normal;
overflow: hidden;
text-overflow: ellipsis;

display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
`;

// 기사 생성 시각
const NewsTextCreatedAt = styled.p`
font-size: 18px;
font-weight: 400;
color: var(--gray-color);
margin-bottom: 0px;
`;

// 뉴스 썸네일
const NewsListImage = styled.img`
width: 260px;
height: 156px;
`;

// 더보기 버튼
const LoadBtn = styled.button`
display: flex;
align-items: center;
color: var(--dark-color);
font-size: 18px;
font-weight: 400;
padding: 10px 12px;
background-color: var(--white-color);
border: 1px solid var(--gray-color);
margin-top: 50px;
margin-bottom: 30px;
`;

// 버튼 내의 화살표 이미지
const BtnArrow = styled(btnArrow)`
  width: 15px;
  margin-left: 5px;
  fill: var(--dark-color);
  transform: rotate(90deg);
`;

// 전부 로딩 후 버튼을 대체할 빈 공간
const EmptyDiv = styled.div`
margin: 80px;
`;

export default function NewsHomeList() {
  // 뉴스를 가져온 횟수 newsCount
  const [newsCount, setNewsCount] = React.useState<number>(0);
  // 새로 가져온 뉴스의 JSX 코드를 담을 리스트 newsList
  const [newsList, setNewsList] = React.useState<Array<JSX.Element>>([]);
  const [latestList, setLatestList] = React.useState<NewsItem[]>([]);

  React.useEffect(() => {
    const fetchlatestNews = async () => {
      const latestNews = await instance.get('/news/latest');
      const latestDataset = latestNews.data.newsVoList.slice(0, 60);
      console.log(latestDataset);
      let latestDataList: Array<NewsItem> = [];
      latestDataset.forEach((latestData: NewsData) => {
        const regex = /https:\/\/[^ ]+\.(jpg|png|gif|jpeg)/g;
        const match = latestData.newsContent.match(regex);
        const replacedContent = latestData.newsContent.replace(regex, '');
        const replacedDate = latestData.newsDate.slice(6);
        if (match) {
          latestDataList.push(
            {
              title: latestData.newsTitle,
              content: replacedContent,
              img_src: match[0],
              created_at: replacedDate,
            },
          );
        }
      });
      console.log(latestDataList);
      setLatestList(latestDataList);
    };
    fetchlatestNews();
  }, []);

  // newsCount의 상태 변화에 따라 newsList에 뉴스를 추가하는 함수
  React.useEffect(() => {
    const loadMoreNews = () => {
      // 기존에 뉴스가 4개이므로 다음과 같이 baseNum 설정
      // baseNum은 key 부여를 위해 사용
      const baseNum = (newsCount - 1) * 8 + 4;
      // API로 대체될 예정인 뉴스 데이터
      const loadedNewsList: Array<NewsItem> = latestList.slice(baseNum, baseNum + 8);
      // 뉴스 JSX 코드
      const loadedNews = [];
      // eslint-disable-next-line no-plusplus
      for (let i = baseNum; i < baseNum + 8; i++) {
        loadedNews.push(
          <NewsListBox key={i + 1}>
            <NewsTextContainer>
              <NewsTextTitle>{loadedNewsList[i - baseNum].title}</NewsTextTitle>
              <NewsTextContent>{loadedNewsList[i - baseNum].content}</NewsTextContent>
              <NewsTextCreatedAt>{loadedNewsList[i - baseNum].created_at}</NewsTextCreatedAt>
            </NewsTextContainer>
            <NewsListImage src={loadedNewsList[i - baseNum].img_src} />
          </NewsListBox>,
        );
      }
      // 기존 newsList에 loadedNews를 더한 배열을 newsList로 설정
      setNewsList([...newsList, ...loadedNews]);
    };
    if (newsCount !== 0) {
      loadMoreNews();
    }
  }, [newsCount]);

  // 더보기 버튼 누른 횟수
  // 4번 로드하면 더보기 버튼이 사라지고 빈 공간으로 대체할 예정
  const handleNewsCount: React.MouseEventHandler<HTMLButtonElement> = () => {
    setNewsCount(newsCount + 1);
  };
  if (latestList.length !== 0) {
    return (
      <>
        <NewsListTopBox key={1}>
          <NewsTextContainer>
            <NewsTextTitle>{latestList[0].title}</NewsTextTitle>
            <NewsTextContent>{latestList[0].content}</NewsTextContent>
            <NewsTextCreatedAt>{latestList[0].created_at}</NewsTextCreatedAt>
          </NewsTextContainer>
          <NewsListImage src={latestList[0].img_src} />
        </NewsListTopBox>
        <NewsListBox key={2}>
          <NewsTextContainer>
            <NewsTextTitle>{latestList[1].title}</NewsTextTitle>
            <NewsTextContent>{latestList[1].content}</NewsTextContent>
            <NewsTextCreatedAt>{latestList[1].created_at}</NewsTextCreatedAt>
          </NewsTextContainer>
          <NewsListImage src={latestList[1].img_src} />
        </NewsListBox>
        <NewsListBox key={3}>
          <NewsTextContainer>
            <NewsTextTitle>{latestList[2].title}</NewsTextTitle>
            <NewsTextContent>{latestList[2].content}</NewsTextContent>
            <NewsTextCreatedAt>{latestList[2].created_at}</NewsTextCreatedAt>
          </NewsTextContainer>
          <NewsListImage src={latestList[2].img_src} />
        </NewsListBox>
        <NewsListBox key={4}>
          <NewsTextContainer>
            <NewsTextTitle>{latestList[3].title}</NewsTextTitle>
            <NewsTextContent>{latestList[3].content}</NewsTextContent>
            <NewsTextCreatedAt>{latestList[3].created_at}</NewsTextCreatedAt>
          </NewsTextContainer>
          <NewsListImage src={latestList[3].img_src} />
        </NewsListBox>
        {newsList}
        <div>
          {newsCount === 7
            ? <EmptyDiv />
            : <LoadBtn onClick={handleNewsCount}>
              더보기
              <BtnArrow />
            </LoadBtn>}
        </div>
      </>
    );
  } else {
    return null;
  }
}
