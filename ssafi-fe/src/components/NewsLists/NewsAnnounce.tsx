import React from 'react';
import styled from 'styled-components';
import instance from '../../api/apiControlller';
import { ReactComponent as btnArrow } from '../../assets/images/button-arrow.svg';
// API로 대체될 예정인 뉴스 데이터, 이미지

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

// 뉴스 목록 영역
const ListedNewsContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding-left: 30px;
`;

// 뉴스 메뉴 제목 영역
const ListTitleBox = styled.div`
display: flex;
justify-content: start;
width: 800px;
`;

// 뉴스 메뉴 제목 텍스트
const ListTitleText = styled.p`
font-size: 24px;
font-weight: 700;
color: var(--black-color);
`;

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
-webkit-line-clamp: 2;
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

export default function NewsNewest() {
  // 뉴스를 가져온 횟수 newsCount
  const [newsCount, setNewsCount] = React.useState<number>(0);
  // 새로 가져온 뉴스의 JSX 코드를 담을 리스트 newsList
  const [newsList, setNewsList] = React.useState<Array<JSX.Element>>([]);
  const [newsDataList, setNewsDataList] = React.useState<NewsItem[]>([]);

  React.useEffect(() => {
    const fetchlatestNews = async () => {
      const newsData = await instance.get('/news/public_announcement');
      const newsDataset = newsData.data.newsVoList.slice(0, 60);
      let dataList: Array<NewsItem> = [];
      newsDataset.forEach((data: NewsData) => {
        const regex = /https:\/\/[^ ]+\.(jpg|png|gif|jpeg)/g;
        const match = data.newsContent.match(regex);
        const replacedContent = data.newsContent.replace(regex, '');
        const replacedDate = data.newsDate.slice(6);
        if (match) {
          dataList.push(
            {
              title: data.newsTitle,
              content: replacedContent,
              img_src: match[0],
              created_at: replacedDate,
            },
          );
        }
      });
      console.log(dataList);
      setNewsDataList(dataList);
    };
    fetchlatestNews();
  }, []);

  // newsCount의 상태 변화에 따라 newsList에 뉴스를 추가하는 함수
  React.useEffect(() => {
    const loadMoreNews = () => {
      // baseNum은 key 부여를 위해 사용
      const baseNum = newsCount * 12;
      // API로 대체될 예정인 뉴스 데이터
      const loadedNewsList: Array<NewsItem> = newsDataList.slice(baseNum, baseNum + 12);
      // 가장 위에 있는 뉴스는 상단 테두리가 존재해야 하므로
      // 가장 처음에 로드하는 뉴스를 설정하는 조건문 추가
      if (baseNum === 0 && newsDataList.length !== 0) {
        // 뉴스 JSX 코드
        const loadedNews = [
          <NewsListTopBox key={1}>
            <NewsTextContainer>
              <NewsTextTitle>{loadedNewsList[0].title}</NewsTextTitle>
              <NewsTextContent>{loadedNewsList[0].content}</NewsTextContent>
              <NewsTextCreatedAt>{loadedNewsList[0].created_at}</NewsTextCreatedAt>
            </NewsTextContainer>
           <NewsListImage src={loadedNewsList[0].img_src} />
          </NewsListTopBox>,
        ];
        // eslint-disable-next-line no-plusplus
        for (let i = baseNum + 1; i < baseNum + 12; i++) {
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
      } else {
        const loadedNews = [];
        // eslint-disable-next-line no-plusplus
        for (let i = baseNum; i < baseNum + 12; i++) {
          if (i < newsDataList.length - 1) {
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
        }
        setNewsList([...newsList, ...loadedNews]);
      }
    };
    loadMoreNews();
  }, [newsCount, newsDataList]);

  // 더보기 버튼 누른 횟수
  // 4번 로드하면 더보기 버튼이 사라지고 빈 공간으로 대체할 예정
  const handleNewsCount: React.MouseEventHandler<HTMLButtonElement> = () => {
    setNewsCount(newsCount + 1);
  };
  if (newsDataList.length !== 0) {
    return (
      <ListedNewsContainer>
        <ListTitleBox>
          <ListTitleText>
            공시
          </ListTitleText>
        </ListTitleBox>
        {newsList}
        <div>
          {newsCount === 4
            ? <EmptyDiv />
            : <LoadBtn onClick={handleNewsCount}>
              더보기
              <BtnArrow />
            </LoadBtn>}
        </div>
      </ListedNewsContainer>
    );
  } else {
    return null;
  }
}
